import { useEffect, useState } from "react"

import styles from './card.module.css'

import { Light } from "../../../../../Styles/typography";

import CardOpen from "./cardOpen";





const KanbanCard = ({info}) => {
    const [cardOpen, setCardOpen] = useState(false)

    const cardClick = (e) => {
      e.stopPropagation()
      setCardOpen(true)
    }
    useEffect(()=>{
      console.log (info)
    },[info])
    return (
      <>
      <div className={styles.card}
        draggable
        style={{border:'1px solid green'}}
        onClick={(e)=>cardClick(e)}>
        <div className={styles.card__circuit}
        style={{backgroundColor:'green'}}></div>
        <div className={styles.card__content}>
          <Light size='16' style={{padding:'5px'}}></Light>
          <div className={styles.card__content__second} >
            <div style={{display:'flex'}}>
              <Light size='12' > </Light>
              <Light size='12' >3/7</Light>
            </div>
            <div style={{borderRadius:'100%',backgroundColor:'grey',width:'20px',height:'20px'}}>
            </div>
          </div>
        </div>
      </div>


      {cardOpen && info && 
        <CardOpen isOpen={cardOpen} info={info} data={'task data'} close={()=>setCardOpen(false)} />
      }
      </>
    );    
}



export default KanbanCard