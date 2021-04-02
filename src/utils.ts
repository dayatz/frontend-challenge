import { Feature, FeatureCollection, Geometry } from 'geojson';
import { Filter, PointObject } from "./interfaces";
import queryString from "query-string"

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
  const transformedFilter: {[key: string] : any} = {...filter}
  if (!!filter.dateStart) {
    transformedFilter["DetectedAt__gte"] = filter.dateStart?.valueOf()
    delete transformedFilter.dateStart
  }
  if (!!filter.dateEnd) {
    transformedFilter["DetectedAt__lte"] = filter.dateEnd?.valueOf()
    delete transformedFilter.dateEnd
  }
  return transformedFilter
}

export const filterToURLEcode = (filter: Filter) => {
  const filterToParams = getFilterToParams(filter)
  console.log({ filterToParams })
  const params = "?"+queryString.stringify(filterToParams)
  return params
}