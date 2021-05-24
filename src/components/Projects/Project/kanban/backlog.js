import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCard } from '../../../../redux/actions/kanban'
import { ButtonTextLight } from '../../../../Styles/buttons'
import { Path } from '../../../Layout/header'
import KanbanCard from './card/card'
import styles from './kanban.module.css'


const Backlog =({sideOpen,setCreateOpen, backlog})=>{
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
                {backlog?.map((card,i)=>{

                    return(
                         <KanbanCard key={i} info={card} backlog={true}/>
                    )
                })

                }
               
                
            </div>
            <div className={styles.backLogButtonCont}>
                <div className={styles.backLogButton} onClick={createFromBacklog}>
                    <img alt='plus' src={Path+'plus1.png'}className={styles.backLogPlus}></img>
                    <ButtonTextLight color='white'style={{fontStyle:'italic'}}>Добавить карточку</ButtonTextLight>
                </div>
            </div>
            
        </div>
        
        </>
        
    )
}
export default Backlog