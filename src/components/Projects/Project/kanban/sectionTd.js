import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './kanban.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";
import KanbanCard from "./card/card";





const KanbanSectionTd = ({two}) => {
    const project = useSelector(state => state.projects.project)
    const [hower, setHower] = useState(false)
    const [addGhost, setAddGhost] = useState(false)
    const refBG = useRef(null)

    const dragOver = (e) => {
        e.preventDefault()
        refBG.current.style.backgroundColor = '#8b97c2'
        setAddGhost(true)
    }
    const dragOut = (e) => {
        e.preventDefault()
        refBG.current.style.backgroundColor='white'
        setAddGhost(false)
    }

    return (
  
     
            <div 
                ref={refBG}
                className={styles.td} 
                style={{
                    gridTemplateColumns: two? 'max-content max-content' : '1fr',
                    backgroundColor: hower? '#8b97c2' : 'white',
                    transitionDuration: '250ms'
                }} 
                onDragOver={e=>dragOver(e)}
                onDragLeave={e=>dragOut(e)}
                onMouseOver={()=>setHower(true)}
                onMouseOut={()=>setHower(false)}
                >
              <KanbanCard />
              <KanbanCard />
              <KanbanCard />
              {addGhost && <div className={styles.addGhost}/>}
            </div>
            
   
    );    
}



export default KanbanSectionTd