import { useState, useEffect } from 'react'
import { Paper, TextField, IconButton } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'

const SearchForm = (props) => {
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)
  const [info, setInfo] = useState(null)
  const [address, setAddress] = useState('')

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
        const { county, postalCode } = result.address
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

  useEffect(() => {
    setWarning(null)
    setInfo(null)
    if (props.location.countyStatus == 'hotSpot') {
      setWarning(`
        The county of "${props.location.county}" has been declared a 
        COVID-19 hot spot due to a 7 day incident value of 
        ${Math.round(props.location.incidenceValue)} per 100.000 
        inhabitants. You may not travel further than 15km from your home 
        at this moment. (Last updated: ${props.location.updatedAt})
      `)
    } else if (props.location.incidenceValue) {
      setInfo(`
        The county of "${props.location.county}" has a 7 day incident value of 
        ${Math.round(props.location.incidenceValue)} per 100.000 inhabitants
        ${props.location.countyStatus == 'riskArea' ? ' and is considered a high risk area.' : '.'} 
        (Last updated: ${props.location.updatedAt})
      `)
    }
  }, [props.location])

  return (
    <Paper elevation={3} className="form">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Search for address"
          variant="outlined"
          value={address}
          onChange={handleAddressInput}
          onBlur={handleSubmit}
          error={!!error}
        />
      </form>
      { warning && <Alert severity="warning" 
                          className="addendum"
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => setWarning(null)}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }
                        >
                          {warning}
                        </Alert>}
      { (error && !info) && <Alert severity="error"
                                   className="addendum"
                                   action={
                                     <IconButton
                                       aria-label="close"
                                       color="inherit"
                                       size="small"
                                       onClick={() => setError(null)}
                                     >
                                       <CloseIcon fontSize="inherit" />
                                     </IconButton>
                                   }
                                 >
                                   {error}
                                 </Alert>}
      { (info && !warning) && <Alert severity="info"
                                     className="addendum"
                                     action={
                                       <IconButton
                                         aria-label="close"
                                         color="inherit"
                                         size="small"
                                         onClick={() => setInfo(null)}
                                       >
                                         <CloseIcon fontSize="inherit" />
                                       </IconButton>
                                     }
                                   >
                                     {info}
                                   </Alert>}
    </Paper>
  )
}

export default SearchForm