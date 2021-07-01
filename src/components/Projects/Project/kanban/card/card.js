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
import { Path } from "../../../../Layout/header";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as heart  } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartOutline } from "@fortawesome/free-regular-svg-icons";
import ExecsIcon from "./components/kanbanCard/execsIcon";
import CardContainer from "./components/kanbanCard/CardContainer";



const KanbanCard = ({info, currCategory, timelineId, backlog, addGhost, boardId,history, expired}) => {
    const [cardOpen, setCardOpen] = useState(false)

    const [chosenCard, setChosenCard] = useState(false)
    const [deadline, setDeadline] = useState(false)
    const [deleteWindow, setDeleteWindow] = useState({
      status:false,
      id:''
    })
    const dispatch = useDispatch()
    const theme = useSelector(state=>state.auth.user.theme)
    const crypt = useSelector(state=>state.projects.project.crypt)
    const favCards = useSelector(state=>state.auth.user.fav_cards)
    
 
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

      if(info.deadline){
        const ded = new Date(info.deadline)
        const date = ded.getDate()
        const months = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек']
        const month = months[ded.getMonth()+1]
        const hour = ded.getHours()+1
        const min = ded.getMinutes()+1
        setDeadline(date+' '+month+' '+hour+':'+min)
      }
    },[])
 
    const close = ()=>{
      setCardOpen(false)
      dispatch(getProject(crypt))
      dispatch(loadBoard(boardId))
    }
 
console.log(info)
    return (
      <>
     <CardContainer
        info={info}
        currCategory={currCategory}
        timelineId={timelineId}
        backlog={backlog}
        addGhost={addGhost}
        boardId={boardId} 
        history={history} 
        expired={expired}
        setCardOpen={setCardOpen}
     >

          <Light color={theme?'white':'black'} size='16' style={{maxWidth:'80%'}}>{info?.title}</Light>
            
          <div className={styles.indicators}>
            <div className={styles.card__content__second}>

              {deadline && 
              <Light size='11' color={'#B7B7B7'} style={{marginRight:'5px', width:'max-content'}}>
                  {deadline}
              </Light>
              }

              {info && info.tasks && 
              <Regular color={theme?'#B7B7B7':'#3F496C'} size='11' style={{marginRight:'5px'}} >
                {info?.tasks.filter(task=>task.taskStatus).length}/{info?.tasks.length}
              </Regular>
              }

              {info.likeCount>0 &&
              <>
                <Regular size='11' style={{marginRight:'2px'}}>{info.likeCount}</Regular>
                <FontAwesomeIcon icon={heartOutline}  color='#3F496C' style={{width:'12px',height:'12px'}}/>
              </>}

            </div>

            <div className={styles.execsArr}>
              {info && info.execs && info.execs.map((el,i)=>{
                return (
                  <ExecsIcon el={el} history={history} /> 
                  )
                })
              }
            </div>
          </div>
      </CardContainer>


      {cardOpen && info && 
        <>
          <div className={styles.card__delete__window} style={{display:deleteWindow.status?'block':'none'}}>
            <div className={kanban.createCard}>
              <Regular size='16' style={{marginBottom:'20px'}}>Вы действительно хотите удалить карточку?</Regular>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <CancelButton fontSize='13px' grey type='button' padd='5px' onClick={()=>{setDeleteWindow({status:false, id:''})}}>Отменить</CancelButton>
                <Button onClick={deleteCard} >Удалить</Button>
              </div>
              
            </div>
          </div>
          <CardOpen 
            timelineId={timelineId}
            theme={theme} 
            history={history}
            boardId={boardId} 
            chosenCard={chosenCard} 
            setDeleteWindow={setDeleteWindow} 
            close={close} />
        </>
      }
      </>
    );    
}



export default KanbanCard


           // info.emergency==='Событие'
            // ? 
            // info.event_users.map((el,i)=>{
            //   return (
            //     <div>
            //       <img key={i} 
            //         src={url+'/'+el.avatar} 
            //         onClick={(e)=>{goToUser(e, el._id)}}
            //         onMouseEnter={()=>{setVisibleName(el.fullname)}}
            //         onMouseLeave={()=>{setVisibleName('')}} 
            //         style={{
            //           width:'25px',marginLeft:'4px',
            //           height:'25px',marginTop:'3px',
            //           borderRadius:'100%',objectFit:'cover'
                    
            //       }} ></img>
            //       <div style={{position:'relative'}}>
            //          <div className={styles.card__exec__name} 
            //           style={{display:`${visibleName===el.fullname?'block':'none'}`, border:'1px solid white'}}
            //         >{el.fullname}
            //         </div>
            //       </div>
                 
            //     </div>
                
            //   )
            // }):