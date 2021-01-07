import { useEffect, useState } from "react"
import H from "@here/maps-api-for-javascript"

const objToParams = (obj) => {
  let str = "";
  for (let key in obj) {
    if (str != "") str += "&";
    str += key + "=" + encodeURIComponent(obj[key])
  }
  return str
}

const Isoline = (props) => {
  const [polyline, setPolyline] = useState(null)

  const style = {
    lineWidth: 0
  }

  useEffect(() => {
    const router = props.platform.getRoutingService(null, 8)
    const params = {
      start: `geo!${props.location.coords.lat},${props.location.coords.lng}`,
      range: props.range,
      rangetype: props.rangeType || 'distance',
      mode: `shortest;${props.travelMode}`
    }

    const apiPath = "https://isoline.route.ls.hereapi.com/routing/7.2/calculateisoline.json?"
    fetch(apiPath + objToParams({ ...params, apikey: props.platform.a}))
      .then(response => response.json())
      .then(({ response }) => {
        const latLngArray = response.isoline[0].component[0].shape
          .map(e => e.split(',')).flat().map((e => +e))
        setPolyline(H.geo.LineString.fromLatLngArray(latLngArray))
      })


  }, [props.location.coords, props.range, props.travelMode])

  useEffect(() => {
    if (!polyline) return
    const polygon = new H.map.Polygon(polyline, props.radius, { style })
    props.map.addObject(polygon)

    return () => props.map.removeObject(polygon)
  }, [polyline])

  return null
}

export default Isoline