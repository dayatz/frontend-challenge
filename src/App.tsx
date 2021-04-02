import { useState, useEffect } from "react"

import './App.css';
import MapView from './views/map';
import SideBar from './views/SideBar';
import { useFetch } from "use-http"
import { Filter, RoadType } from "./interfaces"
import { filterToURLEcode } from "./utils";

function App() {
  const {
    data, loading, error, get, response
  } = useFetch("http://localhost:9009/points")

  const [filter, setFilter] = useState<Filter>({
    dateStart: null,
    dateEnd: null,
    roadTypes: [RoadType.City, RoadType.Rural, RoadType.Residential, RoadType.Bikepath]
  })

  useEffect(() => {
    const params: string = filterToURLEcode(filter)
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