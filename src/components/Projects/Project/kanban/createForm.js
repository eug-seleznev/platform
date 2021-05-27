
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { addNewCard, addNewCardToColumn } from '../../../../redux/actions/kanban'
import { Button, CancelButton } from '../../../../Styles/buttons'
import { Select } from '../../../../Styles/tables'
import { Thin } from '../../../../Styles/typography'
import styles from './kanban.module.css'






const CreateForm = ({crypt,setCreateOpen, boardId, visible, place, categoryId, column, timeline }) => {

const dispatch =useDispatch ()
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [type, setType] = useState('Одна задача')
const createCardFunc =(e)=>{
    e.preventDefault()
    dispatch(addNewCard(crypt, title, description, boardId,type))
    setDescription('')
    setTitle('')
    
    setCreateOpen ({
      status:false,
      place:''
  })
  // setType ('Одна задача')
}
useEffect(()=>{
  console.log(type)
},[type])
const createCardInsideCategory = (e) => {
  e.preventDefault()
  dispatch(addNewCardToColumn(categoryId, title, description, column, timeline, boardId,type))
  setDescription('')
  setTitle('')
  
  setCreateOpen ({
    status:false,
    place:''
})
// setType ('Одна задача')
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
          <form className={styles.createCard} onSubmit={(e)=>{place==='backlog' ? createCardFunc(e): createCardInsideCategory(e)}} >
            <input placeholder='Название' required style={{width:'97%',marginBottom:'10px',height:'30px'}} value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <input placeholder='Описание' style={{width:'97%',marginBottom:'10px',height:'30px'}} value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
            <Thin size='13'>Тип карточки</Thin>
            <Select onChange={(e)=>{setType(e.target.value)}} style={{width:'100%',marginBottom:'50px',border:'2px solid black',height:'35px', marginTop:'4px', borderRadius:'5px'}} defaultValue='Одна задача'>
              <option value='Одна задача'>Одна задача</option>
              <option value='Чеклист'>Чеклист</option>
              <option value='Событие'>Событие</option>
              {/* <option></option> */}
            </Select>
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

