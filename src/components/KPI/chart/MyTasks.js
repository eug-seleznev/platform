




import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

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

const MyDailyTask = () => {
  const stat = useSelector((state) => state.stat.dailyusers);
  const [loaded, setLoaded] = useState(false);
  let labels = [];
  let task_count = [];
  useEffect(() => {
    stat.map((day) => {
      labels.push(day.day + " " + day.month);
      task_count.push(day.my_tasks_created);
    });

    data = {
      labels: labels,
      datasets: [
        {
          label: "task",
          data: task_count,
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    };
    setLoaded(true);
  }, []);


  return (
    <>
      <div className="header">
        <h1 className="title">My tasks, daily</h1>
      </div>
      {loaded && <Line data={data} options={options} />}
    </>
  );
};

export default MyDailyTask;