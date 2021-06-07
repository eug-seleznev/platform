import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"




import styles from './kanban.module.css'
import KanbanSectionTd from "./sectionTd";
import { Path } from "../../../Layout/header";
import { deleteCategory, newTimeline } from "../../../../redux/actions/kanban";
import ModalTimeline from "./modalTimeline";
import ExpiredColumn from "./expiredTd";
import ConfirmModal from "./confirm";
import PopUpMenu from "./modalMenu";
import ModalMenu from "./modalMenu";






const KanbanSection = ({main, board, category, history}) => {
  const dispatch = useDispatch()
    const [open, setOpen] = useState(true)
    const [timelineIndex, setTimelineIndex] = useState(0)
    const [timelines, setTimelines] = useState(0)
    const [openTimlineModal, setOpenTimlineModal] = useState(false)
    const [confirm, setConfirm] = useState(false)


    useEffect(()=>{
      const now = Date.now()
      const nowTimelineIndex = category.timeline.findIndex(el=>{
        const timeDate = new Date (el.start)
        const lol = timeDate.getTime()>now
        return lol
      })
      nowTimelineIndex>0 && setTimelineIndex(nowTimelineIndex-1)
    },[])

    useEffect(()=>{
      const nowLine = category && category.timeline.length>0 && category.timeline[timelineIndex] && category.timeline[timelineIndex].cards.map((el,i)=>{
        const newEl = {...el, huindex: i}
        return newEl
      })
      setTimelines(nowLine)
    },[timelineIndex,board])
  
    const deleteCategoryHandler = (el) => {
      dispatch(deleteCategory(board._id,category._id))
    }
    const prevTimeline = (e) => {
      e.stopPropagation()
      setTimelineIndex(timelineIndex-1)
    }
    const nextTimeline = (e) => {
      e.stopPropagation()
      if(timelineIndex<category.timeline.length-1){
        setTimelineIndex(timelineIndex+1)
      } else {
        dispatch(newTimeline(category._id,board._id,category.timeline[timelineIndex]._id))
        setTimelineIndex(timelineIndex+1)
      }
    }


    
    return (
  <>
        <div className={styles.category} style={{height: open? 'max-content' : '32px', }}>
         
          <CategoryTitle 
              open={open} 
              nextTimeline={nextTimeline} 
              setConfirm={setConfirm} 
              setOpen={setOpen} 
              setOpenTimlineModal={setOpenTimlineModal} 
              category={category} 
              board={board}
              prevTimeline={prevTimeline} 
              timelineIndex={timelineIndex} 
            />
          
        
          <div className={styles.tr} style={{gridTemplateColumns: `minmax(50px,1fr) 530px 530px repeat(${board.columns.length-1},250px) minmax(50px,1fr)`,minWidth: '100%',}}>
            <span/>
            {board.columns.map((el,i)=>{
              return(
                <KanbanSectionTd history={history} key={i} category={category} timelineId={category.timeline[timelineIndex]?._id} timelineCards={timelines} column={el} boardId={board._id} />
              )
            })}
            <ExpiredColumn  history={history} category={category}   boardId={board._id} timelineId={category.timeline[timelineIndex]?._id} />
            <span/>
          </div>
        </div>
   

    {/* <PopUpMenu open={settingsOpen} buttons={boardSettingsButtons} close={()=>setSettingsOpen(false)}/> */}
    {openTimlineModal && <ModalTimeline id={category._id} setModal={setOpenTimlineModal} boardId={board._id} timelineId={category.timeline[timelineIndex]._id} />}
    <ConfirmModal visible={confirm} confirm={()=>deleteCategoryHandler()} close={()=>setConfirm(false)} text={'колонку '+category.name} />
   </>
    );    
}



export default KanbanSection



const TimelineDates = ({timeline}) => {

  if(timeline && timeline.start){
    const a = new Date(timeline?.start)
    const b = new Date(timeline?.end)
    const start = a.getDate()
    const end = b.getDate()
    const months = ['янв','фев','март','апр','мая','июня','июля','авг','сент','окт','нояб','дек',]
    const monthStart = months[a.getMonth()]
    const monthEnd = months[b.getMonth()]
  
    return(
      <div style={{minWidth:'105px',textAlign:"center"}}> {start} {monthStart!==monthEnd && monthStart} - {end+' '+monthEnd}</div>
    )
  } else if (timeline && !timeline.start) {
    return <div></div>
  }
}


const CategoryTitle = ({open, setConfirm, setOpen, setOpenTimlineModal, nextTimeline, timelineIndex, prevTimeline, category, board,}) => {

 
const buttons = [
  {
    title: 'Удалить категорию',
    handler: ()=>setConfirm(true),
    icon: 'trash-sharp.png'

  }
]

  return(
    <div className={styles.title} onClick={()=>setOpen(!open)} style={{backgroundColor:'#FCFCFC',minWidth: '100%',}}>
      <div className={styles.tr} style={{gridTemplateColumns: `minmax(50px,1fr) 530px 530px repeat(${board.columns.length-1},250px) minmax(50px,1fr)`,minWidth: '100%', }}>
          <span>
            <ModalMenu buttons={buttons}>
                <img src={Path+'three-dots.png'} style={{marginLeft: '20px',}} />
            </ModalMenu>
          </span>
          <div style={{display: "flex", alignItems: 'center'}}>

              {category.name}

              <img src={Path+'kanban-open-icon.png'} style={{transform: `rotate(${open?'180':'0'}deg)`, marginLeft: '5px', height: '8px',}} />

              {category && category.timeline[0] && !category.timeline[0].start && 
              <img 
                alt='plus' 
                src={Path+'kanban-plus.png'} 
                style={{filter:'invert(0)', marginLeft: '10px', width: '10px', height: '10px'}} 
                onClick={(e)=>{
                  e.stopPropagation()
                  setOpenTimlineModal(true)
                }}
              />}

              {category && category.timeline[0] &&  category.timeline[0].start && 
              <div style={{display: "flex", marginLeft: '20px', alignItems: 'center', border: '1px solid lightgrey', borderRadius: '13px', padding: '0 10px 0 10px'}} onClick={e=>e.stopPropagation()}>
                <div style={{minWidth:'30px'}}>
                  {timelineIndex>0 && 
                  <img src={Path+'openicon.png'} style={{transform: 'rotate(-90deg)',cursor:'pointer', width: '10px', height: '10px', marginRight: '15px'}} onClick={(e)=>prevTimeline(e)}/>
                  }
                </div>
                {category.timeline[timelineIndex] && category.timeline[timelineIndex].start && 
                  <div onClick={()=>setOpenTimlineModal(true)}>
                    <TimelineDates timeline={category.timeline[timelineIndex]} />
                  </div>
                }
                  
                <div style={{minWidth:'30px'}}>
                  <img src={Path+'openicon.png'} style={{transform: 'rotate(90deg)',cursor:'pointer', width: '10px', height: '10px', marginLeft: '15px'}} onClick={(e)=>category.timeline[timelineIndex] && category.timeline[timelineIndex].start && nextTimeline(e)}/>
                </div>
              </div>}

          </div>
      </div> 
  </div>
  )
}