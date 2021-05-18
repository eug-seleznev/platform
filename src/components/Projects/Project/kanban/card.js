import { useEffect, useState } from "react"
import { createDispatchHook, useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './card.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";
import CardOpen from "./cardOpen";





const KanbanCard = () => {
    const [cardOpen, setCardOpen] = useState(false)

    const cardClick = (e) => {
      e.stopPropagation()
      setCardOpen(true)
    }

    return (
      <>
      <div className={styles.card} onClick={(e)=>cardClick(e)}>
        card content
      </div>


      {cardOpen && 
        <CardOpen data={'task data'} close={()=>setCardOpen(false)} />
      }
      </>
    );    
}



export default KanbanCard