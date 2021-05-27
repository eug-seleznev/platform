import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTag, DeleteTask, deleteTag, EditSprint, getProject } from "../../../../../../redux/actions/projects";
import {  Bold, Light, Regular, Thin } from "../../../../../../Styles/typography"
import style from "../../../../../../Styles/modules/components/Project/newsprint.module.css"
import { addToChosen } from "../../../../../../redux/actions/auth";
import TagSearch from "../../../../components/tagSearch";
import Tag from "../../../../components/OneProject/tag";
import cardOpen from "./cardOpen.module.css"
import {addCardToChosen, addTagCard, changeCardField}  from "../../../../../../redux/actions/kanban"
import { Path } from "../../../../../Layout/header";
import SetMenu from "../../../../components/OneProject/settingsMenu";
import { CSSTransition } from "react-transition-group";
import { StyledIn } from "../../../../../../Styles/layout";
import styles from '../../../../../../Styles/modules/components/headerMenu.module.css'
import { Select } from "../../../../../../Styles/tables";





const CardEditor = ({info}) => {
  const dispatch= useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const[chosen, setChosen]= useState(false)
  const[settings, setSettings]= useState(false)
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
  const AddTag =(value)=>{
    if(value!=='') {
      dispatch(addTagCard(info._id, value))
    }
    
   }
   const delTag =(tag)=>{
    // dispatch(deleteTagCard(id, tag))
   }
  const changeSomeField =(e)=>{
    if(e.target.name==='title')  {
      setTitle(e.target.value)
    }
    else if(e.target.name==='description')  {
      setDescription(e.target.value)
    }
    console.log(e.target.value)
    let val = e.target.value
    let field = e.target.name
    let id = info._id
    dispatch(changeCardField(val, field, id))
  }
  return (
    <div
      className={cardOpen.main}
    >
      <form style={{display:'flex',width:'100%',justifyContent:'space-between'}} onSubmit={onSubmit}>
        <input
          style={{
            border: "none",
            fontSize: "20px",
            width:'70%'
          }}
          className={style.titleChange}
          value={title}
          name='title'
          onKeyPress={(e)=>e.key==='Enter'?onEnter(e):''}
          onChange={(e)=>changeSomeField(e)}
        />
        <div>
          <img  onClick={()=>{setSettings(true)}} src={Path+'image 1.png'} style={{width:'30px',cursor:'pointer'}}>
          </img>
          <div>
          <CSSTransition
            in={settings}
            timeout={300}
            classNames={{
              enter:          styles.transitionsEnter,
              enterActive:    styles.transitionsEnterActive,
              exit:           styles.transitionsExit,
              exitActive:     styles.transitionsExitActive,
            }}
            unmountOnExit
          >
                <div className={style.settings__menu} onMouseLeave={() =>setSettings(false)}>
                      <div style={{display:'flex'}}>
                          <StyledIn className='menu__nav' to='/help'>
                            Изменить статус
                          </StyledIn>
                          <Select name='emergency' onChange={(e)=>{changeSomeField(e)}} style={{width:'110px',marginBottom:'50px',height:'35px', marginTop:'1px',marginLeft:'30px'}} defaultValue='Одна задача'>
                            <option value='Обычная'>Обычная</option>
                            <option value='Регулярная'>Регулярная</option>
                            <option value='Срочная'>Срочная</option>
                          </Select>
                      </div>
                       
            </div>
          </CSSTransition>
        </div>
          {/* <img  onClick={toChosen} src={Path+'star.png'} style={{width:'30px',cursor:'pointer', backgroundColor:chosen?'#FFAF30':'rgba(0,0,0,0)'}}>
          </img> */}
        </div>
          
      </form>
      <div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div className={cardOpen.editList}>
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
            <div className={cardOpen.creator}>
              <Light color="#3F496C" size='16'> Создатель: {info?.creator?.fullname} </Light>
            </div>
            
            <div className={cardOpen.taglist}>
              {info.tags !== undefined
                ? info.tags.map((el, i) => {
                    return (
                      <div
                      key={i}
                        style={{
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        <Tag
                          tagText={el}
                         
                          tagColor={
                            i === 0
                              ? "#C8D9E9"
                              : i === 1
                              ? "#E9E3C8"
                              : "#AAF8A8"
                          }
                        />
                        <div className={style.cross} onClick={() => delTag(el)}>
                          x
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
            {info.tags !== undefined && info.tags.length < 2 ? (
              <TagSearch tagCount={false} func={AddTag}></TagSearch>
            ) : (
              ""
            )}
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
                    style={{width:'670px',resize:"none",height:'40px',zIndex:1}}
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