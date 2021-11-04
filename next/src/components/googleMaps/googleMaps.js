
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
      currentBookmarks: [],
      recentlyPlayed: [],
    }
  },
  created() {
    console.log(`=== created ===`)
    this.currentBookmarks = [
      {
        name: "Singapore Basketball Court",
        vicinity: "134 Pasir Ris Street 21"

      },
      {
        name: "Basketball Court",
        vicinity: "Opp Unit 104"

      },
      {
        name: "Basketball Court",
        vicinity: "495 Tampines Street 43"

      },
      {
        name: "Basketball Court",
        vicinity: "604 Elias Rd, Block 604, Singapore"

      },
      {
        name: "Pasir Ris Block 230 Basketball Court",
        vicinity: "Blk, 230 Pasir Ris Street 11"

      },
      {
        name: "Basketball court @ Sun Plaza Park",
        vicinity: "407 Tampines Street 41, Singapore"

      },
    ]

    this.recentlyPlayed = [
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: ``,
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: ``,
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: ``,
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
      },
      
    ]
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
        zoom: 13,
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
            console.log(results[i])
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
                            <br><a href="/court"><strong>Click to View Court</strong></a>`
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
    },

    viewCourtDetails() {
      console.log(`=== view court details ===`)
    },
  }
  
}


