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

const WeeklySprints = () => {
  const stat = useSelector((state) => state.stat.weeklyTask);
  const [loaded, setLoaded] = useState(false);
  let labels = [];
  let sprints_week = [];
  let complite_sprints = [];
  let incomplite = []
  useEffect(() => {
    stat.map((week) => {
      labels.push(week.date.split("T")[0]);
      sprints_week.push(week.sprints_created);
      complite_sprints.push(week.complete_sprints_closed);
      incomplite.push(week.incomplete_sprints_closed);

    });

    data = {
      labels: labels,
      datasets: [
        {
          label: "created",
          data: sprints_week,
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "complete",
          data: complite_sprints,
          fill: false,
          backgroundColor: "rgb(50, 20, 132)",
          borderColor: "rgba(50, 20, 132, 0.2)",
        },
        {
          label: "incomplite",
          data: incomplite,
          fill: false,
          backgroundColor: "rgb(76, 99, 132)",
          borderColor: "rgba(76, 99, 132, 0.2)",
        },
      ],
    };
    setLoaded(true);
  }, []);

  return (
    <>
      <div className="header">
        <h1 className="title">Weekly created sprints</h1>
      </div>
      {loaded && <Line data={data} options={options} />}
    </>
  );
};

export default WeeklySprints;
