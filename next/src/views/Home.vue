<script src="../components/googleMaps/homeFunctions">
</script>

<template>

<div class="container max-w-5xl mx-auto">

  <div class="mx-6">

    <!-- Search  -->
    <div class="mt-6" > 

      <form class="w-full md:w-10/12 flex space-x-2 mx-auto" action="">
        <input type="text" class=" search-bar shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="court-search" placeholder="Search for a location, i.e., Serangoon Nex, Pasir Ris block 134  " v-model="searchInput">

        <button v-on:click="searchForNearbyCourts()" class="search-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          SEARCH
        </button>
      </form>

    </div>

    <!-- <div>
      {{ $store.state.user }}
    </div> -->

    <div class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">

      <!-- Bookmarks -->
      <div class="col-span-1">

        <div class="primary-title">
          Bookmarks
        </div>

        <div v-if="currentBookmarks.length < 1" >
          <span class="secondary-title">You currently have no bookmarks!</span><br/>
          <button 
          class="search-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold my-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          v-on:click="findNearbyCourts(currPos.lat, currPos.lng)"
          > Find A Court Near Me
          </button>
        </div>

        <div v-else class="bookmarks bg-gray-800 text-white rounded-md py-2 px-4">

          <ul v-for="b in currentBookmarks" :key="b">
            <li>
              <a href="/court" v-on:click="updateSelectedCourt(b)">
                <div class="venue-name">
                    {{ b.name }}
                </div>
                <div class="venue-address">
                  {{ b.vicinity }}
                </div>
              </a>
            </li>
          </ul>
        </div>

      </div>


      <!-- Near You -->
      <div class="col-span-1 row-span-1 md:row-span-2" >

        <div class="flex justify-between">
          <div class="primary-title">
            Near You
          </div>
          <button 
          class="search-button bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold my-3 px-2 rounded focus:outline-none focus:shadow-outline" 
          v-on:click="findNearbyCourts(currPos.lat, currPos.lng)">
            REFRESH
          </button>
        </div>

        <div id="mapDiv" class="mapDiv rounded" ref="mapDiv" ></div> 

        <!-- <button 
        class="search-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold my-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        v-on:click="findNearbyCourts(currPos.lat, currPos.lng)">
          COURTS NEAR ME
        </button> -->

        
        <!-- <div>
          <h4>Your position</h4>
          lat : {{ currPos.lat }}
          lng: {{ currPos.lng }}
        </div>
        <div>
          <h4>Clicked Position</h4>
          <span v-if="otherPos">
            lat: {{ otherPos.lat }}
            lng: {{ otherPos.lng }}
          </span>
          <span v-else> 
            Click the map to select a position
          </span>
        </div> -->
      
      </div>


      <!-- Recently Played -->
      <div class="col-span-1">
        <div class="primary-title">
          Recently Played
        </div>
        <div class="recently-played">

          
          <ul class="recently-played mr-4">
            <li v-for="p in  recentlyPlayed" :key="p">
              <a href="/publicuser" v-on:click="updateSelectedProfile(p)">
                <span v-if="p.profileImg.length > 0" >
                  <div class="player-image">
                    <img v-bind:src="p.profileImg" alt="">
                  </div>
                </span>

                <span v-else>
                  <div class="player-no-image">
                    {{p.firstName.charAt(0)}}{{p.lastName.charAt(0)}}
                  </div>
                </span>
              </a>
            </li>          
          </ul>
          

        </div>

      </div>

  </div> <!-- grid -->

  </div> <!-- end of container -->


</div>



</template>


<style scoped>

.primary-title {
  color: #FEb842;
  font-size: 24px;
  font-weight: bold;
  margin-left: 5px;
  margin-bottom: 5px;
  text-shadow: 2px 1px black;
}

.secondary-title {
  color: white;
  font-size: 16px;
  margin-left: 5px;
  margin-bottom: 5px;
}


.mapDiv {
  height: 400px;
  width: 100%;
}

.recently-played {
  display: flex;
  flex-wrap: wrap;
  
}

.player-image img{
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 1px solid #FEb842 ;
  margin: 10px 10px 5px 0px;
  box-shadow: 1px 2px;
}

.player-no-image{
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 1px solid black ;
  background-color: #FEb842;
  margin: 10px 10px 5px 0px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding-top: 6px;
  box-shadow: 1px 2px;
}

.bookmarks li {
  margin-bottom: 10px;
}

.venue-name {
  font-size: 18px;
  color: white;
}

.venue-address {
  font-size: 12px;
  color: #949494;
}

</style>