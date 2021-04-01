import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'
import {ButtonText} from '../../../../Styles/buttons'
import { Bold, Light, Thin } from '../../../../Styles/typography'



const ProjInfo = ({project,history}) => {
    
    return(
    <div className={styles.info__cont}>
      <div  className={styles.title__info} >
           <img alt='info' src='/info.png' style={{marginRight:'10px'}} ></img>
            <Thin size='22'>Общая информация о проекте</Thin>
            <ButtonText
                  color="#445AAA"
                  fontSize="12"

                  className={styles.change__info}
                  onClick={() => history.push(`/admin/editproj/${project.crypt}`)}
                >
                  изменить
                </ButtonText>
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

      
      </div>
    </div>
    )
}
export default ProjInfo