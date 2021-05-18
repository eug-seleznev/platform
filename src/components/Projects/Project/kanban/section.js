import { useEffect, useState } from "react"
import { useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './kanban.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";
import KanbanCard from "./card";





const KanbanSection = ({main}) => {
    const project = useSelector(state => state.projects.project)
    const [open, setOpen] = useState(false)

    return (
  
        <div className={styles.section} style={{height: open? 'max-content' : '30px'}}>
          <div className={styles.title} onClick={()=>setOpen(!open)}>
            {!main? 
            <div className={styles.tr}>
                <span/>
                <div>
                    Тайтл задач
                </div>
                <span/>
                <span/>
                <span/>
            </div> :
            <div className={styles.tr}>
              <span/>
                <div className={styles.titleTd}>
                    В работе
                </div>
                <div className={styles.titleTd}>
                    Готово
                </div>
                <div className={styles.titleTd}>
                    Просрочено
                </div>
                <span/>
            </div>
            }
          </div>
          <div className={styles.tr}>
            <span/>
            <div className={styles.td} style={{gridTemplateColumns:'max-content max-content'}}>
              <KanbanCard />
              <KanbanCard />
              <KanbanCard />
            </div>
            <div className={styles.td} style={{gridTemplateColumns:'max-content max-content'}}>
              <KanbanCard />
            </div>
            <div className={styles.td}>
              <KanbanCard />
            </div>
            <span/>
          </div>
        </div>
   
    );    
}



export default KanbanSection