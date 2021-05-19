import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTag, DeleteTask, deleteTag, EditSprint, getProject } from "../../../../../../redux/actions/projects";
import {  Bold, Light, Regular, Thin } from "../../../../../../Styles/typography"
import style from "../../../../../../Styles/modules/components/Project/newsprint.module.css"
import { addToChosen } from "../../../../../../redux/actions/auth";
import TagSearch from "../../../../components/tagSearch";
import Tag from "../../../../components/OneProject/tag";
import cardOpen from "./cardOpen.module.css"
import {changeCardField}  from "../../../../../../redux/actions/kanban"





const CardEditor = ({info}) => {
  const dispatch= useDispatch()
  const changeSomeField =(e)=>{
    let val = e.target.value
    let filed = e.target.name
    let id = info._id
    dispatch(changeCardField(val, filed, id))
  }
  return (
    <div
      className={cardOpen.main}
    >
      <form style={{display:'flex'}}>
        <input
          style={{
            display:'flex',
            border: "none",
            fontSize: "20px",
          }}
          className={style.titleChange}
          value={info.title}
          name='title'
          onChange={(e)=>changeSomeField(e)}
        />
          <Light
            color="#3F496C"
            style={{ cursor: "pointer", marginLeft:'5px', paddingTop:'4px'}}>
            Добавить в избранное
          </Light>
      </form>
      <div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div className={style.editList}>
              <div style={{ display: "flex" }}>
                <Light style={{ width: "40px" }}>
                   9/18
                </Light>
                <div className={style.card__thing}>
                  <div
                    style={{
                      width: `${Math.trunc((9 / 17) * 100)}%`,
                    }}
                    className={style.card__thing__full}
                  ></div>
                </div>
              </div>
            <div className={style.creator}>
              <Light color="#3F496C"> Создатель: </Light>
            </div>
            
            <div className={style.taglist}>
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
              <div className={style.cross}>
                x
              </div>
                      </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "13%",
              marginTop: "10px",
            }}
          >
            <Light
              color="#3F496C"
              style={{ cursor: "pointer", whiteSpace: "nowrap" }}
            >
            </Light>
          </div>
        </div>
        <div style={{ height: "20px" }}>
            <div className={style.edit__task}>
              <Light
                color="#3F496C"
                style={{ cursor: "pointer", marginRight: "50px" }}
              >
                Редактировать
              </Light>
              <Light
                color="#3F496C"
                style={{ cursor: "pointer" }}
              >
                Удалить
              </Light>
              <form 
              // onSubmit={onEditSubmit}
              >
                <div
                  style={{
                    display: "flex",
                    paddingLeft: "40px",
                    width: "40vw",
                    whiteSpace: "initial"
                  }}
                >
                  <textarea
                    type="text"
                    style={{width:'40%',resize:"none",height:'70px'}}
                    placeholder="Добавить описание"
                    className={style.changeDescr}
                  ></textarea>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};



export default CardEditor; 