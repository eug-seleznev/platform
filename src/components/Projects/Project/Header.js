import { useState } from "react";
import { useSelector } from "react-redux";
import { Bold } from "../../../Styles/typography";
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
            marginTop: "-4.3vh",
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
               marginTop: '13px'
             }} name="main" value="123" onClick={(e) => handleRedirect("main")}>
              <b>{project.title} </b>
            </Bold>
            <p
              name="main"
              value="123"
              onClick={(e) => handleRedirect("info")}
            >Информация </p>

            <p name="models" onClick={(e) => handleRedirect("models")}>
              Модели
            </p>
            <p name="tasks" onClick={(e) => handleRedirect("tasks")}>
              Спринты
            </p>
            <p name="event" onClick={(e) => handleRedirect("event")}>
              События
            </p>
            <p onClick={() => setOpen(!open)}> Настройки</p>
          </div>
          <SetMenu
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