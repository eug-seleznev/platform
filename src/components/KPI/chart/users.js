
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {  useSelector } from "react-redux";





const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

let data;

const DailyUsers = () => {
    const stat = useSelector(state => state.stat.dailyusers);
    const [loaded, setLoaded] = useState(false)

    let labels = [];
    let days = [];
    useEffect(() => {
        stat.map(day => {
                labels.push(day.day+' '+day.month);
                days.push(day.user_count);
        })

        data = {
          labels: labels,
          datasets: [
            {
              label: "users",
              data: days,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        };
        setLoaded(true)
    }, [])



    // useEffect(() => {
    //     console.log(data)
    // }, [data])
    return (
      <>
        <div className="header">
          <h1 className="title">Daily users</h1>
        </div>
        {loaded && <Line data={data} options={options} />}
      </>
    );
}



export default DailyUsers