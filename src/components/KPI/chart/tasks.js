import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";




// const data = {
//   labels: ["1", "2", "3", "4", "5", "6"],
//   datasets: [
//     {
//       label: "open",
//       data: [12, 19, 3, 5, 2, 3],
//       fill: false,
//       backgroundColor: "rgb(255, 99, 132)",
//       borderColor: "rgba(255, 99, 132, 0.2)",
//     },
//     {
//       label: "closed",
//       data: [3, 1, 5, 15, 32, 23],
//       fill: false,
//       backgroundColor: "rgb(76, 99, 132)",
//       borderColor: "rgba(76, 99, 132, 0.2)",
//     },
//   ],
// };
let data;

 const Task = () => {
    const [loaded, setLoaded] = useState(false)
    const Weekly = useSelector(state => state.stat.weeklyTask)
      let labels = [];
      let openTask = [];
      let closedTask = [];
      useEffect(() => {
        Weekly.map((week) => {
          labels.push(week.date.split('T')[0]);
          openTask.push(week.task_open_count);
          closedTask.push(week.task_close_count);
        });

        data = {
          labels: labels,
          datasets: [
            {
              label: "open_task",
              data: openTask,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "close_task",
              data: closedTask,
              fill: false,
              backgroundColor: "rgb(76, 99, 132)",
              borderColor: "rgba(76, 99, 132, 0.2)",
            },
          ],
        };
        setLoaded(true);
      }, []);

  

    return (
      <div>
        <div className="header">
          <h1 className="title">Weekly tasks</h1>
        </div>
        {loaded && (
          <Line
            data={data}
            width={100}
            height={500}
            options={{
              maintainAspectRatio: false,
            }}
          />
        )}
      </div>
    );
    
}


export default Task