
/* eslint-disable no-undef */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useGeolocation } from './useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = 'AIzaSyB0y4bi5X2uc_EZGF8yE-GIc_09jd9rwRg'

export default {
  name: 'app',
  data() {
    return {
      nearbyCourts: [],
    }
  },
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

      map.value.addListener(
        'click',
        ({ latLng: { lat, lng }}) => {  
          otherPos.value = { lat: lat(), lng: lng() }
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
      let nearbyCourtsObject = []
      // Async Places API imported @index.html
      
      // Create latlong coordinate object
      var currPostLatLng = new google.maps.LatLng(lat,lng);
      
      // Pass latlong object and zoom to create map
      var map = new google.maps.Map(this.$refs.mapDiv, {
        center: currPostLatLng,
        zoom: 14,
      });

      // Prepare request for area around current latlong object w/ radius and keywords
      var request = {
        location: currPostLatLng,
        radius: '1500',
        keyword: ['basketball courts']
      };
      
      // Places API service object to retrieve nearby spots
      var service = new google.maps.places.PlacesService(map);

      // Search nearby spots using service and taking in request, uses callback to push markers to map
      service.nearbySearch(request, placesCallback);

      // Callback functions
      function placesCallback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i])
          }
        }
      }
  
      function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;
      
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
        })

        

        let contentString = `<p>${place.vicinity} ${place.name}<p>
                            <br/><p>Business Status: ${place.business_status}</p>
                            <br><button v-on:click="viewCourtDetails()">View Court</button>`
        const infoWindow = new google.maps.InfoWindow({
          content: contentString
        })

        marker.addListener('click', () => {
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
          })
        })
        nearbyCourtsObject.push(place)
      }

      console.log(`this.nearbyCourts`)
      console.log(this.nearbyCourts)
      console.log(`nearbyCourtsObject`)
      console.log(nearbyCourtsObject)

      this.nearbyCourts = nearbyCourtsObject
    },

    viewCourtDetails() {
      console.log(`=== view court details ===`)
    },
  }
  
}


