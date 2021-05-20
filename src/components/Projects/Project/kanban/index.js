import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './kanban.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";
import KanbanCard from "./card/card";
import KanbanSection from "./section";
import Backlog from "./backlog";
import { addNewBoard, addNewCard } from "../../../../redux/actions/kanban";
import CreateForm from "./createForm";
import { NavLink } from "react-router-dom";
import { ButtonText } from "../../../../Styles/buttons";
import { Input } from "../../../../Styles/Forms";





const Kanbans = ({history}) => {
  const dispatch =useDispatch ()
  const project = useSelector(state=>state.projects.project)
  console.log('project',project)
  const [title, setTitle] = useState('')

  const handleRedirect = (name) => {
    history.push(`/projects/${project.crypt}/board/${name}`)
  }
  const createBoard = () => {
    dispatch(addNewBoard(project.crypt, title))
  }

    return (
      <div className={styles.main} >
        <div className={styles.content}>
            <Input 
              name='name'
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
            <ButtonText onClick={()=>createBoard()}>Создать</ButtonText>
            <ul>
                {project.boards.map((el,i)=>{
                  return(
                    <li>
                      <ButtonText onClick={()=>handleRedirect(el.name)}>{el.name}</ButtonText>
                    </li>
                  )
                })}
          </ul>
        </div>
      </div>
    );    
}



export default Kanbans