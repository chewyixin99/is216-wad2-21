export const ActivityData = {
    type: "bar",
    data: {
      labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      datasets: [
        {
          label: "Activity Level",
          data: [3, 0, 1, 2, 0, 0, 2],
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
    }
};
  
export default ActivityData;