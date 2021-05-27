import { useEffect, useState } from "react"

import styles from './card.module.css'
import kanban from '../kanban.module.css'
import { Light, Regular, Thin } from "../../../../../Styles/typography";

import CardOpen from "./cardOpen";
import { useDispatch, useSelector } from "react-redux";
import { cardDelete, currentCard } from "../../../../../redux/actions/kanban";
import { Button, CancelButton } from "../../../../../Styles/buttons";
import Tag from "../../../components/OneProject/tag";





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
    // useEffect(()=>{
    //   console.log(info)
    // },[])
    return (
      <>
      <div className={styles.card}
        draggable
        onDragStart={(e)=>dragStart(e)}
        style={{border:
          info?.emergency==='Регулярная'?'1px solid #36B65A':
          info?.emergency==='Обычная'?'1px solid #648FC6':
          info?.emergency==='Срочная'?'1px solid #DA5050':'1px solid #648FC6'}}
        onClick={(e)=>cardClick(e)}>
        <div className={styles.card__circuit}
          style={{backgroundColor:
            info?.emergency==='Регулярная'?'#36B65A':
            info?.emergency==='Обычная'?'#648FC6':
            info?.emergency==='Срочная'?'#DA5050':'#648FC6'
          }}>
        </div>
        <div className={styles.card__content}>
          <Light size='16' style={{padding:'5px'}}>{info?.title} </Light>
          <div className={styles.card__content__second} >
            <div style={{display:'flex'}}>
              <Light size='12' 
                style={{marginRight:'5px'}}>
                  { info.type==='Одна задача'?'Задача':info.type}
                </Light>
              <Light size='12' >{info?.tasks.filter(task=>task.taskStatus).length}/{info?.tasks.length}</Light>
            </div>
            <div style={{display:'flex',alignItems:'center',flexWrap:'nowrap',marginTop:'5px'}}>
              {info?.tags.map((tag,i)=>{
                return(
                  <Thin key={i} size='12' style={{marginRight:'10px'}} >#{tag}</Thin>
                )
              })}
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