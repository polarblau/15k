import { useEffect } from "react"
import H from "@here/maps-api-for-javascript"

const Marker = (props) => {

  useEffect(() => {
    const marker = new H.map.Marker(props.coords)
    props.map.addObject(marker)

    return () => props.map.removeObject(marker)

  }, [props.coords])

  return null
}

export default Marker