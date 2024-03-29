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
import CreateCard from './createCard'
import CardList from './cardList'

const Backlog =({sideOpen, backlog, projectCrypt, boardId, history, project,closeBacklog})=>{


    const [filterByBoard, setFilterByBoard] = useState(boardId)
    const [filterByUser, setFilterByUser] = useState(false)
    const [filterByName, setFilterByName] = useState('')
    const filterredCards = backlog && 
    backlog
        .filter(el=>filterByBoard? el.board_id===filterByBoard : true)
        .filter(el=>filterByUser? el.execs.some(el=>el._id===filterByUser) : true)
        .filter(el=>el.title.match(filterByName))

    const [newCardScrollDown, setNewCardScrollDown] = useState(false)

    return (
        <>
        <div 
            style={{display: sideOpen? 'block' : 'none', width: '100%'}} 
            >
            <BacklogTitle cardNumber={filterredCards?.length} closeBacklog={closeBacklog}/>  
            <BacklogFilters setFilterByBoard={setFilterByBoard} setFilterByName={setFilterByName} setFilterByUser={setFilterByUser} boardId={boardId} project={project} />
            <CardList scrollDown={newCardScrollDown} setScrollDown={()=>setNewCardScrollDown(false)} backlog={backlog} boardId={boardId} filterredCards={filterredCards} history={history} projectCrypt={projectCrypt}  />
            <CreateCard callback={()=>setNewCardScrollDown(true)} boardId={boardId} projectCrypt={projectCrypt} />
            
        </div>
        
        </>
        
    )
}
export default Backlog