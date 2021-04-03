import { Feature, FeatureCollection, Geometry } from 'geojson';
import { Filter, PointObject, RoadType } from "./interfaces";
import queryString from "query-string"
import moment from 'moment';

export function convertToGeoJson(pointData: PointObject[] | undefined): FeatureCollection<Geometry, PointObject> {
  const features: Feature<Geometry, PointObject>[] = []

  pointData?.forEach(point => {
    features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.Point.lng, point.Point.lat]
      },
      properties: {
        ...point
      }
    })
  })

  const result: FeatureCollection<Geometry, PointObject> = {
    type: 'FeatureCollection',
    features
  }

  return result
}

export const getFilterToParams = (filter: Filter) => {
  const transformedFilter: {[key: string] : any} = {}
  if (!!filter.dateStart) {
    transformedFilter["DetectedAt__gte"] = filter.dateStart?.valueOf()
  }
  if (!!filter.dateEnd) {
    transformedFilter["DetectedAt__lte"] = filter.dateEnd?.valueOf()
  }
  if (!!filter.roadTypes.length) {
    transformedFilter["Roadtype"] = filter.roadTypes
  }
  return transformedFilter
}

export const filterToURLEcode = (filter: Filter) => {
  const filterToParams = getFilterToParams(filter)
  const params = "?"+queryString.stringify(filterToParams)
  return params
}

export const urlToFilter = () => {
  const s = window.location.search
  const result: Filter = {
    dateStart: null,
    dateEnd: null,
    roadTypes: []
  }
  const parsed = queryString.parse(s)

  if (parsed.Roadtype) {
    let roadTypes: RoadType[]
    if (typeof parsed.Roadtype === "string") {
      roadTypes = [parseInt(parsed.Roadtype)]
    } else {
      roadTypes = parsed.Roadtype.map(t => parseInt(t))
    }
    result.roadTypes = roadTypes
  }

  if (parsed["DetectedAt__gte"]) {
    result.dateStart = moment(parseInt(parsed["DetectedAt__gte"] as string))
    console.log(result.dateStart)
  }
  if (parsed["DetectedAt__lte"]) {
    result.dateEnd = moment(parseInt(parsed["DetectedAt__lte"] as string))
  }

  console.log({ result })

  return result
}