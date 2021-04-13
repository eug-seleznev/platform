import { useState } from "react";
import { useSelector } from "react-redux";
import { Bold, Thin } from "../../../Styles/typography";
import SetMenu from "../components/OneProject/settingsMenu";






const Header = ({history, crypt}) => {
      const [open, setOpen] = useState(false);
    const project = useSelector(state => state.projects.project)
    const handleRedirect = (name) => {
        
        console.log(name);
        history.push(`/projects/${crypt}/${name}`)
    }



    return (
      <div>
        <div
          style={{
            backgroundColor: "black",
            width: "120vw",
            marginLeft: "-8vw",
            height:'30px',
            marginTop: "-33px",
            paddingTop: '15px'
          }}
        >
          <div
              style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "85vw",
              marginLeft: "8vw",
              color: "white",
            }}
          >
            <Bold size="20" color="white"
             style={{
              cursor:'pointer',
               marginTop: '-4px'
             }} name="main" value="123" onClick={(e) => handleRedirect("main")}>
              <b>{project.title} </b>
            </Bold>
            <Thin
              style={{cursor:'pointer'}}
              color='white'
              name="main"
              value="123"
              onClick={(e) => handleRedirect("info")}
            >Информация </Thin>

            <Thin style={{cursor:'pointer'}} color='white' name="models" onClick={(e) => handleRedirect("models")}>
              Модели
            </Thin>
            <Thin style={{cursor:'pointer'}}style={{cursor:'pointer'}} color='white' name="tasks" onClick={(e) => handleRedirect("tasks")}>
              Спринты
            </Thin>
            <Thin style={{cursor:'pointer'}} color='white' name="event" onClick={(e) => handleRedirect("event")}>
              События
            </Thin>
            <Thin style={{cursor:'pointer'}} color='white' onClick={() => setOpen(!open)}> Настройки</Thin>
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