import  {useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allProjects, getProject, newProject } from '../../redux/actions/projects';
import { newTicket } from '../../redux/actions/tikets';
import style from '../../Styles/modules/components/Project/createPr.module.css'

import {Container, Card, Title, ModalContainer,} from '../../Styles/common'
import { Button, CancelButton } from '../../Styles/buttons';
import { Bold, H1, H3, Light, Regular, Thin} from '../../Styles/typography'
import { allUsers, searchUser } from '../../redux/actions/user';

const ProjectNew = ({histCurrent,closeWindow}) => {
    const dispatch = useDispatch();
    const project = useSelector(state => state.projects.project)
    const userList = useSelector(state => state.users.users)
    const searchResult = useSelector(state => state.users.searchResult)
    const [checked, setChecked] = useState (false)
    const [menu, setMenu] = useState (false)
    const [idList, setIdList] = useState (null)
    const [formData, setFormData ] = useState({
        
        title: '',   
        dateStart: '', 
        city: '',  
        type: '',
        stage: 'Концепт',
        par:'',
        dateFinish: '',
        customer: '',
        about: '',
        rcheck: false,
        userid: [],
      });
   


      const { title, dateStart, dateFinish, city, type, stage, customer, about, par, rcheck} = formData;

      const onChangeCheckbox = () => {
        setChecked(!checked)
     }
     useEffect(()=>{
        setFormData({ ...formData, rcheck: checked });
        console.log(checked)
     },[checked])
     useEffect(()=>{
       
       if(idList!=null&&!formData.userid.includes(idList)) {
          formData.userid.push(idList)
          console.log(formData.userid)
       }
       
      
   },[idList])
    const onChange = e => {
        e.preventDefault(); 
        console.log(e.target.checked)
        setFormData({ ...formData, [e.target.name]: e.target.value });
     }
     
     const searchMenu = (e) => {
setMenu(true)
      
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
        e.preventDefault();
        dispatch(newProject(formData))
        setTimeout(() =>
        setChecked (false),
        setFormData({
          title: '',   
          dateStart: '', 
          city: '',  
          type: '',
          par:'',
          stage: 'Концепт',
          dateFinish: '',
          customer: '',
          about: '',
          rcheck: false,
          userid: [],
        }),50) 
        closeWindow()
        // setTimeout(() => Redirect(),100) 
        
         
    
           
        }

    return (
      <div className={style.container}>
          <form className={style.form} onSubmit={onSubmit}>
            <div>
              <div className={style.row}>
                <div className={style.input__long}>
                <Thin className={style.title}>Название</Thin>
                <input
                  className={style.input__long}
                  type="text"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => onChange(e)}
                />
                </div>
              </div>
              <div className={style.row}>
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
                  <Thin className={style.title}>Добавить сотрудников</Thin>
                  <input placeholder='введите имя'  onChange={(e) => PeopleList(e)}/>
                  <div className={style.searchMenu} style={{display:`${menu?'block':'none'}` }}>
                    {searchResult.map((user,i)=>{
                      
                      return (
                        <div onClick={()=>setIdList(user._id)} key={i}>{user.fullname}</div>
                      )
                    })}
                  </div>
                </div>
                <div className={style.input__short}>
                  <Thin className={style.title}>Начало</Thin>
                  <input
                    type="date"
                    name="dateStart"
                    value={dateStart}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                
                <div className={style.input__short}>
                  <Thin className={style.title}>Дедлайн</Thin>
                  <input
                    type="date"
                    name="dateFinish"
                    value={dateFinish}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className={style.input__short}>
                  <Thin className={style.title}>Фаза</Thin>
                  <select defaultValue='Концепт' name="stage" onChange={e =>  onChange(e)} className={style.select} >
                      <option value='Концепт'>Концепт</option>
                      <option value='Эскиз'>Эскиз</option>
                      <option value='Проект'>Проект</option>
                      <option value='Рабочая'>Рабочая</option>
                  </select>
                </div>
              </div>
              <div className={style.row}>
                <div className={style.input__rocket}>
                  <input type="checkbox" style={{width: '30px',height: '30px',marginRight:'20px'}} name="rcheck" defaultValue={false} onClick={onChangeCheckbox}/>
                  <Thin className={style.title__rocket}>Создать комнату в rocket chat</Thin>
                </div>
                <div className={style.input__short}>
                  <Thin className={style.title}>Раздел</Thin>
                  <input
                  required
                    type="text"
                    name="par"
                    value={par}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className={style.input__short}>
                  <Thin className={style.title}>Заказчик</Thin>
                  <input
                    type="text"
                    name="customer"
                    value={customer}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className={style.input__short}>
                  <Thin className={style.title}>Тип проекта</Thin>
                  <input
                    required
                    type="text"
                    name="type"
                    value={type}
                    onChange={(e) => onChange(e)}
                  />
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
              </div>
              {/* <ModalContainer style={{display:`${pop?'block':'none'}`}}>
                <div className={style.people__list}>
                  <div className={style.window}>
                    {!pop?<div>123123</div>: userList.map((el,i)=>{
                      return(
                        <div style={{display:'flex'}}>
                          <input type="checkbox"style={{width:'20px',marginRight:'20px'}} name="vehicle1"/>
                          <Bold style={{marginTop:'10px'}} key={i}>
                            {el.name}
                          </Bold>
                        </div>
                        
                      )
                      
                    })}
                  </div>
                </div>
              </ModalContainer> */}
              <div className={style.buttons}>
                <CancelButton grey padd={'70px'} style={{marginTop:'5px'}} onClick={closeWindow}> Отмена</CancelButton>
                <Button fontSize={'16px'}style={{marginTop:'5px'}} padd={'20px'} type="submit"> Создать новый проект</Button>
              </div>

     
            
          </form>
       
      </div>
    );
}


export default ProjectNew