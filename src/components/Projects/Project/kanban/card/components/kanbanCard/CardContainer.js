import styles from '../../card.module.css'
import { useDispatch, useSelector } from "react-redux";
import { currentCard,} from "../../../../../../../redux/actions/kanban";


const CardContainer = ({info, currCategory, timelineId, backlog, addGhost, expired, setCardOpen, ...props}) => {

    const dispatch = useDispatch()
    const theme = useSelector(state=>state.auth.user.theme)

    
    const cardClick = (e) => {
      e.stopPropagation()
      dispatch(currentCard(info))
      setTimeout(()=>{
        setCardOpen(true)
      },300)
      
    }
 
  
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
 
  
 
    return (
      <div onDragOver={addGhost} className={styles.card}
        draggable
        onDragStart={(e)=>dragStart(e)}
        onClick={(e)=>cardClick(e)}
        style={{
          zIndex:1000,
          backgroundColor:!theme?'white':'#1E1E1E',
          border:
          info?.emergency==='Событие'?'1px solid #9CE3B0':
          info?.emergency==='Обычная'?'1px solid #648FC6':
          info?.emergency==='Критическая'?'1px solid #D83B44':
          info?.emergency==='Срочная'?'1px solid #FFB21D':'1px solid #648FC6'}}
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
            {props.children}
        </div>
      </div>

    );    
}



export default CardContainer
