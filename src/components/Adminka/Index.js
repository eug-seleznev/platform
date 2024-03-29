import  {useState } from 'react'
import { useDispatch } from 'react-redux';
import { newTicket } from '../../redux/actions/tikets';
import './tickets.css'
import style from '../../Styles/modules/components/Tickets/createTicket.module.css'
import { Button, CancelButton } from '../../Styles/buttons';
import {  Light, Thin} from '../../Styles/typography'

const Admin = ({closeWindow}) => {
    const dispatch = useDispatch();

    const [formData, setFormData ] = useState({
        
        problemname: '',   //title
        text: '',     //about problem
        emergency: 0, 
        pcpass: '', // password,

      
      });
      

      const { problemname, text, pcpass} = formData;

      const  [file, setFile] = useState(null) 


      const handleFile = e => {
        setFile(e.target.files[0])
        
    }
    const onChange = e => {
        e.preventDefault(); 
        // console.log (e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value });
     }
     const onOptionChange = e => {
        e.preventDefault(); 
        // console.log(e.target.value)
        setFormData({ ...formData, emergency: e.target.value })
     }


     const onSubmit = async e => {
        e.preventDefault();
        
        dispatch(newTicket({formData, file}))
       setFormData({
        ...formData,
            problemname: '',   //title
            text: '',     //about problem
            emergency: 0, 
            pcpass: '',
       })
       
    //    console.log(formData)
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
                        required
                        onChange={e => onChange(e)}/>

                
                    
                    <Thin className={style.small__title2}>Описание проблемы</Thin>
                    <textarea 
                     required
                        className={style.input__big}
                        name='text'
                        value={text}
                        onChange={e => onChange(e)}/>
                    <div className={style.row}>
                        <div className={style.small__input}>
                            <Thin className={style.small__title2}>Пароль от компа</Thin>
                            <input 
                                type='text'
                                
                                name='pcpass'
                                value={pcpass}
                                onChange={e => onChange(e)}/>
                        </div>
                        <div className={style.small__input}>
                            <Thin className={style.small__title2}>Скриншот</Thin>
                            <input 
                                type='file'
                                placeholder='скриншот проблемы (опционально)'
                                onChange={handleFile}/>
                        </div>
                        <div className={style.small__input}>
                            <Thin className={style.small__title2}>Срочность</Thin>
                            <div className={style.week} >
                                    
                                    <select defaultValue='0' name="emergency" onChange={e =>  onOptionChange(e)} className={style.select} >
                                        <option value='0'>нет</option>
                                        <option value='1'>Не срочно</option>
                                        <option value='2'>Средней срочности</option>
                                        <option value='3'>Очень срочно</option>
                                        <option value='4'>Вот прям горит, жесть вообще</option>
                                        <option value='5'>Все очень плохо, все сломалось</option>
                                    </select>
                                </div>
                        </div>
                    </div>
                </div>
                <div className={style.row} >
                    <CancelButton padd={'70px'} className={style.button} grey onClick={closeWindow}>Отмена</CancelButton>
                    <Button className={style.button} fontSize={'16px'} type="submit" value="Submit"> Отправить проблему</Button>
                </div>
            </form>
           
        </div>
    )
}


export default Admin