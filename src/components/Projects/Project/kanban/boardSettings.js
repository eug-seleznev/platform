
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { Button, ButtonText, CancelButton } from '../../../../Styles/buttons'
import styles from './kanban.module.css'
import { addNewCard, addNewCategory, addNewColumn, loadBoard,deleteColumn } from "../../../../redux/actions/kanban";
import { Input } from "../../../../Styles/Forms";




const BoardSettings = ({close, boardId, visible,}) => {

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
          <form className={styles.createCard}>
          <div>
                <div>
                    Новая категория
                </div>
               <Input 
                    name='category'
                    type='text'
                    value={category.name}
                    onChange={(e)=>setCategory({...category, name: e.target.value})}
                />
                <Input 
                    name='category'
                    type='number'
                    value={category.step}
                    onChange={(e)=>setCategory({...category, step: Number(e.target.value)})}
                />
                <Input 
                    name='category'
                    type='date'
                    value={category.start}
                    onChange={(e)=>setCategory({...category, start: e.target.value})}
                />
                <Input 
                    name='category'
                    type='date'
                    value={category.end}
                    onChange={(e)=>setCategory({...category, end: e.target.value})}
                />
                <ButtonText onClick={()=>createCategory()}>Создать категорию</ButtonText> 
            </div>
            <div>
                <div>
                    Новая колонка
                </div>
               <Input 
                    name='column'
                    value={column}
                    onChange={(e)=>setColumn(e.target.value)}
                />
                <ButtonText onClick={()=>createColumn()}>Создать колонку</ButtonText> 
            </div>
          <CancelButton onClick={()=>closeModal()}>Закрыть</CancelButton>

          </form>


        </div> 
        
  </CSSTransition>
    )
       
}



export default BoardSettings

