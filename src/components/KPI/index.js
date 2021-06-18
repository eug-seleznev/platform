// import MyDailyTask from "./chart/MyTasks"
import WeeklySprints from "./chart/Sprints"
import  Task  from "./chart/tasks"
import Users from './chart/users'






const KPI = () => {
    return (
        <div>
           <Task />
           <Users />
           {/* <MyDailyTask /> */}
           <WeeklySprints />
        </div>
    )
}


export default KPI