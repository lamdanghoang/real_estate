const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const { parse, format } = require("date-fns");

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "QuanLyBatDongSan",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Generic function to handle database
const handleQuery = async (res, query) => {
  try {
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to Real Estate Server!");
});

app.get("/doanhthu", async (req, res) => {
  await handleQuery(
    res,
    `
    WITH ThongKeBDS AS (
    SELECT 
        YEAR(hdt.NgayKyHopDong) AS Nam,
        dvhc.TenDVHC AS TenDVHC,
        bds.LoaiBDS AS LoaiBDS,
        bds.MaBDS,
        hdt.MaHopDong,
        hdtt.SoTien
    FROM BatDongSan bds
        JOIN DonViHanhChinh dvhc ON bds.MaDVHC = dvhc.MaDVHC
        JOIN HopDongThue hdt ON bds.MaBDS = hdt.MaBDS COLLATE utf8mb4_unicode_ci
        JOIN HoaDonThanhToan hdtt ON hdt.MaHopDong = hdtt.MaHopDong COLLATE utf8mb4_unicode_ci
    WHERE hdtt.TrangThaiThanhToan = 'Đã thanh toán' COLLATE utf8mb4_unicode_ci
)
SELECT 
    Nam,
    TenDVHC,
    LoaiBDS,
    COUNT(DISTINCT MaBDS) AS 'SoLuongBDS',
    COUNT(DISTINCT MaHopDong) AS 'SoLuongHopDong',
    SUM(SoTien) AS 'TongDoanhThu'
FROM ThongKeBDS
GROUP BY Nam, TenDVHC, LoaiBDS
ORDER BY Nam DESC, TenDVHC;
    `
  );
});

app.get("/dagiac/danhsach", async (req, res) => {
  await handleQuery(
    res,
    "SELECT DaGiac.MaDagiac, DonViHanhChinh.TenDVHC, DonViHanhChinh.MaDVHC, DaGiac.ToaDoRanhGioi FROM DaGiac INNER JOIN DonViHanhChinh ON DaGiac.MaDagiac = DonViHanhChinh.MaDagiac"
  );
});

app.get("/dagiac/danhsach/:MaDVHC", async (req, res) => {
  const { MaDVHC } = req.params;
  await handleQuery(
    res,
    `SELECT DaGiac.MaDagiac, DonViHanhChinh.TenDVHC, DonViHanhChinh.MaDVHC, DaGiac.ToaDoRanhGioi 
     FROM DaGiac 
     INNER JOIN DonViHanhChinh ON DaGiac.MaDagiac = DonViHanhChinh.MaDagiac 
     WHERE DonViHanhChinh.MaDVHC = '${MaDVHC}'`
  );
});

app.get("/diem/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM Diem");
});

app.get("/donvihanhchinh/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM DonViHanhChinh");
});

app.get("/batdongsan/danhsach", async (req, res) => {
  await handleQuery(
    res,
    "SELECT BatDongSan.*, NguoiQuanLy.HoTen, DonViHanhChinh.TenDVHC, Diem.* FROM BatDongSan INNER JOIN NguoiQuanLy ON BatDongSan.MaNQL = NguoiQuanLy.MaNQL INNER JOIN DonViHanhChinh ON BatDongSan.MaDVHC = DonViHanhChinh.MaDVHC INNER JOIN Diem ON BatDongSan.MaDiem = Diem.MaDiem"
  );
});

app.get("/batdongsan/danhsach/:MaDVHC", async (req, res) => {
  const { MaDVHC } = req.params;
  await handleQuery(
    res,
    `SELECT BatDongSan.*, NguoiQuanLy.HoTen, DonViHanhChinh.TenDVHC, Diem.* 
     FROM BatDongSan INNER JOIN NguoiQuanLy ON BatDongSan.MaNQL = NguoiQuanLy.MaNQL 
     INNER JOIN DonViHanhChinh ON BatDongSan.MaDVHC = DonViHanhChinh.MaDVHC 
     INNER JOIN Diem ON BatDongSan.MaDiem = Diem.MaDiem
     WHERE DonViHanhChinh.MaDVHC = '${MaDVHC}'`
  );
});
app.get("/toado", async (req, res) => {
  await handleQuery(
    res,
    "SELECT MaDiem FROM Diem WHERE KinhDo = 106.63036000 AND ViDo = 10.77549000"
  );
});

app.post("/batdongsan/them", async (req, res) => {
  try {
    const {
      LoaiBDS,
      DiaChi,
      DienTich,
      GiaThueTheoThang,
      TrangThai,
      MoTa,
      MaNQL,
      MaDVHC,
      ViDo,
      KinhDo,
    } = req.body;

    const [diemResult] = await pool.execute(
      `
     INSERT INTO Diem (KinhDo, ViDo) VALUES (?, ?);
      `,
      [KinhDo, ViDo]
    );

    if (diemResult.affectedRows > 0) {
      const [result] = await pool.query(
        "SELECT MaDiem FROM Diem WHERE KinhDo = ? AND ViDo = ?",
        [KinhDo, ViDo]
      );
      const MaDiem = result[0].MaDiem;

      const [results] = await pool.execute(
        `
      INSERT INTO BatDongSan (LoaiBDS, DiaChi, DienTich, GiaThueTheoThang, TrangThai, MoTa, MaNQL, MaDiem, MaDVHC)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          LoaiBDS,
          DiaChi,
          DienTich,
          GiaThueTheoThang,
          TrangThai,
          MoTa,
          MaNQL,
          MaDiem,
          MaDVHC,
        ]
      );

      if (results.affectedRows > 0) {
        res.status(200).json({
          message: "Bất động sản đã được thêm thành công!",
          userId: results.insertId,
        });
      } else {
        console.error("Error:", error);
        res.status(400).json({
          message: error.message || "Có lỗi xảy ra khi thêm bất động sản.",
        });
      }
    } else {
      console.error("Error:", error);
      res.status(400).json({
        message:
          error.message ||
          "Có lỗi xảy ra khi thêm điểm trước khi thêm bất động sản.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      message: error.message || "Có lỗi xảy ra khi thêm bất động sản.",
    });
  }
});

app.put("/batdongsan/sua/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      LoaiBDS,
      DiaChi,
      DienTich,
      GiaThueTheoThang,
      TrangThai,
      MoTa,
      MaNQL,
      MaDiem,
      MaDVHC,
      HoTen,
      TenDVHC,
      KinhDo,
      ViDo,
    } = req.body;

    const [result] = await pool.execute(
      `UPDATE BatDongSan 
       SET LoaiBDS = ?, DiaChi = ?, DienTich = ?, GiaThueTheoThang = ?, 
           TrangThai = ?, MoTa = ?, MaNQL = ?, MaDVHC = ? 
       WHERE MaBDS = ?`,
      [
        LoaiBDS,
        DiaChi,
        DienTich,
        GiaThueTheoThang,
        TrangThai,
        MoTa,
        MaNQL,
        MaDVHC,
        id,
      ]
    );

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Bất động sản đã được cập nhật thành công!" });
    } else {
      res.status(404).json({ message: "Bất động sản không tồn tại." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi cập nhật bất động sản." });
  }
});

app.delete("/batdongsan/xoa/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      "DELETE FROM BatDongSan WHERE MaBDS = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Bất động sản đã được xóa thành công!" });
    } else {
      res.status(404).json({ message: "bất động sản không tồn tại." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi xóa bất động sản." });
  }
});

app.get("/batdongsan/thongtin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [[result]] = await pool.query(
      `SELECT BatDongSan.*, NguoiQuanLy.HoTen, DonViHanhChinh.TenDVHC, Diem.* FROM BatDongSan INNER JOIN NguoiQuanLy ON BatDongSan.MaNQL = NguoiQuanLy.MaNQL INNER JOIN DonViHanhChinh ON BatDongSan.MaDVHC = DonViHanhChinh.MaDVHC INNER JOIN Diem ON BatDongSan.MaDiem = Diem.MaDiem WHERE BatDongSan.MaBDS = ?`,
      [id]
    );
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/nguoiquanly/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM NguoiQuanLy");
});

app.post("/nguoiquanly/them", async (req, res) => {
  try {
    const {
      HoTen,
      NgayKhoiTao,
      SoDienThoai,
      Email,
      TenDangNhap,
      MatKhau,
      VaiTro,
      TrangThai,
    } = req.body;
    const formattedNgayKhoiTao = formatDate(NgayKhoiTao);

    const [result] = await pool.execute(
      "INSERT INTO NguoiQuanLy (HoTen, NgayKhoiTao, SoDienThoai, Email, TenDangNhap, MatKhau, VaiTro, TrangThai) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        HoTen,
        formattedNgayKhoiTao,
        SoDienThoai,
        Email,
        TenDangNhap,
        MatKhau,
        VaiTro,
        TrangThai,
      ]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        message: "Người quản lý đã được thêm thành công!",
        userId: result.insertId,
      });
    } else {
      console.error("Error:", error);
      res.status(400).json({
        message: error.message || "Có lỗi xảy ra khi thêm người quản lý.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      message: error.message || "Có lỗi xảy ra khi thêm người quản lý.",
    });
  }
});

app.put("/nguoiquanly/sua/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      HoTen,
      NgayKhoiTao,
      SoDienThoai,
      Email,
      TenDangNhap,
      MatKhau,
      VaiTro,
      TrangThai,
    } = req.body;
    const formattedDate = formatDate(NgayKhoiTao);
    const [result] = await pool.execute(
      `UPDATE NguoiQuanLy 
       SET HoTen = ?, NgayKhoiTao = ?, SoDienThoai = ?, Email = ?, 
           TenDangNhap = ?, MatKhau = ?, VaiTro = ?, TrangThai = ? 
       WHERE MaNQL = ?`,
      [
        HoTen,
        formattedDate,
        SoDienThoai,
        Email,
        TenDangNhap,
        MatKhau,
        VaiTro,
        TrangThai,
        id,
      ]
    );

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Người quản lý đã được cập nhật thành công!" });
    } else {
      res.status(404).json({ message: "Người quản lý không tồn tại." });
    }
  } catch (error) {
    console.error("Error updating người quản lý:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi cập nhật người quản lý." });
  }
});

app.delete("/nguoiquanly/xoa/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      "DELETE FROM NguoiQuanLy WHERE MaNQL = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Người quản lý đã được xóa thành công!" });
    } else {
      res.status(404).json({ message: "Người quản lý không tồn tại." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi xóa người quản lý." });
  }
});

app.get("/khachthue/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM KhachThue");
});

app.post("/khachthue/them", async (req, res) => {
  try {
    const { TenKhachThue, SoCCCD, SoDienThoai, Email } = req.body;

    const [result] = await pool.execute(
      "INSERT INTO KhachThue (TenKhachThue, SoCCCD, SoDienThoai, Email) VALUES (?, ?, ?, ?)",
      [TenKhachThue, SoCCCD, SoDienThoai, Email]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        message: "Khách thuê đã được thêm thành công!",
        userId: result.insertId,
      });
    } else {
      console.error("Error:", error);
      res.status(400).json({
        message: error.message || "Có lỗi xảy ra khi thêm khách thuê.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      message: error.message || "Có lỗi xảy ra khi thêm khách thuê.",
    });
  }
});

app.put("/khachthue/sua/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { TenKhachThue, SoCCCD, SoDienThoai, Email } = req.body;
    const [result] = await pool.execute(
      `UPDATE KhachThue 
       SET TenKhachThue = ?, SoCCCD = ?, SoDienThoai = ?, Email = ?
       WHERE MaKhachThue = ?`,
      [TenKhachThue, SoCCCD, SoDienThoai, Email, id]
    );

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Khách thuê đã được cập nhật thành công!" });
    } else {
      res.status(404).json({ message: "Khách thuê không tồn tại." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật khách thuê." });
  }
});

app.delete("/khachthue/xoa/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      "DELETE FROM KhachThue WHERE MaKhachThue = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Khách thuê đã được xóa thành công!" });
    } else {
      res.status(404).json({ message: "Khách thuê không tồn tại." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi xóa khách thuê." });
  }
});

app.get("/hopdong/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM HopDongThue");
});

app.post("/hopdong/them", async (req, res) => {
  try {
    const {
      NgayKyHopDong,
      NgayBatDau,
      NgayKetThuc,
      GiaThue,
      TienDatCoc,
      SoLuongKhach,
      TinhTrangHopDong,
      MaBDS,
      MaKhachThue,
    } = req.body;

    const formattedSignDate = formatDate(NgayKyHopDong);
    const formattedStartDate = formatDate(NgayBatDau);
    const formattedEndDate = formatDate(NgayKetThuc);
    const [result] = await pool.execute(
      "INSERT INTO HopDongThue (NgayKyHopDong, NgayBatDau, NgayKetThuc, GiaThue, TienDatCoc, SoLuongKhach, TinhTrangHopDong, MaBDS, MaKhachThue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        formattedSignDate,
        formattedStartDate,
        formattedEndDate,
        GiaThue,
        TienDatCoc,
        SoLuongKhach,
        TinhTrangHopDong,
        MaBDS,
        MaKhachThue,
      ]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        message: "Hợp đồng thuê đã được thêm thành công!",
        userId: result.insertId,
      });
    } else {
      console.error("Error:", error);
      res.status(400).json({
        message: error.message || "Có lỗi xảy ra khi thêm hợp đồng thuê.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      message: error.message || "Có lỗi xảy ra khi thêm hợp đồng thuê.",
    });
  }
});

app.put("/hopdong/sua/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      NgayKyHopDong,
      NgayBatDau,
      NgayKetThuc,
      GiaThue,
      TienDatCoc,
      SoLuongKhach,
      TinhTrangHopDong,
      MaBDS,
      MaKhachThue,
    } = req.body;
    const formattedSignDate = formatDate(NgayKyHopDong);
    const formattedStartDate = formatDate(NgayBatDau);
    const formattedEndDate = formatDate(NgayKetThuc);
    const [result] = await pool.execute(
      `UPDATE HopDongThue 
       SET NgayKyHopDong = ?, NgayBatDau = ?, NgayKetThuc = ?, GiaThue = ?, TienDatCoc = ?, SoLuongKhach = ?, TinhTrangHopDong = ?, MaBDS = ?, MaKhachThue = ?
       WHERE MaHopDong = ?`,
      [
        formattedSignDate,
        formattedStartDate,
        formattedEndDate,
        GiaThue,
        TienDatCoc,
        SoLuongKhach,
        TinhTrangHopDong,
        MaBDS,
        MaKhachThue,
        id,
      ]
    );

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Hợp đồng thuê đã được cập nhật thành công!" });
    } else {
      res.status(404).json({ message: "Hợp đồng thuê không tồn tại." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi cập nhật hợp đồng thuê." });
  }
});

app.delete("/hopdong/xoa/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      "DELETE FROM HopDongThue WHERE MaHopDong = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Hợp đồng thuê đã được xóa thành công!" });
    } else {
      res.status(404).json({ message: "Hợp đồng thuê không tồn tại." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi xóa hợp đồng thuê." });
  }
});

app.get("/hoadon/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM HoaDonThanhToan");
});

app.post("/hoadon/them", async (req, res) => {
  try {
    const {
      NgayLapHoaDon,
      NgayHetHan,
      SoTien,
      NgayThanhToanThucTe,
      TrangThaiThanhToan,
      PhuongThucThanhToan,
      MaHopDong,
    } = req.body;

    const formattedCreatedDate = formatDate(NgayLapHoaDon);
    const formattedExpiredDate = formatDate(NgayHetHan);
    const formattedPaymentDate = formatDate(NgayThanhToanThucTe);
    const [result] = await pool.execute(
      "INSERT INTO HoaDonThanhToan (NgayLapHoaDon, NgayHetHan, SoTien, NgayThanhToanThucTe, TrangThaiThanhToan, PhuongThucThanhToan, MaHopDong) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        formattedCreatedDate,
        formattedExpiredDate,
        SoTien,
        formattedPaymentDate,
        TrangThaiThanhToan,
        PhuongThucThanhToan,
        MaHopDong,
      ]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        message: "Hóa đơn thanh toán đã được thêm thành công!",
        userId: result.insertId,
      });
    } else {
      console.error("Error:", error);
      res.status(400).json({
        message: error.message || "Có lỗi xảy ra khi thêm hóa đơn thanh toán.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      message: error.message || "Có lỗi xảy ra khi thêm hóa đơn thanh toán.",
    });
  }
});

app.put("/hoadon/sua/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      NgayLapHoaDon,
      NgayHetHan,
      SoTien,
      NgayThanhToanThucTe,
      TrangThaiThanhToan,
      PhuongThucThanhToan,
      MaHopDong,
    } = req.body;
    const formattedCreatedDate = formatDate(NgayLapHoaDon);
    const formattedExpiredDate = formatDate(NgayHetHan);
    const formattedPaymentDate = formatDate(NgayThanhToanThucTe);
    const [result] = await pool.execute(
      `UPDATE HoaDonThanhToan
       SET NgayLapHoaDon = ?, NgayHetHan = ?, SoTien = ?, NgayThanhToanThucTe = ?, TrangThaiThanhToan = ?, PhuongThucThanhToan = ?, MaHopDong = ?
       WHERE MaHoaDon = ?`,
      [
        formattedCreatedDate,
        formattedExpiredDate,
        SoTien,
        formattedPaymentDate,
        TrangThaiThanhToan,
        PhuongThucThanhToan,
        MaHopDong,
        id,
      ]
    );

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Hóa đơn thanh toán đã được cập nhật thành công!" });
    } else {
      res.status(404).json({ message: "Hóa đơn thanh toán không tồn tại." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi cập nhật hóa đơn thanh toán." });
  }
});

app.delete("/hoadon/xoa/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      "DELETE FROM HoaDonThanhToan WHERE MaHoaDon = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Hóa đơn thanh toán đã được xóa thành công!" });
    } else {
      res.status(404).json({ message: "Hóa đơn thanh toán không tồn tại." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi xóa hóa đơn thanh toán." });
  }
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});

// Date formatting with robust error handling
const formatDate = (dateString) => {
  try {
    if (!dateString) return null;

    // Check if dateString is already in yyyy-MM-dd format
    const existingFormat = /^(\d{4})-(\d{2})-(\d{2})$/.test(dateString);

    if (existingFormat) {
      return dateString;
    }

    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());

    if (isNaN(parsedDate)) {
      console.warn(`Invalid date format: ${dateString}`);
      return null;
    }

    return format(parsedDate, "yyyy-MM-dd");
  } catch (error) {
    console.error("Date Formatting Error:", error);
    return null;
  }
};
