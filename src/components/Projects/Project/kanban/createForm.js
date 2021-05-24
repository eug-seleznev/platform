
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewCard } from '../../../../redux/actions/kanban'
import styles from './kanban.module.css'






const CreateForm = ({crypt,setCreateOpen, boardId}) => {

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

return (
        <div className={styles.createWindow}>
          <form className={styles.createCard}onSubmit={(e)=>{createCardFunc(e)}}>
            <input value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <input value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
            <button type='button'>отменить</button>
            <button type='submit' >создать</button>
          </form>
        </div>
    )
       
}



export default CreateForm

