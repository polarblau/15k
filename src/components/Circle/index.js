import { useEffect } from "react"
import H from "@here/maps-api-for-javascript"

const Circle = (props) => {

  const style = {
    fillColor: 'rgba(255, 255, 255, 0)',
    lineDash: [3, 3],
    lineWidth: 3
  }

  useEffect(() => {
    const circle = new H.map.Circle(props.coords, props.radius, { style })
    props.map.addObject(circle)
    props.onBoundsChange(circle.getBoundingBox())

    return () => props.map.removeObject(circle)

  }, [props.coords, props.radius])

  return null
}

export default Circle