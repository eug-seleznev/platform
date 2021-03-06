import './news.css'
import {  useState } from "react"
import { useDispatch } from "react-redux"
import { Button, CancelButton } from '../../Styles/buttons';
import {  Thin} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/createPr.module.css'
import { addContractor } from '../../redux/actions/user';
import Partition from '../User/partition';

///////////////
const AddContractor = ({ closeWindow}) => {
    const dispatch = useDispatch();
	// const [partOn, setPartOn] = useState (false)

    const [formData, setFormData ] = useState({ 
        name: '',   //title
        lastname: '', 
		partition:[],
        phone: '', 
		email:'' ,
      });
	  
      const {name,lastname,partition,phone,email} = formData;

	
    const onChange = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
    }
	// useEffect(()=>{
	// 	return () => {
	// 		setPartOn(false)
	// 	  }
	// },[])

    const onSubmit = async e => {
            e.preventDefault();
            dispatch(addContractor(formData))
			// setPartOn(false)
            setTimeout(() => {
				
				closeWindow()
			}, 100);  
			
            setFormData({
                name:'',lastname:'',phone:'',email:'',partition:[],
            })
    }
   



    return (

	<div className={style.container}>
		<form className={style.form} onSubmit={onSubmit}>
			<div>
				<div style={{display:'flex',justifyContent:'space-between'}}>
					<div style={{width:'40%'}}>
						<Thin className={style.small__title}>Имя</Thin>
						<input 
						
							type='text'
							required
							name='name'
							value={name}
							onChange={e => onChange(e)}/>
					</div>
					<div style={{width:'40%'}}>
						<Thin className={style.small__title}>Фамилия</Thin>
						<input 
						required
							type='text'
							name='lastname'
							value={lastname}
							onChange={e => onChange(e)}/>
					</div>
				</div>
				{/* <div style={{width:'40%'}}>
					<Thin className={style.small__title}>Вид деятельности</Thin>
                	<input 
                	required
					name='job'
					value={job}
					onChange={e => onChange(e)}/>
				</div> */}
				
				<div style={{display:'flex',justifyContent:'space-between'}}>
					<div style={{width:'40%'}}>
						<Thin className={style.small__title}>Телефон</Thin>
						<input 
						// required
							name='phone'
							value={phone}
							onChange={e => onChange(e)}/>
					</div>
					<div style={{width:'40%'}}>
						<Thin className={style.small__title}>Почта</Thin>
						<input 
						// required
							name='email'
							value={email}
							onChange={e => onChange(e)}/>
					</div>

				</div>
				<div style={{display:'flex',justifyContent:'space-between',flexDirection:'column'}}>
					<div style={{marginTop:'15px',display:'flex'}}><Thin >Добавить раздел</Thin>
						{/* <img src='/plus.png' onClick={()=>setPartOn(true)}></img> */}
					</div>
					{/* <div style={{display:`${partOn?'block':'none'}`}}> */}
						<Partition  partition={partition} subcontr={true}></Partition>
					{/* </div> */}
					
				</div>
			</div>
			<div className={style.row}>
				<CancelButton className={style.button}  grey padd={'60px'}onClick={closeWindow}>Отмена</CancelButton>
				<Button style={{height:'40px'}} className={style.button} padd={'30px'} fontSize={'16px'} type="submit">Добавить субподрядчика</Button>
			</div>
            
        </form>
	</div>

)
}



export default AddContractor