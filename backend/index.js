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
  password: "tranhoainam",
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
    console.log("Request body:", req.body);
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

    res.status(200).json({
      message: "Người quản lý đã được thêm thành công!",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding người quản lý:", error);
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
    console.error("Error deleting người quản lý:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi xóa người quản lý." });
  }
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

app.get("/khachthue/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM KhachThue");
});

app.post("/khachthue/them", async (req, res) => {
  try {
    const {
      TenKhachThue,
      SoCCCD,
      SoDienThoai,
      Email,
    } = req.body;
    // console.log("Request body:", req.body);

    const [result] = await pool.execute(
      "INSERT INTO KhachThue (TenKhachThue, SoCCCD, SoDienThoai, Email) VALUES (?, ?, ?, ?)",
      [
        TenKhachThue,
        SoCCCD,
        SoDienThoai,
        Email,
      ]
    );

    res.status(200).json({
      message: "Khách thuê đã được thêm thành công!",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding khách thuê:", error);
    res.status(400).json({
      message: error.message || "Có lỗi xảy ra khi thêm khách thuê.",
    });
  }
});

app.put("/khachthue/sua/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      TenKhachThue,
      SoCCCD,
      SoDienThoai,
      Email,
    } = req.body;
    const [result] = await pool.execute(
      `UPDATE KhachThue 
       SET TenKhachThue = ?, SoCCCD = ?, SoDienThoai = ?, Email = ?
       WHERE MaKhachThue = ?`,
      [
        TenKhachThue,
        SoCCCD,
        SoDienThoai,
        Email,
      ]
    );

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Khách thuê đã được cập nhật thành công!" });
    } else {
      res.status(404).json({ message: "Khách thuê không tồn tại." });
    }
  } catch (error) {
    console.error("Error updating khách thuê:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi cập nhật khách thuê." });
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
      res
        .status(200)
        .json({ message: "Khách thuê đã được xóa thành công!" });
    } else {
      res.status(404).json({ message: "Khách thuê không tồn tại." });
    }
  } catch (error) {
    console.error("Error deleting khách thuê:", error);
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
    // console.log("Request body:", req.body);

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

    res.status(200).json({
      message: "Hợp đồng thuê đã được thêm thành công!",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding hợp đồng thuê:", error);
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
    console.error("Error updating hợp đồng thuê:", error);
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
    console.error("Error deleting hợp đồng thuê:", error);
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
    // console.log("Request body:", req.body);

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

    res.status(200).json({
      message: "Hóa đơn thanh toán đã được thêm thành công!",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding hóa đơn thanh toán:", error);
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
    console.error("Error updating hóa đơn thanh toán:", error);
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
    console.error("Error deleting hóa đơn thanh toán:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi xóa hóa đơn thanh toán." });
  }
});

app.get("/donvihanhchinh/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM DonViHanhChinh");
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});

// Date formatting with robust error handling
const formatDate = (dateString) => {
  try {
    if (!dateString) return null;
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
