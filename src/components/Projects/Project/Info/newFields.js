import style from "./newfields.module.css";
import card from "../kanban/card/components/cardOpen.module.css";
import { useState } from "react";
import { Light } from "../../../../Styles/typography";
import { Path } from "../../../Layout/header";
import { addCustomField } from "../../../../redux/actions/projects";
import { useDispatch } from "react-redux";

const NewFields = ({ project }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [viewable, setViewable] = useState(false);
  const [editor, setEditor] = useState("");
  const [fieldName, setFieldName] = useState("");
  const addInfo = () => {
    let formData = {
      field_name: fieldName,
      viewable: viewable,
    };
    if (!file) {
      formData["field_content"] = description;
    }
    dispatch(addCustomField(formData, file, project.crypt));
    setFile(null);
    setEditor("");
    setFieldName("");
    setDescription("");
    setViewable(false);
  };

  const cancelFile = () => {
    setFile(null);
  };
  const cancel = () => {
    setFile(null);
    setEditor("");
    setFieldName("");
    setDescription("");
    setViewable(false);
  };
  const view = (e) => {
    setViewable(e.target.checked);
  };
  const changeDescr = (e) => {
    setDescription(e.target.value);
  };
  const changeName = (e) => {
    setFieldName(e.target.value);
  };
  const changeFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className={style.main}>
      {editor === "" ? (
        <div className={style.buttons}>
          <button
            className={card.anotherSumbmitButton}
            onClick={() => {
              setEditor("file");
            }}
          >
            Прикрепить файл
          </button>
          <button
            onClick={() => {
              setEditor("info");
            }}
            className={card.anotherSumbmitButton}
            style={{ marginLeft: "20px" }}
          >
            Добавить информацию
          </button>
        </div>
      ) : editor === "file" ? (
        <form className={style.addInfo} onSubmit={addInfo}>
          <input
            required
            className={style.add__input}
            onChange={changeName}
            placeholder="Заголовок"
          />
          {!file ? (
            <div
              className={style.addInfo__row}
              aria-hidden
              style={{ marginTop: "7px", marginBottom: "10px" }}
            >
              <input
                type="file"
                onChange={changeFile}
                style={{
                  opacity: 0,
                  zIndex: 55,
                  height: "30px",
                  width: "215px",
                  cursor: "pointer",
                }}
              />
              <div style={{ position: "absolute" }}>
                <button
                  className={card.anotherSumbmitButton}
                  style={{ color: "#3F496C", backgroundColor: "#ECF6FF" }}
                >
                  Прикрепить файл
                </button>
              </div>
            </div>
          ) : (
            <div
              className={style.addInfo__row}
              style={{ marginBottom: "12px" }}
            >
              <Light size="14" style={{ marginRight: "15px" }}>
                Файл добавлен!
              </Light>
              <img
                src={Path + "delete.png"}
                onClick={cancelFile}
                style={{ cursor: "pointer", width: "15px" }}
              />
            </div>
          )}

          <div className={style.addInfo__row}>
            <Light size="14" className={style.addInfo__margin}>
              Отображать информацию на главной странице проекта?
            </Light>
            <input type="checkbox" checked={viewable} onChange={view} />
          </div>
          <div className={style.addInfo__row} style={{ marginTop: "12px" }}>
            <button
              className={card.anotherSumbmitButton}
              style={{
                backgroundColor: "#8FA7C6",
                color: "white",
                marginRight: "12px",
              }}
            >
              Добавить файл
            </button>
            <img
              src={Path + "delete.png"}
              onClick={() => {
                setEditor("");
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        </form>
      ) : (
        <form className={style.addInfo} onSubmit={addInfo}>
          <input
            required
            onChange={changeName}
            className={style.add__input}
            placeholder="Заголовок"
          />
          <textarea
            required
            onChange={changeDescr}
            className={style.add__input}
            placeholder="Описание"
          />
          <div className={style.addInfo__row}>
            <Light size="14" className={style.addInfo__margin}>
              Отображать информацию на главной странице проекта?
            </Light>
            <input type="checkbox" checked={viewable} onChange={view} />
          </div>
          <div className={style.addInfo__row} style={{ marginTop: "12px" }}>
            <button
              className={card.anotherSumbmitButton}
              style={{
                backgroundColor: "#8FA7C6",
                color: "white",
                marginRight: "12px",
              }}
            >
              Добавить информацию
            </button>
            <img
              src={Path + "delete.png"}
              onClick={cancel}
              style={{ cursor: "pointer" }}
            />
          </div>
        </form>
      )}
    </div>
  );
};
export default NewFields;
