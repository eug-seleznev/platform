import './projects.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { allProjects } from '../../redux/actions/projects';
import { Table, Tr, Td } from '../../Styles/tables';
import { Container, Card,  } from '../../Styles/common';
import { H1, H3} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/allproj.module.css'

const ProjectsEdit = ({history}) => {
    const dispatch = useDispatch();
    // const auth = useSelector(state => state.auth.isAuthenticated)
    const loaded = useSelector(state => state.projects.loadedAllProj)
    const projects = useSelector(state => state.projects.projects)


    useEffect(() => {
        // console.log ('hi')
        dispatch(allProjects())
    }, [])
    
    return (
        <div> 
            <Card>
            <H1>Редактировать проекты</H1>
            {!loaded ? <p>loading...</p> : (
                <div>
                    <p> количество проектов: {projects.length} </p>
                    <Table>
  
    <Tr className={style.tr} top>
        
      <Td>Название</Td>
      <Td className={style.turn__off}>Дата начала</Td>
      <Td>Дедлайн</Td>
      <Td className={style.turn__off}>Статус</Td>
      <Td>Спринты</Td>
    </Tr>
 
       {projects.map((project,index) => {
           return(  
        <Tr className={style.tr} key={index} onClick={() => history.replace(`/admin/editproj/${project.crypt}`)} title="Открыть проект">
           
            <Td>{project.title}</Td>
            <Td className={style.turn__off}>{project.dateStart.slice(0, 10)}</Td>
            <Td>{project.dateFinish!==undefined&&project.dateFinish!==null?project.dateFinish.slice(0, 10):'нет'}</Td>
            <Td className={style.turn__off}>{project.status ? <p>Завершен</p>:<p>В работе</p>}</Td>
            <Td>{project.sprints.filter(sprint => sprint.status).length}/{project.sprints.length}</Td>
        </Tr>
        )
       })}
     
 
</Table>
                </div>
            )}
            </Card>
        </div>
    )
}


export default ProjectsEdit