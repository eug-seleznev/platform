import styles from "../../../../Styles/modules/components/Project/oneproj.module.css";
import { ButtonText } from "../../../../Styles/buttons";
import { Light, Regular } from "../../../../Styles/typography";
import { Path } from "../../../Layout/header";
import getDate from "../../getDate";
import { url } from "../../../utils/axios";

const ProjInfo = ({ project, history, singlePage }) => {
  const newFields = [
    {
      str: "Тип: ",
      val: project.type,
    },
    {
      str: "Cтадия: ",
      val: project.stage,
    },
    {
      str: "Объект: ",
      val: project.object,
    },
    {
      str: "Дата начала: ",
      val: project.dateStart,
    },
    {
      str: "Дата окончания: ",
      val: project.dateFinish,
    },
    {
      str: "Ссылка на бюджет: ",
      val: project.budget,
    },
    {
      str: "Ссылка на календарный график: ",
      val: project.schedule,
    },
    {
      str: "Ссылка на хранилище документации: ",
      val: project.cusStorage,
    },
  ];

  return (
    <div
      className={styles.info__cont}
      style={{ width: singlePage ? "100%" : "90%" }}
    >
      <div className={styles.title__info}>
        <img
          alt="info"
          src={Path + "info.png"}
          style={{ marginRight: "10px" }}
        ></img>
        <Light size="18">{singlePage?'Вся':'Общая'} информация о проекте</Light>
        <ButtonText
          color="#445AAA"
          fontSize="12"
          style={{ display: singlePage ? "none" : "block" }}
          className={styles.change__info}
          onClick={() => history.push(`info`)}
        >
          подробнее
        </ButtonText>
      </div>
      <div
        className={styles.info__project}
        style={{ width: singlePage ? "95%" : "80%" }}
      >
        <div className={styles.info__descr}>
          <Regular size="16" color="#3F496C" className={styles.info__line}>
            Описание проекта
          </Regular>
          <Light
            className={styles.info__line}
            size="14"
            style={{ marginLeft: "20px", marginBottom: "15px" }}
          >
            {project.about}
          </Light>
        </div>
        <div className={styles.info__crypt}>
          <Regular className={styles.info__line} color="#3F496C" size="16">
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
            {project.customerNew[0]?.other?.map((contact, i) => {
              return (
                <Light
                  key={i}
                  size="14"
                  className={styles.info__line2}
                  style={{ marginLeft: "15px" }}
                >
                  {contact}
                </Light>
              );
            })}
          </div>
        </div>
        {singlePage && (
          <>
            {newFields && newFields?.map((field, i) => {
              return (
                <div
                  className={styles.info__crypt}
                  key={i}
                  style={{ marginTop: i === 0 ? "20px" : "0px" }}
                >
                  <Regular
                    className={styles.info__line}
                    color="#3F496C"
                    size="16"
                  >
                    {field.str}
                  </Regular>
                  <Light
                    size="14"
                    className={styles.info__line2}
                    style={{ marginLeft: "5px" }}
                  >
                    {field.str.includes("Дата")
                      ? getDate(field.val)
                      : field.val}
                  </Light>
                </div>
              );
            })}
          </>
        )}
        {project.custom_fields.map((field,i)=>{
          return (
            <div
                  className={styles.info__crypt}
                  key={i}
                  style={{display:!singlePage&&!field.viewable?'none':'flex',marginTop:!singlePage&&field.viewable?'20px':'0px'}}
                >
                  <Regular
                    className={styles.info__line}
                    color="#3F496C"
                    size="16"
                  >
                    {field.field_name}
                  </Regular>
                  <Light
                    size="14"
                    className={styles.info__line2}
                    style={{ marginLeft: "5px" }}
                  >
                    {field.field_type==='string'?field.field_content:<a href={url+'/'+field.file_path}>{field.field_content}</a>}
                  </Light>
                </div>
          )
        })}
      </div>
    </div>
  );
};
export default ProjInfo;
