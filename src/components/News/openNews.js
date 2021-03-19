
import styles from '../../Styles/modules/components/News/newsModal.module.css'
import { Light,Thin} from '../../Styles/typography'
import { Card } from '../../Styles/common'
import { useState } from 'react';

const NewsOpen = ({close, content}) => {

const [overCard, setOvercard] = useState(false)

    
    return(
        <div className={styles.bg} onClick={!overCard && close}>
            <Card className={styles.card} onMouseEnter={()=>setOvercard(true)} onMouseLeave={()=>setOvercard(false)}>
                <Thin color='#3F496C' size='20' className={styles.name}>{content!=null && content.author.name}</Thin>
                <Light size='25' className={styles.title}>{content!=null && content.title}</Light>
                <Light size='18' className={styles.text}>{content && content.text}</Light>
                <Thin color='#3F496C' size='20' className={styles.date}>{content!=null && content.postDate.slice(0,10).split('-').reverse().join('.')}</Thin>
                <Thin color='#3F496C' size='18' className={styles.filter}>#фильтр</Thin>            
            </Card>
        </div>
      
    )
}
export default NewsOpen