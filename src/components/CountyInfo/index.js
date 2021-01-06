import { useEffect, useState } from 'react'

const ENDPOINT = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=GEN,cases_per_population,county,last_update,cases7_per_100k,cases_per_100k&returnGeometry=false&outSR=4326&f=json'



const prepData = ({ features }) => {
  const calcStatus = (count) => {
    if (count > 200) return 'hotSpot'
    if (count > 50) return 'riskArea'
    return 'ok'
  }

  const entries = features.map(({ attributes }) => {
    return [attributes.GEN, { 
      name: attributes.GEN,
      count: attributes.cases7_per_100k, 
      status: calcStatus(attributes.cases7_per_100k),
      updatedAt: attributes.last_update
    }]
  })

  return Object.fromEntries(entries)
}

const CountyInfo = (props) => {
  const [data, setData] = useState(null)
  const [countyInfo, setCountyInfo] = useState(null)

  useEffect(() => {
    fetch(ENDPOINT)
      .then(response => response.json())
      .then((rawData) => {
        setData(prepData(rawData))
      })
  }, [])

  useEffect(() => {
    if (data && data[props.county]) setCountyInfo(data[props.county])
  }, [props.county])

  return (
    <>
      { countyInfo && <div>{countyInfo.name}: {countyInfo.status} ({countyInfo.count})</div>}
    </>
  )

}

export default CountyInfo