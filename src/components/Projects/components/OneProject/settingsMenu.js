import {useSelector} from 'react-redux'
import {MenuHead, StyledLink,StyledIn} from '../../../../Styles/layout'
import {ButtonText} from '../../../../Styles/buttons'
import {CSSTransition} from 'react-transition-group'
import styles from '../../../../Styles/modules/components/headerMenu.module.css'
import DepartmentForm from '../../../Department/depForm'
import { useState } from 'react'
import DeliteEnd from './deliteEnd'



const SetMenu = ({closeAll, state, hist, project}) => {




const repl =()=>{
	hist.replace(`/admin/editproj/${project.crypt}`)
}


    return ( 
		<div>
        	<CSSTransition
				in={state}
				timeout={300}
				classNames={{
					enter:          styles.transitionsEnter,
					enterActive:    styles.transitionsEnterActive,
					exit:           styles.transitionsExit,
					exitActive:     styles.transitionsExitActive,
				}}
				unmountOnExit
			>
        		<div className={styles.menu} onMouseLeave={closeAll}>

                    <StyledIn onClick={()=>repl()} className='menu__nav' to='/help'>
                        Изменить проект
                    </StyledIn>
					<DeliteEnd id={project.crypt} hist={hist}></DeliteEnd>
				</div>
			</CSSTransition>
		</div>
		
		)
}
export default SetMenu