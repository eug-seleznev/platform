import styles from '../../Styles/modules/components/proposesCard.module.css'
import { useDispatch, useSelector} from 'react-redux'
import { likedProposes, dateProposes, likePropose, endPropose, inWork, deletePropose} from '../../redux/actions/office'
import {Card} from '../../Styles/common'
import { Bold, Thin, Regular} from '../../Styles/typography'
import {Button, FilterButton, ButtonText } from '../../Styles/buttons'
import { useEffect, useState } from 'react'
import Confirm from './confirm'
import { url } from '../utils/axios'


const ProposeCard = ({cardContent, rip, filters, addExecutor, reverse, user}) => {
const dispatch = useDispatch()
const reload = useSelector(state => state.office.reload)
const likeTrue =  cardContent.likes.some(el => el.user == user._id)


const [showConfirm, setShowConfirm] = useState(false)

const likeButton =(id) =>{
    dispatch(likePropose(id))
    
}
const deleteButton =(id) =>{
   dispatch(deletePropose(id))
    setShowConfirm(false)
}
const endButton =(id) =>{
    dispatch(endPropose(id))
     setShowConfirm(false)
 }
 
useEffect(()=>{
    console.log(cardContent.executor) 

},[])


    return (
       <div className={styles.cardGrid}>

            {cardContent.user._id==user.id ? <img src='/delete.png' className={styles.deleteBtn} style={{display:rip?'none':'grid'}} onClick={()=>setShowConfirm('Удалить')} /> : 
            user.permission=='admin' && <img src='/delete.png' style={{display:rip?'none':'grid'}} className={styles.deleteBtn} onClick={()=>setShowConfirm('Удалить')} /> }


            {cardContent.user._id==user.id ? <img src='/check.png' className={styles.inWork} style={{display:rip?'none':'grid',height:'30px',width:'30px'}} onClick={()=>setShowConfirm('Завершить')} /> : 
            user.permission=='admin' && <img src='/check.png' style={{display:rip?'none':'grid',height:'30px',width:'30px'}} className={styles.inWork} onClick={()=>setShowConfirm('Завершить')} /> }

        <Card className={styles.cardContainer}>
            <Bold size='30px' className={styles.title}>{cardContent.title}</Bold>
            <Regular size='16px' className={styles.text}>{cardContent.text}</Regular>
            <Thin className={styles.date}>{cardContent.date.slice(5,10).split('-').reverse().join('.')}</Thin>
    
            {!cardContent.status?<>
            <img src='/like.png'  style={{backgroundColor:`${likeTrue?'red':'white'}`, display:`${rip?'none':'grid'}`, cursor:'pointer'}} className={styles.likeBtn} onClick={()=>likeButton(cardContent._id)} />
            
            <Bold size='12' className={styles.likes}>{cardContent.likeCount} людям нравится</Bold></>
            : cardContent.executor!==null&&cardContent.executor!==undefined?<>
            <Thin className={styles.likes}>Исполнитель: {cardContent.executor.fullname}</Thin>
            <img src={url+'/'+cardContent.executor.avatar} className={styles.likeBtn} onClick={()=>likeButton(cardContent._id)}/></>:'' }

                {user.permission=='admin' && <Bold className={styles.inWorkBtn} size='12' style={{display:rip?'none':'grid'}} color='#3F496C' onClick={()=>!cardContent.status?addExecutor(cardContent._id): dispatch(inWork(cardContent._id))}>{!cardContent.status ? 'в работу' : 'отложить'}</Bold>}
           
        </Card>

        {/* <Bold size='12' color='#3F496C' className={styles.inWork} style={{opacity: cardContent.status? 1:0}}>в работе</Bold>  */}
        

        {showConfirm=='Удалить'? <Confirm accept={()=>deleteButton(cardContent._id)} decline={()=>setShowConfirm(false)} action={showConfirm} title={cardContent.title}/>:
         showConfirm=='Завершить'?  <Confirm accept={()=>endButton(cardContent._id)} decline={()=>setShowConfirm(false)} action={showConfirm} title={cardContent.title}/>:'' }  


       </div>
                  
      
            
    )
}



export default ProposeCard