import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTag, DeleteTask, deleteTag, EditSprint, getProject } from "../../../../../../redux/actions/projects";
import {  Bold, Light, Regular, Thin } from "../../../../../../Styles/typography"
import style from "../../../../../../Styles/modules/components/Project/newsprint.module.css"
import { addToChosen } from "../../../../../../redux/actions/auth";
import TagSearch from "../../../../components/tagSearch";
import Tag from "../../../../components/OneProject/tag";
import cardOpen from "./cardOpen.module.css"
import {addCardToChosen, changeCardField}  from "../../../../../../redux/actions/kanban"
import { Path } from "../../../../../Layout/header";





const CardEditor = ({info}) => {
  const dispatch= useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const[chosen, setChosen]= useState(false)
  useEffect(()=>{
    if(info) {

      setTitle(info.title)
      setDescription(info.description)
    }
    
  },[])
  const onSubmit =(e)=>{
    e.preventDefault()
  }
  const onEnter=(e)=>{
    e.target.blur()
  }
  const toChosen =()=>{
    setChosen(!chosen)
    dispatch(addCardToChosen(info._id))
  }
  const changeSomeField =(e)=>{
    if(e.target.name==='title')  {
      setTitle(e.target.value)
    }
    else if(e.target.name==='description')  {
      setDescription(e.target.value)
    }
    let val = e.target.value
    let field = e.target.name
    let id = info._id
    dispatch(changeCardField(val, field, id))
  }
  return (
    <div
      className={cardOpen.main}
    >
      <form style={{display:'flex',width:'100%'}} onSubmit={onSubmit}>
        <input
          style={{
            border: "none",
            fontSize: "20px",
            width:'100%'
          }}
          className={style.titleChange}
          value={title}
          name='title'
          onKeyPress={(e)=>e.key==='Enter'?onEnter(e):''}
          onChange={(e)=>changeSomeField(e)}
        />
          <img  onClick={toChosen} src={Path+'star.png'} style={{width:'30px',cursor:'pointer', backgroundColor:chosen?'#FFAF30':'rgba(0,0,0,0)'}}>
          </img>
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
                  {info.tasks.filter(task=>task.taskStatus).length}/{info.tasks.length}
                </Light>
                <div className={style.card__thing}>
                  <div
                    style={{
                      width: `${Math.trunc(info?.tasks.filter(task=>task.taskStatus).length / info?.tasks.length * 100)}%`,
                    }}
                    className={style.card__thing__full}
                  ></div>
                </div>
              </div>
            <div className={style.creator}>
              <Light color="#3F496C"> Создатель: {info?.creator?.fullname} </Light>
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
              {/* <Light
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
              </Light> */}
              <form 
                onSubmit={onSubmit}
              >
                <div
                  style={{
                    display: "flex",
                    
                    width: "100%",
                    whiteSpace: "initial"
                  }}
                >
                  <textarea
                    type="text"
                    value={description}
                    name='description'
                    onKeyPress={(e)=>e.key==="Enter"?onEnter(e):''}
                    onChange={(e)=>changeSomeField(e)}
                    style={{width:'670px',resize:"none",height:'70px',zIndex:1}}
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