
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { Button, ButtonText, CancelButton } from '../../../../Styles/buttons'
import styles from './kanban.module.css'
import { addNewCard, addNewCategory, addNewColumn, loadBoard,deleteColumn } from "../../../../redux/actions/kanban";
import { Input } from "../../../../Styles/Forms";
import { Bold, Light } from '../../../../Styles/typography'




const BoardSettings = ({close, boardId, visible, type}) => {

const dispatch =useDispatch ()
const [category, setCategory] = useState({
    name: '',
    step: '',
    start: undefined,
    end: undefined,
})
const [column, setColumn] = useState('')


const createCategory = () => {
    dispatch(addNewCategory(boardId,category))
    close()
}
const createColumn = () => {
    dispatch(addNewColumn(boardId,column))
    close()
}
const closeModal = () => {
    setColumn('')
    setCategory({
        name: '',
        step: '',
        start: undefined,
        end: undefined,
    })
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
          <form className={styles.createCard} style={{marginTop: '36vh'}}>
          <div style={{display:type==='category'?'block':'none'}}>
                <Light className={styles.createCategoryInput} size='14'>Название</Light>
               <Input 
                    className={styles.createCategoryInput}
                    name='category'
                    type='text'
                    value={category.name}
                    onChange={(e)=>setCategory({...category, name: e.target.value})}
                />
                <Light className={styles.createCategoryInput} size='14'>Шаг</Light>
                <Input 
                    className={styles.createCategoryInput}
                    name='category'
                    type='number'
                    value={category.step}
                    onChange={(e)=>setCategory({...category, step: Number(e.target.value)})}
                />
                <Light className={styles.createCategoryInput} size='14'>Начало</Light>
                <Input 
                    className={styles.createCategoryInput}
                    name='category'
                    type='date'
                    value={category.start}
                    onChange={(e)=>setCategory({...category, start: e.target.value})}
                />
                <Light className={styles.createCategoryInput} size='14'>Конец</Light>
                <Input
                    className={styles.createCategoryInput}  
                    name='category'
                    type='date'
                    value={category.end}
                    onChange={(e)=>setCategory({...category, end: e.target.value})}
                />
             
            </div>
            <div style={{display:type==='column'?'block':'none'}}>
                <Light className={styles.createCategoryInput} size='14'>Название</Light>
               <Input 
                    className={styles.createCategoryInput}
                    name='column'
                    value={column}
                    onChange={(e)=>setColumn(e.target.value)}
                />
                
            </div>
            <div style={{display:'flex',justifyContent:'space-between', marginTop:'15px'}}>
                <CancelButton fontSize='13px'padd='5px' grey onClick={()=>closeModal()}>Закрыть</CancelButton>
                <Button onClick={()=>createColumn()} style={{display:type==='column'?'block':'none'}}>Создать колонку</Button> 
                <Button onClick={()=>createCategory()} style={{display:type==='category'?'block':'none'}}>Создать категорию</Button> 
            </div>
            
            

          </form>


        </div> 
        
  </CSSTransition>
    )
       
}



export default BoardSettings

