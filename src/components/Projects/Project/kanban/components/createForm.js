
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { addNewCard, addNewCardToColumn } from '../../../../../redux/actions/kanban'
import { Button, CancelButton, KanbanFormButton } from '../../../../../Styles/buttons'
import { KanbanSearchInput } from '../../../../../Styles/Forms'
import { Path } from '../../../../Layout/header'
import styles from './createForm.module.css'
import {useClickOutside, useEscapeClick} from '../hooks/hooks'




const CreateForm = ({projectCrypt,closeForm, boardId, backlog, categoryId, column, timeline, callback }) => {

const dispatch =useDispatch ()
const [title, setTitle] = useState('')
const input = useRef(null)

const close = () => {
  setTitle('')
  closeForm()
  }
const outclick = useClickOutside(()=>close())
const escapeClick = useEscapeClick(()=>close())

useEffect(()=>{
  input.current.focus()
},[])

const addCardToBacklog =(e)=>{
  e.preventDefault()
  dispatch(addNewCard(projectCrypt, title, boardId,))
  setTitle('')
  callback()
}

const addCardToTimeline = (e) => {
  e.preventDefault()
  dispatch(addNewCardToColumn(categoryId, title,  column, timeline, boardId,))
  setTitle('')
}

return (
          <form ref={outclick}  className={styles.createCard} onSubmit={(e)=>{backlog ? addCardToBacklog(e): addCardToTimeline(e)}} >
            <KanbanSearchInput 
              ref={input} 
              placeholder='Название карточки' 
              required 
              style={{width:'100%',height:'30px',}} 
              value={title} 
              onChange={(e)=>{setTitle(e.target.value)}}
            />
            <div className={styles.buttonsContainer}>
              <KanbanFormButton type='submit'>Создать</KanbanFormButton>
              <img src={Path+'kanban-cross-white.png'} style={{filter: !backlog && 'invert(1)'}} className={styles.formCloseButton} onClick={close}/>
            </div>
          </form>
    )
       
}



export default CreateForm

