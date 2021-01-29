import { useSelector } from "react-redux"
import { Card } from "../../Styles/common"
import { H1, H3} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/allproj.module.css'
const { Container, Title,} = require("../../Styles/common")
const { Table, Tr, Td } = require("../../Styles/tables")






const MyProjects = ({history}) => {
    const projects = useSelector(state => state.auth.user.projects)
    return (
        <div>
            <Card>
             <H1>Мои проекты</H1>
            {!projects ? <p> проектов нет  </p>: (

            <Table>
                <Tr className={style.tr} top='top'> 
                    <Td>Название</Td>
                    <Td className={style.turn__off}>Дата начала</Td>
                    <Td>Дедлайн</Td>
                    <Td className={style.turn__off}>Статус</Td>
                    <Td>Спринты</Td>
                </Tr>
          
                {projects.map((project,index) => {
                    return(  
                    <Tr className={style.tr} key={index} onClick={() => history.replace(`/projects/${project.crypt}`)} title="Открыть проект">
                    
                        <Td>{project.title}</Td>
                        <Td className={style.turn__off}>{project.dateStart.slice(0, 10)}</Td>
                        <Td>{project.dateFinish!==undefined?project.dateFinish.slice(0, 10):'нет'}</Td>
                        <Td className={style.turn__off}>{project.status ? <p>Завершен</p>:<p>В работе</p>}</Td>
                        <Td>{project.sprints.filter(sprint => sprint.status).length}/{project.sprints.length}</Td>
                    </Tr>
                    )
                })}
                
           
            </Table>
                        )}
            </Card>
        </div> 
    )
}


export default MyProjects