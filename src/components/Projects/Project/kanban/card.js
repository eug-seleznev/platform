import { useEffect, useState } from "react"
import { useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './kanban.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";





const KanbanCard = () => {
    const project = useSelector(state => state.projects.project)
    const [sideOpen, setSideOpen] = useState(false)

    return (
      <div className={styles.card}>
        
      </div>
    );    
}



export default KanbanCard