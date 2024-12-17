"use client";
import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import "@arcgis/core/assets/esri/themes/light/main.css";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import { Boundary, Dagiac, RealEstate, SelectType } from "@/constants/types";
import { colors, districts } from "@/constants/constants";
import { useRouter } from "next/navigation";

interface Props {
  lon?: number;
  lat?: number;
  zoom?: number;
  selection?: SelectType;
  selectedProperty?: RealEstate;
}

const MultiGeometryMap: React.FC<Props> = ({
  lon = 106.68139814666989,
  lat = 10.775908207858429,
  zoom = 10,
  selection,
  selectedProperty,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<__esri.MapView | null>(null);
  const [graphicsLayer, setGraphicsLayer] =
    useState<__esri.GraphicsLayer | null>(null);
  const [polygons, setPolygons] = useState<Boundary[]>([]);
  const [polyline, setPolyline] = useState<Boundary>();
  const [points, setPoints] = useState<RealEstate[]>([]);
  const router = useRouter();
  const [hoveredPointPopup, setHoveredPointPopup] = useState<{
    x: number;
    y: number;
    point: RealEstate | null;
  }>({ x: 0, y: 0, point: null });

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // Create map
    const map = new Map({
      basemap: "streets-navigation-vector",
    });

    // Create graphics layer
    const layer = new GraphicsLayer();
    map.add(layer);

    // Create map view
    const mapView = new MapView({
      container: mapRef.current,
      map: map,
      center: [lon, lat],
      zoom: zoom,
      highlightOptions: {
        color: "white",
      },
    });

    // Store view and graphics layer
    setView(mapView);
    setGraphicsLayer(layer);

    // Add pointer move event for hover
    mapView.on("pointer-move", async (event) => {
      try {
        const hitResponse = await mapView.hitTest(event);
        const graphic = hitResponse.results[0]?.graphic;

        if (graphic && graphic.attributes.LoaiBDS) {
          const point = graphic.attributes as RealEstate;
          setHoveredPointPopup({
            x: event.x,
            y: event.y - 10,
            point: point,
          });
        } else {
          setHoveredPointPopup({ x: 0, y: 0, point: null });
        }
      } catch (error) {
        console.error("Error during hit test:", error);
      }
    });

    // Add click event for navigation
    mapView.on("click", async (event) => {
      try {
        const hitResponse = await mapView.hitTest(event);
        const graphic = hitResponse.results[0]?.graphic;

        if (graphic && graphic.attributes.LoaiBDS) {
          const point = graphic.attributes as RealEstate;
          // Navigate to detail page using the point's ID or another unique identifier
          router.push(`/info/${point.MaBDS}`);
        }
      } catch (error) {
        console.error("Error during click event:", error);
      }
    });

    mapView.popupEnabled = false;

    // Fetch locations
    fetchPolygons();
    fetchLocations();

    // Cleanup
    return () => {
      mapView.destroy();
    };
  }, []);

  // Fetch data from an external source
  const fetchLocations = async (MaDVHC = "DV0023") => {
    try {
      // Simulated API call - replace with your actual API endpoint
      const response = await fetch(
        `http://localhost:3003/batdongsan/danhsach/${
          MaDVHC === "DV0023" ? "" : MaDVHC
        }`
      );
      const data = await response.json();
      setPoints(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPolygons = async () => {
    try {
      // Simulated API call - replace with your actual API endpoint
      const response = await fetch("http://localhost:3003/dagiac/danhsach");
      const data: Dagiac[] = await response.json();

      const formattedDatas: Boundary[] = data.map((data) => {
        return {
          ...data,
          polygon: JSON.parse(data.ToaDoRanhGioi),
        };
      });
      const polyline = formattedDatas.pop();
      setPolyline(polyline);
      setPolygons(formattedDatas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPolyline = async (MaDVHC = "DV0023") => {
    try {
      // Simulated API call - replace with your actual API endpoint
      const response = await fetch(
        `http://localhost:3003/dagiac/danhsach/${MaDVHC}`
      );
      const data: Dagiac[] = await response.json();

      const formattedDatas: Boundary[] = data.map((data) => {
        return {
          ...data,
          polygon: JSON.parse(data.ToaDoRanhGioi),
        };
      });
      const polyline = formattedDatas.pop();
      setPolyline(polyline);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Create graphics from data
  const drawPoints = (points: RealEstate[]) => {
    if (!graphicsLayer) return;

    graphicsLayer.removeAll();

    // Create graphics for each location
    points.forEach((location) => {
      // Determine symbol based on location type
      const houseSymbol: __esri.SymbolProperties = {
        type: "picture-marker",
        url: "data:image/png;base64,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",
        height: "20px",
        width: "20px",
      };

      // Create point graphic
      const pointGraphic = new Graphic({
        geometry: {
          type: "point",
          longitude: location.KinhDo,
          latitude: location.ViDo,
        },
        symbol: houseSymbol,
        attributes: {
          ...location,
          GiaThueTheoThang: new Intl.NumberFormat("vi-VN").format(
            location.GiaThueTheoThang
          ),
        },
        // popupTemplate: {
        //   title: "Thông tin bất động sản",
        //   content: [
        //     {
        //       type: "text",
        //       text: "Loại bất động sản: {LoaiBDS}",
        //     },
        //     {
        //       type: "text",
        //       text: "Địa chỉ: {DiaChi}",
        //     },
        //     {
        //       type: "text",
        //       text: "Diện tích: {DienTich}m²",
        //     },
        //     {
        //       type: "text",
        //       text: "Mô tả: {MoTa}",
        //     },
        //     {
        //       type: "text",
        //       text: "Giá thuê theo tháng: {GiaThueTheoThang}vnd",
        //     },
        //     {
        //       type: "text",
        //       text: "Trạng thái: {TrangThai}",
        //     },
        //   ],
        // },
      });

      graphicsLayer.add(pointGraphic);
    });
  };

  const drawPolygons = () => {
    if (!graphicsLayer) return;

    // Create graphics for each location
    polygons.forEach((location, index) => {
      // Create symbol
      const symbol = {
        type: "simple-fill",
        color: colors[index],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      };

      // Create polygon graphic
      const polygonGraphic = new Graphic({
        geometry: {
          type: "polygon",
          rings: location.polygon.rings,
        },
        symbol: symbol,
        attributes: {
          name: location.TenDVHC,
        },
        popupTemplate: {
          title: "{name}",
        },
      });

      graphicsLayer.add(polygonGraphic);
    });
  };

  const drawPolyline = (polyline: Boundary) => {
    if (!graphicsLayer) return;

    graphicsLayer.removeAll();

    // Create symbol
    const symbol = {
      type: "simple-line",
      color: [0, 0, 255],
      width: 3,
    };

    // Create polygon graphic
    const polygonGraphic = new Graphic({
      geometry: {
        type: "polyline",
        paths: polyline.polygon.rings,
      },
      symbol: symbol,
      attributes: {
        name: polyline.TenDVHC,
      },
      popupTemplate: {
        title: "Ranh giới {name}",
      },
    });

    graphicsLayer.add(polygonGraphic);
  };

  const draw = (points: RealEstate[], polyline: Boundary) => {
    if (!graphicsLayer) return;

    graphicsLayer.removeAll();

    // Create graphics for each location
    polygons.forEach((location, index) => {
      // Create symbol
      const symbol = {
        type: "simple-fill",
        color: colors[index],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      };

      // Create polygon graphic
      const polygonGraphic = new Graphic({
        geometry: {
          type: "polygon",
          rings: location.polygon.rings,
        },
        symbol: symbol,
        attributes: {
          name: location.TenDVHC,
        },
        popupTemplate: {
          title: "{name}",
        },
      });

      graphicsLayer.add(polygonGraphic);
    });

    // Create graphics for each location
    points.forEach((location) => {
      // Determine symbol based on location type
      const houseSymbol: __esri.SymbolProperties = {
        type: "picture-marker",
        url: "data:image/png;base64,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",
        height: "20px",
        width: "20px",
      };

      // Create point graphic
      const pointGraphic = new Graphic({
        geometry: {
          type: "point",
          longitude: location.KinhDo,
          latitude: location.ViDo,
        },
        symbol: houseSymbol,
        attributes: {
          ...location,
          GiaThueTheoThang: new Intl.NumberFormat("vi-VN").format(
            location.GiaThueTheoThang
          ),
        },
        popupTemplate: {
          title: "Thông tin bất động sản",
          content: [
            {
              type: "text",
              text: "Loại bất động sản: {LoaiBDS}",
            },
            {
              type: "text",
              text: "Địa chỉ: {DiaChi}",
            },
            {
              type: "text",
              text: "Diện tích: {DienTich}m²",
            },
            {
              type: "text",
              text: "Mô tả: {MoTa}",
            },
            {
              type: "text",
              text: "Giá thuê theo tháng: {GiaThueTheoThang}vnd",
            },
            {
              type: "text",
              text: "Trạng thái: {TrangThai}",
            },
          ],
        },
      });

      graphicsLayer.add(pointGraphic);
    });

    // Create polyline
    // Create symbol
    const symbol = {
      type: "simple-line",
      color: [0, 0, 255],
      width: 2,
    };

    // Create polygon graphic
    const polygonGraphic = new Graphic({
      geometry: {
        type: "polyline",
        paths: polyline.polygon.rings,
      },
      symbol: symbol,
      attributes: {
        name: polyline.TenDVHC,
      },
      popupTemplate: {
        title: "Ranh giới {name}",
      },
    });

    graphicsLayer.add(polygonGraphic);
  };

  // Render graphics when locations change
  useEffect(() => {
    if (points.length > 0) {
      drawPoints(points);
    }
  }, [points, graphicsLayer]);

  // Fetch and draw boundary based on selection.MaDVHC
  useEffect(() => {
    if (selection && selection.MaDVHC) {
      fetchPolyline(selection.MaDVHC);
      fetchLocations(selection.MaDVHC);

      const newView = districts.find(
        (item) => item.MaDVHC === selection.MaDVHC
      );
      if (view && newView) {
        view.zoom = newView.zoom;
        const point = new Point({
          longitude: newView.lon,
          latitude: newView.lat,
        });
        view.center = point;
      }
    }
  }, [selection?.MaDVHC]);

  // Trigger drawing when component mounts
  useEffect(() => {
    if (polyline && points) {
      draw(points, polyline);
    }
  }, [graphicsLayer, points, polyline]);

  return (
    <div style={{ position: "relative", height: "500px", width: "100%" }}>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />

      {/* Hover Popup */}
      {hoveredPointPopup.point && (
        <div
          style={{
            position: "absolute",
            top: `${hoveredPointPopup.y}px`,
            left: `${hoveredPointPopup.x}px`,
            transform: "translate(-50%, -100%)",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            zIndex: 1000,
            maxWidth: "250px",
            fontSize: "12px",
            textAlign: "justify",
          }}
        >
          <h4 className="text-sm font-semibold">
            {hoveredPointPopup.point.LoaiBDS}
          </h4>
          <p className="my-2">Địa chỉ: {hoveredPointPopup.point.DiaChi}</p>
          <p className="my-2">
            Diện tích: {hoveredPointPopup.point.DienTich}m²
          </p>
          <p className="my-2">Mô tả: {hoveredPointPopup.point.MoTa}</p>
          <p className="mt-2">
            Giá thuê: {hoveredPointPopup.point.GiaThueTheoThang} VNĐ/tháng
          </p>
        </div>
      )}
    </div>
  );
};

export default MultiGeometryMap;
