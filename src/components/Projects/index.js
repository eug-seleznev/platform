




//профиль пользователя по ID
import './projects.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"



import { allProjects } from '../../redux/actions/projects';

import style from '../../Styles/modules/components/Project/allproj.module.css'
import { Table, Tr, Td } from '../../Styles/tables';
import { Card, } from '../../Styles/common'
import { H1} from '../../Styles/typography'




const Projects = ({history}) => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects.projects)

    useEffect (()=>{
           dispatch(allProjects()) 
    }, [])


    
    if(!projects){
        return <p> loading...</p>
    }


    

    return (
  

       
           
                <div className='projects__grid'>
<Card>
            <H1> Проекты в работе</H1>
                    <p> количество проектов: {projects.length} </p>
                    <Table >
  
    <Tr className={style.trr} top='top'>
 
      <Td>Название</Td>
      <Td className={style.turn__off}>Дата начала</Td>
      <Td className={style.turn__off}>Дедлайн</Td>
      <Td className={style.turn__off}>Статус</Td>
      <Td >Спринты</Td>

    </Tr>
   
   
       {projects.filter(project => !project.status).map((project,index) => {
           return(  
            <Tr className={style.tr}key={index} onClick={() => history.replace(`/projects/${project.crypt}`)} title="Открыть проект">
            
                <Td>{project.title}</Td>
                <Td className={style.turn__off}>{project.dateStart.slice(0, 10)}</Td>
                <Td className={style.turn__off}>{project.dateFinish!==undefined&&project.dateFinish!==null?project.dateFinish.slice(0, 10):'нет'}</Td>
                <Td className={style.turn__off}>{project.status ? <p>Завершен</p>:<p>В работе</p>}</Td>
                <Td>{project.sprints.filter(sprint => sprint.status).length}/{project.sprints.length}</Td>
            </Tr>
        )
       })}
     
  
</Table>
</Card>


<Card>
           

<H1 > Завершенные проекты</H1>


<Table>
  
    <Tr className={style.trr} top='top'>
        
      <Td>Название</Td>
      <Td className={style.turn__off}>Дата начала</Td>
      <Td className={style.turn__off}>Дедлайн</Td>
      <Td className={style.turn__off}>Статус</Td>
      <Td>Спринты</Td>
    </Tr>
 
       {projects.filter(project => project.status).map((project,index) => {
           return(  
        <Tr className={style.tr} key={index} onClick={() => history.replace(`/projects/${project.crypt}`)} title="Открыть проект">
         
            <Td>{project.title}</Td>
            <Td className={style.turn__off}>{project.dateStart.slice(0, 10)}</Td>
            <Td className={style.turn__off}>{project.dateFinish!==undefined&&project.dateFinish!==null?project.dateFinish.slice(0, 10):'нет'}</Td>
            <Td className={style.turn__off}>{project.status ? <p>Завершен</p>:<p>В работе</p>}</Td>
            <Td>{project.sprints.filter(sprint => sprint.status).length}/{project.sprints.length}</Td>
        </Tr>
        )
       })}
     
 
    </Table>
</Card>
                </div>
        
     
    )    
}



export default Projects