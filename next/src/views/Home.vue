<script src="../components/googleMaps/homeFunctions">
</script>

<template>

<div class="container max-w-5xl mx-auto">
  <div class="m-6">

    <!-- Search  -->
    <div > 

      <form class="w-full md:w-10/12 flex space-x-2 mx-auto" action="">
        <input type="text" class=" search-bar shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="court-search" placeholder="Search for a location, i.e., Serangoon Nex, Pasir Ris block 134  " v-model="searchInput">

        <button v-on:click="searchForNearbyCourts()" class="search-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          SEARCH
        </button>
      </form>

    </div>

      <div  v-if="showLastCheckedIn" class="last-checked-in justify-between mt-5 px-5 py-3 bg-gray-800 rounded text-white w-full flex flex-wrap mx-auto">

        <!-- UNCOMMENT THE BELOW CODE FOR BETTER VISUALS -->

        <!-- CURRENTLY CHECKED IN ID <br/>
        {{ $store.state.checkedInCourtID }} <br/><br/>
        LAST CHECKED IN <br/>
        {{ $store.state.checkedInCourt }} <br/><br/>
        SELECTED COURT <br/>
        {{ $store.state.selectedCourt }} -->
          
        <div class="last-checked-in-text py-1">
            <span class="leading-text"> Last checked in at </span>
            <span class="text-yellow-500">{{ $store.state.checkedInCourt.name }}, {{ $store.state.checkedInCourt.vicinity }}</span>
        </div>

        <span class="last-checked-in-button search-button bg-yellow-500 hover:bg-yellow-700 text-white  my-auto py-1 px-4 rounded focus:outline-none focus:shadow-outline">
          <button v-if="showCheckOut" v-on:click="$store.dispatch('removeCurrentPlayer')">
            <strong>Check Out</strong>
          </button>
          <a v-else href="/court" v-on:click="updateSelectedCourt($store.state.checkedInCourt)">
            <strong>View Court Status</strong>
          </a>
        </span>

        
      </div>

      <div  v-else class="last-checked-in justify-between mt-5 px-5 py-3 bg-gray-800 rounded text-white w-full flex flex-wrap mx-auto">

        <!-- UNCOMMENT THE BELOW CODE FOR BETTER VISUALS -->

        <!-- CURRENTLY CHECKED IN ID <br/>
        {{ $store.state.checkedInCourtID }} <br/><br/>
        LAST CHECKED IN <br/>
        {{ $store.state.checkedInCourt }} <br/><br/>
        SELECTED COURT <br/>
        {{ $store.state.selectedCourt }} -->
        
        <span class="last-checked-in-text py-1">
            <span class="leading-text">Welcome! Start by selecting a <span class="text-yellow-500"><strong>court </strong> </span>, followed by clicking on </span>
            <span class="text-yellow-500"><strong>check in</strong></span>!
        </span>
      </div>

    <div class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">

      <div class="col-span-1">

        <div class="secondary-gold-title mb-3">
          Bookmarks
        </div>

        <div v-if="!showBookmarks" class="text-center">
          <div class="bg-gray-800 rounded text-center py-20">
            <div class="text-white">You currently have no bookmarks!</div>

            <button 
            class="search-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold my-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            v-on:click="findNearbyCourts(currPos.lat, currPos.lng)"
            > Find A Court Near Me
            </button>
          
          </div>
        </div>

        <div v-else class="bookmarks bg-gray-800 text-white rounded-md h-64 py-2 px-4 overflow-auto">

          <ul v-for="b in getBookmarks" :key="b">
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
          <div class="secondary-gold-title mb-3">
            Near You
          </div>
          <button 
          class="search-button bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold my-2 px-2 rounded focus:outline-none focus:shadow-outline" 
          v-on:click="findNearbyCourts(currPos.lat, currPos.lng)">
            COURTS NEAR ME
          </button>
        </div>

        <div id="mapDiv" class="mapDiv rounded" ref="mapDiv" ></div> 



        


      
      </div>


      <!-- Recently Played -->
        <div class="col-span-1"> 
        <div class="secondary-gold-title">
          Recently Played
        </div>
        <div class="recently-played">

          
          <ul v-if="showRecentlyPlayed" class="recently-played mr-4">
            <li v-for="p in getRecentlyPlayed" :key="p">
              <a href="/publicuser" v-on:click="updateSelectedProfile(p)">
                <span v-if="showProfileImg(p) > 0" >
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

.mapDiv {
  height: 400px;
  width: 100%;
}

.recently-played {
  display: flex;
  flex-wrap: wrap;
  
}

.last-checked-in {
  box-shadow: 1px 2px rgba(0, 0, 0, 0.42);
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
  /* border: 1px solid black ; */
  background-color: #FEb842;
  color: white;
  margin: 10px 10px 5px 0px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding-top: 6px;
  box-shadow: 1px 2px black;
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