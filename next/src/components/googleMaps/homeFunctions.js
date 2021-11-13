
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
      defaultPos: ``,
      searchInput: ``,
      map: ``,
    }
  },
  // ################################################################################################################ CREATED ################################################################################################################
  created() {
    console.log(`=== created ===`)
    this.$store.dispatch('getBookmarks')
    this.$store.dispatch('getRecentlyPlayed')
    const { coords } = useGeolocation()
    this.defaultPos = coords.value
  },

  computed: {
    getBookmarks() {
      return this.$store.state.profileBookmarks
    },
    showBookmarks() {
      return this.$store.state.profileBookmarks.length > 0
    },
    getRecentlyPlayed() {
      console.log(`getRecentlyPlayed from home below ====`)
      console.log(this.$store.state.recentlyPlayed)
      return this.$store.state.recentlyPlayed
    },
    showRecentlyPlayed() {
      return this.$store.state.recentlyPlayed.length > 0
    }

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
    showProfileImg(p) {
      const type = typeof p.profileImg
      if (type ==  'undefined' || type == 'null' || p.profileImg == '') {
        return false
      }
      return true
    },
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
        radius: `1500`,
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
              radius: `1500`,
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
      const court = {
        name: place.name,
        vicinity: place.vicinity,
        location: place.geometry.location,
        id: place.place_id,
      }
    
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
        const specificCourt = markersDetails[index]

        this.getCourt(specificCourt)

        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: true,
        })
      })

      markersArray.push(marker)
      markersDetails.push(court)
    },

    updateSelectedProfile(profile) {
      this.$store.commit('updateSelectedProfile', profile)
      this.$store.dispatch('populatePublicUserGroupDetails', profile.groupID)
    },

    updateSelectedCourt(court) {
      this.$store.commit('updateSelectedCourt', court)
    },


    getCourt(court) {
      this.$store.dispatch('getCourt', court)
    }

  }
}


