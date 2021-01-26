import  {useState } from 'react'
import { useDispatch } from 'react-redux';
import { newTicket } from '../../redux/actions/tikets';
import './tickets.css'
import style from '../../Styles/modules/components/Tickets/createTicket.module.css'
import {Table, Tr, Td} from '../../Styles/tables'
import {Container, Card, Title,} from '../../Styles/common'
import { Button, CancelButton } from '../../Styles/buttons';
import { H1, H3, Light, Regular, Thin} from '../../Styles/typography'

const Admin = ({closeWindow}) => {
    const dispatch = useDispatch();

    const [formData, setFormData ] = useState({
        
        problemname: '',   //title
        text: '',     //about problem
        emergency: '', 
        pcpass: '', // password,

      
      });
      

      const { problemname, text, emergency, pcpass} = formData;

      const  [file, setFile] = useState(null) 


      const handleFile = e => {
        setFile(e.target.files[0])
    }
    const onChange = e => {
        e.preventDefault(); 
        console.log (e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value });
     }
     


     const onSubmit = async e => {
        e.preventDefault();
        
        dispatch(newTicket({formData, file}))
       setFormData({
        ...formData,
            problemname: '',   //title
            text: '',     //about problem
            emergency: '', 
            pcpass: '',
       })
       
       console.log(formData)
          setTimeout(() => closeWindow()
          ,150)
     
            // register({ name, email, password});
    
           
        }

    return (
        <div>
            
            
            <Light className={style.small__title}>Если у вас что-то сломалось или просто работает плохо - можно написать про это в форме. </Light>
            <form className={style.form} onSubmit={onSubmit}>
                <div className={style.cont}>
                    <Thin className={style.small__title2}>Проблема</Thin>
                    <input 
                        type='text'
                        name='problemname'
                        value={problemname}
                        onChange={e => onChange(e)}/>

                
                    
                    <Thin className={style.small__title}>Описание проблемы</Thin>
                    <textarea 
                        className={style.input__big}
                        name='text'
                        value={text}
                        onChange={e => onChange(e)}/>
                    <div className={style.row}>
                        <div>
                            <Thin className={style.small__title2}>Пароль от компьютера (опционально)</Thin>
                            <input 
                                type='text'
                                
                                name='pcpass'
                                value={pcpass}
                                onChange={e => onChange(e)}/>
                        </div>
                        <div>
                            <Thin className={style.small__title2}>Скриншот проблемы (опционально)</Thin>
                            <input 
                                type='file'
                                placeholder='скриншот проблемы (опционально)'
                                onChange={handleFile}/>
                        </div>
                        <div>
                            <Thin className={style.small__title2}>Срочность (опционально)</Thin>
                            <div className={style.week} >
                                    
                                    <select name="date"onChange={e => onChange(e)} className={style.select} >
                                        <option selected>нет</option>
                                        <option>Не срочно</option>
                                        <option>Средней срочности</option>
                                        <option>Очень срочно</option>
                                        <option>Вот прям горит, жесть вообще</option>
                                        <option>Все очень плохо, все сломалось</option>
                                    </select>
                                </div>
                        </div>
                    </div>
                </div>
                <div className={style.row} >
                    <CancelButton padd={'70px'} grey onClick={closeWindow}>Отмена</CancelButton>
                    <Button className='alltik__6' fontSize={'16px'} type="submit" value="Submit"> Отправить проблему</Button>
                </div>
            </form>
           
        </div>
    )
}


export default Admin