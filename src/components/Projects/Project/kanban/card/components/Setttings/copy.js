import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { copyCardToColumn } from "../../../../../../../redux/actions/kanban";
import { Select } from "../../../../../../../Styles/tables";
import { Regular } from "../../../../../../../Styles/typography";
import { Path } from "../../../../../../Layout/header";
import { useClickOutside } from "../../../hooks/hooks";
import settings from "./settings.module.css";
const Copy = ({ id, open, setOpen, timelineId, title, theme }) => {
  const columns = useSelector((state) => state.projects.kanban.columns);
  const board_id = useSelector((state) => state.projects.kanban._id);
  const outclick = useClickOutside(() => open === "copy" && setOpen(""));
  const [button, setButton] = useState(false);
  const [chosenColumn, setChosenColumn] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setChosenColumn(columns[0]);
    setNewTitle(title + "(" + Math.floor(Math.random() * 10) + ")");
  }, []);
  const copyCard = () => {
    dispatch(
      copyCardToColumn(chosenColumn, board_id, id, newTitle, timelineId)
    );
    setChosenColumn(columns[0]);
    setNewTitle("");
    setOpen("");
  };
  const onChange = (e) => {
    console.log(e.target.value);
    setChosenColumn(e.target.value);
  };
  const onChangeTitle = (e) => {
    console.log(e.target.value);
    setNewTitle(e.target.value);
  };
  return (
    <div style={{ zIndex: 1 }}>
      <div
        className={settings.description}
        style={{ display: button ? "block" : "none" }}
      >
        <Regular size="14" color="white">
          Копировать карточку
        </Regular>
      </div>
      <div
        className={settings.imageBackground}
        onClick={() => {
          setOpen(open === "copy" ? "" : "copy");
        }}
        onMouseEnter={() => {
          setButton(true);
        }}
        onMouseLeave={() => {
          setButton(false);
        }}
        style={{
          opacity: open === "copy" ? 1 : 0.5,
          cursor: "pointer",
        }}
      >
        <img
          draggable="false"
          src={Path + "copy.png"}
          style={{ opacity: button ? 1 : 0.5 }}
        />
      </div>
      <div
        className={settings.copy}
        ref={outclick}
        style={{
          backgroundColor: !theme ? "white" : "#1E1E1E",
          border: theme ? "1px solid grey" : "none",
          visibility: open === "copy" ? "visible" : "hidden",
          color: theme ? "white" : "black",
        }}
      >
        <Regular size="14.5"color={theme ? "white" : "black"}>Копировать карточку</Regular>
        <textarea
          value={newTitle}
          className={settings.textarea}
          onChange={onChangeTitle}
          placeholder="Новое название"
          style={{
              width:'96%',
            color:theme ? "white" : "black",
            backgroundColor: !theme ? "white" : "#1E1E1E",
            border: theme ? "1px solid grey" : "none",
          }}
          required
        />
        в
        <Select
          onChange={onChange}
          defaultValue={chosenColumn}
          style={{
            color: theme ? "white" : "black",
            border: "1px solid grey",
            borderRadius: "5px",
            marginLeft: "10px",
            marginTop: "10px",
            width: "145px",
          }}
        >
          {columns.map((el, i) => {
            return (
              <option 
              style={{
                color:theme ? "white" : "black",
                backgroundColor: !theme ? "white" : "#1E1E1E",
              }} key={i} value={el}>
                {el}
              </option>
            );
          })}
        </Select>
        <button className={settings.button} onClick={copyCard}>
          Создать карточку
        </button>
      </div>
    </div>
  );
};
export default Copy;
