import { NavLink } from "react-router-dom"






const Header = ({history, crypt}) => {
    
    const handleRedirect = (name) => {
        console.log(name);
        history.push(`/projects/${crypt}/${name}`)
    }

    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "30vw",
          }}
        >
          <p name="main" value='123' onClick={(e) => handleRedirect('main')}>
   
            Dashboard
          </p>

          <p name="edit" onClick={(e) => handleRedirect('edit')}>
       
            Edit
          </p>
          <p name="models" onClick={(e) => handleRedirect('models')}>
     
            models
          </p>
          <p name="tasks" onClick={(e) => handleRedirect('tasks')}>
      
            Sprints
          </p>
          <p name="event" onClick={(e) => handleRedirect('event')}>
        
            event
          </p>
        </div>
      </div>
    );
}



export default Header