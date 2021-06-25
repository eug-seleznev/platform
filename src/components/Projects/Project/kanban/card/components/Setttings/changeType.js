import { useDispatch } from "react-redux";
import { changeCardField } from "../../../../../../../redux/actions/kanban";
import settings from "./settings.module.css";
const ChangeType = ({ theme, info }) => {
  const dispatch = useDispatch();
  const changeType = (e) => {
    let val = e.target.value;
    let field = e.target.name;
    let id = info._id;
    dispatch(changeCardField(val, field, id));
  };
  return (
    <select
      name="emergency"
      onChange={(e) => {
        changeType(e);
      }}
      className={settings.selector}
      style={{
        color: !theme ? "black" : "white",
        backgroundColor: !theme ? "#EFEFEF" : "#1E1E1E",
      }}
      defaultValue={info.emergency}
    >
      <option
        className={settings.selector__option}
        style={{
          color: !theme ? "black" : "white",
          backgroundColor: !theme ? "#EFEFEF" : "#1E1E1E",
        }}
        value="Обычная"
      >
        Обычная
      </option>
      <option
        className={settings.selector__option}
        style={{
          color: !theme ? "black" : "white",
          backgroundColor: !theme ? "#EFEFEF" : "#1E1E1E",
        }}
        value="Срочная"
      >
        Срочная
      </option>
      <option
        className={settings.selector__option}
        style={{
          color: !theme ? "black" : "white",
          backgroundColor: !theme ? "#EFEFEF" : "#1E1E1E",
        }}
        value="Критическая"
      >
        Критическая
      </option>
      <option
        className={settings.selector__option}
        style={{
          color: !theme ? "black" : "white",
          backgroundColor: !theme ? "#EFEFEF" : "#1E1E1E",
        }}
        value="Событие"
      >
        Событие
      </option>
    </select>
  );
};
export default ChangeType;
