import { useState, useEffect } from 'react'

import SearchForm from './components/SearchForm'
import TravelModeSelect from './components/TravelModeSelect'
import Map from './components/Map'
import Marker from './components/Marker'
import Circle from './components/Circle'
import Isoline from './components/Isoline'

import CountyHelpers from './lib/countyHelpers.js'

const HERE_API_KEY = 'mPpQR16YV3tZ3YpokLwD4hFCEpwCKJWXe9Q-wv4EXIU'
const DEFAULT_COORDS = { lat: 51.354050638053394, lng: 10.688718943513482 } // Germany
const RANGE = 15 * 1000 // 15km

const coordsToHERECoords = (coords) => {
  return { lat: coords.latitude, lng: coords.longitude }
}

const App = (props) => {
  const [location, setLocation] = useState({ coords: DEFAULT_COORDS })
  const [getCounty, getCountyInfo] = CountyHelpers({ hereAPIKey: HERE_API_KEY })
  const [travelMode, setTravelMode] = useState('car')
  const [zoomBounds, setZoomBounds] = useState()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({ coords: coordsToHERECoords(position.coords) })
      })
    }
  }, [])

  useEffect(() => {
    if (location.coords && !location.county) {
      getCounty(location.coords).then((county) => {
        setLocation({ ...location, county })
      }).catch(console.error)
    }
    if (location.coords && location.county && !location.countyStatus) {
      getCountyInfo(location.county).then((countyInfo) => {
        if (countyInfo) setLocation({ ...location, ...countyInfo })
      })
    }
  }, [location])

  const coordsSet = () => !Object.is(location.coords, DEFAULT_COORDS)

  const handleSearchResult = ({ coords, county }) => {
    setLocation({ coords, county })
  }

  return (
    <div className="App">
      <Map center={location.coords}
        zoom={coordsSet() ? 12 : 8}
        zoomBounds={zoomBounds}
        onClick={() => { }}
        apiKey={HERE_API_KEY}
      >
        {coordsSet() && <Marker location={location} />}
        {coordsSet() && <Circle location={location}
          radius={RANGE}
          onBoundsChange={setZoomBounds} />}
        {coordsSet() && <Isoline location={location}
          range={RANGE}
          travelMode={travelMode} />}
        <SearchForm onResult={handleSearchResult} location={location} />
        <TravelModeSelect onChange={setTravelMode} />
      </Map>
    </div>
  )
}

export default App
