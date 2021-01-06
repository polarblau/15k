import { useState, useEffect } from 'react'

import Alert from '@material-ui/lab/Alert'

import SearchForm from './components/SearchForm'
import TravelModeSelect from './components/TravelModeSelect'
import Map from './components/Map'
import Marker from './components/Marker'
import Circle from './components/Circle'
import Isoline from './components/Isoline'


const DEFAULT_COORDS = { lat: 51.354050638053394, lng: 10.688718943513482 } // Germany
const RANGE = 15 * 1000 // 15km

const coordsToHERECoords = (coords) => {
  return { lat: coords.latitude, lng: coords.longitude }
}

const App = (props) => {
  const [coords, setCoords] = useState(DEFAULT_COORDS)
  const [county, setCounty] = useState(null)
  const [travelMode, setTravelMode] = useState('car')
  const [zoomBounds, setZoomBounds] = useState()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported.')
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(coordsToHERECoords(position.coords))
      }, () => setError('Geolocation is not available.'))
    }
  }, [])

  const coordsSet = () => !Object.is(coords, DEFAULT_COORDS)

  return (
    <div className="App">
      <Map center={coords} 
           zoom={coordsSet() ? 12 : 8} 
           zoomBounds={zoomBounds} 
          //  onClick={setCoords} 
           >
        { coordsSet() && <Marker coords={coords} /> }
        { coordsSet() && <Circle coords={coords} radius={RANGE} 
                                 onBoundsChange={setZoomBounds} /> }
        { coordsSet() && <Isoline coords={coords} range={RANGE} travelMode={travelMode} /> }
        <SearchForm onResult={({ coords, county }) => setCoords(coords) && setCounty(county)} />
        <TravelModeSelect onChange={setTravelMode} />
      </Map>
      { error && 
        <Alert onClose={() => setError(null)} 
               className="error-msg" 
               severity="error">
                {error.message}
        </Alert> 
      }
    </div>
  )
}

export default App
