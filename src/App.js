import { useEffect, useState } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceXYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { CiRuler } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaDrawPolygon } from "react-icons/fa";

import "./App.css";
import "ol/ol.css";

import {
  MapComponent,
  MeasureButton,
  ToggleGroup,
  DrawButton,
  MapContext,
} from "@terrestris/react-geo";

function App() {
  const [map, setMap] = useState();
  useEffect(() => {
    setMap(
      new OlMap({
        layers: [
          new OlLayerTile({
            name: "MapTiler",
            source: new OlSourceXYZ({
              url: "https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=vhvABZw0QyuxnCQnSck2",
            }),
          }),
        ],
        view: new OlView({
          center: fromLonLat([78.0, 23.0]),
          zoom: 4,
        }),
      })
    );
  }, []);
  if (!map) {
    return null;
  }
  return (
    <div className="App">
      <MapContext.Provider value={map}>
        <h3 className="banner">Ottermap Assignment using openlayers</h3>
        <ToggleGroup className="group">
          <DrawButton name="drawPoint" drawType="Point" icon={<CiLocationOn />}>
            Add point on Map
          </DrawButton>
          <MeasureButton
            key="measureLine"
            name="line"
            map={map}
            icon={<CiRuler />}
            measureType="line"
          >
            Measure Distance (line)
          </MeasureButton>
          <MeasureButton
            key="measurePoly"
            name="poly"
            map={map}
            icon={<FaDrawPolygon />}
            measureType="polygon"
          >
            Measure Distance Area (polygon)
          </MeasureButton>
        </ToggleGroup>
        <MapComponent map={map} className="map" />
      </MapContext.Provider>
      <footer className="footer">Made by Yash</footer>
    </div>
  );
}

export default App;
