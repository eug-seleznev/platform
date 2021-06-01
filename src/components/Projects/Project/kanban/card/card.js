import { useEffect, useState } from "react"

import styles from './card.module.css'
import kanban from '../kanban.module.css'
import { Light, Regular, Thin } from "../../../../../Styles/typography";

import CardOpen from "./cardOpen";
import { useDispatch, useSelector } from "react-redux";
import { cardDelete, currentCard, loadBoard } from "../../../../../redux/actions/kanban";
import { Button, CancelButton } from "../../../../../Styles/buttons";
import Tag from "../../../components/OneProject/tag";
import { getProject } from "../../../../../redux/actions/projects";
import { url } from "../../../../utils/axios";





const KanbanCard = ({info, currCategory, timelineId, backlog, addGhost, boardId,history, notDraggable}) => {
    const [cardOpen, setCardOpen] = useState(false)
    const [chosenCard, setChosenCard] = useState(false)
    const [visibleName, setVisibleName] = useState(false)
    const [deleteWindow, setDeleteWindow] = useState({
      status:false,
      id:''
    })
    const dispatch = useDispatch()
    const crypt = useSelector(state=>state.projects.project.crypt)
    const favCards = useSelector(state=>state.auth.user.fav_cards)
    const cardClick = (e) => {
      e.stopPropagation()
      setCardOpen(true)
      dispatch(currentCard(info))

    }
    const deleteCard =()=>{
      dispatch(cardDelete(deleteWindow.id, crypt, boardId))
      setDeleteWindow ({
        status:false,
        id:''
      })
    }
    useEffect(()=>{
      // console.log(info)
      favCards.map(card=>{
        if(card._id===info._id){
          setChosenCard(true)
          // console.log(card.title)
        }
        })
    },[])
    const dragStart = (e) => {
      e.stopPropagation()
      const data={
        categoryId: currCategory,
        timelineId: timelineId,
        backlog: backlog,
        cardId: info._id,
        cardIndex: info.huindex
      }
      e.dataTransfer.setData('text', JSON.stringify(data));
    }
    const dropp = (e) => {
      e.stopPropagation()
      console.log('drop to card')

    }
    const close = ()=>{
      setCardOpen(false)
      dispatch(getProject(crypt))
      dispatch(loadBoard(boardId))
    }
    const goToUser =(e,id)=>{
      e.stopPropagation()
      history.push(`../../../../users/${id}`)
    }
    // useEffect(()=>{
    //   console.log(info)
    // },[])
    return (
      <>
      <div onDragOver={addGhost} className={styles.card}
        draggable={!notDraggable? true : false}
        onDragStart={(e)=>dragStart(e)}
        style={{border:
          info?.emergency==='Регулярная'?'1px solid #36B65A':
          info?.emergency==='Обычная'?'1px solid #648FC6':
          info?.emergency==='Срочная'?'1px solid #DA5050':'1px solid #648FC6'}}
        onClick={(e)=>cardClick(e)}
        onDrop={(e)=>dropp(e)}
        >
        <div className={styles.card__circuit}
          style={{backgroundColor:
            info?.emergency==='Регулярная'?'#36B65A':
            info?.emergency==='Обычная'?'#648FC6':
            info?.emergency==='Срочная'?'#DA5050':'#648FC6'
          }}>
        </div>
        <div className={styles.card__content}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <Light size='16' style={{padding:'5px',maxWidth:'50%'}}>{info?.title} </Light>
            <div style={{display:'flex'}}>
            {info?.execs?.map((el,i)=>{
              return (
                <div>
                  <img key={i} 
                    src={url+'/'+el.avatar} 
                    onClick={(e)=>{goToUser(e, el._id)}}
                    onMouseEnter={()=>{setVisibleName(el.fullname)}}
                    onMouseLeave={()=>{setVisibleName('')}} 
                    style={{
                      width:'25px',marginLeft:'4px',
                      height:'25px',marginTop:'3px',
                      borderRadius:'100%',objectFit:'cover'
                    
                  }} ></img>
                  <div style={{position:'relative'}}>
                     <div className={styles.card__exec__name} 
                      style={{display:`${visibleName===el.fullname?'block':'none'}`}}
                    >{el.fullname}
                    </div>
                  </div>
                 
                </div>
                
              )
            })}
            </div>
            
          </div>
          
          <div className={styles.card__content__second} >
            <div style={{display:'flex'}}>
              <Light size='12' 
                style={{marginRight:'5px'}}>
                  { info.type==='Одна задача'?'Задача':info.type}
                </Light>
              <Light size='12' style={{display:info.type==='Одна задача'?'none':'block'}} >{info&& info.tasks &&info?.tasks.filter(task=>task.taskStatus).length}/{info&& info.tasks &&info?.tasks.length}</Light>
            </div>
            <div style={{display:'flex',alignItems:'center',flexWrap:'nowrap',marginTop:'5px'}}>
              {info&& info.tags&& info?.tags.map((tag,i)=>{
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
          <CardOpen chosenCard={chosenCard} isOpen={cardOpen} onClick={deleteCard} setDeleteWindow={setDeleteWindow} data={'task data'} close={close} />
        </div>
        
      }
      </>
    );    
}



export default KanbanCard