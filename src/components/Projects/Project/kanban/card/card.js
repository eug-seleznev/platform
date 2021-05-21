import { useEffect, useState } from "react"

import styles from './card.module.css'

import { Light } from "../../../../../Styles/typography";

import CardOpen from "./cardOpen";
import { useDispatch } from "react-redux";
import { currentCard } from "../../../../../redux/actions/kanban";





const KanbanCard = ({info, currCategory, timelineId, backlog}) => {
    const [cardOpen, setCardOpen] = useState(false)
    const dispatch = useDispatch()
    
    const cardClick = (e) => {
      e.stopPropagation()
      setCardOpen(true)
      dispatch(currentCard(info))
      console.log(info)
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
    useEffect(()=>{
      console.log (info)
    },[info])
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
          <Light size='16' style={{padding:'5px'}}>{info.title} </Light>
          <div className={styles.card__content__second} >
            <div style={{display:'flex'}}>
              <Light size='12' ></Light>
              <Light size='12' >3/7</Light>
            </div>
            <div style={{borderRadius:'100%',backgroundColor:'grey',width:'20px',height:'20px'}}>
            </div>
          </div>
        </div>
      </div>


      {cardOpen && info && 
        <CardOpen isOpen={cardOpen} data={'task data'} close={()=>setCardOpen(false)} />
      }
      </>
    );    
}



export default KanbanCard