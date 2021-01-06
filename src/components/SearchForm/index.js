import { useState, useEffect } from 'react'
import { Paper, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

// import H from "@here/maps-api-for-javascript"



const SearchForm = (props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [address, setAddress] = useState('')
  // props.onError
  // props.onGeoCode
  // props.coords ?
  // props.address

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const service = props.platform.getSearchService()
    service.geocode({ q: address }, 
      (data) => {
        
        const result = data.items[0]
        if (!result) {
          setError('Nothing found for this input.')
          return
        }
        const coords = result.position
        const address = result.title
        const {county, postalCode} = result.address
        props.onResult({ coords, county, postalCode })
        setAddress(address)
      }, 
      (...args) => {
        console.error('GEOCODING ERROR!', args)
        setError('Something went wrong. Please try again.')
      }
    )
  }

  const handleAddressInput = (evt) => {
    setError(false)
    setAddress(evt.target.value)
  }

  return (
    <Paper elevation={3} className="form">
      <form onSubmit={handleSubmit}>
        <TextField 
          fullWidth 
          label="Search for address" 
          variant="outlined" 
          value={address}
          onChange={handleAddressInput}
          error={!!error}
        />
      </form>
      { error && <Alert severity="error">{error}</Alert> }
    </Paper>
  )
}

export default SearchForm