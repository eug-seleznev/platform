import style from "../../../../Styles/modules/components/Project/editproj.module.css";
import { useState } from "react";
import { Thin } from "../../../../Styles/typography";
import style2 from "../../Project/Info/newfields.module.css";
import card from "../../Project/kanban/card/components/cardOpen.module.css";
import {
  deleteCustomField,
  editCustomField,
} from "../../../../redux/actions/projects";
import { useDispatch } from "react-redux";
import { Path } from "../../../Layout/header";

const EditCustomFields = ({ customFields }) => {
  const [notification, setNotification] = useState("");
  const [editable, setEditable] = useState(9999);
  const dispatch = useDispatch();
  const onChange = (e, field, type) => {
    let formData = {};
    formData[type === "title" ? "field_name" : "field_content"] =
      e.target.value;
    formData[type === "title" ? "field_content" : "field_name"] =
      type === "content" ? field.field_name : field.field_content;
    dispatch(editCustomField(formData, field._id));
  };
  const deleteField = (id) => {
    dispatch(deleteCustomField(id));
  };
  const changeFile = (e, field) => {
    let formData = {
      field_name: field.field_name,
      field_content: field.field_content,
    };
    dispatch(editCustomField(formData, field._id, e.target.files[0]));
    if (e.target.files[0]) {
      setNotification(field._id);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  return (
    <div className={style.inputs}>
      {customFields && customFields.map((field, i) => {
        return (
          <div style={{ display: "flex",alignItems:'center' }}>
            <div
              className={style.titles__point}
              style={{
                border: "1px solid #8FA7C6",
                margin: "10px",
                padding: "10px",
                borderRadius: "5px",
              }}
              key={i}
            >
              {editable !== i ? (
                <Thin
                  className={style.one__title}
                  style={{ cursor: "pointer" }}
                  onDoubleClick={() => {
                    setEditable(i);
                  }}
                >
                  {field.field_name}
                </Thin>
              ) : (
                <input
                  type="text"
                  name={field.field_name}
                  defaultValue={field.field_name}
                  style={{ width: "50%" }}
                  required
                  onChange={(e) => onChange(e, field, "title")}
                />
              )}
              {field.field_type === "string" ? (
                <input
                  type="text"
                  name={field.field_content}
                  value={field.field_content}
                  required
                  onChange={(e) => onChange(e, field, "content")}
                />
              ) : (
                <div>
                  <Thin
                    className={style.one__title}
                    style={{ marginTop: "15px" }}
                    onDoubleClick={() => {
                      setEditable(i);
                    }}
                  >
                    Выберите новый файл
                  </Thin>
                  <div
                    className={style2.addInfo__row}
                    aria-hidden
                    style={{ marginTop: "7px", marginBottom: "10px" }}
                  >
                    <input
                      type="file"
                      onChange={(e) => changeFile(e, field)}
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
                    {notification === field._id && (
                      <Thin>Новый файл загружен!</Thin>
                    )}
                  </div>
                </div>
              )}
            </div>{" "}
            <img
              src={Path + "delete.png"}
              onClick={() => deleteField(field._id)}
              style={{ cursor: "pointer" }}
            />
          </div>
        );
      })}
    </div>
  );
};
export default EditCustomFields;
