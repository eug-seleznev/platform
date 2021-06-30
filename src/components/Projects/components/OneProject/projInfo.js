import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'
import {ButtonText} from '../../../../Styles/buttons'
import { Light, Regular } from '../../../../Styles/typography'
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
            <Regular size="16" color="#3F496C" className={styles.info__line}>
              Описание проекта
            </Regular>
            <Light
              className={styles.info__line}
              size="14"
              style={{ marginLeft: "20px",marginBottom:'15px' }}
            >
              {project.about}
            </Light>
          </div>
          <div className={styles.info__crypt}>
            <Regular
              className={styles.info__line}
              color="#3F496C"
              size="16"
            >
              Официальное название
            </Regular>
            <Light
              className={styles.info__line2}
              size="14"
              style={{ marginLeft: "20px" }}
            >
              {project.offTitle}
            </Light>
          </div>
          <div className={styles.info__crypt}>
            <Regular className={styles.info__line} color="#3F496C" size="16">
              Шифр:
            </Regular>
            <Light
              size="14"
              className={styles.info__line2}
              style={{ marginLeft: "5px" }}
            >
              {project.crypter}
            </Light>
          </div>
          <div className={styles.info__crypt}>
            <Regular className={styles.info__line} color="#3F496C" size="16">
              Заказчик:
            </Regular>
            <div>
              <Light
              size="14"
              className={styles.info__line2}
              style={{ marginLeft: "15px" }}
            >
              {project.customerNew[0]?.name}
            </Light>
            <Light
              size="14"
              className={styles.info__line2}
              style={{ marginLeft: "15px" }}
            >
              {project.customerNew[0]?.phone}
            </Light>
            <Light
              size="14"
              className={styles.info__line2}
              style={{ marginLeft: "15px" }}
            >
              {project.customerNew[0]?.email}
            </Light>
            {project.customerNew[0]?.other?.map((contact,i)=>{
              return(
                <Light
                key={i}
                size="14"
                className={styles.info__line2}
                style={{ marginLeft: "15px" }}
              >
                {contact}
              </Light>
              )
            })}
            </div>
            
          </div>
        </div>
      </div>
    );
}
export default ProjInfo