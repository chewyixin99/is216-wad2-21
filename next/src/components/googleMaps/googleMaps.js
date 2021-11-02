
/* eslint-disable no-undef */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useGeolocation } from './useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'
import axios from 'axios'

const GOOGLE_MAPS_API_KEY = 'AIzaSyB0y4bi5X2uc_EZGF8yE-GIc_09jd9rwRg'

export default {
  name: 'app',
  setup() {
    const { coords } = useGeolocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))
    const otherPos = ref(null)

    const loader = new Loader({apiKey: GOOGLE_MAPS_API_KEY})
    const mapDiv = ref(null)
    let map = ref(null)
    let clickListener = null

    onMounted( async () => {
      await loader.load()
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 15,
      })

      // the following code below is the currPos latlng
      // console.log(currPos.value)

      var currPosMarker = new google.maps.Marker ({
        position: currPos.value,
        map: map.value,
        icon: ''
      })

      map.value.addListener(
        'click',
        ({ latLng: { lat, lng }}) => {  
          otherPos.value = { lat: lat(), lng: lng() }
          currPosMarker.setMap(null)
        }
      )
    })
    onUnmounted( async () => {
      if (clickListener) clickListener.remove()
    })

    return { currPos, otherPos, mapDiv }
  },
  
  methods: {
    findNearbyCourts(lat, lng) {
      let baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`
      let location = `${lat}%2c${lng}`
      let radius = `1500`
      let keyword = `basketball courts`
      let API_KEY = `AIzaSyB0y4bi5X2uc_EZGF8yE-GIc_09jd9rwRg`
    
      let final_url = `${baseUrl}location=${location}&radius=${radius}&keyword=${keyword}&key=${API_KEY}/`
    
      axios.post(final_url).then(r => {
        console.log(r.data)
      })
    
    }
  }
}


