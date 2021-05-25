import { useState } from "react"

import styles from './card.module.css'
import kanban from '../kanban.module.css'
import { Light, Regular } from "../../../../../Styles/typography";

import CardOpen from "./cardOpen";
import { useDispatch, useSelector } from "react-redux";
import { cardDelete, currentCard } from "../../../../../redux/actions/kanban";
import { Button, CancelButton } from "../../../../../Styles/buttons";





const KanbanCard = ({info, currCategory, timelineId, backlog}) => {
    const [cardOpen, setCardOpen] = useState(false)
    const [deleteWindow, setDeleteWindow] = useState({
      status:false,
      id:''
    })
    const dispatch = useDispatch()
    const crypt = useSelector(state=>state.projects.project.crypt)
    const cardClick = (e) => {
      e.stopPropagation()
      setCardOpen(true)
      dispatch(currentCard(info))

    }
    const deleteCard =()=>{
      dispatch(cardDelete(deleteWindow.id, crypt))
      setDeleteWindow ({
        status:false,
        id:''
      })
    }
    const dragStart = (e) => {
      e.stopPropagation()
      const data={
        categoryId: currCategory,
        timelineId: timelineId,
        backlog: backlog,
        cardId: info._id
      }
      e.dataTransfer.setData('text', JSON.stringify(data));
    }
 
    return (
      <>
      <div className={styles.card}
        draggable
        onDragStart={(e)=>dragStart(e)}
        style={{border:'1px solid green'}}
        onClick={(e)=>cardClick(e)}>
        <div className={styles.card__circuit}
        style={{backgroundColor:'green'}}></div>
        <div className={styles.card__content}>
          <Light size='16' style={{padding:'5px'}}>{info?.title} </Light>
          <div className={styles.card__content__second} >
            <div style={{display:'flex'}}>
              <Light size='12' ></Light>
              <Light size='12' >{info?.tasks.filter(task=>task.taskStatus).length}/{info?.tasks.length}</Light>
            </div>
            <div style={{borderRadius:'100%',backgroundColor:'grey',width:'20px',height:'20px'}}>
            </div>
          </div>
        </div>
      </div>


      {cardOpen && info && 
        <div>
          <div className={styles.card__delete__window} style={{display:deleteWindow.status?'block':'none'}}>
            <div className={kanban.createCard}>
              <Regular size='16' style={{marginBottom:'20px'}}>Вы действительно хотите удалить карточку?</Regular>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <CancelButton fontSize='13px' grey type='button' padd='5px' onClick={()=>{setDeleteWindow({status:false, id:''})}}>Отменить</CancelButton>
                <Button onClick={deleteCard} >Удалить</Button>
              </div>
              
            </div>
          </div>
          <CardOpen isOpen={cardOpen} onClick={deleteCard} setDeleteWindow={setDeleteWindow} data={'task data'} close={()=>setCardOpen(false)} />
        </div>
        
      }
      </>
    );    
}



export default KanbanCard