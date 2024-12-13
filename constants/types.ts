export interface RealEstate {
  MaBDS?: string;
  LoaiBDS: string;
  DiaChi: string;
  DienTich: number;
  GiaThueTheoThang: number;
  TrangThai: string;
  MoTa: string;
  MaNQL: string;
  MaDiem: string;
  MaDVHC: string;
  HoTen: string;
  TenDVHC: string;
  KinhDo: number;
  ViDo: number;
}

export interface PropertyFormProps {
  LoaiBDS: string;
  DiaChi: string;
  DienTich: number;
  GiaThueTheoThang: number;
  TrangThai: string;
  MoTa: string;
  MaNQL: string;
  MaDiem: string;
  MaDVHC: string;
  x: number;
  y: number;
}

export interface Contract {
  MaHopDong: string;
  NgayKyHopDong: string;
  NgayBatDau: string;
  NgayKetThuc: string;
  GiaThue: number;
  TienDatCoc: number;
  SoLuongKhach: number;
  TinhTrangHopDong: string;
  MaBDS: string;
  MaKhachThue: string;
}

export interface Invoice {
  MaHoaDon: string;
  NgayLapHoaDon: string;
  NgayHetHan: string;
  SoTien: number;
  NgayThanhToanThucTe: string;
  TrangThaiThanhToan: string;
  PhuongThucThanhToan: string;
  MaHopDong: string;
}

export interface StaffManager {
  MaNQL: string;
  NgayKhoiTao: string;
  HoTen: string;
  SoDienThoai: string;
  Email: string;
  TenDangNhap: string;
  MatKhau: string;
  VaiTro: string;
  TrangThai: string;
}

export interface Customer {
  MaKhachThue: string;
  TenKhachThue: string;
  SoCCCD: string;
  SoDienThoai: string;
  Email: string;
}

export interface District {
  MaDVHC: string;
  TenDVHC: string;
  LoaiDVHC: string;
  MaDaGiac: string;
}

export interface Dagiac {
  MaDagiac: string;
  TenDVHC: string;
  LoaiDVHC: string;
  ToaDoRanhGioi: string;
}

export interface Boundary extends Dagiac {
  polygon: GeoJsonPolygon;
}
export interface GeoJsonPolygon {
  type: "polygon";
  rings: number[][];
}
