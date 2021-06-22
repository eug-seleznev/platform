import { useEffect, useState } from "react"

import styles from './card.module.css'
import kanban from '../kanban.module.css'
import { Light, Regular, Thin } from "../../../../../Styles/typography";

import CardOpen from "./cardOpen";
import { useDispatch, useSelector } from "react-redux";
import { cardDelete, currentCard, loadBoard } from "../../../../../redux/actions/kanban";
import { Button, CancelButton } from "../../../../../Styles/buttons";

import { getProject } from "../../../../../redux/actions/projects";
import { url } from "../../../../utils/axios";
import getDateWithTime from "./components/getDateWithTime";





const KanbanCard = ({info, currCategory, timelineId, backlog, addGhost, boardId,history, expired}) => {
    const [cardOpen, setCardOpen] = useState(false)

    const [chosenCard, setChosenCard] = useState(false)
    const [visibleName, setVisibleName] = useState(false)
    const [deleteWindow, setDeleteWindow] = useState({
      status:false,
      id:''
    })
    const dispatch = useDispatch()
    const theme = useSelector(state=>state.auth.user.theme)
    const crypt = useSelector(state=>state.projects.project.crypt)
    const favCards = useSelector(state=>state.auth.user.fav_cards)
    const cardClick = (e) => {
      e.stopPropagation()
     
      dispatch(currentCard(info))
      setTimeout(()=>{
        setCardOpen(true)
      },300)
      
    }
    const deleteCard =()=>{
      dispatch(cardDelete(deleteWindow.id, crypt, boardId,backlog))
      setDeleteWindow ({
        status:false,
        id:''
      })
    }
    useEffect(()=>{
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
        expired: expired,
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
      // console.log('drop to card')

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
        draggable
        onDragStart={(e)=>dragStart(e)}
        style={{
          zIndex:1000,
          backgroundColor:!theme?'white':'#1E1E1E',
          border:
          info?.emergency==='Событие'?'1px solid #9CE3B0':
          info?.emergency==='Обычная'?'1px solid #648FC6':
          info?.emergency==='Критическая'?'1px solid #D83B44':
          info?.emergency==='Срочная'?'1px solid #FFB21D':'1px solid #648FC6'}}
        onClick={(e)=>cardClick(e)}
        onDrop={(e)=>dropp(e)}
        >
        <div className={styles.card__circuit}
          style={{backgroundColor:
            info?.emergency==='Событие'?'#9CE3B0':
            info?.emergency==='Обычная'?'#648FC6':
            info?.emergency==='Критическая'?'#D83B44':
            info?.emergency==='Срочная'?'#FFB21D':'#648FC6'
          }}>
        </div>
        <div className={styles.card__content}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <Light color={theme?'white':'black'} size='16' style={{padding:'5px',maxWidth:'50%'}}>{info?.title} </Light>
            <div style={{display:'flex'}}>
            {
            info.emergency==='Событие'
            ? 
            info.event_users.map((el,i)=>{
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
                      style={{display:`${visibleName===el.fullname?'block':'none'}`, border:'1px solid white'}}
                    >{el.fullname}
                    </div>
                  </div>
                 
                </div>
                
              )
            }):
            info.execs.map((el,i)=>{
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
                      style={{display:`${visibleName===el.fullname?'block':'none'}`, border:'1px solid white'}}
                    >{el.fullname}
                    </div>
                  </div>
                 
                </div>
                
              )
            })
          }
            </div>
            
          </div>
          
          <div className={styles.card__content__second} >
            <div style={{display:'flex'}}>
              <Light size='12' 
                color={theme?'#B7B7B7':'black'}
                style={{marginRight:'5px'}}>
                  { info.emergency!=='Событие'&&!info.type?'Задача':
                    info.emergency==='Событие'&& info.event_date?getDateWithTime(info.event_date) :
                    info.emergency==='Событие'&&!info.event_date?'Событие':info.type}
                </Light>
              <Light color={theme?'#B7B7B7':'black'} size='12' style={{display:info.type==='Одна задача'||!info.type?'none':'block'}} >{info&& info.tasks &&info?.tasks.filter(task=>task.taskStatus).length}/{info&& info.tasks &&info?.tasks.length}</Light>
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
          <CardOpen theme={theme} history={history} boardId={boardId} chosenCard={chosenCard} isOpen={cardOpen} onClick={deleteCard} setDeleteWindow={setDeleteWindow} data={'task data'} close={close} />
        </div>
        
      }
      </>
    );    
}



export default KanbanCard