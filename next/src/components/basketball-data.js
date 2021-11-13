import axios from "axios";

export const basketballData = {

  data: {

    },

  created(){
      let url = "https://www.balldontlie.io/api/v1/players";
      axios
      .get(url)
      .then((response)=>{

        console.log(response.data);
        console.log("sdddddddd");


      })
    }

};
  
export default basketballData;