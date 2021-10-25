<template>

    <div class="container mx-auto my-3 flex items-center justify-center">
      
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="col-span-2">
          <!-- Searchbar Here
          <div class="search">
          </div> -->
          <form class="m-5" action="">
            <input type="text" class="shadow appearance-none border rounded w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="court-search" placeholder="Search for a court">
            <button class="search-button hover:bg-yellow-300 text-gray-700 font-bold mx-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Search
            </button>
          </form>
        </div>
       

        <div>
          <div class="primary-title">
            Bookmarks
          </div>
          <div class="bookmarks bg-gray-800 text-white rounded-md py-2 px-4 mr-10">
            <ul>
              <li>
                <div class="venue-name">
                  Heartbeat @ Bedok ActiveSG Swimming Complex
                </div>
                <div class="venue-address">
                  3 Bedok North Street 2, Singapore 469643
                </div>
              </li>

              <li>
                <div class="venue-name">
                  Heartbeat @ Bedok ActiveSG Swimming Complex
                </div>
                <div class="venue-address">
                  3 Bedok North Street 2, Singapore 469643
                </div>
              </li>

              <li>
                <div class="venue-name">
                  Heartbeat @ Bedok ActiveSG Swimming Complex
                </div>
                <div class="venue-address">
                  3 Bedok North Street 2, Singapore 469643
                </div>
              </li>

              <li>
                <div class="venue-name">
                  Heartbeat @ Bedok ActiveSG Swimming Complex
                </div>
                <div class="venue-address">
                  3 Bedok North Street 2, Singapore 469643
                </div>
              </li>

              <li>
                <div class="venue-name">
                  Heartbeat @ Bedok ActiveSG Swimming Complex
                </div>
                <div class="venue-address">
                  3 Bedok North Street 2, Singapore 469643
                </div>
              </li>

              <li>
                <div class="venue-name">
                  Heartbeat @ Bedok ActiveSG Swimming Complex
                </div>
                <div class="venue-address">
                  3 Bedok North Street 2, Singapore 469643
                </div>
              </li>
              
            </ul>
          </div>
        </div>

        <div class="row-span-2">
          <div class="primary-title">
            Near You
          </div>
          <div class="near-you">

          </div>
        </div>

        <div>
          <div class="primary-title">
            Recently Played
          </div>
          <div class="recently-played">
            <div class="player-image">
              <img src="https://t3.ftcdn.net/jpg/02/22/85/16/240_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg" alt="">
            </div>

            <div class="player-no-image">
              YX
            </div>

            <div class="player-image">
              <img src="https://www.w3schools.com/css/paris.jpg" alt="">
            </div>

            <div class="player-image">
              <img src="https://t3.ftcdn.net/jpg/04/40/13/28/240_F_440132822_ZdGM5QYX399ieufL0D0T0r0ILXdHiSv7.jpg" alt="">
            </div>
            
            <div class="player-image">
              <img src="https://t3.ftcdn.net/jpg/04/55/75/46/240_F_455754611_8eowWGUS88rIH74lyLaEgAHim7XPc2Os.jpg" alt="">
            </div>

            <div class="player-no-image">
              KW
            </div>

            <div class="player-no-image">
              JL
            </div>

          </div>
        </div>

        
      </div>









     

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

.search-button {
  background-color: #FEb842;
}

.near-you {
  background-color: white;
  height: 500px;
  width: 500px;
}

.recently-played {
  display: flex;
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

.venue-address:after {
  background: white;
  width: 100%;
  height: 5px;

}

.search {
  background-color: white;
  height: 40px;
  width: 100%
}

</style>