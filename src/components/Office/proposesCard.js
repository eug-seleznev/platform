import styles from '../../Styles/modules/components/proposesCard.module.css'
import { useDispatch, useSelector} from 'react-redux'
import { likedProposes, dateProposes, likePropose, deletePropose, inWork} from '../../redux/actions/office'
import {Card} from '../../Styles/common'
import { Bold, Thin, Regular} from '../../Styles/typography'
import {Button, FilterButton, ButtonText } from '../../Styles/buttons'




const ProposeCard = ({cardContent, filters, reverse}) => {

const dispatch = useDispatch()




const likeButton =(id) =>{
    dispatch(likePropose(id))
    setTimeout(() => {
        dispatch(likedProposes)
        dispatch(dateProposes)
    }, 100);
}
const deleteButton =(id) =>{
    dispatch(deletePropose(id))
    setTimeout(() => {
        dispatch(likedProposes)
        dispatch(dateProposes)
    }, 100);
}




    return (
       <div className={styles.cardGrid}>

        <img src='/delete.png' className={styles.deleteBtn} onClick={()=>deleteButton(cardContent._id)} />

        <Card className={styles.cardContainer}>
            <Bold size='30px' className={styles.title}>{cardContent.title}</Bold>
            <Bold size='16' className={styles.likes}>{cardContent.likeCount}</Bold>
            <Regular size='16px' className={styles.text}>{cardContent.text}</Regular>
            <Thin className={styles.date}>{cardContent.date.slice(5,10).split('-').reverse().join('.')}</Thin>
            <img src='/like.png' className={styles.likeBtn} onClick={()=>likeButton(cardContent._id)} />
            <div className={styles.filters}>#{filters}, реверс: {`${reverse}`} || <Bold className={styles.inWorkBtn} size='12' onClick={()=>dispatch(inWork(cardContent._id))}>в работу</Bold></div>
        </Card>

        <Bold size='12' className={styles.inWork} style={{opacity: cardContent.status? 1:0}}>в работе</Bold> 
        

       </div>
                  
      
            
    )
}



export default ProposeCard