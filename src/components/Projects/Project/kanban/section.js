import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"




import styles from './kanban.module.css'
import KanbanSectionTd from "./sectionTd";
import { Path } from "../../../Layout/header";
import { deleteCategory, newTimeline } from "../../../../redux/actions/kanban";
import { ButtonTextLight } from "../../../../Styles/buttons";
import ModalTimeline from "./modalTimeline";






const KanbanSection = ({main, board, category, history}) => {
  const dispatch = useDispatch()
    const [open, setOpen] = useState(true)
    const [timelineIndex, setTimelineIndex] = useState(0)
    const [timelines, setTimelines] = useState(0)
    const [openTimlineModal, setOpenTimlineModal] = useState(false)
      

    useEffect(()=>{
      const now = Date.now()
      const nowTimelineIndex = category.timeline.findIndex(el=>{
        const timeDate = new Date (el.start)
        const lol = timeDate.getTime()<now
        return lol
      })
      nowTimelineIndex>=0 && setTimelineIndex(nowTimelineIndex)
    },[])

useEffect(()=>{
  // console.log('timelineIndex',timelineIndex)
},[timelineIndex])

    useEffect(()=>{
      const nowLine = category && category.timeline.length>0 && category.timeline[timelineIndex].cards.map((el,i)=>{
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
      }
    }


    
    return (
  
        <div className={styles.category} style={{height: open? 'max-content' : '30px', }}>
          {/* {main && } */}
          { openTimlineModal && <ModalTimeline id={category._id} setModal={setOpenTimlineModal} boardId={board._id} timelineId={category.timeline[timelineIndex]._id} /> }
          
          <div className={styles.title} onClick={()=>setOpen(!open)} style={{backgroundColor: main? 'white' : '#FCFCFC',minWidth: '100%',}}>
             <div className={styles.tr} style={{gridTemplateColumns: `minmax(50px,1fr) 530px 530px repeat(${board.columns.length-2},250px) minmax(50px,1fr)`,minWidth: '100%', }}>
                 <span>
                   <img src={Path+'trash-sharp.png'} style={{width:'20px', height: '20px', marginLeft: '20px',marginTop:'9px'}}  title='удалить' onClick={()=>deleteCategoryHandler()}/>
                 </span>
                 <div style={{display: "flex", alignItems: 'center'}}>
                     {category.name}
                     {!main &&<img src={Path+'openicon.png'} style={{transform: `rotate(${open?'0':'180'}deg)`, marginLeft: '10px', width: '15px'}}></img>}
                     
                      <div className={styles.backLogButton} onClick={(e)=>{
                          e.stopPropagation()
                          setOpenTimlineModal(true)
                      }}>
                        <img alt='plus' src={Path+'plus1.png'}className={styles.backLogPlus} style={{filter:'invert(0)'}}></img>
                        <ButtonTextLight color='black'style={{fontStyle:'italic'}}>{!category.timeline[0]?.start? 'Добавить таймлайн' : 'Изменить таймлайн'}</ButtonTextLight>
                      </div> 
                      
                      {category.timeline[timelineIndex].start && 
                      <div style={{display: "flex", marginLeft: '20px', alignItems: 'center', border: '1px solid lightgrey', borderRadius: '13px', padding: '0 10px 0 10px'}} onClick={e=>e.stopPropagation()}>
                        {timelineIndex>0 && <img src={Path+'openicon.png'} style={{transform: 'rotate(-90deg)', width: '10px', height: '10px', marginRight: '15px'}} onClick={(e)=>prevTimeline(e)}/>}
                        <TimelineDates timeline={category.timeline[timelineIndex]} />
                        {timelineIndex==category.timeline.length-1?
                        <img src={Path+'plus1.png'} style={{width: '10px', height: '10px', marginLeft: '15px'}} onClick={(e)=>nextTimeline(e)}/>
                        :
                        <img src={Path+'openicon.png'} style={{transform: 'rotate(90deg)', width: '10px', height: '10px', marginLeft: '15px'}} onClick={(e)=>nextTimeline(e)}/>}
                      </div>}
                 </div>
                 <span/>
                 <span/>
                 <span/>
             </div> 
          </div>

          
        
          <div className={styles.tr} style={{gridTemplateColumns: `minmax(50px,1fr) 530px 530px repeat(${board.columns.length-2},250px) minmax(50px,1fr)`,minWidth: '100%',}}>
            <span/>
            {board.columns.map((el,i)=>{
              return(
                <KanbanSectionTd history={history} key={i} category={category} timelineId={category.timeline[timelineIndex]?._id} timelineCards={timelines} column={el} boardId={board._id} />
              )
            })}
            <span/>
          </div>
        </div>
   
    );    
}



export default KanbanSection


const TimelineDates = ({timeline}) => {

  const a = new Date(timeline?.start)
  const b = new Date(timeline?.end)
  const start = a.getDate()
  const end = b.getDate()
  const months = ['янв','фев','март','апр','мая','июня','июля','авг','сент','окт','нояб','дек',]
  const monthStart = months[a.getMonth()]
  const monthEnd = months[b.getMonth()]

  if(!timeline.start){
    return <div></div>
  }
  return(
    <div> {start} {monthStart!==monthEnd && monthStart} - {end+' '+monthEnd}</div>
  )
}