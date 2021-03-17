import { useDispatch, useSelector } from "react-redux"
import { Card } from "../../Styles/common"
import { H1, H3, Regular} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/allproj.module.css'
import { useEffect } from "react"
import { background } from "../../redux/actions/user"
const { Container, Title,} = require("../../Styles/common")
const { Table, Tr, Td, New_table, New_Tr, New_thead, New_Th, New_Td, New_tbody } = require("../../Styles/tables")






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

            <New_table>
                <New_thead>
                    <New_Tr className={style.first} top='top'> 
                        <New_Th>Название</New_Th>
                        
                        <New_Th>Дедлайн</New_Th>
                        <New_Th className={style.turn__off}>Статус</New_Th>
                        <New_Th>Спринты</New_Th>
                    </New_Tr>
                </New_thead>
                
                <New_tbody>
                    {projects.map((project,index) => {
                    
                    return(  
                    <New_Tr className={style.tr} key={index} onClick={() => history.replace(`/projects/${project.crypt}`)} title="Открыть проект">
                    
                        <New_Td>{project.title}</New_Td>
                        
                        <New_Td>{project.dateFinish!==undefined&&project.dateFinish!==null?project.dateFinish.slice(0, 10):'нет'}</New_Td>
                        <New_Td className={style.turn__off}>{project.status ? <p>Завершен</p>:<p>В работе</p>}</New_Td>
                        <New_Td>{project.sprints.filter(sprint => sprint.status).length}/{project.sprints.length}</New_Td>
                    </New_Tr>
                    )
                })}
                </New_tbody>
                
                
           
            </New_table>
                        )}
         
        </div> 
    )
}


export default MyProjects