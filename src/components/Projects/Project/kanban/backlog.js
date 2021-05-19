import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCard } from '../../../../redux/actions/kanban'
import { ButtonTextLight } from '../../../../Styles/buttons'
import KanbanCard from './card/card'
import styles from './kanban.module.css'


const Backlog =({sideOpen,setCreateOpen})=>{
    const createFromBacklog = ()=>{
        setCreateOpen ({
            status:true,
            place:'backlog'
        })
    }
    
    return (
        <>
        <div style={{display: sideOpen? 'block' : 'none'}}>
            <div className={styles.backLogCards} >
                <KanbanCard />
                <KanbanCard />
                <KanbanCard />
            </div>
            <div className={styles.backLogButtonCont}>
                <div className={styles.backLogButton} onClick={createFromBacklog}>
                    <img src='/plus1.png'className={styles.backLogPlus}></img>
                    <ButtonTextLight color='white'style={{fontStyle:'italic'}}>Добавить карточку</ButtonTextLight>
                </div>
            </div>
            
        </div>
        
        </>
        
    )
}
export default Backlog