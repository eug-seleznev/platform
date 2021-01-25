
import { ModalContainer,ModalWind } from "../../../Styles/common"
import SprintForm from './sprintForm'

import style from '../../../Styles/modules/components/Project/modWindow.module.css'
import {H1 } from "../../../Styles/typography"
export const url = process.env.REACT_APP_IP;


const ModalWindow = ({bigTitle,smallTitles,customElements,buttonTitle,sprintId, offWindow, status}) => {
	
	return (
	<>
		{/* {!loaded?<div>loading...</div>:( */}
			<div style={{display: status?'block':'none'}}>
		
				<ModalContainer>
					<ModalWind>
						<H1>{bigTitle}</H1>
						{customElements === 'CreateSprint'? <>
						<SprintForm offWindow={offWindow} sprintId={sprintId}smallTitles={smallTitles} buttonTitle={buttonTitle} customElements={customElements}>
						</SprintForm></>:''}
					</ModalWind>
				</ModalContainer>
			</div>
			
		{/* )} */}
		</>
	)
}
export default ModalWindow