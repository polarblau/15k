import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
import H from "@here/maps-api-for-javascript"

const Map = (props) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [platform, setPlatform] = useState(null)

  useLayoutEffect(() => {
    if (!mapRef.current) return;

    const hPlatform = new H.service.Platform({
      'apikey': props.apiKey
    })

    setPlatform(hPlatform)

    const defaultLayers = hPlatform.createDefaultLayers()

    const hMap = new H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        pixelRatio: window.devicePixelRatio,
        center: props.center,
        zoom: props.zoom
      }
    )

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap))
    // const ui = H.ui.UI.createDefault(hMap, defaultLayers, 'de-DE')

    setMap(hMap)

    return () => hMap.dispose()
  }, [mapRef])

  useEffect(() => {
    if (!map) return

    const onResize = (evt) => {
      map.getViewPort().resize()
    }

    const onTap = (evt) => {
      const coords = map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      )
      props.onClick(coords)
    }

    window.addEventListener('resize', onResize)
    map.addEventListener('tap', onTap)

    return () => {
      window.removeEventListener('resize', onResize)
      map.removeEventListener('tap', onTap)
    }
  }, [map])

  useEffect(() => {
    if (!map) return
    map.setCenter(props.center)
    if (props.zoomBounds) {
      map.getViewModel().setLookAtData({ bounds: props.zoomBounds })
    } else {
      map.setZoom(props.zoom)
    }
  }, [props.center, props.zoom, props.zoomBounds])


  const renderChildren = () => {
    const { children } = props
    if (!children) return

    return React.Children.map(children, c => {
      if (!c) return
      return React.cloneElement(c, { map, platform })
    })
  }

  return (
    <>
      <div className="map" ref={mapRef} />
      { map ? renderChildren() : "Loading…"}
    </>
  )

}

export default Map