import { useEffect, useState } from "react"
import H from "@here/maps-api-for-javascript"

const Circle = (props) => {
  const [color, setColor] = useState('#00BEEC')

  // red: #FF443F 250,68,63
  // green: #FF443F 5,200,36
  // blue: #00BEEC 0,190,236

  useEffect(() => {
    setColor(props.location.countyStatus == 'hotSpot' ? '#FF443F' : '#00BEEC')
  }, [props.location.countyStatus])

  useEffect(() => {
    const style = {
      fillColor: 'rgba(255, 255, 255, 0)',
      strokeColor: color, 
      lineDash: [3, 3],
      lineWidth: 3
    }

    const circle = new H.map.Circle(props.location.coords, props.radius, { style })
    props.map.addObject(circle)
    props.onBoundsChange(circle.getBoundingBox())

    return () => props.map.removeObject(circle)

  }, [props.location, color])

  return null
}

export default Circle