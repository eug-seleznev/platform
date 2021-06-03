
import { useEffect, } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Button, CancelButton } from '../../../../Styles/buttons'
import styles from './kanban.module.css'


const ConfirmModal = ({visible, close, confirm, text}) => {

useEffect(() => {
  const closeIt = (e) => {
    if(e.keyCode === 27){
      close()
    }
  }
  window.addEventListener('keydown', closeIt)
return () => window.removeEventListener('keydown', closeIt)
},[])

const deleteIt = () => {
    confirm()
    close()
}

return (
  <CSSTransition 
    in={visible}
    timeout={500}
    classNames={{
    enter: styles.formEnter,
    enterActive: styles.formEnterActive,
    exit: styles.formExit,
    exitActive: styles.formExitActive,
    }}
    unmountOnExit
  >
        <div className={styles.createWindow}>
          <div className={styles.createCard}>
            <div style={{width:'97%',marginBottom:'40px',height:'30px',}}>Вы уверенны что хотите удалить {text}?</div>
            <div style={{width:'100%', display:'flex',justifyContent:'space-between'}}>
              <CancelButton fontSize='13px' grey type='button' padd='5px' onClick={close}>Закрыть</CancelButton>
              <Button  onClick={deleteIt} >Удалить</Button>
            </div>
          </div>
        </div> 
        
  </CSSTransition>
    )
       
}



export default ConfirmModal

