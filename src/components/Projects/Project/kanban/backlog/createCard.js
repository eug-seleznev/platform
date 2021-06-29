import {  useState } from 'react'
import { useDispatch } from 'react-redux'
import {  KanbanButton } from '../../../../../Styles/buttons'
import { Path } from '../../../../Layout/header'
import KanbanCard from '../card/card'
import styles from './backlog.module.css'
import { moveCard } from "../../../../../redux/actions/kanban";
import CreateForm from '../components/createForm'
import BacklogTitle from './backlogTitle'
import BacklogFilters from './backlogFilters'
import GhostCard from '../components/ghostCard'

const CreateCard =({projectCrypt, boardId, callback})=>{


    const [newCardInput, setNewCardInput] = useState(false)

 

    return (
        <div style={{width:'100%', display: 'flex', justifyContent: 'space-around'}}>
            {!newCardInput 
                ? <KanbanButton color='#E4E4E4' onClick={()=>setNewCardInput(true)}>
                     <img src={Path+'kanban-plus-white.png'}/>
                     Создать карточку
                  </KanbanButton> 
                : <CreateForm callback={callback} backlog boardId={boardId} closeForm={()=>setNewCardInput(false)} projectCrypt={projectCrypt} />
            }
        </div>
    )
}
export default CreateCard