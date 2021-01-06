import { useState, useEffect } from 'react'

import SearchForm from './components/SearchForm'
import TravelModeSelect from './components/TravelModeSelect'
import Map from './components/Map'
import Marker from './components/Marker'
import Circle from './components/Circle'
import Isoline from './components/Isoline'
import CountyInfo from './components/CountyInfo'


const DEFAULT_COORDS = { lat: 51.354050638053394, lng: 10.688718943513482 } // Germany
const RANGE = 15 * 1000 // 15km

const coordsToHERECoords = (coords) => {
  return { lat: coords.latitude, lng: coords.longitude }
}

const App = (props) => {
  const [coords, setCoords] = useState(DEFAULT_COORDS)
  const [county, setCounty] = useState(null)
  // const [location, setLocation] = useState({ 
  //   coords: null, incidenceValue: null, county: null, countyStatus: null 
  // })
  const [travelMode, setTravelMode] = useState('car')
  const [zoomBounds, setZoomBounds] = useState()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        setCoords(coordsToHERECoords(position.coords))
      }, () => {})
    }
  }, [])

  const coordsSet = () => !Object.is(coords, DEFAULT_COORDS)

  const handleSearchResult = ({ coords, county }) => {
    setCoords(coords)
    setCounty(county)
  }

  return (
    <div className="App">
      <Map center={coords} 
           zoom={coordsSet() ? 12 : 8} 
           zoomBounds={zoomBounds} 
           onClick={() => {}}
           >
        { coordsSet() && <Marker coords={coords} /> }
        { coordsSet() && <Circle coords={coords} 
                                 radius={RANGE} 
                                 onBoundsChange={setZoomBounds} /> }
        { coordsSet() && <Isoline coords={coords} 
                                  range={RANGE} 
                                  travelMode={travelMode} /> }
        <SearchForm onResult={handleSearchResult} />
        <TravelModeSelect onChange={setTravelMode} />
      </Map>
      <CountyInfo county={county} onResult={() => {}} />
    </div>
  )
}

export default App
