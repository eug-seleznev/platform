
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { addNewCard } from '../../../../redux/actions/kanban'
import { Button, CancelButton } from '../../../../Styles/buttons'
import styles from './kanban.module.css'






const CreateForm = ({crypt,setCreateOpen, boardId, visible, place}) => {

const dispatch =useDispatch ()
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')

const createCardFunc =(e)=>{
    e.preventDefault()
    dispatch(addNewCard(crypt, title, description, boardId))
    setCreateOpen ({
        status:false,
        place:''
    })
    setDescription('')
    setTitle('')
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
        {place==='backlog' ? <div className={styles.createWindow}>
          <form className={styles.createCard}onSubmit={(e)=>{createCardFunc(e)}} >
            <input placeholder='Название' required style={{width:'97%',marginBottom:'10px',height:'30px'}} value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <input placeholder='Описание' style={{width:'97%',marginBottom:'10px',height:'30px'}} value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
            <div style={{width:'100%', display:'flex',justifyContent:'space-between'}}>
              <CancelButton fontSize='13px' grey type='button' padd='5px' onClick={close}>Отменить</CancelButton>
              <Button type='submit' >Создать</Button>
            </div>
          </form>
        </div> : 
        <div>hi</div>}
  </CSSTransition>
    )
       
}



export default CreateForm

