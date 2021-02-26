import { useSelector } from "react-redux";
import style from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { useState } from "react"
import SprintDescription from "../SprintDescrForOneProj";
import { Button } from "../../../../Styles/buttons";
import ModalWindow from "../ModalWindow";
import { Light, Thin } from "../../../../Styles/typography";
import Subtitle from "./subtitle";


const AllSprintsOfProj = ({hist, match, status}) => {


	const sprints = useSelector(state => state.projects.sprints)
	const [modal, setModal] = useState (false)
	const openMod = () => {
		setModal(true)
	   
   }
   const offWindow =()=>{
	setModal(false)
  }
    return (
      <>
	        <div>
              <Subtitle title='Активные спринты' src='/image 6.png'  subtwidth='100%' buttonFunc={openMod} buttonActive={true}></Subtitle>
                
                  {sprints.length == 0 ?<Thin size='22'>Нет активных спринтов</Thin> 
                     
                   : (
                   <div className={style.sprintdescr__cont}>
                     {sprints.filter((sprint)=> !sprint.status).map ((sprint, i) => {
                       return (
                         <SprintDescription projStatus={status} dateClosePlan={sprint.dateClosePlan} descr={sprint.description} history={hist} params={match.params} id={sprint._id} key={i} taskcomplite={sprint.tasks.filter((task) => task.taskStatus).length} 
                         alltasks={sprint.tasks.length} index={i+1} key={i}sprintname={sprint.name} dateOpen={sprint.dateOpen}></SprintDescription>
                       )
                     })}
                   </div>
                  )} 
                  <br />    
                  <br />
                </div>
			            <ModalWindow
                    status={modal} 
                    bigTitle={'Создание нового спринта'}
                    smallTitles={['Описание спринта','Продолжительность']}
                    customElements={'CreateSprint'}
                    buttonTitle={'Сохранить'}
                    offWindow = {offWindow}>
                  </ModalWindow>
	  </>
  
    )
}



export default AllSprintsOfProj

