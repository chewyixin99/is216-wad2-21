import db from "../firebase/firebaseInit";
import store from "../store/index"
import moment from "moment"


const ActivityData = {
  // ====================== DATA RETRIEVAL ======================
    dbData: {
    },

    async getCheckInHistory() {
      let retrieveDate = moment().subtract(7, 'd').toDate()
      const dataBase = await db.collection('users').doc(store.state.profileID).collection("checkInHistory")
      await dataBase.where("checkInTime", ">=", retrieveDate)
      .get()
      .then((relevantCheckIns) => {
        relevantCheckIns.forEach((doc) => {
          let checkInTime = moment(doc.data().checkInTime.toDate())
          let checkOutTime = moment(doc.data().checkOutTime.toDate())
          let checkInDuration = moment.duration(checkOutTime.diff(checkInTime, 'h', true))
          let dayOfWeek = Number(checkInTime.isoWeekday())
        
          if (dayOfWeek in this.dbData) {
            this.dbData[dayOfWeek] = this.dbData[dayOfWeek].add(checkInDuration) 
          } else {
            this.dbData[dayOfWeek] = checkInDuration
          }
        })
        console.log("Retrieved chart.js data from Firestore.");
      })
      
      .then(() => {
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          this.data.datasets[0].data[dayOfWeek] += this.dbData[dayOfWeek + 1]
        }
        console.log("Chart.js dataset updated.");
      })

      .catch((error) =>{
        console.log("Unable to retrieve data from firestore for activity chart. Error: ", error);
      })
    },

    // ====================== Chart.js ======================
    type: "bar",

    data: {
      labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      datasets: [
        {
          label: "Activity Level (Hrs)",
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "rgba(54,73,93,.5)",
          borderColor: "#36495d",
          borderWidth: 3,
        },
        // {
        //   label: "Planetary Mass (relative to the Sun x 10^-6)",
        //   data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
        //   backgroundColor: "rgba(71, 183,132,.5)",
        //   borderColor: "#47b784",
        //   borderWidth: 3
        // }
      ]
    },
    options: {
      color: "#fff",
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              padding: 25,
              fontColor: "white",
            },
            gridLines: {
              display: true ,
              color: "#FFFFFF",
              // lineWidth: 1,
            },
          }
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "white",
            },
            gridLines: {
              display: false ,
              color: "#FFFFFF",
            },
          }
        ]
      },
      legend: {
        labels: {fontColor: "#fff"}
      },
    },


};
  
export default ActivityData;