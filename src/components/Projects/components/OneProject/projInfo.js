import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'
import {Card,SmallCard, ModalContainer, ModalWind} from '../../../../Styles/common'
import {Button} from '../../../../Styles/buttons'
import { Bold, Light, Regular, Thin } from '../../../../Styles/typography'
import ModalWindow from '../ModalWindow'
import { useSelector } from 'react-redux'


const ProjInfo = ({project}) => {
    // const [overCard, setOvercard] = useState(false)
    const user =  useSelector(state=> state.auth.user)
    return(
    <div className={styles.info__cont}>
      <div  className={styles.title__info} >
           <img  src='/info.png' style={{marginRight:'10px'}}></img>
            <Thin size='22'>Общая информация о проекте</Thin>
      </div>
      <div className={styles.info__project} >
        <div className={styles.info__descr}>
          <Bold size='16' className={styles.info__line}>Описание проекта</Bold>
          <Light className={styles.info__line} style={{marginLeft:'20px'}}>{project.about}</Light>
        </div>
        <div className={styles.info__descr}>
          <Bold className={styles.info__line} size='16'>Официальное название</Bold>
          <Light className={styles.info__line} style={{marginLeft:'20px'}}>{project.offTitle}</Light>
        </div>
        <div className={styles.info__crypt}>
          <Bold className={styles.info__line} size='16'>Шифр</Bold>
          <Light className={styles.info__line} style={{marginLeft:'20px'}}>{project.crypter}</Light>
        </div>
        <SmallCard style={{marginBottom:'20px', display:`${user.permission!=='admin'?'none':'block'}`}} >
          <div className={styles.info__link}>
            <Light size='15'>Бюджет</Light>
            {project.budget!==undefined?<a href={project.budget.includes('https://')?project.budget:'https://'+project.budget} target='_blank' size='15'>{project.budget}</a>:''}
          </div>
          <div className={styles.info__link}>
            <Light size='15'>Хранилище документации для заказчика</Light>
            {project.cusStorage!==undefined?<a href={project.cusStorage.includes('https://')?project.cusStorage:'https://'+project.cusStorage} target='_blank' size='15'>{project.cusStorage}</a>:''}

          </div>
          <div className={styles.info__link}>
            <Light size='15'>График проекта</Light>
            {project.schedule!==undefined?<a href={project.schedule.includes('https://')?project.schedule:'https://'+project.schedule} target='_blank' size='15'>{project.schedule}</a>:''}
          </div>
        </SmallCard>
        {project.customerNew[0]!==undefined?
          <div className={styles.info__descr}>
          <div style={{display:'flex'}}><Bold className={styles.info__line} size='16'>Заказчик</Bold><Light className={styles.info__line} style={{marginLeft:'20px'}}>{project.customerNew[0].name}</Light></div>
          
          <Light className={styles.info__line} style={{marginLeft:'20px'}}>Почта: {project.customerNew[0].email}</Light>
          <Light className={styles.info__line} style={{marginLeft:'20px'}}>Телефон:{project.customerNew[0].phone}</Light>
          {project.customerNew[0].other!==undefined?
            project.customerNew[0].other.map((el,i)=>{
              return(
                <Light key={i} className={styles.info__line} style={{marginLeft:'20px'}}>{el}</Light>
              )
            }):''
            
       
          }
        </div>:
        <div className={styles.info__descr}>
          <Bold className={styles.info__line} size='16'>Заказчик: </Bold>
          <Light className={styles.info__line} style={{marginLeft:'20px'}}>{project.customer}</Light>
        </div>
        }
        
      </div>
    </div>
    )
}
export default ProjInfo