import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { Bold, H1, Light} from '../../../../Styles/typography'
import SetMenu from './settingsMenu';
import Tag from "./tag";


const TitleOfProject = ({hist}) => {

    const user = useSelector(state => state.auth.user) 
    const [open,setOpen] = useState(false)
    const [deadline,setDeadline] = useState(0)
    const project = useSelector(state => state.projects.project)
    useEffect(()=>{
      if(project!==undefined) {
        if(Math.abs(new Date(project.dateFinish))>=Math.abs(Date.now())) {
          setDeadline (Math.trunc(Math.abs(new Date(project.dateFinish) - Date.now())/(60*60*24*1000)))
        }
      }
    },[project])
   
	  const openMenu = () => {
      
      setOpen(!open)
	   }
     const closeAll =()=>{
       setOpen (false)
     }
    return (
      <div className={style.title__cont}>
        <div className={style.title}>
          <H1 size="24">{project.title}</H1>
          <Bold size="16">
            <div
              className={style.title__2}
              style={{
                display: `${user.permission === "user" ? "none" : "flex"}`,
              }}
            >
              <div className={style.title__options} onClick={openMenu}>
                Настройки
              </div>
              <img alt='open' src="/image 1.png" onClick={openMenu}></img>
              <SetMenu
                closeAll={closeAll}
                project={project}
                hist={hist}
                state={open}
              ></SetMenu>
            </div>
          </Bold>
        </div>

        <Light className={style.title__small} size="16">
          <div className={style.title__deadline}>
            Дней до дедлайна: 
            {project.dateFinish != null ? deadline : "?"}
          </div>
          <div className={style.title__deadline}>Стадия: {project.stage}</div>
         
        </Light>
        <div className={style.tag__row}>
          <Tag tagColor='#E9E3C8' tagText='Открытый' ></Tag>
          <Tag tagColor='#C8D9E9' tagText={project.type} ></Tag>
        </div>
        
      </div>
    );
}



export default TitleOfProject




