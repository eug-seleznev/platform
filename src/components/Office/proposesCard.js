import styles from '../../Styles/modules/components/proposesCard.module.css'
import { useDispatch} from 'react-redux'
import { likedProposes, dateProposes, likePropose, deletePropose} from '../../redux/actions/office'
import {Card} from '../../Styles/common'
import { Bold, Thin, Regular} from '../../Styles/typography'




const ProposeCard = ({cardContent}) => {

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
       
                  
        <Card className={styles.cardContainer}>
            <Bold size='30px' className={styles.title}>{cardContent.title}</Bold>
            <Bold size='16' className={styles.likes}>{cardContent.likeCount}</Bold>
            <Regular size='16px' className={styles.text}>{cardContent.text}</Regular>
            <Thin className={styles.date}>{cardContent.date.slice(5,10).split('-').reverse().join('.')}</Thin>
            <button className={styles.likeBtn} onClick={()=>likeButton(cardContent._id)}>like</button>
            <button className={styles.deleteBtn} onClick={()=>deleteButton(cardContent._id)}>delete</button>
            <div className={styles.filters}>#</div>
        </Card>
            
    )
}



export default ProposeCard