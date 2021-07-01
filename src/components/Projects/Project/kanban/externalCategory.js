import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from './kanban.module.css'
import { Path } from "../../../Layout/header";
import {removeExternalCategory } from "../../../../redux/actions/kanban";
import ConfirmModal from "./confirm";
import ModalMenu from "./modalMenu";
import ExternalCategoryTd from "./externalCategoryTd";
import ExternalExpiredColumn from "./externalExpiredTd";


const ExternalCategory = ({ board, category, history}) => {

  const dispatch = useDispatch()

    const [open, setOpen] = useState(true)
    const [timelineIndex, setTimelineIndex] = useState(0)
    const [timelines, setTimelines] = useState(0)
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
      console.log('index',timelineIndex)
      const nowLine = category && category.timeline.length>0 && category.timeline[timelineIndex] && category.timeline[timelineIndex].cards.map((el,i)=>{
        const newEl = {...el, huindex: i}
        return newEl
      })
      setTimelines(nowLine)
    },[timelineIndex,board])


    const stopMonitoring = (el) => {
      dispatch(removeExternalCategory(category._id,board._id))
    }



    
    return (
  <>
        <div className={styles.category} style={{height: open? 'max-content' : '32px', }}>
         
          <CategoryTitle 
              open={open} 
              setConfirm={setConfirm} 
              setOpen={setOpen} 
              category={category} 
              board={board}
            />
          <div className={styles.tr} style={{gridTemplateColumns: `minmax(50px,1fr) repeat(${category.columns.length+1},250px) minmax(50px,1fr)`,minWidth: '100%', pointerEvents:'none'}}>
            <span/>
            {category.columns.map((el,i)=>{
              return(
                <ExternalCategoryTd history={history} key={i} category={category} timelineId={category.timeline[timelineIndex]?._id} timelineCards={timelines} column={el} boardId={board._id} />
              )
            })}
            <ExternalExpiredColumn  history={history} category={category}   boardId={board._id} timelineId={category.timeline[timelineIndex]?._id} />
            <span/>
          </div>
        </div>
   

    <ConfirmModal visible={confirm} confirm={()=>stopMonitoring()} close={()=>setConfirm(false)} text={'колонку '+category.name} />
   </>
    );    
}



export default ExternalCategory



const CategoryTitle = ({open, setConfirm, setOpen, category, board, }) => {
  
  const theme = useSelector(state => state.auth.user.theme)

const buttons = [

  {
    title: 'Убрать из мониторинга',
    handler: ()=>setConfirm(true),
    icon: 'trash-sharp.png'

  },
]

  return(
    <div className={styles.title} onClick={()=>setOpen(!open)} style={{backgroundColor:'#FCFCFC',minWidth: '100%',color:theme?'white':'black',borderColor:'#C68F92'}}>
      <div className={styles.tr} style={{gridTemplateColumns: `minmax(50px,1fr) 530px 530px repeat(${board.columns.length-1},250px) minmax(50px,1fr)`,minWidth: '100%', }}>
          <span>
            <ModalMenu theme={theme} buttons={buttons}>
                <img src={Path+'three-dots.png'} style={{marginLeft: '20px',}} />
            </ModalMenu>
          </span>
          <div style={{display: "flex", alignItems: 'center', color:theme?'white':'black'}}>
              <div onClick={e=>e.stopPropagation()} >{category.name}</div>
              <img src={Path+'kanban-open-icon.png'} style={{transform: `rotate(${open?'180':'0'}deg)`, marginLeft: '5px', height: '8px',filter:theme?'invert(1)':'invert(0)'}} />
              <img alt='lock' />
          </div>
      </div> 
  </div>
  )
}