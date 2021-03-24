import { useDispatch, useSelector } from "react-redux"
import { Regular} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/allproj.module.css'
import { useEffect } from "react"
import { background } from "../../redux/actions/user"

const {NEW_TBODY, NEW_TABLE, NEW_THEAD, NEW_TH, NEW_TR, NEW_TD } = require("../../Styles/tables")






const MyProjects = ({history}) => {
    const projects = useSelector(state => state.auth.user.projects)
    const dispatch = useDispatch()
    useEffect(()=>{ 
        dispatch(background('white'))
        return () => {
          dispatch(background('#ECECEC'))
        }
      }, [])
    return (
        <div>
           
           <Regular size='16' color='#3F496C' className={style.title}>Мои проекты</Regular>
            {!projects ? <p> проектов нет  </p>: (

            <NEW_TABLE>
                <NEW_THEAD>
                    <NEW_TR className={style.first} top='top'> 
                        <NEW_TH>Название</NEW_TH>
                        
                        <NEW_TH>Дедлайн</NEW_TH>
                        <NEW_TH className={style.turn__off}>Статус</NEW_TH>
                        <NEW_TH>Спринты</NEW_TH>
                    </NEW_TR>
                </NEW_THEAD>
                
                <NEW_TBODY>
                    {projects.map((project,index) => {
                    
                    return(  
                    <NEW_TR className={style.tr} key={index} onClick={() => history.push(`/projects/${project.crypt}`)} title="Открыть проект">
                    
                        <NEW_TD>{project.title}</NEW_TD>
                        <NEW_TD>{project.dateFinish!==undefined&&project.dateFinish!==null?project.dateFinish.slice(0, 10):'нет'}</NEW_TD>
                        <NEW_TD className={style.turn__off}>{project.status ? <p>Завершен</p>:<p>В работе</p>}</NEW_TD>
                        <NEW_TD>{project.sprints.filter(sprint => sprint.status).length}/{project.sprints.length}</NEW_TD>
                    </NEW_TR>
                    )
                })}
                </NEW_TBODY>
                
                
           
            </NEW_TABLE>
                        )}
         
        </div> 
    )
}


export default MyProjects