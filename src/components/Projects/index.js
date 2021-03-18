




//профиль пользователя по ID
import './projects.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



import { allProjects, sortProjects,searchObject, sortTitle, sorType } from '../../redux/actions/projects';
import search from '../../Styles/modules/components/Project/createPr.module.css'
import style from '../../Styles/modules/components/Project/allproj.module.css'
import { Table, Tr, Td, Select, New_table, New_tbody, New_thead, New_Td, New_Th, New_Tr } from '../../Styles/tables';
import { Card, } from '../../Styles/common'
import { Bold, H1, Light, Regular, Thin} from '../../Styles/typography'
import {Circle} from '../../Styles/project'
import { SearchInput } from '../../Styles/Forms';
import { ButtonText } from '../../Styles/buttons';
import { background } from '../../redux/actions/user';
import Tag from './components/OneProject/tag';
import { Link } from 'react-router-dom';

let  types = ["Все",'Архитектура', "Визуализация", "Сети", "Экстерьер", "Интерьер", "Ландшафт", "Конструкции", 'Другое']

const Projects = ({history, match, location}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const objectList = useSelector(state => state.projects.objectList)
    const projects = useSelector(state => state.projects.projects)
    const [orderSort, setOrder] = useState(false)
    const [search, setSearch] = useState('')
    const [activeField, setActiveField] = useState('Все')
    const [filter, setFilter] = useState('Все')
    useEffect (()=>{
      dispatch(allProjects()) 
    }, [])

  useEffect(() => {
    if(location.search){
      let value = location.search.split("?")[1];
      // console.log(field);
      setActiveField(value);
      let field = "type";
      console.log(field, activeField);
      dispatch(sorType({ field, activeField }));
    }
    

  }, []);
  useEffect(()=>{ 
    dispatch(background('white'))
    return () => {
      dispatch(background('#ECECEC'))
    }
  }, [])
  useEffect(()=>{
    if(search!==''){
       console.log(search)
      dispatch(searchObject(search))
    }
   
  },[search]) 
    if(!projects){
        return <p> loading...</p>
    }

  


    const sortFunction = (query) => {
        setOrder(!orderSort)
        dispatch(sortProjects({query, orderSort}))
    }

    const projectTitle = (e) => {
     
      let value = e.target.value;
      dispatch(sortTitle({value}))

    }
    const getSearchRes =()=>{
      let value = search;
      let field = "object";
      dispatch(sorType({field, value}))
      setSearch('')
    }
   
      
      

    
    const statusFilter = (e) => {
      // console.log(e.target.value)
      setFilter(e.target.value)

    }
    const projectType = (e) => {
      let field = 'type';
      let value = e.target.value;
      dispatch(sorType({field, value}))

    }


    return (
      <div className={style.main}>
          <Regular size='16' color='#3F496C' className={style.title}>Все проекты</Regular>
          <div className={style.row}>
            {user.permission!=='user' && 
             <div className={style.row__in}><Link to='/admin/newproject'>
               <ButtonText fontSize='14px' style={{fontFamily:'SuisseIntlSemibold'}}>Создать новый проект</ButtonText></Link>
              </div>}
             <div className={style.row__in}>
               <img src='/lupa.png' className={style.row__img}></img>
               <SearchInput size='14px' placeholder='Поиск по названию' name='title' onChange={projectTitle}></SearchInput>
             </div>
             <div className={style.row__in}>
               <img src='/lupa.png' className={style.row__img}></img>
               <div>
                <SearchInput size='14px' placeholder='Поиск по объекту' value={search} onChange={(e)=>{setSearch(e.target.value)}}></SearchInput>
                <div className={style.input} style={{display:`${search===''?'none':'block'}`}} >
                  {objectList.map((el,i)=>{
                    return(
                      <Thin className={style.searchRes}key={i} onClick={()=>{setSearch(el)}}>{el}</Thin>
                    )
                  })}
                </div>
                <ButtonText style={{marginLeft:'10px'}} onClick={getSearchRes}>Искать</ButtonText>
               </div>
              
             </div>
             <div className={style.row__in}>
              <Thin size='14'>
                  Проектов в работе: {projects
                .filter((project) => !project.status).length}
              </Thin>
             </div>
             <div className={style.row__in}>
               <Bold size='14'>Фильтр:</Bold>
               <Select style={{fontSize:'14px'}}
                onChange={statusFilter}>
                <option>Все</option>
                <option>В работе</option>
                <option>Завершенные</option>
               </Select>
             </div>
          </div>
          <New_table style={{border:'none'}}>
            <New_thead>
              <New_Tr className={style.first} top="top">
                <New_Th onClick={() => sortFunction("title")}>Название &#8597;</New_Th>
                
                <New_Th
                  onClick={() => sortFunction("dateStart")}
                  className={style.turn__off}
                >
                  Начало проекта &#8597;
                </New_Th>
                <New_Th
                  onClick={() => sortFunction("dateFinish")}
                
                >
                  Дедлайн &#8597;
                </New_Th>
                <New_Th  className={style.turn__off}>
                  <form>
                    <Select  onChange={projectType} defaultValue='Тип'name='type' style={{width:'100%'}}>
                      {types.map((type) => {
                        return <option value={type}>{type}</option>;
                      })}
                    </Select>
                  </form>
                </New_Th>
                <New_Th onClick={() => sortFunction("status")} >Статус &#8597;</New_Th>
                <New_Th>Объект </New_Th>
                
                <New_Th className={style.turn__off}>Спринты</New_Th>
            </New_Tr>
            </New_thead>
           
          <New_tbody>
            {projects
              .filter((project) =>  filter==='В работе'? !project.status: 
              filter==='Завершенные'?project.status: project)
              .map((project, index) =>




              {
                return (
                  <New_Tr
                    
                    key={index}
                    onClick={() =>
                      history.push(`/projects/${project.crypt}`)
                    }
                    title="Открыть проект"
                  >
                    <New_Td>{project.title}</New_Td>
                    <New_Td className={style.turn__off}>
                      {project.dateStart.slice(0, 10)}
                    </New_Td>
                    <New_Td >
                      {project.dateFinish !== undefined &&
                      project.dateFinish !== null
                        ? project.dateFinish.slice(0, 10)
                        : "нет"}
                    </New_Td>
                    <New_Td className={style.turn__off} style={{paddingTop:'10px'}}><Tag tagText={project.type}
                            tagColor={project.type==="Архитектура"?"#C8DDE9":
                            project.type==="Конструкции" ?"#E9E3C8":
                            project.type==="Интерьер"?"#B4FAF6":
                            project.type==="Ландшафт"?"#68D286":
                            project.type==="Сети"?"#F1EFEF":"#C8DDE9"}></Tag></New_Td>
                    <New_Td style={{paddingTop:'10px'}}>
                      {project.status ? <Tag tagText="Завершен" tagColor="#F1EFEF" ></Tag> : <Tag tagText="В работе" tagColor="#AAF790" ></Tag>}
                    </New_Td>
                    <New_Td style={{paddingTop:'10px'}}>
                      {project.object}
                    </New_Td>
                    <New_Td className={style.turn__off}>
                      {project.sprints.filter((sprint) => !sprint.status)
                        .length >= 1 ? (
                        <Circle green />
                      ) : (
                        <Circle red />
                      )}
                    </New_Td>
                  </New_Tr>
                );
              })}
              </New_tbody>
          </New_table>
        

       
          {/* <H1> Завершенные проекты</H1>

          <Table>
            <Tr className={style.trr} top="top">
              <Td>Название</Td>
              <Td className={style.turn__off}>Дата начала</Td>
              <Td className={style.turn__off}>Дедлайн</Td>
              <Td className={style.turn__off}>Тип</Td>
              <Td className={style.turn__off}>Статус</Td>
              <Td className={style.turn__off}>Объект</Td>
              <Td>Спринт</Td>
            </Tr>

            {projects
              .filter((project) => project.status)
              .map((project, index) => {
                return (
                  <Tr
                    className={style.tr}
                    key={index}
                    onClick={() =>
                      history.replace(`/projects/${project.crypt}`)
                    }
                    title="Открыть проект"
                  >
                    <Td>{project.title}</Td>
                    <Td className={style.turn__off}>
                      {project.dateStart.slice(0, 10)}
                    </Td>
                    <Td className={style.turn__off}>
                      {project.dateFinish !== undefined &&
                      project.dateFinish !== null
                        ? project.dateFinish.slice(0, 10)
                        : "нет"}
                    </Td>
                    <Td className={style.turn__off}>
                      {project.status ? <p>Завершен</p> : <p>В работе</p>}
                    </Td>
                    <Td>
                      {project.sprints.filter((sprint) => sprint.status).length}
                      /{project.sprints.length}
                    </Td>
                  </Tr>
                );
              })}
          </Table> */}
       
      </div>
    );    
}



export default Projects