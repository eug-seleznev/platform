import styles from '../kanban.module.css'
import { CSSTransition } from "react-transition-group";


const GhostCard = ({visible, }) => {

    
return(
    <CSSTransition
    in={visible}
    timeout={50}
    classNames={{
    enter: styles.ghostEnter,
    enterActive: styles.ghostEnterActive,
    exit: styles.ghostExit,
    exitActive: styles.ghostExitActive,
}}
unmountOnExit
>
    <div className={styles.addGhost} />
</CSSTransition>
)
}
export default GhostCard