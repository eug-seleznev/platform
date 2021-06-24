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

const CreateCard =({projectCrypt, boardId,})=>{


    const [newCardInput, setNewCardInput] = useState(false)

 

    return (
        <div style={{marginLeft:'auto', marginRight:'auto'}}>
            {!newCardInput 
                ? <KanbanButton color='#E4E4E4' style={{marginTop:'15px'}} onClick={()=>setNewCardInput(true)}>
                     <img src={Path+'kanban-plus-white.png'} style={{marginRight: '5px',}}/>
                     Создать карточку
                  </KanbanButton> 
                : <CreateForm backlog boardId={boardId} closeForm={()=>setNewCardInput(false)} projectCrypt={projectCrypt} />
            }
        </div>
    )
}
export default CreateCard