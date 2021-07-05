import styles from '../../card.module.css'
import { url } from "../../../../../../utils/axios";
import { useState } from 'react';


const ExecsIcon = ({el,history}) =>{
   
    const [visibleName, setVisibleName] = useState(false)

    const goToUser =(e,id)=>{
        e.stopPropagation()
        history.push(`../../../../users/${id}`)
      }

    return(
        <div key={'insideCard'+el._id} style={{height:'16px'}}>
            <img  
                src={url+'/'+el.avatar} 
                onClick={(e)=>{goToUser(e, el._id)}}
                onMouseEnter={()=>{setVisibleName(true)}}
                onMouseLeave={()=>{setVisibleName(false)}} 
                className={styles.execsIcon}
            />
            <div style={{position:'relative',zIndex:'2999', display: visibleName?'block':'none'}}>
                <div className={styles.card__exec__name}>
                    {el.fullname}
                </div>
            </div>
        </div>  
        
    )
}
export default ExecsIcon