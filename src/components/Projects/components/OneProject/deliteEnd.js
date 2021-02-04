import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {Button} from '../../../../Styles/buttons'
import Confirm from "./confirm";
import { deleteProject, finishProject } from '../../../../redux/actions/projects';


const DeliteEnd = ({id, hist}) => {
	const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user) 

    const project = useSelector(state => state.projects.project)
 
    const [confirm, setConfirm] = useState (false)
    const [buttonTitle, setButtonTitle] = useState ('')
    // const project = useSelector(state => state.projects.project.team)

	const handleEnd = () => {
        
        dispatch(finishProject(id))

        openConfirmEnd()
        return hist.push(`.`)

    }
    const openConfirmEnd = ()=>{
      setButtonTitle(`${project.status?'Восстановить':'Завершить'}`)
      setConfirm (!confirm)
    }
    const openConfirm = ()=>{
      setButtonTitle('Удалить')
      setConfirm (!confirm)
    }
    const handleDelete = () => {
        dispatch(deleteProject(id))
        openConfirm()
        return hist.push(`.`)

    }
 
    return (
      <>
		<div style={{marginTop:'30px'}}>
				<Button
				onClick={openConfirmEnd}
				style={{
					display: `${
					user.permission === "user" ? "none" : "block"
					}`,
					marginBottom: "30px",
				}}
				>
				{" "}
				{user.permission === "user"
					? ""
					: project.status
					? "Восстановить проект"
					: "Завершить проект"}
				</Button>
				<div style={{display:`${confirm?'block':'none'}`}}>
					<Confirm buttonTitle={buttonTitle} handleEnd={handleEnd} handleDelete={handleDelete} openConfirm={openConfirm} title={project.title}></Confirm></div>
				<Button
				onClick={openConfirm}
				style={{
					display: `${
					user.permission === "user" ? "none" : "block"
					}`,
					marginBottom: "30px",
				}}
				>
				{" "}
				{user.permission === "user" ? "" : "Удалить проект"}
				</Button>
		</div>
	  </>
  
    )
}



export default DeliteEnd