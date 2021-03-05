import  {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  getProject, editProject } from '../../redux/actions/projects';
import './projects.css'
import { Button } from '../../Styles/buttons';
import {  Regular} from '../../Styles/typography'

const ProjectEdit = ({history, match}) => {
	let {id} = match.params;
    const dispatch = useDispatch();
	const project = useSelector(state => state.projects.project)
	const loadProject = useSelector(state => state.projects.loadProject)
    const [formData, setFormData ] = useState({
        
        title: loadProject ? project.title : '',   
        dateStart: '', 
        city: '',  
        type: '',
        stage: '',
        dateFinish: '',
        customer: '',


      
      });
	  
	  useEffect(() => {
		dispatch(getProject(id));
    }, [])

	// useEffect(() => {
	// 	if (loadProject) {
	// 		setFormData ({...formData, title: project.title, 
	// 			dateStart: project.dateStart,
	// 			city: project.city,
	// 			type: project.type,
	// 			stage: project.stage,
	// 			dateFinish: project.dateFinish,
	// 			customer: project.customer
	// 			})
	// 	}
		
    // }, [loadProject])
      const { title, dateStart, dateFinish, city, type, stage, customer} = formData;

  
    const onChange = e => {
        e.preventDefault(); 

        setFormData({ ...formData, [e.target.name]: e.target.value });
     }
     

     const Redirect = () => {
     
             return history.push(`/projects/${id}`)
         
     }

     const onSubmit = async e => {
        e.preventDefault();
        dispatch(editProject(formData, id))
        setTimeout(() => Redirect(),100) 
        
    
           
        }

        if(!loadProject){
            return <p>loading...</p> 
        }

    return (
		
        
	
			<div style={{display:'flex',justifyContent:'center'}}>
            <div>
            <Regular size={'20'}> Тут можно редактировать данные проекта </Regular>
            <form className='form' onSubmit={onSubmit}>

            <input 

                type='text'
                placeholder={project.title}
                name='title'
                value={formData.title}
                onChange={e => onChange(e)}/>

           <input 
                type='date'
                placeholder='date'
                name='dateStart'
                value={dateStart}
                onChange={e => onChange(e)}/>


            <input 
                type='date'
                placeholder='date'
                name='dateFinish'
                value={dateFinish}
                onChange={e => onChange(e)}/>

            <input 
                type='text'
                placeholder='Город'
                name='city'
                value={city}
                onChange={onChange}/>

            <input 
                type='text'
                placeholder='Тип проекта'
                name='type'
                value={type}
                onChange={e => onChange(e)}/>
            <input 
                type='text'
                placeholder='Фаза'
                name='stage'
                value={stage}
                onChange={e => onChange(e)}/>
            <input 
                type='text'
                placeholder='Заказчик'
                name='customer'
                value={customer}
                onChange={e => onChange(e)}/>





            <Button style={{height:'40px'}} type="submit">Сохранить</Button>
			
			<Button  style={{height:'40px'}} grey onClick={Redirect}>Ничего не менять</Button>
            </form>
			</div>
        </div>
    )
}


export default ProjectEdit