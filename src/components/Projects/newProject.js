import  {useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allProjects, getProject, newProject } from '../../redux/actions/projects';
import { newTicket } from '../../redux/actions/tikets';
import style from '../../Styles/modules/components/Project/createPr.module.css'

import {Container, Card, Title, ModalContainer,} from '../../Styles/common'
import { Button, CancelButton } from '../../Styles/buttons';
import { Bold, H1, H3, Light, Regular, Thin} from '../../Styles/typography'
import { allUsers, searchUser, background } from '../../redux/actions/user';

const ProjectNew = ({history,closeWindow}) => {
    const dispatch = useDispatch();
    const project = useSelector(state => state.projects.project)
    const userList = useSelector(state => state.users.users)
    const createMsg = useSelector (state => state.messages.msg)
    const searchResult = useSelector(state => state.users.searchResult)
    const [checked, setChecked] = useState (false)
    const [menu, setMenu] = useState (false)
    const [trick, setTrick] = useState (false)
    const [step, setStep] = useState (1)
    const [idCurrent, setIdCurrent] = useState (null)
    const [currentPos, setCurrentPos] = useState ('')
    const [userStage, setUserStage] = useState (1)
    const [idList,setIdList] = useState ([])
    const [nameCurrent, setNameCurrent] = useState (null)
    const [workerDataList, setWorkerDataList] = useState ({
      task:'работать'
    })
    const [formData, setFormData ] = useState({
        
        title: '',   
        dateStart: '', 
        city: '',  
        type: 'ЖК',
        stage: 'Концепт',
        par:'ХХ',
        dateFinish: '',
        customer: '',
        about: '',
        rcheck: false,
        userid2: [],
        offTitle:'',
        budget:'',
        schedule:'',
        cusStorage:'',
        object:'',
      });
   


      const { title, dateStart, dateFinish, city, type, stage, customer, about, par, object, offTitle, budget, schedule,cusStorage,userid2 } = formData;
      const posCurrent =(e)=>{
        setCurrentPos (e.target.value)
        setWorkerDataList ({ ...workerDataList, position:e.target.value})
        console.log (workerDataList)
      }
      const pushUserToForm =(e)=>{
          formData.userid2.push(workerDataList)
          setWorkerDataList({task:'работать'})
          setNameCurrent(null)
          setCurrentPos('')
          setUserStage(1)
      }
      //смена фона
      useEffect(()=>{ 
        dispatch(background('white'))
        return () => {
          dispatch(background('#ECECEC'))
        }
      }, [])
      // const alertReq =()=>{
      //   alert('yf[ blb')
      // }
     useEffect(()=>{
       if(createMsg!==undefined) {
          if(createMsg.includes('Проект')){
          setTimeout(() => {
            history.push('./../projects')
          },100) 
        }
       }
       
     },[createMsg])
     //
      const returnToSearch =()=>{
        setUserStage(1)
        idList.pop()
        setIdCurrent (null)
        console.log(idList)
      }
      const onChangeCheckbox = () => {
        setChecked(!checked)
     }
     useEffect(()=>{
        setFormData({ ...formData, rcheck: checked });
        console.log(checked)
     },[checked])
     useEffect(()=>{
      setWorkerDataList ({ ...workerDataList, user:idCurrent, fullname:nameCurrent})
      if(idCurrent!==null) {
         idList.push(idCurrent)
          console.log (idList)
      }
     
   },[idCurrent])

    //   useEffect(()=>{
    //     if(nameCurrent!=null&&!names.includes(idCurrent)) {
    //       names.push(nameCurrent)
    //       console.log(names)
    //       setTrick(!trick)
    //     }
    // },[nameCurrent])
   const nextStep =(step)=>{
     setStep(step)
   }
    const onChange = e => {
        e.preventDefault(); 
       
        setFormData({ ...formData, [e.target.name]: e.target.value });
     }
     
     const addUser = (user) => {
      setIdCurrent(user._id)
      setNameCurrent(user.fullname)
      setUserStage(2)
 }
     const PeopleList = (e) => {

          let request = e.target.value
          if(request.length>=3){
            setMenu(true)
            console.log(e.target.value)
            dispatch(searchUser(request))
          }
          else{
            setMenu(false)
          }
          
          
     }
     
     
     const onSubmit = async e => {
        setStep(1)
        e.preventDefault();
        console.log('submit')
        dispatch(newProject(formData))
        setIdList([])
        setTimeout(() =>
        setChecked (false),
        setFormData({
          title: '',   
          dateStart: '', 
          city: '',  
          type: 'ЖК',
          stage: 'Концепт',
          par:'ХХ',
          dateFinish: '',
          customer: '',
          about: '',
          rcheck: false,
          userid2: [],
          offTitle:'',
          budget:'',
          schedule:'',
          cusStorage:'',
          object:'',
        }),50) 
       
        
        
         
    
           
        }

    return (
      <div className={style.container_new_proj}>
        <div className={style.stages}>
          
          <div className={style.circle}>
            <div className={style.number} style={{borderColor: `${step===1?'#3F496C':'#B7B7B7'}`}}>1</div>
            <Regular >Информация о проекте</Regular>
          </div>
          <div className={style.line}></div>
          <div className={style.circle}>
            <div className={style.number} style={{borderColor: `${step===2?'#3F496C':'#B7B7B7'}`}}>2</div>
            <Regular >Команда проекта</Regular>
          </div>
          <div className={style.line}></div>
          <div className={style.circle}>
            <div className={style.number} style={{borderColor: `${step===3?'#3F496C':'#B7B7B7'}`}}>3</div>
            <Regular >Модель проекта</Regular>
          </div>
        </div> 
        <Bold size='25' className={style.form__title}>Создание нового проекта</Bold>
        <div className={style.info}>
        <div className={style.description}>
          <Bold size='22' style={{marginTop:'20px'}}>Страница создания нового проекта</Bold>
          <Light className={style.descr1}>На этой странице мы создаем проекты, добавляем сотрудников в команду и записываем необходимую общую информацию.</Light>
          <Light className={style.descr1}>При создании проекта создается закрытый канал в рокете, в который автоматически приглашаются все добавленные в команду (и зарегестрированные на платформе) сотрудники.</Light>
        </div>
        <form className={style.form2} onSubmit={onSubmit}>
       
        {step===1?(
           <div>  
             <div>
               <div className={style.row}>
                 <div className={style.input__mid}>
                   <div className={style.input__mid__important}><Thin className={style.title}>Название</Thin><div className={style.important}>*</div></div>
                   <input
                     className={style.input__long}
                     type="text"
                     name="title"
                     required
                     value={title}
                     onChange={(e) => onChange(e)}
                   />
                   
                 </div>
                 <div className={style.input__mid}>
                   <Thin className={style.title}>Официальное название</Thin>
                   <input
                     className={style.input__long}
                     type="text"
                     name="offTitle"
                     required
                     value={offTitle}
                     onChange={(e) => onChange(e)}
                   />
                   
                 </div>
                 
               </div>
               <div className={style.row}>
                   <div className={style.input__short}>
                     <Thin className={style.title}>Начало</Thin>
                     <input
                       type="date"
                       name="dateStart"
                       required
                       value={dateStart}
                       onChange={(e) => onChange(e)}
                     />
                   </div>
                   <div className={style.input__short}>
                     <Thin className={style.title}>Город</Thin>
                     <input
                       required
                       type="text"
                       name="city"
                       value={city}
                       onChange={(e) => onChange(e)}
                     />
                   </div>
                   <div className={style.input__short}>
                     <Thin className={style.title}>Дедлайн</Thin>
                     <input
                       type="date"
                       name="dateFinish"
                       required
                       value={dateFinish}
                       onChange={(e) => onChange(e)}
                     />
                  
                 </div>
   
                 
               </div>
               <div className={style.row}>
                 <div className={style.input__mid}>
                   <Thin className={style.title}>Стадия</Thin>
                   <select
                     defaultValue="Концепт"
                     name="stage"
                     onChange={(e) => onChange(e)}
                     
                     className={style.select}
                   >
                     <option value="Концепт">Концепт</option>
                     <option value="Эскиз">Эскиз</option>
                     <option value="Проект">Проект</option>
                     <option value="Рабочая">Рабочая</option>
                   </select>
                 </div>
                 <div className={style.input__rocket}>
                   <input
                     type="checkbox"
                     style={{ width: "30px", height: "30px", marginRight: "20px" }}
                     name="rcheck"
                     defaultValue={false}
                     onClick={onChangeCheckbox}
                   />
                   <Thin className={style.title__rocket}>
                     Создать комнату в rocket chat
                   </Thin>
                 </div>
               </div>
               <div className={style.row}>
                 <div className={style.input__short}>
                   <Thin className={style.title}>Заказчик</Thin>
                   <input
                     type="text"
                     name="customer"
                     required
                     value={customer}
                     onChange={(e) => onChange(e)}
                   />
                 </div>
                 <div className={style.input__short}>
                   <Thin className={style.title}>Объект</Thin>
                   <input
                     type="text"
                     name="object"
                     required
                     value={object}
                     onChange={(e) => onChange(e)}
                   />
                 </div>
                 <div className={style.input__short}>
                   <Thin className={style.title}>Тип проекта</Thin>
                   <select
                     defaultValue="Архитектура"
                     name="type"
                     onChange={(e) => onChange(e)}
                     className={style.select}
                   >
                     <option value="Архитектура">Архитектура</option>
                     
                     <option value="Сети">Сети</option>
                     <option value="Визуализации">Визуализации</option>
                     <option value="Интерьер">Интерьер</option>
                     <option value="Экстерьер">Экстерьер</option>
                     <option value="Конструкции">Конструкции</option>
                     <option value="Ландшафт">Ландшафт</option>
                     <option value="Другое">Другое</option>
                   </select>
                 </div>
               
               </div>
               <div className={style.row}>
                 <div className={style.input__long}>
                   <Thin className={style.title}>Описание</Thin>
                   <textarea
                     className={style.input__long}
                     type="text"
                     name="about"
                     value={about}
                     onChange={(e) => onChange(e)}
                   />
                 </div>
               </div>
               <div className={style.row}>
                 <div className={style.input__short} style={{marginBottom:'30px'}}>
                   <Thin className={style.title3}>Ссылка на бюджет</Thin>
                   <input
                     className={style.input__long}
                     type="text"
                     name="budget"
                     
                     value={budget}
                     onChange={(e) => onChange(e)}
                     required
                   />
                   
                 </div>
                 <div className={style.input__short}>
                   <Thin className={style.title3}>Ссылка на календарный график</Thin>
                   <input
                   required
                     className={style.input__long}
                     type="text"
                     name="schedule"
            
                     value={schedule}
                     onChange={(e) => onChange(e)}
                   />
                   
                 </div>
                 <div className={style.input__short}>
                   <Thin className={style.title3}>Ссылка на хранилице для заказчика</Thin>
                   <input
                   required
                     className={style.input__long}
                     type="text"
                     name="cusStorage"
                     value={cusStorage}
                     onChange={(e) => onChange(e)}
                   />
                   
                 </div>
               </div>
             </div>
             
           </div>  
           
        ):step===2?<div>
           <div className={style.add__people}>
                  <div style={{display:`${userStage===1?'block':'none'}`}}>
                    <Thin size='28' className={style.title}>Поиск сотрудников</Thin>
                     <input placeholder='введите имя' className={style.input__long} onChange={(e) => PeopleList(e)}/>
                     <div className={style.searchMenu} style={{display:`${menu?'block':'none'}` }}>
                       {searchResult.map((user,i)=>{
                         console.log(searchResult)
                         return (
                           <div className={style.search__user}>
                             <div  key={i}>{user.fullname}</div>
                             <CancelButton fontSize={"16px"}padd={"20px"} style={{display:`${idList.includes(user._id)||idCurrent===user._id?'none':'block'}`}} onClick={()=>addUser(user)}>Добавить</CancelButton>
                           </div>
                         )
                       })}
                     </div>
                     </div>
                     <div  style={{display:`${userStage===2?'block':'none'}`}}>  
                      <Thin size='28' className={style.title}>Введите должность сотрудника</Thin>
                      <div className={style.search__user}>
                        <div>{nameCurrent}</div> 
                        <input className={style.position} defaultValue='нет' value={currentPos} onChange={(e) => posCurrent(e)} placeholder='должность'></input>
                        
                      </div>
                      <div className={style.buttons}>
                        <CancelButton fontSize={"16px"} padd={"20px"} grey onClick={returnToSearch}>Вернуться к поиску</CancelButton>
                        <CancelButton fontSize={"16px"} padd={"20px"} onClick={pushUserToForm}>Добавить</CancelButton>
                          
                        </div>
                     </div>
                    
                     <div className={style.users__list} >
                       <Thin size='28'  className={style.title}>Список сотрудников для добавления</Thin>
                       {formData.userid2.map((user,i)=>{
                         
                         return (
                           <div key={i} className={style.search__user}>
                             <div >{user.fullname}</div>
                             <div className={style.place}>
                               <Thin size='24'>{user.position}</Thin>
                               
                             </div>
                             {/* <Button grey style={{display:`${formData.userid.includes(user._id)||idCurrent===user._id?'none':'block'}`}} onClick={()=>addUser(user)}>Добавить</Button> */}
                           </div>
                           
                         )
                       })}
                     </div>
                     
                   </div> 
                   <div className={style.buttons2cont}>
                      <div className={style.buttons2}>
                        <CancelButton
                          grey
                          padd={"70px"}
                          style={{ marginTop: "25px",marginRight:'20px' }}
                          onClick={()=>nextStep(1)}
                        >
                          {" "}
                          Предыдущий шаг
                        </CancelButton>
                        <Button
                          fontSize={"16px"}
                          style={{ marginTop: "25px" }}
                          padd={"20px"}
                          type="submit"
                        >
                          {/* {" "} */}
                          Создать новый проект
                        </Button>
                      </div>
                    </div>
        </div>:''}</form></div>
        <div className={style.buttons} style={{display:`${step===1?'flex':'none'}`}}>
               <CancelButton
                 grey
                 padd={"70px"}
                 style={{ marginTop: "5px" }}
                 onClick={()=>history.push('./../')}
               >
                 {" "}
                 Отмена
               </CancelButton>
               <CancelButton
                 fontSize={"16px"}
                 style={{ marginTop: "5px" }}
                 padd={"20px"}
                 onClick={()=>title==''?alert('Заполните обязательные поля'):nextStep(2)}
               >
                 {" "}
                 Перейти к следующему шагу
               </CancelButton>
             </div>
       
      </div>
     
    );
}


export default ProjectNew