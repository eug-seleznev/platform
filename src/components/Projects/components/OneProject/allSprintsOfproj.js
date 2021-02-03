import { useSelector } from "react-redux";
import { allSprints } from "../../../../redux/actions/projects";
import style from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { Bold, H1, Light} from '../../../../Styles/typography'
import { useEffect, useState } from "react"
import SprintDescription from "../SprintDescrForOneProj";
import { Button } from "../../../../Styles/buttons";
import ModalWindow from "../ModalWindow";


const AllSprintsOfProj = ({hist, match}) => {


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
                  
                  {sprints.length == 0 ? (
                     <Button
                     className={style.special__button}
                      onClick={openMod}
                      style={{
                        color:'black',
                        backgroundColor:'white',
                        fontSize:'20px',
                        fontFamily:'SuisseIntlSemibold',
                    }}
                  >
                   Создать спринт
                  </Button>
                  ) : (
                   <div className={style.sprintdescr__cont}>
                     {sprints.filter((sprint)=> !sprint.status).map ((sprint, i) => {
                       return (
                         <SprintDescription dateClosePlan={sprint.dateClosePlan} descr={sprint.description} history={hist} params={match.params} id={sprint._id} key={i} taskcomplite={sprint.tasks.filter((task) => task.taskStatus).length} 
                         alltasks={sprint.tasks.length} index={i+1}sprintname={sprint.name} dateOpen={sprint.dateOpen}></SprintDescription>
                       )
                     })}
                     <Button
                     className={style.special__button}
                      onClick={openMod}
                      style={{
                        color:'black',
                        backgroundColor:'white',
                        fontSize:'20px',
                        fontFamily:'SuisseIntlSemibold',
                      // display: `${
                        
                      //   user.permission === "user" || project.status
                      //     ? "none"
                      //     : "block"
                      // }`,
                    }}
                  >
                   Создать спринт
                  </Button>
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
                      offWindow = {offWindow}
                    >

          </ModalWindow>
	  </>
  
    )
}



export default AllSprintsOfProj

