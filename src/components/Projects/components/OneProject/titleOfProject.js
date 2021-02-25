import { useState } from "react";
import { useSelector } from "react-redux";
import style from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { Bold, H1, Light} from '../../../../Styles/typography'
import SetMenu from './settingsMenu';


const TitleOfProject = ({hist}) => {

    const user = useSelector(state => state.auth.user) 
    const [open,setOpen] = useState(false)
    const project = useSelector(state => state.projects.project)
	  const openMenu = () => {
		
      setOpen(!open)
	   }
     const closeAll =()=>{
       setOpen (false)
     }
    return (
      <>
        <div className={style.title}>
          <H1 size="24">{project.title}</H1>
          <Bold size="16">
            <div
              className={style.title__small}
              style={{
                display: `${user.permission === "user" ? "none" : "flex"}`,
              }}
            >
              <div className={style.title__options} onClick={openMenu}>
                Настройки
              </div>
              <img src="/image 1.png" onClick={openMenu}></img>
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
            Дедлайн:{" "}
            {project.dateFinish != null ? project.dateFinish.slice(0, 10) : "?"}
          </div>
          <div className={style.title__deadline}>Тип: {project.type}</div>
          <div className={style.title__deadline}>Шифр:  {project.crypter}</div>
        </Light>
      </>
    );
}



export default TitleOfProject




