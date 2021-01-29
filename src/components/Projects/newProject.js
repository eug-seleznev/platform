import  {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newProject } from '../../redux/actions/projects';
import { newTicket } from '../../redux/actions/tikets';
import style from '../../Styles/modules/components/Project/createPr.module.css'

import {Container, Card, Title,} from '../../Styles/common'
import { Button, CancelButton } from '../../Styles/buttons';
import { Bold, H1, H3, Light, Regular, Thin} from '../../Styles/typography'

const ProjectNew = ({histCurrent,closeWindow}) => {
    const dispatch = useDispatch();

    const [formData, setFormData ] = useState({
        
        title: '',   
        dateStart: '', 
        city: '',  
        type: '',
        stage: '',
        dateFinish: '',
        customer: '',
        about: '',

      
      });
   


      const { title, dateStart, dateFinish, city, type, stage, customer, about} = formData;

  
    const onChange = e => {
        e.preventDefault(); 

        setFormData({ ...formData, [e.target.name]: e.target.value });
     }
     

     const Redirect = () => {
     
             return histCurrent.push(`/projects`)
         
     }

     const onSubmit = async e => {
        e.preventDefault();
        dispatch(newProject(formData))
        setTimeout(() => setFormData({
          title: '',   
          dateStart: '', 
          city: '',  
          type: '',
          stage: '',
          dateFinish: '',
          customer: '',
          about: '',
        }),50) 
        closeWindow()
        // setTimeout(() => Redirect(),100) 
        
            // register({ name, email, password});
    
           
        }

    return (
      <div>
          <form className={style.form} onSubmit={onSubmit}>
            <div>
              <div className={style.row}>
                <div className={style.input__long}>
                <Thin className={style.title}>Название</Thin>
                <input
                  className={style.input__long}
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                />
                </div>
              </div>
              <div className={style.row}>
                <div className={style.input__mid}>
                  <Thin className={style.title}>Город</Thin>
                  <input
                  
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => onChange(e)}
                  />
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
              
              </div>
              <div className={style.row}>
                <div className={style.input__mid}>
                  <Thin className={style.title}>Тип проекта</Thin>
                  <input
                    type="text"
                    name="type"
                    value={type}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className={style.input__short}>
                  <Thin className={style.title}>Стадия</Thin>
                  <input
                    type="text"
                    name="stage"
                    value={stage}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className={style.input__mid}>
                  <Thin className={style.title}>Заказчик</Thin>
                  <input
                    type="text"
                    name="customer"
                    value={customer}
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
              <div className={style.buttons}>
                <CancelButton grey padd={'70px'} style={{marginTop:'10px'}} onClick={closeWindow}> Отмена</CancelButton>
                <Button fontSize={'16px'}style={{marginTop:'10px'}} padd={'20px'} type="submit"> Создать новый проект</Button>
              </div>

     
            
          </form>
       
      </div>
    );
}


export default ProjectNew