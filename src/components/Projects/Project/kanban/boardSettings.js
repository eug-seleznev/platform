
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { Button, CancelButton } from '../../../../Styles/buttons'
import styles from './kanban.module.css'
import { addNewCategory, addNewColumn, } from "../../../../redux/actions/kanban";
import { Input } from "../../../../Styles/Forms";
import { Light } from '../../../../Styles/typography'




const BoardSettings = ({close, boardId, visible, type}) => {

const dispatch =useDispatch ()

useEffect(() => {
    const closeIt = (e) => {
      if(e.keyCode === 27){
        close()
      }
    }
    window.addEventListener('keydown', closeIt)
  return () => window.removeEventListener('keydown', closeIt)
  },[])

const createCategory = (e, name) => {
    e.preventDefault()
    dispatch(addNewCategory(boardId,name))
    close()
}
const createColumn = (e, name) => {
    e.preventDefault()
    dispatch(addNewColumn(boardId,name))
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
            {type==='column' && 
            <CreateColumn create={createColumn} closeModal={close} />}
            {type==='category' &&
            <CreateCategory create={createCategory} closeModal={close} />
            }
        </div> 
        
  </CSSTransition>
    )
       
}



export default BoardSettings


const CreateColumn = ({create, closeModal}) => {
    const [name, setName] = useState('')
    const input = useRef(null)
const theme = useSelector(state => state.auth.user.theme)
    const close = () => {
        setName('')
        closeModal()
    }
    useEffect(()=>{
        input.current.focus()
    },[])
    return(
        <form className={styles.createCard} style={{marginTop: '36vh',backgroundColor:theme?'#18191B':'white'}} onSubmit={(e)=>create(e,name)}>
          <div>
            <Light className={styles.createCategoryInput}color={!theme?'black':'white'} size='14'>Название колонки</Light>
             <Input 
                  className={styles.createCategoryInput}
                  style={{backgroundColor:theme?'292929':'white'}}
                  
                  required
                  name='name'
                  ref={input}
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
              />
          </div>
          <div style={{display:'flex',justifyContent:'space-between', marginTop:'15px'}}>
              <CancelButton fontSize='13px'padd='5px'style={{backgroundColor:theme?'#18191B':'grey',border:theme?'none':''}} onClick={close}>Закрыть</CancelButton>
              <Button type='submit'>Создать колонку</Button> 
          </div>
        </form>
    )
}

const CreateCategory = ({create, closeModal}) => {
    const [name, setName] = useState('')
    const theme = useSelector(state => state.auth.user.theme)
    const input = useRef(null)
    const close = () => {
        setName('')
        closeModal()
    }

    useEffect(()=>{
        input.current.focus()
    },[])

    return(
        <form className={styles.createCard} style={{marginTop: '36vh',backgroundColor:theme?'#18191B':'white'}} onSubmit={(e)=>create(e,name)}>
        <div>
            <Light color={!theme?'black':'white'}  size='14'>Название категории</Light>
             <Input 
                  className={styles.createCategoryInput}
                  required
                  name='name'
                  ref={input}
                  type='text'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
              />             
          </div>
          <div style={{display:'flex',justifyContent:'space-between', marginTop:'15px'}}>
              <CancelButton fontSize='13px'padd='5px' style={{backgroundColor:theme?'#18191B':'grey',border:theme?'none':''}}  onClick={close}>Закрыть</CancelButton>
              <Button type='submit'>Создать категорию</Button> 
          </div>
        </form>
    )
}