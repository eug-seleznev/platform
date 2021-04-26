import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'
import {ButtonText} from '../../../../Styles/buttons'
import { Light } from '../../../../Styles/typography'
import { Path } from '../../../Layout/header';



const ProjInfo = ({project,history}) => {
    
    return (
      <div className={styles.info__cont}>
        <div className={styles.title__info}>
          <img alt="info" src={Path+'info.png'}  style={{ marginRight: "10px" }}></img>
          <Light size="18">Общая информация о проекте</Light>
          <ButtonText
            color="#445AAA"
            fontSize="12"
            className={styles.change__info}
            onClick={() => history.push(`info`)}
          >
            подробнее
          </ButtonText>
        </div>
        <div className={styles.info__project}>
          <div className={styles.info__descr}>
            <Light size="13" color="#3F496C" className={styles.info__line}>
              Описание проекта
            </Light>
            <Light
              className={styles.info__line}
              size="14"
              style={{ marginLeft: "20px" }}
            >
              {project.about}
            </Light>
          </div>
          <div className={styles.info__crypt}>
            <Light
              className={styles.info__line}
              size="14"
              color="#3F496C"
              size="13"
            >
              Официальное название
            </Light>
            <Light
              className={styles.info__line}
              size="14"
              style={{ marginLeft: "20px" }}
            >
              {project.offTitle}
            </Light>
          </div>
          <div className={styles.info__crypt}>
            <Light className={styles.info__line} color="#3F496C" size="13">
              Шифр:
            </Light>
            <Light
              size="14"
              className={styles.info__line}
              style={{ marginLeft: "5px" }}
            >
              {project.crypter}
            </Light>
          </div>
        </div>
      </div>
    );
}
export default ProjInfo