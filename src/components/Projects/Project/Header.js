import { useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux"
import { Bold, Thin } from "../../../Styles/typography";
import SetMenu from "../components/OneProject/settingsMenu";
import style from '../../../Styles/modules/components/Project/projheader.module.css'
import sprint from '../../../Styles/modules/components/Project/oneproj.module.css'
import { addProjToChosen } from "../../../redux/actions/projects";
import { Path } from "../../Layout/header";





const Header = ({history, crypt}) => {
      const [open, setOpen] = useState(false);
      const [nameV, setNameV] = useState('');
      const [status, setStatus] = useState(false);
      const project = useSelector(state => state.projects.project)
      const permission = useSelector(state => state.auth.user.permission)
      const favProjects = useSelector(state => state.auth.user.fav_proj)
      const dispatch = useDispatch();
      const handleRedirect = (name) => {
        setNameV(name)
        history.push(`/projects/${crypt}/${name}`)
    }
    useEffect (()=> {
      favProjects && favProjects
      .filter(fav => fav._id===project._id)
      .map(()=>setStatus(true))
    },  [])
    const chosenProj = () => {
			setStatus(!status)
			dispatch(addProjToChosen(project._id));
		
		   
		}

    return (
      <div>
        <div className={style.container}>
          <div className={style.row}>
            <div style={{display:'flex'}}>
               <Bold size="20" color="white"
                style={{
                  cursor:'pointer',
                  marginTop: '-4px'
                }} name="main" value="123" onClick={(e) => handleRedirect("main")}>
                  {project.title} 
                </Bold>
                <img
                src={Path+'starb.png'}
              alt="star"
              onClick={chosenProj}
              style={{
                cursor: "pointer",
                marginTop: "-5px",
                marginLeft:'20px',
                backgroundColor: `${status ? "#ff9800" : "#C4C4C4"}`,
              }}
              className={sprint.chosen}
            />
            </div>
           
            <Thin
              style={{cursor:'pointer',borderBottom:`${nameV==="info"?'2px solid white':'2px solid transparent'}`,width:'50px', fontFamily:`${nameV==="info"?'SuisseIntlRegular':'SuisseIntlThin'}`}}
              color='white'
              name="main"
              value="123"
              onClick={(e) => handleRedirect("info")}
            >Команда </Thin>

            <Thin style={{cursor:'pointer',borderBottom:`${nameV==="models"?'2px solid white':'2px solid transparent'}`,width:'40px', fontFamily:`${nameV==="models"?'SuisseIntlRegular':'SuisseIntlThin'}`}} color='white' name="models" onClick={(e) => handleRedirect("models")}>
              Модели
            </Thin>
            <Thin style={{cursor:'pointer',borderBottom:`${nameV==="kanbans"?'2px solid white':'2px solid transparent'}`,width:'40px', fontFamily:`${nameV==="kanbans"?'SuisseIntlRegular':'SuisseIntlThin'}`}} color='white' name="kanbans" onClick={(e) => handleRedirect("kanbans")}>
              Задачи
            </Thin>
            <Thin style={{cursor:'pointer',borderBottom:`${nameV==="tasks"?'2px solid white':'2px solid transparent'}`,width:'40px', fontFamily:`${nameV==="tasks"?'SuisseIntlRegular':'SuisseIntlThin'}`}} color='white' name="tasks" onClick={(e) => handleRedirect("tasks")}>
              Спринты
            </Thin>
            <Thin style={{cursor:'pointer',borderBottom:`${nameV==="event"?'2px solid white':'2px solid transparent'}`,width:'40px', fontFamily:`${nameV==="event"?'SuisseIntlRegular':'SuisseIntlThin'}`}} color='white' name="event" onClick={(e) => handleRedirect("event")}>
              События
            </Thin>
            <Thin style={{display:`${permission==='admin'?'block':'none'}`,cursor:'pointer',borderBottom:`${open?'2px solid white':'2px solid transparent'}`,width:'40px', fontFamily:`${open?'SuisseIntlRegular':'SuisseIntlThin'}`}} color='white' onClick={() => setOpen(!open)}> Настройки</Thin>
          </div>
          <SetMenu
          style={{cursor:'pointer'}}
            setOpen={setOpen}
            project={project}
            hist={history}
            state={open}
          ></SetMenu>
        </div>
      </div>
    );
}



export default Header