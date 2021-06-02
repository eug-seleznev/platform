import { useState } from "react"
import { Path } from "../../../Layout/header"
import styles from './kanban.module.css'

    const BoardTitleIndex =({el,handleRedirect,chosenBoard})=>{
        const [chosen,setChosen] =useState(false)
        return (
            <div style={{display:'flex'}}>
                <div className={styles.main__board__item} onClick={()=>handleRedirect(el.name)}>
                {el.name}
                </div>
                <img onClick={()=>{chosenBoard(el._id)}} style={{cursor:'pointer',width:'30px', height:'30px',transform:'translate(10px, 15px)'}} src={Path+'star.png'}></img>
            </div>
        )
    }           
    export default BoardTitleIndex