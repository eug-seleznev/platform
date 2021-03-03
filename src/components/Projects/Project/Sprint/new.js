import { useState } from "react";
import {  useSelector } from "react-redux";
import { Card, Title } from "../../../../Styles/common"
import AddTask from "./AddTask";
import TaskManagment from "./EditTask";

import {SprintLoader} from './SprintLoader'
import TaskTable from "./TaskTable";




const Sprint_New = ({match}) => {
    let {sprint_id, crypt} = match.params //get sprint and project id
    const sprint = useSelector((state) => state.projects.sprint);
    const project = useSelector((state) => state.projects.project);
//КОСТЫЛЬ ДЛЯ СТАРЫРХ СПРИНТОВ
    const [creator, setCeator] = useState(sprint.creator ? sprint.creator.fullname : 'someone')
    const [focusRow, setFocusRow] = useState(''); //focus table row
    const [editField, setEditField] = useState(false) 
    
    const selectFocusRow = (id) => {
        setFocusRow(id)
    };

    const editebleRow = () => {
        setEditField(!editField)
    }
    
    return (
      <SprintLoader sprint_id={sprint_id} sprint={sprint} project={project} crypt={crypt}>
        <Title> {sprint._id}</Title>
        <Card>
          <TaskManagment
         
            id={sprint_id}
            creator={sprint.creator ? sprint.creator.fullname : " someone"}
            sprint_description={sprint.description}
            focusRow={focusRow}
            tasks={sprint.tasks}
            editebleRow={editebleRow}
          />

          <TaskTable
            tasks={sprint.tasks}
            id={sprint_id}
            selectFocusRow={selectFocusRow}
            enableEdit={editebleRow}
            isEdit={editField}
            team={project.team2}
          />
          <AddTask id={sprint_id} focusRow={focusRow} />
        </Card>
      </SprintLoader>
    );
}




export default Sprint_New




