import React, {useEffect, useRef, useMemo, useState} from 'react';
import mapboxgl, { Expression, GeoJSONSource } from "mapbox-gl";
import { convertToGeoJson } from '../utils';
import { PointObject } from '../interfaces';

type Props = {
  loading: boolean
  data: PointObject[] | undefined
}

const MapView: React.FC<Props> = ({
  loading,
  data
}) => {
  const [currentMap, setCurrentMap] = useState<mapboxgl.Map>()
  const geoData = useMemo(() => convertToGeoJson(data), [data])
  const mapContainer = useRef<HTMLDivElement>(null);
  mapboxgl.accessToken = 'pk.eyJ1IjoiazRsayIsImEiOiJjaXcza2N0NGQwMDBsMnltbzBxdmJtbGg3In0.VXQxTuebIXo-YVKA1rULbA';
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/light-v10',
      zoom: 8,
      center: [12.305519, 55.627262]
    })

    map.on('load', function() {
      console.log({ data })
      map.addSource('pluto', {
        type: 'geojson',
        // data: '/test.geojson'
        data: geoData
      });

      const defaultColor = "rgb(53, 175, 109)"
      const linearRadiusScale: mapboxgl.Expression = [
          "interpolate", ["linear"], ["zoom"],
          10, 2,
          13, 3,
          17, 6
      ]
      map.addLayer({
        "id": "captures",
        "source": "pluto",
        "type": "circle",
        "paint": {
          "circle-radius": linearRadiusScale,
          "circle-color": [
            "case",
            ["in", "|1|", ["get", "ClassName"]], "#FF443B", // Hole
            ["in", "|11|", ["get", "ClassName"]], "#FF443B", // Hole

            ["in", "|2|", ["get", "ClassName"]], "#FF9A4A", // Crack
            ["in", "|5|", ["get", "ClassName"]], "#FF9A4A", // Crack
            ["in", "|7|", ["get", "ClassName"]], "#FF9A4A", // Crack
            ["in", "|10|", ["get", "ClassName"]], "#FF9A4A", // Crack
            ["in", "|9|", ["get", "ClassName"]], "#FF9A4A", // Crocodile crack

            ["in", "|3|", ["get", "ClassName"]], "#00FF01", // Depression

            ["in", "|4|", ["get", "ClassName"]], "#FFD23D", // Lane marking
            ["in", "|8|", ["get", "ClassName"]], "#FFD23D", // Lane marking
            ["in", "|0|", ["get", "ClassName"]], "#FFD23D", // Number plate
            ["in", "|6|", ["get", "ClassName"]], "#FFD23D", // Face
            defaultColor
          ]
        }
      })
      setCurrentMap(map)
    })
    return () => map.remove();
  }, [])

  useEffect(() => {
    if (!!currentMap) {
      const source = currentMap?.getSource("pluto") as GeoJSONSource
      source?.setData(geoData)
    }
  }, [data, currentMap])

  return (
    <div ref={mapContainer} style={{width: '100%', height: '100%', position: 'absolute'}} />
  )
};

export default MapView;
