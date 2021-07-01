import { useState } from 'react'
import Select from 'react-select'
import { ButtonText,KanbanInsideButton } from '../../../../Styles/buttons'
import { Regular } from '../../../../Styles/typography'
import { useEscapeClick } from './hooks/hooks'
import styles from './kanban.module.css'
import { useDispatch } from 'react-redux'
import { addExternalCategory } from '../../../../redux/actions/kanban'

const ExternalCategoryModal = ({boards, currentBoardId, close}) => {

    const dispatch = useDispatch()
const [chosenBoardId, setChosenBoardId] = useState(false)
const [chosenCategory, setChosenCategory] = useState(false)
const esc = useEscapeClick(close)
const selectStyles = {
    
    container: (provided, state)=> ({...provided, width:'45%',}),
    option: (provided, state)=> ({...provided, backgroundColor:'#3F4659',color:'#CACACA',}),
    menu: (provided, state) => ({...provided, backgroundColor:'#3F4659',}),
    dropdownIndicator: (provided, state) => ({...provided, backgroundColor:'#3F4659',}),
    control: (provided, state) => ({...provided, backgroundColor:'#3F4659', border: 'none', color:'#CACACA', padding: 0, }),
    singleValue: (provided, state) => ({...provided,  color:'#CACACA', }),
    valueContainer: (provided, state) => ({...provided,  padding:0, }),
    indicatorSeparator: (provided, state) => ({...provided, display:'none'}),
}

const boardsArr = boards.filter(el=>el._id!==currentBoardId).map((el,i)=>{
    return {value: el._id, label: el.name,}
})
const categories = boards[boards.findIndex(el=>el._id===chosenBoardId)]?.categories.map((el,i)=>{
    return {value: el._id, label: el.name,}
})

const monitor = (e) => {
    e.preventDefault()
    dispatch(addExternalCategory(chosenCategory, currentBoardId))
}

if(!boards){
    return <></>
}
    return(
        <div className={styles.ext__bg} onClick={close}>
            <div className={styles.ext__container} onClick={e=>e.stopPropagation()}>
                <Regular size='20' className={styles.ext__title}>Выберите категорию для мониторинга</Regular>
                <form onSubmit={monitor}>
                <div className={styles.ext__selects} >
                    <Select 
                        options={boardsArr}
                        placeholder={'Выберите доску'}
                        onChange={e=>setChosenBoardId(e.value)}
                        styles={selectStyles}
                    />
                    <Select 
                        options={categories}
                        placeholder={'Выберите категорию'}
                        onChange={e=>setChosenCategory(e.value)}
                        styles={selectStyles}
                    />
                </div>
                <div className={styles.ext__buttons}>
                    <KanbanInsideButton style={{marginRight:'10px'}} type='submit'>Добавить</KanbanInsideButton>
                    <ButtonText color='#F84B4B' onClick={close}>Отменить</ButtonText>
                </div>
                </form>
            </div>
        </div>
    )
}

export default ExternalCategoryModal