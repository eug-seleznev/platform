import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './kanban.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";
import KanbanCard from "./card/card";
import KanbanSection from "./section";
import Backlog from "./backlog";
import { addNewCard } from "../../../../redux/actions/kanban";
import CreateForm from "./createForm";





const Sprints = () => {
  const dispatch =useDispatch ()
  const project = useSelector(state=>state.projects.project)
  const backlog = useSelector(state=>state.projects.backlog)
  const [createOpen, setCreateOpen] =useState ({
    status:false,
    place:'backlog'
})
    const [sideOpen, setSideOpen] = useState(false)
    useEffect(()=>{
      console.log(backlog)
    },[backlog])
    return (
      <div className={styles.main} style={{gridTemplateColumns: sideOpen? '386px 1fr' : 'max-content 1fr'}}>
        <div 
          className={styles.backLog} 
          onClick={()=>setSideOpen(!sideOpen)}
          >
          <Backlog backlog={backlog} setCreateOpen={setCreateOpen} sideOpen={sideOpen}></Backlog>
            <div className={styles.verticalText}>
              Все задачи
            </div>
         
        </div>
        <div className={styles.content}>
          <KanbanSection main />
          <KanbanSection />
          <KanbanSection />
          <KanbanSection />
        </div>
        <div style={{display:createOpen.status?'block':'none'}}>
           <CreateForm crypt={project.crypt} setCreateOpen={setCreateOpen}></CreateForm>
        </div>
       
        
      </div>
    );    
}



export default Sprints