<script src="../components/googleMaps/googleMaps">
</script>

<template>

<div class="container max-w-5xl mx-auto">

  <div class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2">

    <!-- Search  -->
    <div class="col-span-2" > 

      <form class="m-5" action="">
        <input type="text" class="shadow appearance-none border rounded w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="court-search" placeholder="Search for a location, i.e., Serangoon Nex, Pasir Ris block 134  " v-model="searchInput">
        <button v-on:click="searchForNearbyCourts()" class="search-button bg-yellow-400 hover:bg-yellow-300 text-gray-700 font-bold mx-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Search
        </button>
      </form>

    </div>

    <!-- Bookmarks -->
    <div class="col-span-2 md:col-span-1">

      <div class="primary-title">
        Bookmarks
      </div>

      <div v-if="currentBookmarks.length < 1" >
        <span class="secondary-title">You currently have no bookmarks!</span><br/>
        <button 
        class="search-button bg-yellow-400 hover:bg-yellow-300 text-gray-700 font-bold my-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        v-on:click="findNearbyCourts(currPos.lat, currPos.lng)"
        > Find A Court Near Me
        </button>
      </div>

      <div v-else class="bookmarks bg-gray-800 text-white rounded-md py-2 px-4 mr-10">

        <ul v-for="b in currentBookmarks" :key="b">
          <li>
            <div class="venue-name">
              <a href="/court">
                {{ b.name }}
              </a>
            </div>
            <div class="venue-address">
              {{ b.vicinity }}
            </div>
          </li>
        </ul>
      </div>

    </div>


    <!-- Near You -->
    <div class="col-span-2 md:col-span-1 row-span-1 md:row-span-2" >

      <div class="primary-title">
        Near You
      </div>
      <div id="mapDiv" class="mapDiv" ref="mapDiv" ></div> 

      <button 
      class="search-button bg-yellow-400 hover:bg-yellow-300 text-gray-700 font-bold my-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
      v-on:click="findNearbyCourts(currPos.lat, currPos.lng)"
      > Courts Near Me
      </button>

      
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
    <div class="col-span-2 md:col-span-1">
      <div class="primary-title">
        Recently Played
      </div>
      <div class="recently-played">

        <!-- <span v-for="p in recentlyPlayed" v-bind:key="p">
          <div v-if="p.profilePicture.length > 0" class="player-image">
            <a href="/profile"><img v-bind:src="p.profilePicture" alt=""></a>
          </div>

          <div v-else class="player-no-image">
            <a href="/profile">{{ p.firstName.charAt(0) }}{{ p.lastName.charAt(0) }}</a>
          </div>
        </span> -->
        <ul class="recently-played mr-4">
          <li v-for="p in  recentlyPlayed" :key="p">
            <a href="/profile">
              <span v-if="p.profilePicture.length > 0" >
                <div class="player-image">
                  <img v-bind:src="p.profilePicture" alt="">
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