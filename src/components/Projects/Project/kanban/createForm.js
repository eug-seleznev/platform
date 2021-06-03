
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { addNewCard, addNewCardToColumn } from '../../../../redux/actions/kanban'
import { Button, CancelButton } from '../../../../Styles/buttons'
import styles from './kanban.module.css'






const CreateForm = ({crypt,setCreateOpen, boardId, visible, place, categoryId, column, timeline }) => {

const dispatch =useDispatch ()
const [title, setTitle] = useState('')
const input = useRef(null)
const close = () => {
  setTitle('')
  setCreateOpen ({
    status:false,
    place:''
})}

useEffect(() => {
  const closeIt = (e) => {
    if(e.keyCode === 27){
      close()
    }
  }
  window.addEventListener('keydown', closeIt)
return () => window.removeEventListener('keydown', closeIt)
},[])

useEffect(()=>{
  visible && input.current.focus()
},[visible])

const createCardFunc =(e)=>{
  e.preventDefault()
  dispatch(addNewCard(crypt, title, boardId,))
  close()
}

const createCardInsideCategory = (e) => {
  e.preventDefault()
  dispatch(addNewCardToColumn(categoryId, title,  column, timeline, boardId,))
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
          <form className={styles.createCard} onSubmit={(e)=>{place==='backlog' ? createCardFunc(e): createCardInsideCategory(e)}} >
            <input 
              ref={input} 
              placeholder='Название' 
              required 
              style={{width:'97%',marginBottom:'10px',height:'30px'}} 
              value={title} 
              onChange={(e)=>{setTitle(e.target.value)}}
            />
            <div style={{width:'100%', display:'flex',justifyContent:'space-between'}}>
              <CancelButton fontSize='13px' grey type='button' padd='5px' onClick={close}>Закрыть</CancelButton>
              <Button type='submit'>Создать</Button>
            </div>
          </form>
        </div> 
        
  </CSSTransition>
    )
       
}



export default CreateForm

