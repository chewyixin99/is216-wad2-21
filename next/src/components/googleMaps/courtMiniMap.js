// Map Imports
/* eslint-disable no-undef */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = '<YOUR_API_KEY_HERE>'

export default {
    name: "CourtMiniMap",
    props: ['courtObj'],

    setup(props) {

        console.log(`props below, from courtMiniMap.js`)
        console.log(props.courtObj)
        
        const currPos = computed(() => ({
          lat: props.courtObj.location.lat,
          lng: props.courtObj.location.lng,
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

          let contentString = `<p>${props.courtObj.name} <br/><br/> ${props.courtObj.vicinity}<p>`

          const infoWindow = new google.maps.InfoWindow({
            content: contentString
          })  
    
          const marker = new google.maps.Marker({
            position: currPos.value,
            map: map.value,
            icon: '',
          })
    
          marker.addListener('click', () => {
            infoWindow.open({
              anchor: marker,
              map,
              shouldFocus: true,
            })
          })


        })
        onUnmounted( async () => {
          if (clickListener) clickListener.remove()
        })
    
        return { currPos, otherPos, mapDiv }
    },

}