
import { ModalContainer,ModalWind } from "../../../Styles/common"
import SprintForm from './sprintForm'

import style from '../../../Styles/modules/components/Project/modWindow.module.css'
import {H1, Bold } from "../../../Styles/typography"
import ProjectNew from "../newProject";

import CreateNew from "../../Superadmin/createNew";
import Ticket from "../../Adminka/Index";

export const url = process.env.REACT_APP_IP;


const ModalWindow = ({closeWindow, bigTitle,smallTitles,customElements,histCurrent,buttonTitle, offWindow, status}) => {
	
	return (
	<>
		{/* {!loaded?<div>loading...</div>:( */}
			<div style={{display: status?'block':'none'}}>
		
				<ModalContainer>
					<ModalWind>
						<Bold size={30}>{bigTitle}</Bold>
						{customElements === 'CreateSprint'? 
						<>
							<SprintForm offWindow={offWindow} smallTitles={smallTitles} buttonTitle={buttonTitle} customElements={customElements}>
							</SprintForm>
						</>:customElements === 'CreateProject'?
						<>
							<ProjectNew closeWindow={closeWindow} histCurrent={histCurrent}>
							</ProjectNew>
						</>:customElements === 'CreateNews'?
						<>
							<CreateNew closeWindow={closeWindow} histCurrent={histCurrent}>
							</CreateNew>
						</>:customElements === 'CreateTicket'?
						<>
							<Ticket closeWindow={closeWindow} histCurrent={histCurrent}>
							</Ticket>
						</>:''}
					</ModalWind>
				</ModalContainer>
			</div>
			
		{/* )} */}
		</>
	)
}
export default ModalWindow