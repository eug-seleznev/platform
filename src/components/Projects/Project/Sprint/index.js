import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import Project from "..";
import { Card, Title } from "../../../../Styles/common"
import Tag from "../../components/OneProject/tag";
import AddTask from "./AddTask";
import TaskManagment from "./EditTask";

import {SprintLoader} from './SprintLoader'
import SprintTitle from "./SprintTitle";
import TaskTable from "./TaskTable";




const Sprint_New = ({match, history}) => {
    let {sprint_id, crypt} = match.params //get sprint and project id
    const sprint = useSelector((state) => state.projects.sprint);
    const project = useSelector((state) => state.projects.project);
    const chosenSprints = useSelector(state => state.auth.user.sprints)
    const user = useSelector(state => state.auth.user)

    const [focusRow, setFocusRow] = useState(''); //focus table row
    const [status, setStatus] = useState(false)
    const [editField, setEditField] = useState(false) 
    const [actualClose, setActualClose] = useState ('??')
    const [diff, setDiff] = useState ('??')
    const selectFocusRow = (id) => {
        setFocusRow(id)
    };
    
    useEffect(()=>{
      
    //   if(sprint.dateClosePlan!==undefined) {
    //      setActualClose(sprint.dateClosePlan.slice(5, 10).split('-').reverse().join('.'))
    //   }
      {
        chosenSprints
          .filter((sprint) => sprint._id === sprint_id)
          .map(() => {
            setStatus(true);
          });
      }
    },[sprint])
    // useEffect (()=> {


    const editebleRow = () => {
        setEditField(!editField)
    }
  



    return (
      <SprintLoader sprint_id={sprint_id} sprint={sprint} project={project} crypt={crypt}>
        <SprintTitle diff={diff} user={user} title={sprint.title} hist={history} prTitle={project.title} actualClose={actualClose}id={sprint_id}  sprint={sprint}/>

        <Card >
          <TaskManagment
            status={status}
            setStatus={setStatus}
            id={sprint_id}
            creator={sprint.creator ? sprint.creator.fullname : " someone"}
            sprint_description={sprint.description}
            focusRow={focusRow}
            tasks={sprint.tasks}
            editebleRow={editebleRow}
            tags={sprint.tags}
          />

          <TaskTable
            tasks={sprint.tasks}
            id={sprint_id}
            focusRowNew={focusRow}
            selectFocusRow={selectFocusRow}
            enableEdit={editebleRow}
            isEdit={editField}
            team={project.team2}
            
          />
          <AddTask sprint={sprint} user={user} hist={history}  id={sprint_id} focusRow={focusRow} />
        </Card>
      </SprintLoader>
    );
}




export default Sprint_New




