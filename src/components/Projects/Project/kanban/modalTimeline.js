import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateTimeline } from "../../../../redux/actions/kanban"
import { ButtonTextLight } from "../../../../Styles/buttons"
import { ModalContainer } from "../../../../Styles/common"
import { Light } from "../../../../Styles/typography"
import style from './modalTimeline.module.css'

const ModalTimeline =({setModal,id, boardId, timelineId})=>{
    const dispatch = useDispatch()
    const [timeline, setTimeline] = useState('')
    useEffect(()=>{
        console.log(timeline)
    },[timeline])

    const save = () => {
        const step = timeline==="Неделя"? 7 : timeline==="Две недели"? 14 : timeline==="Три недели"? 21 : timeline==="Месяц"? 30 : parseInt(timeline)
        dispatch(updateTimeline(id, step, boardId, timelineId))
        setModal(false)
    }

    return (
        <ModalContainer>
            <div className={style.window}>
                <Light size='16'color='black' style={{marginBottom:'15px'}}>Выберите таймлайн категории</Light>
                <div className={style.window__button__row}>
                    <button className={style.window__button} style={{backgroundColor:timeline==="Неделя"?'rgba(0,0,0,0.2)':'rgba(0,0,0,0)',marginRight:'10px'}} value="Неделя" onClick={(e)=>{setTimeline(e.target.value)}} >Неделя</button>
                    <button className={style.window__button} style={{backgroundColor:timeline==="Две недели"?'rgba(0,0,0,0.2)':'rgba(0,0,0,0)'}} value="Две недели"onClick={(e)=>{setTimeline(e.target.value)}}>Две недели</button>
                </div>
                <div className={style.window__button__row}>
                    <button className={style.window__button}  value="Три недели" style={{marginRight:'10px',backgroundColor:timeline==="Три недели"?'rgba(0,0,0,0.2)':'rgba(0,0,0,0)'}}onClick={(e)=>{setTimeline(e.target.value)}}>Три недели</button>
                    <button className={style.window__button} style={{backgroundColor:timeline==="Месяц"?'rgba(0,0,0,0.2)':'rgba(0,0,0,0)'}} value="Месяц"onClick={(e)=>{setTimeline(e.target.value)}}>Месяц</button>
                </div>
                <Light size='14'color='grey' style={{marginTop:'5px',marginBottom:'10px'}}>Или свое значение</Light>
                <input className={style.window__input} placeholder='Введите количество дней' value={typeof timeline==='sting'?null:timeline} onChange={(e)=>{setTimeline(e.target.value)}} type='number'></input>
                <div className={style.window__buttons__end}>
                    <ButtonTextLight fontSize='14px' onClick={()=>{setModal(false)}} color='#F84B4B' >Отмена</ButtonTextLight>
                    <ButtonTextLight fontSize='14px'  onClick={()=>save()}>Сохранить</ButtonTextLight>
                </div>
            </div>
        </ModalContainer>
    )
}
export default ModalTimeline 