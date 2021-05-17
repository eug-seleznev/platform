import { useEffect, useState } from "react"
import { useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './kanban.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";
import KanbanCard from "./card";
import KanbanSection from "./section";





const Sprints = () => {
    const project = useSelector(state => state.projects.project)
    const [sideOpen, setSideOpen] = useState(false)

    return (
      <div className={styles.main} style={{gridTemplateColumns: sideOpen? '386px 1fr' : '50px 1fr'}}>
        <div 
          className={styles.backLog} 
          onClick={()=>setSideOpen(!sideOpen)}
          >
          тут 
        </div>
        <div className={styles.content}>
          <KanbanSection />
          <KanbanSection />
          <KanbanSection />
          <KanbanSection />
        </div>
      </div>
    );    
}



export default Sprints