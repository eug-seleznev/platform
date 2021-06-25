import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendNotifications } from "../../../../../../../redux/actions/kanban";
import { Light, Regular } from "../../../../../../../Styles/typography";
import { Path } from "../../../../../../Layout/header";
import { useClickOutside } from "../../../hooks/hooks";
import settings from "./settings.module.css";

const Notifications = ({ open, setOpen, deadline, id, theme }) => {
  const [button, setButton] = useState(false);
  const nots = [
    "Отправить уведомления участникам",
    "Напомнить мне за день до дедлайна",
    "Напомнить участникам за день до дедлайна",
  ];
  const dispatch = useDispatch()
  const outclick = useClickOutside(
    () => open === "notifications" && setOpen("")
  );
  const sendNots = (execs,isDeadline) =>{
    console.log(execs,deadline)
    let dl = new Date (deadline)
    let d2 = dl.getTime()
    let deadlinePush = new Date(d2 - 1000*60*60*24)
    console.log(deadlinePush)
    dispatch(sendNotifications(execs,isDeadline,deadlinePush,id))
    setOpen("")
  }
  return (
    <div style={{ zIndex: 1 }}>
      <div
        className={settings.description}
        style={{ display: button ? "block" : "none" }}
      >
        <Regular size="14" color="white">
          Напоминания
        </Regular>
      </div>
      <div
        className={settings.imageBackground}
        style={{
          opacity: open === "notifications" ? 1 : 0.5,
          cursor: "pointer",
        }}
        onClick={() => {
          setOpen(open !== "notifications" ? "notifications" : "");
        }}
        onMouseEnter={() => {
          setButton(true);
        }}
        onMouseLeave={() => {
          setButton(false);
        }}
      >
        <img
          draggable="false"
          src={Path + "bell.png"}
          style={{ opacity: button ? 1 : 0.5 }}
        />
      </div>
      <div
        className={settings.users__dropdown}
        ref={outclick}
        style={{
          width: "375px",
          height: "82px",
          overflowY: "hidden",
          marginLeft: "-37px",
          visibility: open === "notifications" ? "visible" : "hidden",
          backgroundColor: !theme ? "white" : "#1E1E1E",
          border:theme ?'1px solid grey':'none'
        }}
      >
        {nots.map((nt, i) => {
          return (
            <Light
              className={settings.users__name}
              color={theme ? "white" : "black"}
              style={{ cursor: "pointer" }}
              key={i}
              onClick={()=>nt==="Отправить уведомления участникам"?sendNots(true, false):
              nt==="Напомнить мне за день до дедлайна"?sendNots(false, true):
              nt==="Напомнить участникам за день до дедлайна"?sendNots(true, true):''}
            >
              {nt}
            </Light>
          );
        })}
      </div>
    </div>
  );
};
export default Notifications;
