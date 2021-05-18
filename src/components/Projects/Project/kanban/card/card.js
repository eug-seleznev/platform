import { useState } from "react"

import styles from './card.module.css'

import { Light } from "../../../../../Styles/typography";

import CardOpen from "./cardOpen";





const KanbanCard = () => {
    const [cardOpen, setCardOpen] = useState(false)

    const cardClick = (e) => {
      e.stopPropagation()
      setCardOpen(true)
    }

    return (
      <>
      <div className={styles.card}
        style={{border:'1px solid green'}}
        onClick={(e)=>cardClick(e)}>
        <div className={styles.card__circuit}
        style={{backgroundColor:'green'}}></div>
        <div className={styles.card__content}>
          <Light size='16' style={{padding:'5px'}}>Кекция 1</Light>
          <div className={styles.card__content__second} >
            <div style={{display:'flex'}}>
              <Light size='12' >Обычная  </Light>
              <Light size='12' >3/7</Light>
            </div>
            <div style={{borderRadius:'100%',backgroundColor:'grey',width:'20px',height:'20px'}}>
            </div>
          </div>
        </div>
      </div>


      {cardOpen && 
        <CardOpen data={'task data'} close={()=>setCardOpen(false)} />
      }
      </>
    );    
}



export default KanbanCard