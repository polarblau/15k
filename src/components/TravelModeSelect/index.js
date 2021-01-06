import { useState } from 'react'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import { Paper } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab/'

const TravelModeSelect = (props) => {
  const [travelMode, setTravelMode] = useState('car')

  const handleChange = (evt, value) => {
    setTravelMode(value)
    props.onChange(value)
  }

  return (
    <Paper elevation={3} className="travel-mode-select">
      <ToggleButtonGroup
        value={travelMode}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="car" >
          <DirectionsCarIcon />
        </ToggleButton>
        <ToggleButton value="pedestrian" >
          <DirectionsWalkIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  )
}

export default TravelModeSelect