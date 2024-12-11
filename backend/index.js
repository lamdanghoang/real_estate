const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());

// Create a connection pool
const pool = mysql.createPool({
  host: "34.87.169.125",
  user: "lamdanghoang",
  password: "danghoanglam",
  database: "QuanLyBatDongSan",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/", (req, res) => {
  res.send("Welcome to Real Estate Server!");
});

// Generic function to handle database queries
const handleQuery = async (res, query) => {
  try {
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Routes for different tables
app.get("/nguoiquanly/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM NguoiQuanLy");
});

app.get("/dagiac/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM DaGiac");
});

app.get("/batdongsan/danhsach", async (req, res) => {
  await handleQuery(
    res,
    "SELECT BatDongSan.*, NguoiQuanLy.HoTen, DonViHanhChinh.TenDVHC FROM BatDongSan INNER JOIN NguoiQuanLy ON BatDongSan.MaNQL = NguoiQuanLy.MaNQL INNER JOIN DonViHanhChinh ON BatDongSan.MaDVHC = DonViHanhChinh.MaDVHC"
  );
});

app.get("/khachthue/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM KhachThue");
});

app.get("/hopdong/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM HopDongThue");
});

app.get("/hoadon/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM HoaDonThanhToan");
});

app.get("/donvihanhchinh/danhsach", async (req, res) => {
  await handleQuery(res, "SELECT * FROM DonViHanhChinh");
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
