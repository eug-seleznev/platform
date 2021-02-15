import { useSelector } from "react-redux";
import style from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { Bold, H1, Light} from '../../../../Styles/typography'



const TitleOfProject = ({hist}) => {

    const user = useSelector(state => state.auth.user) 

    const project = useSelector(state => state.projects.project)
	const returnEditPage = () => {
		hist.replace(`/admin/editproj/${project.crypt}`)
	   }
 
    return (
      <>
	      <div className={style.title}>
                    
          <H1 size='24' >{project.title}</H1>
          <Bold size='16'>
              <div className={style.title__small} style={{ display: `${
                user.permission === "user" ? "none" : "flex"
              }`}}>
              
                <div className={style.title__options} onClick={returnEditPage}>Настройки</div>
                <img onClick={returnEditPage} src='/image 1.png'></img>
              </div>
          </Bold>
          </div>
          
          <Light className={style.title__small} size='16'>
            <div className={style.title__deadline}>Дедлайн: {project.dateFinish!=null?project.dateFinish.slice(0,10):"?"}</div> 
            <div className={style.title__deadline}>Этап: {project.stage}</div>
          </Light>
	  </>
  
    )
}



export default TitleOfProject




