import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {Button} from '../../../../Styles/buttons'
import Confirm from "./confirm";
import { deleteProject, finishProject } from '../../../../redux/actions/projects';
import { StyledIn } from "../../../../Styles/layout";
import styles from '../../../../Styles/modules/components/headerMenu.module.css'

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
		<div >
				<StyledIn
				onClick={openConfirmEnd}
				
				style={{
					display: `${
					user.permission === "user" ? "none" : "block"
					}`,
					
				}}
				>
				{" "}
				{user.permission === "user"
					? ""
					: project.status
					? "Восстановить проект"
					: "Завершить проект"}
				</StyledIn>
				
				<StyledIn
				
				onClick={openConfirm}
				style={{
					display: `${
					user.permission === "user" ? "none" : "block"
					}`,
					
				}}
				>
				{" "}
				{user.permission === "user" ? "" : "Удалить проект"}
				<div style={{display:`${confirm?'block':'none'}`, zIndex:2222}}>
					<Confirm buttonTitle={buttonTitle} handleEnd={handleEnd} handleDelete={handleDelete} openConfirm={openConfirm} title={project.title}></Confirm>
				</div>
				</StyledIn>
				
		</div>
	  </>
  
    )
}



export default DeliteEnd