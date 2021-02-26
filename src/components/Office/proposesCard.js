import styles from '../../Styles/modules/components/proposesCard.module.css'
import { useDispatch, useSelector} from 'react-redux'
import { likedProposes, dateProposes, likePropose, deletePropose, inWork} from '../../redux/actions/office'
import {Card} from '../../Styles/common'
import { Bold, Thin, Regular} from '../../Styles/typography'
import {Button, FilterButton, ButtonText } from '../../Styles/buttons'
import { useEffect, useState } from 'react'
import Confirm from './confirm'


const ProposeCard = ({cardContent, filters, reverse, user}) => {
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

useEffect(()=>{
    console.log(cardContent.likes) 
},[])


    return (
       <div className={styles.cardGrid}>

            {cardContent.user._id==user.id ? <img src='/delete.png' className={styles.deleteBtn} onClick={()=>setShowConfirm(true)} /> : 
            user.permission=='admin' && <img src='/delete.png' className={styles.deleteBtn} onClick={()=>setShowConfirm(true)} /> }

        <Card className={styles.cardContainer}>
            <Bold size='30px' className={styles.title}>{cardContent.title}</Bold>
            <Regular size='16px' className={styles.text}>{cardContent.text}</Regular>
            <Thin className={styles.date}>{cardContent.date.slice(5,10).split('-').reverse().join('.')}</Thin>
    
            <img src='/like.png' style={{backgroundColor:`${likeTrue?'red':'white'}`, cursor:'pointer'}} className={styles.likeBtn} onClick={()=>likeButton(cardContent._id)} />
            
            <Bold size='12' className={styles.likes}>{cardContent.likeCount} людям нравится</Bold>

                {user.permission=='admin' && <Bold className={styles.inWorkBtn} size='12' color='#3F496C' onClick={()=>dispatch(inWork(cardContent._id))}>{!cardContent.status ? 'в работу' : 'отложить'}</Bold>}
           
        </Card>

        <Bold size='12' color='#3F496C' className={styles.inWork} style={{opacity: cardContent.status? 1:0}}>в работе</Bold> 
        

        {showConfirm && <Confirm accept={()=>deleteButton(cardContent._id)} decline={()=>setShowConfirm(false)} title={cardContent.title}/> }  


       </div>
                  
      
            
    )
}



export default ProposeCard