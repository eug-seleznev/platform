import { useDispatch, useSelector } from "react-redux";
import style from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { useEffect, useState } from "react"
import SprintDescription from "../SprintDescrForOneProj";
import { Button } from "../../../../Styles/buttons";
import ModalWindow from "../ModalWindow";
import { Light, Thin } from "../../../../Styles/typography";
import Subtitle from "./subtitle";
import { addSprint } from "../../../../redux/actions/projects";
import { Redirect } from "react-router-dom";


const AllSprintsOfProj = ({hist, match, status, id}) => {
  const dispatch = useDispatch();

	const sprints = useSelector(state => state.projects.sprints) //нужно из пропсов достать, тут можно и без редакса
  const sprint = useSelector(state => state.projects.sprint)
	const createSprint = () => {
    console.log(id)
    dispatch(addSprint(id));
    
  };

    return (
    
	        <div className={style.sprints} >
              <Subtitle title='Активные спринты' src='/image 6.png'  subtwidth='0%' buttonFunc={createSprint} buttonActive={true}></Subtitle>
                
                  {sprints.length == 0 ?<Thin size='22'>Нет активных спринтов</Thin> 
                     
                   : (
                   <div className={style.sprintdescr__cont}>
                     {sprints.filter((sprint)=> !sprint.status).map ((sprint, i) => {
                       return (
                         <SprintDescription projStatus={status} dateClosePlan={sprint.dateClosePlan} descr={sprint.description} history={hist} params={match.params} id={sprint._id} key={i} taskcomplite={sprint.tasks.filter((task) => task.taskStatus).length} 
                         alltasks={sprint.tasks.length} title={sprint.title} tags={sprint.tags} index={i+1} key={i}sprintname={sprint.name} dateOpen={sprint.dateOpen} ></SprintDescription>
                       )
                     })}
                   </div>
                  )} 
                  <br />    
                  <br />
                </div>
			     
	  
  
    )
}



export default AllSprintsOfProj

