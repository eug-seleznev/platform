import {  useSelector } from "react-redux";
import { Card, Title } from "../../../../Styles/common"
import { Bold } from "../../../../Styles/typography";

import {SprintLoader} from './SprintLoader'
import TaskTable from "./TaskTable";




const Sprint_New = ({match}) => {
    let {sprint_id} = match.params //get sprint and project id
    const sprint = useSelector((state) => state.projects.sprint);

    return (
      
        <SprintLoader sprint_id={sprint_id} sprint={sprint}>
          <Title> hello world {sprint._id}</Title>
          <Card>
              <Bold> Задачи</Bold>
              <TaskTable  tasks={sprint.tasks} id={sprint_id}/>
              <p>Добавить задачу</p>
          </Card>
        </SprintLoader>
      
    );
}




export default Sprint_New




