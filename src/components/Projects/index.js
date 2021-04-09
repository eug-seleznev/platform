




//профиль пользователя по ID

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



import { allProjects, sortProjects,searchObject, sortTitle, sorType, clearSprint } from '../../redux/actions/projects';

import style from '../../Styles/modules/components/Project/allproj.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../Styles/tables';

import { Bold, Regular, Thin} from '../../Styles/typography'
import {Circle} from '../../Styles/project'
import { SearchInput } from '../../Styles/Forms';
import { ButtonText } from '../../Styles/buttons';
import { background } from '../../redux/actions/user';
import Tag from './components/OneProject/tag';
import { Link } from 'react-router-dom';



let field = "type";

let  types = ["Все",'Архитектура', "Визуализация", "Сети", "Экстерьер", "Интерьер", "Ландшафт", "Конструкции", 'Другое']

const Projects = ({history,location}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const objectList = useSelector(state => state.projects.objectList)
    const projects = useSelector(state => state.projects.projects)
    const [orderSort, setOrder] = useState(false)
    const [search, setSearch] = useState('')
    // const [activeField, setActiveField] = useState('Все')
    const [filter, setFilter] = useState('Все')

    const [value] = useState(
      decodeURI(location.search).split("?")[1]
    );
  

    useEffect (()=>{
      dispatch(allProjects()) 
      dispatch(clearSprint());
      // console.log('emm?')
    }, [])

  useEffect(() => {
    if(location.search){
      // console.log(decodeURI(location.search))
      // let value = location.search.split("?")[1];

      // value = decodeURI(value);
      // setActiveField(decodeURI(value));
      // console.log(value)
      // console.log(field, activeField);
      


      dispatch(sorType({ field, value }));
    } else {
       
         dispatch(allProjects());
       
    }
    

  }, []);
  useEffect(()=>{ 
    dispatch(background('white'))
    return () => {
      dispatch(background('#ECECEC'))
    }
  }, [])
  useEffect(()=>{
    // if(search!==''){
      //  console.log(search)
      dispatch(searchObject(search))
      let value = search;
      let field = "object";
      dispatch(sorType({field, value}))
    // }
   
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
    // const getSearchRes =()=>{
    //   let value = search;
    //   let field = "object";
    //   dispatch(sorType({field, value}))
    //   setSearch('')
    // }
   
      
      

    
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
               <img alt='lupa'  src='/lupa.png' className={style.row__img}></img>
               <SearchInput size='14px' placeholder='Поиск по названию' name='title' onChange={projectTitle}></SearchInput>
             </div>
             <div className={style.row__in}>
               <img alt='lupa' src='/lupa.png' className={style.row__img}></img>
               <div>
                <SearchInput size='14px' placeholder='Поиск по объекту' value={search} onChange={(e)=>{setSearch(e.target.value)}}></SearchInput>
                <div className={style.input} style={{display:`${search===''?'none':'block'}`}} >
                  {objectList.map((el,i)=>{
                    return(
                      <Thin className={style.searchRes}key={i} onClick={()=>{setSearch(el)}}>{el}</Thin>
                    )
                  })}
                </div>
                {/* <ButtonText style={{marginLeft:'10px'}} onClick={getSearchRes}>Искать</ButtonText> */}
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
          <NEW_TABLE style={{border:'none'}}>
            <NEW_THEAD>
              <NEW_TR className={style.first} top="top">
                <NEW_TH style={{textAlign:'left'}} onClick={() => sortFunction("title")}>Название &#8597;</NEW_TH>
                
                <NEW_TH
                  onClick={() => sortFunction("dateStart")}
                  className={style.turn__off}
                >
                  Начало проекта &#8597;
                </NEW_TH>
                <NEW_TH
                  onClick={() => sortFunction("dateFinish")}
                
                >
                  Дедлайн &#8597;
                </NEW_TH>
                <NEW_TH className={style.turn__off}>
                  <form>
                    <Select  onChange={projectType} defaultValue='Тип'name='type' style={{width:'100%'}}>
                      {types.map((type,i) => {
                        return <option key={i} value={type}>{type}</option>;
                      })}
                    </Select>
                  </form>
                </NEW_TH>
                <NEW_TH  onClick={() => sortFunction("status")} >Статус &#8597;</NEW_TH>
                <NEW_TH >Объект </NEW_TH>
                
                <NEW_TH className={style.turn__off}>Спринты</NEW_TH>
            </NEW_TR>
            </NEW_THEAD>
           
          <NEW_TBODY>
            {projects
              .filter((project) =>  filter==='В работе'? !project.status: 
              filter==='Завершенные'?project.status: project)
              .map((project, index) =>




              {
                return (
                  <NEW_TR
                    key={index}
                    onClick={() => history.push(`/projects/${project.crypt}/main`)}
                    title="Открыть проект"
                  >
                    <NEW_TD>{project.title}</NEW_TD>
                    <NEW_TD className={style.turn__off}>
                      {project.dateStart.slice(0, 10)}
                    </NEW_TD>
                    <NEW_TD>
                      {project.dateFinish !== undefined &&
                      project.dateFinish !== null
                        ? project.dateFinish.slice(0, 10)
                        : "нет"}
                    </NEW_TD>
                    <NEW_TD
                      className={style.turn__off}
                      style={{ paddingTop: "10px" }}
                    >
                      <Tag
                        tagText={project.type}
                        tagColor={
                          project.type === "Архитектура"
                            ? "#C8DDE9"
                            : project.type === "Конструкции"
                            ? "#E9E3C8"
                            : project.type === "Интерьер"
                            ? "#B4FAF6"
                            : project.type === "Ландшафт"
                            ? "#68D286"
                            : project.type === "Сети"
                            ? "#F1EFEF"
                            : "#C8DDE9"
                        }
                      ></Tag>
                    </NEW_TD>
                    <NEW_TD style={{ paddingTop: "10px" }}>
                      {project.status ? (
                        <Tag tagText="Завершен" tagColor="#F1EFEF"></Tag>
                      ) : (
                        <Tag tagText="В работе" tagColor="#CCE9C8"></Tag>
                      )}
                    </NEW_TD>
                    <NEW_TD style={{ paddingTop: "10px" }}>
                      {project.object}
                    </NEW_TD>
                    <NEW_TD className={style.turn__off}>
                      {project.sprints.filter((sprint) => !sprint.status)
                        .length >= 1 ? (
                        <Circle color="green" />
                      ) : (
                        <Circle color="red" />
                      )}
                    </NEW_TD>
                  </NEW_TR>
                );
              })}
              </NEW_TBODY>
          </NEW_TABLE>
        

       
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