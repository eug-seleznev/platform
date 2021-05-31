import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"




import styles from './kanban.module.css'
import KanbanSectionTd from "./sectionTd";
import { Path } from "../../../Layout/header";
import { deleteCategory } from "../../../../redux/actions/kanban";
import { ButtonTextLight } from "../../../../Styles/buttons";
import ModalTimeline from "./modalTimeline";






const KanbanSection = ({main, board, category, history}) => {
  const dispatch = useDispatch()
    const [open, setOpen] = useState(true)
    const [timelineIndex, setTimelineIndex] = useState(0)
    const [openTimlineModal, setOpenTimlineModal] = useState(false)

    useEffect(()=>{
      
    },[])


    // console.log('category',category)
    const timelines = category && category.timeline.length>0 && category.timeline[0].cards.map((el,i)=>{
      const newEl = {...el, huindex: i}
      return newEl
    })
    // console.log('timelaaaaaans', timelines)
    const deleteCategoryHandler = (el) => {
      dispatch(deleteCategory(board._id,category._id))
    }

    return (
  
        <div className={styles.category} style={{height: open? 'max-content' : '30px', }}>
          {/* {main && } */}
          { openTimlineModal && <ModalTimeline id={category._id} setModal={setOpenTimlineModal} /> }
          
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
                        <ButtonTextLight color='black'style={{fontStyle:'italic'}}>Добавить таймлайн</ButtonTextLight>
                      </div>
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
                <KanbanSectionTd history={history} key={i} category={category} timelineId={category.timeline[0]?._id} timelineCards={timelines} column={el} boardId={board?._id} />
              )
            })}
            <span/>
          </div>
        </div>
   
    );    
}



export default KanbanSection