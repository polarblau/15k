import H from "@here/maps-api-for-javascript"

const COUNTY_INFO_ENDPOINT = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=GEN,cases_per_population,county,last_update,cases7_per_100k,cases_per_100k&returnGeometry=false&outSR=4326&f=json'

const prepCountyData = ({ features }) => {
  const calcStatus = (count) => {
    if (count > 200) return 'hotSpot'
    if (count > 50) return 'riskArea'
    return 'ok'
  }

  const entries = features.map(({ attributes }) => {
    return [attributes.GEN, {
      county: attributes.GEN,
      incidenceValue: attributes.cases7_per_100k,
      countyStatus: calcStatus(attributes.cases7_per_100k),
      updatedAt: attributes.last_update
    }]
  })

  return Object.fromEntries(entries)
}

const CountyHelper = (options) => {
  if (!options.hereAPIKey) throw 'HERE API Key required.'

  const getCounty = (coords) => {
    const platform = new H.service.Platform({ apiKey: options.hereAPIKey })
    const service = platform.getSearchService()

    return new Promise((resolve, reject) => {
      service.reverseGeocode({
        at: [coords.lat, coords.lng, 0].join(',')
      }, (result) => { 
        resolve(result.items[0].address.county)
      }, reject)
    })
  }

  const getCountyInfo = (county) => {
    return fetch(COUNTY_INFO_ENDPOINT)
      .then(response => response.json())
      .then((data) => {
        const countyData = prepCountyData(data)
        let info = countyData[county]
        return info
      })
  }

  return [getCounty, getCountyInfo]
}

export default CountyHelper