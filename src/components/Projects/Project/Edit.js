import  {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  getProject, editProject } from '../../../redux/actions/projects';
import { Button } from '../../../Styles/buttons';
import {  Bold, Regular} from '../../../Styles/typography'
import style from '../../../Styles/modules/components/Project/editproj.module.css'
import InfoInputs from '../components/EditProj/infoInputs';
import { background } from '../../../redux/actions/user';
import ProjTeamEdit from '../components/EditProj/projteamedit';
import LinkInputs from '../components/EditProj/linkInputs';
import CustomerInfo from '../components/EditProj/customerInfo';
import EditCustomFields from '../components/EditProj/editCustomFields';
const ProjectEdit = ({history, match}) => {
	let {crypt} = match.params;
    const dispatch = useDispatch();
	const project = useSelector(state => state.projects.project)
    const [formData, setFormData ] = useState({
        crypter:'',
        title: '',   
        offTitle:'',   
        dateStart: '', 
        city:'', 
        stage:'', 
        type:'',
        dateFinish:'',
        about:'',
        cusStorage:'',
        budget:'', 
        schedule:'', 
        object:'',
        customerNew: 
            {
                name: '',
                phone: '',
                email: '',
                other:['']
            }

      });
	  
	  useEffect(() => {
          if(!project){
		        dispatch(getProject(crypt));
          }
        
    }, [])
   
    const [editStage, setEditStage] = useState(1)
	useEffect(() => {
		if (project) {
			setFormData ({...formData, title: project.title, 
				dateStart: project.dateStart,
                offTitle:project.offTitle,
				city: project.city,
				type: project.type,
				stage: project.stage,
				dateFinish: project.dateFinish,
				about:project.about,
                cusStorage:project.cusStorage,
                budget:project.budget, 
                schedule:project.schedule, 
                crypter:project.crypter,
                object: project.object,
                customerNew: {
                    name: project.customerNew[0]!==undefined?project.customerNew[0].name:'',
                    phone: project.customerNew[0]!==undefined?project.customerNew[0].phone:'',
                    email: project.customerNew[0]!==undefined?project.customerNew[0].email:'',
                    other:[]
                } 
				})
		}
		
    }, [project])
      const { title, offTitle, dateStart, dateFinish, cusStorage, budget, schedule, city, crypter, about, customerNew, object} = formData;

    const onChange = e => {
        e.preventDefault(); 

        setFormData({ ...formData, [e.target.name]: e.target.value });
     }
     const onCustomerChange = e => {
        e.preventDefault(); 
        
        if(e.target.name==='name') {
             setFormData({ ...formData, customerNew:{
            ...formData.customerNew,
            name: e.target.value,
            other:[]
        }});
        }
        else if(e.target.name==='phone') {
            setFormData({ ...formData, customerNew:{
           ...formData.customerNew,
           phone: e.target.value,
        }});
        }
       else if(e.target.name==='email') {
        setFormData({ ...formData, customerNew:{
            ...formData.customerNew,
            email: e.target.value,
        }});
        }
       
     }
    //  useEffect(()=>{
    //     console.log(formData)
    //  },[formData])
     const Redirect = () => {
     
             return history.push(`/projects/${crypt}/main`)
         
     }

     const onSubmit = e => {
        e.preventDefault();
        dispatch(editProject(formData, crypt))
        setTimeout(() => Redirect(),100) 
        
    
           
        }

        if(!project){
            return <p>loading...</p> 
        }

    return (
		
        
	
			<div>
            <div className={style.container}>
                <Bold size='24' className={style.main__title}>Изменить проект</Bold>
                <div className={style.info__row}>
                    <Regular className={style.info__row__point} onClick={()=> setEditStage(1)} color={editStage===1?'black':'#8B8B8B'} size={'14'}>Информация о проекте</Regular>
                    <Regular className={style.info__row__point} onClick={()=> setEditStage(2)} color={editStage===2?'black':'#8B8B8B'}  size={'14'}>Команда проекта</Regular>
                    <Regular className={style.info__row__point} onClick={()=> setEditStage(3)} color={editStage===3?'black':'#8B8B8B'}  size={'14'}>Ссылки на документацию</Regular>
                    <Regular className={style.info__row__point} onClick={()=> setEditStage(4)} color={editStage===4?'black':'#8B8B8B'}  size={'14'}>Информация о заказчике</Regular>
                    <Regular className={style.info__row__point} onClick={()=> setEditStage(5)} color={editStage===5?'black':'#8B8B8B'}  size={'14'}>Редактировать кастомные поля</Regular>
                </div>
            <form className='form' onSubmit={onSubmit}>
            <div style={{display:`${editStage===1?'block':'none'}`}}>
            <InfoInputs 
                crypter={crypter}
                city={city}
                about={about}
                title={title} 
                project={project} 
                onChange={onChange} 
                dateFinish={dateFinish} 
                dateStart={dateStart}
                object={object}
                offTitle={offTitle}
                />
            </div>
            <div style={{display:`${editStage===2?'block':'none'}`,width:'100%'}}>
            <ProjTeamEdit 
                project={project}
            />
            </div>
            <div style={{display:`${editStage===3?'block':'none'}`,width:'100%'}}>
            <LinkInputs
                project={project} 
                cusStorage={cusStorage}
                schedule={schedule}
                onChange={onChange} 
                budget={budget}
            />
            </div>
            <div style={{display:`${editStage===4?'block':'none'}`,width:'100%'}}>
            <CustomerInfo
               customerNew={customerNew}
               onCustomerChange={onCustomerChange}
            />
            </div>
            <div style={{display:`${editStage===5?'block':'none'}`,width:'100%'}}>
            <EditCustomFields
              customFields={project.custom_fields} 
            />
            </div>
            </form>
            
			</div>
            <div style={{display:'flex', justifyContent:'flex-end', width:'100%'}}> 
                <Button style={{height:'40px',width:'150px'}} grey onClick={Redirect}>Ничего не менять</Button>
                <Button style={{height:'40px',width:'150px', marginLeft:'45px'}} onClick={onSubmit}>Сохранить</Button>
            </div>
        </div>
    )
}


export default ProjectEdit