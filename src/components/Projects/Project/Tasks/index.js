









import { useEffect } from "react"
import { useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import style from '../../../../Styles/modules/components/Project/allproj.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";





const Sprints = () => {
    const project = useSelector(state => state.projects.project)
    useEffect(()=>{
        console.log(project)
    },[])

    return (
      <div className={style.main}>
     
          <NEW_TABLE style={{border:'none', marginTop:'25px'}}>
            <NEW_THEAD>
              <NEW_TR className={style.first} top="top">
                <NEW_TH style={{textAlign:'left'}} >Название </NEW_TH>
                
                <NEW_TH
               
                  className={style.turn__off__1450}
                >
                  Начало
                </NEW_TH>
                <NEW_TH className={style.turn__off__1450}>
                    Дедлайн
                </NEW_TH>
                <NEW_TH>
                    Закрытие
                </NEW_TH>
                <NEW_TH className={style.turn__off__700}>Теги </NEW_TH>
                
                <NEW_TH className={style.turn__off}>Задачи</NEW_TH>
            </NEW_TR>
            </NEW_THEAD>
           
          <NEW_TBODY>
            {project && project.sprints.map((sprint, index) =>
              {
                return (
                  <NEW_TR
                    key={index}
                    title="Открыть проект"
                  >
                    <NEW_TD>{sprint.title}</NEW_TD>
                    <NEW_TD className={style.turn__off__1450}>{getDate(sprint.dateOpen)}</NEW_TD>
                    <NEW_TD className={style.turn__off__1450}>{sprint.dateClosePlan&&(getDate(sprint.dateClosePlan))}</NEW_TD>
                    <NEW_TD style={{ minWidth:'100%' }}>{sprint.dateCloseFact&&(getDate(sprint.dateCloseFact))}</NEW_TD>
                    <NEW_TD className={style.turn__off__700} style={{ paddingTop: "15px"}}>
                            {sprint.tags !== undefined
                                                ? sprint.tags.map((tag, i) => {
                                                    return (
                                                    <Tag
                                                        projectPage={true}
                                                        crypt={project.crypt}
                                                        tagText={tag}
                                                        tagColor="#C8D9E9"
                                                        size="13"
                                                        key={i}
                                                        style={{marginRight:`${i===0?'20px':'0px'}`}}
                                                    ></Tag>
                                                    );
                                                })
                                                :'' }

                    </NEW_TD>
                    
                    <NEW_TD className={style.turn__off}>
                    <div style={{ display: "flex"}}>
                        
                        <div className={sprintCss.card__thing}>
                        <div
                            style={{
                            width: `${Math.trunc((sprint.tasks.filter(task=>task.taskStatus).length / sprint.tasks.length) * 100)}%`,
                            }}
                            className={sprintCss.card__thing__full}
                        ></div>
                    </div><Light style={{ width: "40px" }}>
                        {sprint.tasks.filter(task=>task.taskStatus).length}/{sprint.tasks.length}
                        </Light></div>
                    </NEW_TD>
              
                  </NEW_TR>
                );
              })}
              </NEW_TBODY>
          </NEW_TABLE>
       
      </div>
    );    
}



export default Sprints