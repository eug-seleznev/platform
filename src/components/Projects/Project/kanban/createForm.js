
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { addNewCard, addNewCardToColumn } from '../../../../redux/actions/kanban'
import { Button, CancelButton, KanbanFormButton } from '../../../../Styles/buttons'
import { KanbanSearchInput } from '../../../../Styles/Forms'
import { Path } from '../../../Layout/header'
import styles from './kanban.module.css'





const CreateForm = ({projectCrypt,closeForm, boardId, backlog, categoryId, column, timeline }) => {

const dispatch =useDispatch ()
const [title, setTitle] = useState('')
const input = useRef(null)

const close = () => {
  setTitle('')
  closeForm()
  }

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
  input.current.focus()
},[])

const createCardFunc =(e)=>{
  e.preventDefault()
  dispatch(addNewCard(projectCrypt, title, boardId,))
  setTitle('')
}

const createCardInsideCategory = (e) => {
  e.preventDefault()
  dispatch(addNewCardToColumn(categoryId, title,  column, timeline, boardId,))
  setTitle('')
}

return (
          <form  className={styles.createCard} onSubmit={(e)=>{backlog ? createCardFunc(e): createCardInsideCategory(e)}} >
            <KanbanSearchInput 
              ref={input} 
              placeholder='Название карточки' 
              required 
              style={{width:'100%',height:'30px',}} 
              value={title} 
              onChange={(e)=>{setTitle(e.target.value)}}
            />
            <div style={{width:'100%', display:'flex',marginLeft:'5px',borderTop:'1px solid #7F8DA1', paddingTop:'10px'}}>
              <KanbanFormButton type='submit'>Создать</KanbanFormButton>
              <img src={Path+'kanban-cross-white.png'} style={{width: '25px',height:'25px',marginLeft:'5px',cursor:'pointer', filter: !backlog && 'invert(1)'}} onClick={close}/>
            </div>
          </form>
    )
       
}



export default CreateForm

