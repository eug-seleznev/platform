import { useEffect, useState } from "react"
import { useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './kanban.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";
import KanbanCard from "./card/card";
import KanbanSectionTd from "./sectionTd";





const KanbanSection = ({main, board, category}) => {
    const project = useSelector(state => state.projects.project)
    const [open, setOpen] = useState(false)

    return (
  
        <div className={styles.category} style={{height: main? 'max-content' : open? 'max-content' : '30px'}}>
          <div className={styles.title} onClick={()=>setOpen(!open)} style={{backgroundColor: main? 'white' : '#FCFCFC'}}>
            {!main? 
            <div className={styles.tr}>
                <span/>
                <div>
                    {category.name}
                </div>
                <span/>
                <span/>
                <span/>
            </div> :
            <div className={styles.tr}>
              <span/>
                {board.columns.map((el,i)=>{
                  return(
                    <div className={styles.titleTd}>
                      {el}
                    </div>
                  )
                })}
                <span/>
            </div>
            }
          </div>
          <div className={styles.tr}>
            <span/>
            {board.columns.map((el,i)=>{
              return(
                <KanbanSectionTd twoColumns={i===0? true : i===1? true : false} category={category} column={el} />
              )
            })}
            <span/>
          </div>
        </div>
   
    );    
}



export default KanbanSection