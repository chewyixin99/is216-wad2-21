import { onUnmounted, onMounted, ref } from "vue";

export function useGeolocation() {

    const coords = ref({latitude: 1.353, longitude: 103.867})
    const isSupported = 'navigator' in window && 'geolocation' in navigator
    
    let watcher = null
    onMounted( ()  => {
        if (isSupported) {
            watcher = navigator.geolocation.watchPosition(
                position => {
                    coords.value = position.coords
                }
            )
        }
    })

    onUnmounted(() => {
        if (watcher) 
            navigator.geolocation.clearWatch(watcher)
    })


    return { coords, isSupported }

}

export function findNearbyCourts(lat, lng) {
    let baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`
    let location = `${lat}%2c${lng}`
    let radius = `1500`
    let keyword = `basketball courts`
    let API_KEY = `AIzaSyB0y4bi5X2uc_EZGF8yE-GIc_09jd9rwRg`

    let final_url = `${baseUrl}location=${location}&radius=${radius}&keyword=${keyword}&key=${API_KEY}`

    console.log(final_url)
    // axios.get(final_url).then(r => {
    //     console.log(r.data)
    // }).catch(e => {
    //     console.log(e.memssage)
    // })

}