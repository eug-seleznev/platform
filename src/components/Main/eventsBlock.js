import { useDispatch } from "react-redux";
import { finishAllTasks } from "../../redux/actions/user";
import styles from "../../Styles/modules/main/main.module.css";
import { Bold, Light, Regular, Thin } from "../../Styles/typography";
import { Path } from "../Layout/header";
import getCurrentMonth from "../MyTasks/getCurrentMonth";
import ProjTasks from "../MyTasks/projTasks";
import SprintCard from "./sprintCard";
import card from "../Projects/Project/kanban/card/card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartOutline } from "@fortawesome/free-regular-svg-icons";
import getDate from "../Projects/getDate";
const EventsBlock = ({ user, history }) => {
  const dispatch = useDispatch();
  const onChange = (e) => {
    let taskid = e.target.value;
    dispatch(finishAllTasks({ taskid }));
  };
  const pushToProject = (link) => {
    history.push(`./projects/${link}/main`);
  };
  const cardMain = {
    border: "1px solid #9CE3B0",
 minHeight:'35px'
  };
  return (
    <div className={styles.my_events}>
      <div className={styles.create__news}>
        <img
          className={styles.create__news__img}
          alt="star"
          src={Path + "starr.png"}
        ></img>
        <Bold color="black" size="18">
          Ближайшие события
        </Bold>
      </div>
      {user.event_cards.filter((card) => card.emergency === "Событие").length === 0 ? (
            <Thin size="16" style={{marginTop:'20px'}}>Нет ближайших событий</Thin>
          ) : user.event_cards
        .filter((card) => card.emergency === "Событие")
        .map((el, i) => {
          return (
            <div key={i} className={card.card} style={cardMain}>
              <div
                  style={{ backgroundColor: "#9CE3B0" }}
                  className={card.card__circuit}
                ></div>{" "}
              <div style={{marginLeft:'5px'}}>
                <div style={{display:'flex'}}>
                
                <Light size="16" style={{ maxWidth: "80%" }}>
                  {el.title}
                </Light>
              </div>

              {el.deadline && (
                <Light
                  size="11"
                  color={"#B7B7B7"}
                  style={{ marginRight: "5px", width: "max-content" }}
                >
                  {getDate(el.deadline)}
                </Light>)}
              </div>
              
              
            </div>
          );
        })}
    </div>
  );
};

export default EventsBlock;
