import { TasksContainer } from "../../Styles/layout"
import PortableTasks from "../MyTasks/portableTasks/index"


const QuickTasks =({history})=>{
    return (
        <TasksContainer >
            <PortableTasks history={history}></PortableTasks>
        </TasksContainer>
    )
}
export default QuickTasks