
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewCard } from '../../../../redux/actions/kanban'
import { Button, CancelButton } from '../../../../Styles/buttons'
import styles from './kanban.module.css'






const CreateForm = ({crypt,setCreateOpen}) => {

const dispatch =useDispatch ()
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')

const createCardFunc =(e)=>{
    e.preventDefault()
    dispatch(addNewCard(crypt, title, description))
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
        <div className={styles.createWindow}>
          <form className={styles.createCard}onSubmit={(e)=>{createCardFunc(e)}} >
            <input placeholder='Название' required style={{width:'97%',marginBottom:'10px',height:'30px'}} value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <input placeholder='Описание' style={{width:'97%',marginBottom:'10px',height:'30px'}} value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
            <div style={{width:'100%', display:'flex',justifyContent:'space-between'}}>
              <CancelButton fontSize='13px' grey type='button' padd='5px' onClick={close}>Отменить</CancelButton>
              <Button type='submit' >Создать</Button>
            </div>
            
          </form>
        </div>
    )
       
}



export default CreateForm

