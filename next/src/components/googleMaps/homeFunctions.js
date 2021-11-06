
/* eslint-disable no-undef */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useGeolocation } from './useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = 'AIzaSyB0y4bi5X2uc_EZGF8yE-GIc_09jd9rwRg'

var markersArray = []
var markersDetails = []

export default {
  name: 'app',
  data() {
    return {
      defaultPos: '',
      nearbyCourts: [],
      currentBookmarks: [],
      recentlyPlayed: [],
      searchInput: ``,
      map: ``,

    }
  },
  // ################################################################################################################ CREATED ################################################################################################################
  created() {
    console.log(`=== created ===`)
    this.currentBookmarks = [
      {
        name: "Singapore Basketball Court",
        vicinity: "134 Pasir Ris Street 21",
        location: ``,
        id: 1,
      },
      {
        name: "Basketball Court",
        vicinity: "Opp Unit 104",
        location: ``,
        id: 2,
      },
      {
        name: "Basketball Court",
        vicinity: "495 Tampines Street 43",
        location: ``,
        id: 3,
      },
      {
        name: "Basketball Court",
        vicinity: "604 Elias Rd, Block 604, Singapore",
        location: ``,
        id: 4,
      },
      {
        name: "Pasir Ris Block 230 Basketball Court",
        vicinity: "Blk, 230 Pasir Ris Street 11",
        location: ``,
        id: 5,
      },
      {
        name: "Basketball court @ Sun Plaza Park",
        vicinity: "407 Tampines Street 41, Singapore",
        location: ``,
        id: 6,
      },
    ]

    this.recentlyPlayed = [
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
        email: 'chewyixin1999@gmail.com1',
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: ``,
        email: 'chewyixin1999@gmail.com2',
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: ``,
        email: 'chewyixin1999@gmail.com3',
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
        email: 'chewyixin1999@gmail.com4',
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
        email: 'chewyixin1999@gmail.com5',
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: ``,
        email: 'chewyixin1999@gmail.com6',
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
        email: 'chewyixin1999@gmail.com7',
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: ``,
        email: 'chewyixin1999@gmail.com8',
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: `https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg`,
        email: 'chewyixin1999@gmail.com9',
      },
      {
        firstName: "Chew",
        lastName: "Yi Xin",
        profilePicture: ``,
        email: 'chewyixin1999@gmail.com10',
      },
      
    ]
    const { coords } = useGeolocation()
    this.defaultPos = coords.value
  },
  // ################################################################################################################ SETUP ################################################################################################################
  setup() {
    console.log(`=== setup ===`)
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
  
  // ################################################################################################################ METHODS START ################################################################################################################
  methods: {
    // function for 'courtsNearMe' button ########################################################
    findNearbyCourts(lat, lng) {
      // Async Places API imported @index.html
      
      // Create latlong coordinate object
      var currPosLatLng = new google.maps.LatLng(lat,lng);
      console.log(currPosLatLng)
      // Pass latlong object and zoom to create map
      var map = new google.maps.Map(this.$refs.mapDiv, {
        center: currPosLatLng,
        zoom: 14,
      });
      this.map = map

      // Prepare request for area around current latlong object w/ radius and keywords
      var request = {
        location: currPosLatLng,
        radius: '1500',
        keyword: ['basketball courts']
      };
      // Places API service object to retrieve nearby spots
      var service = new google.maps.places.PlacesService(map);
      // Search nearby spots using service and taking in request, uses callback to push markers to map
      service.nearbySearch(request, this.placesCallback);
    },

    // function for searchBar ########################################################
    searchForNearbyCourts() {
      console.log(`=== court search ===`)

      var geocoder = new google.maps.Geocoder()
      var map = new google.maps.Map(this.$refs.mapDiv, {
        center: new google.maps.LatLng(this.defaultPos.latitude, this.defaultPos.longitude),
        zoom: 14,
      })
      const placesCallback = this.placesCallback
      this.map = map
      geocoder.geocode(
        {
          address: this.searchInput
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location)

            var request = {
              location: results[0].geometry.location,
              radius: '1500',
              keyword: ['basketball courts']
            };
            // Places API service object to retrieve nearby spots
            var service = new google.maps.places.PlacesService(map);
            // Search nearby spots using service and taking in request, uses callback to push markers to map
            service.nearbySearch(request, placesCallback);
          } else {
            alert('Location not found, please enter another location.')
            console.log(status)
          }
        }
      )
    },

    // placesCallback function ########################################################
    placesCallback(results, status) {
      if (status == 'ZERO_RESULTS') {
        alert('There are no basketball courts neraby.')
      }
      else if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          this.createMarker(results[i])
        }
      }
    },

    // createMarker function ########################################################
    createMarker(place) {
      if (!place.geometry || !place.geometry.location) return;

      const map = this.map
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      })
    
      let contentString = `<p>${place.vicinity} ${place.name}<p>
                          <br/>
                          <p>Business Status: ${place.business_status}</p>
                          <br>
                          <a href="/court" >
                            <strong>Click to View Court</strong>
                          </a>
                          `
      const infoWindow = new google.maps.InfoWindow({
        content: contentString
      })

      marker.addListener('click', () => {
        const index = markersArray.indexOf(marker)
        const court = markersDetails[index]

        console.log(`before update (below):`)
        console.log(this.$store.state.selectedCourt)
        this.updateSelectedCourt(court)
        console.log(`check if store is updated (below):`)
        console.log(this.$store.state.selectedCourt)

        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: true,
        })
      })

      markersArray.push(marker)
      markersDetails.push({
        name: place.name,
        vicinity: place.vicinity,
        location: place.geometry.location,
        id: place.place_id,
      })
    },

    updateSelectedProfile(profile) {
      this.$store.commit('updateSelectedProfile', profile)
    },

    updateSelectedCourt(court) {
      this.$store.commit('updateSelectedCourt', court)
    }

  }
}


