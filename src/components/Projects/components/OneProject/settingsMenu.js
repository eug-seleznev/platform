
import {StyledIn} from '../../../../Styles/layout'

import {CSSTransition} from 'react-transition-group'
import styles from '../../../../Styles/modules/components/headerMenu.module.css'

import DeliteEnd from './deliteEnd'



const SetMenu = ({setOpen, state, hist, project}) => {




const repl =()=>{
	hist.push(`edit`)
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
        		<div className={styles.menu} onMouseLeave={() =>setOpen(false)}>

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