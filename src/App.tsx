import { useState, useEffect } from "react"

import './App.css';
import MapView from './views/map';
import SideBar from './views/SideBar';
import { useFetch } from "use-http"
import { Filter, RoadType } from "./interfaces"
import { filterToURLEcode, urlToFilter } from "./utils";
import { Spin } from "antd"

function App() {
  const initialFilter = urlToFilter()
  const {
    data, loading, error, get, response
  } = useFetch("http://localhost:9009/points")

  const [filter, setFilter] = useState<Filter>({
    dateStart: initialFilter.dateStart,
    dateEnd: initialFilter.dateEnd,
    roadTypes: !!initialFilter.roadTypes.length
      ? initialFilter.roadTypes
      : [RoadType.City, RoadType.Rural, RoadType.Residential, RoadType.Bikepath]
  })

  useEffect(() => {
    const params: string = filterToURLEcode(filter)
    window.history.replaceState({}, "", window.location.pathname + params)
    get(params)
  }, [filter, get])

  return (
    <div className="App">
      <SideBar filter={filter} setFilter={setFilter} data={data} isLoading={loading} />
      <MapView loading={loading} data={data} />
    </div>
  );
}

export default App;