
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { addNewCard, addNewCardToColumn } from '../../../../redux/actions/kanban'
import { Button, CancelButton } from '../../../../Styles/buttons'
import styles from './kanban.module.css'






const CreateForm = ({crypt,setCreateOpen, boardId, visible, place, categoryId, column, timeline }) => {

const dispatch =useDispatch ()
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')

const createCardFunc =(e)=>{
    e.preventDefault()
    dispatch(addNewCard(crypt, title, description, boardId))
    setDescription('')
    setTitle('')
    setCreateOpen ({
      status:false,
      place:''
  })
}
const createCardInsideCategory = (e) => {
  e.preventDefault()
  dispatch(addNewCardToColumn(categoryId, title, description, column, timeline, boardId))
  setDescription('')
  setTitle('')
  setCreateOpen ({
    status:false,
    place:''
})
}
const close = () => {
  setCreateOpen ({
    status:false,
    place:''
})
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
          <form className={styles.createCard}onSubmit={(e)=>{place==='backlog' ? createCardFunc(e): createCardInsideCategory(e)}} >
            <input placeholder='Название' required style={{width:'97%',marginBottom:'10px',height:'30px'}} value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <input placeholder='Описание' style={{width:'97%',marginBottom:'10px',height:'30px'}} value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
            <div style={{width:'100%', display:'flex',justifyContent:'space-between'}}>
              <CancelButton fontSize='13px' grey type='button' padd='5px' onClick={close}>Закрыть</CancelButton>
              <Button type='submit' >Создать</Button>
            </div>
          </form>
        </div> 
        
  </CSSTransition>
    )
       
}



export default CreateForm

