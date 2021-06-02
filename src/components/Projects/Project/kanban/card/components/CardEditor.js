import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {Light} from "../../../../../../Styles/typography"
import style from "../../../../../../Styles/modules/components/Project/newsprint.module.css"

import TagSearch from "../../../../components/tagSearch";
import Tag from "../../../../components/OneProject/tag";
import cardOpen from "./cardOpen.module.css"
import {addCardToChosen, addTagCard, changeCardField, removeTagCard}  from "../../../../../../redux/actions/kanban"
import { Path } from "../../../../../Layout/header";

import { CSSTransition } from "react-transition-group";
import { StyledIn } from "../../../../../../Styles/layout";
import styles from '../../../../../../Styles/modules/components/headerMenu.module.css'
import { Select } from "../../../../../../Styles/tables";
import { ButtonTextLight } from "../../../../../../Styles/buttons";
import getDate from "../../../../getDate";





const CardEditor = ({info, setDeleteWindow, chosenCard}) => {
  const dispatch= useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const[chosen, setChosen]= useState(false)
  const[settings, setSettings]= useState(false)
  const[deadline,setDeadline] = useState({
    set:false,
    change:false,
    val:'',
    visible:false
  })
  useEffect(()=>{
    if(info) {
      console.log(info)
      setChosen(chosenCard)
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
    dispatch(removeTagCard(info._id, tag))
   }
  const changeSomeField =(e)=>{
    
    if(e.target.name==='title')  {
      setTitle(e.target.value)
    }
    else if(e.target.name==='description')  {
      setDescription(e.target.value)
    }
    // console.log(e.target.value)
    let val = e.target.value
    let field = e.target.name
    let id = info._id
    dispatch(changeCardField(val, field, id))
  }
  // useEffect(()=>{
  //   console.log(deadline)
  // },[deadline])
  const changeVal =(e)=>{


    
      setDeadline({...deadline, val: e.target.value})
   
    
  }
  const changeDeadline =()=>{
    let val = new Date (deadline.val)
    let field = 'deadline'
    let id = info._id
    console.log(deadline.val)
    
    if(deadline.val!=='') {
      dispatch(changeCardField(val, field, id))
      setDeadline({...deadline,set:false, visible:true})
    }
    
   
  }
  return (
    <div
      className={cardOpen.main}
    >
      <div style={{display:'flex',width:'100%',justifyContent:'space-between'}} >
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
        {deadline.set?
        <div style={{marginTop:'3px'}}>
          <div style={{display: !deadline.visible?'block':'none'}}>
            <div style={{display:!deadline.set?'none':'flex'}}>
              <input type='date' onKeyPress={(e)=>e.key==='Enter'?changeDeadline(e):''} onChange={changeVal}></input>
              <ButtonTextLight onClick={changeDeadline} style={{margin:'5px'}}>Добавить</ButtonTextLight>
            </div>
          </div>
          
          {/* <Light style={{display: deadline.visible?'block':'none',marginTop:'1px'}}>{getDate(deadline.val)}</Light> */}
        </div>:
        <div>
          <ButtonTextLight onClick={()=>{setDeadline({...deadline, set:true})}} style={{display:!deadline.visible&&!info.deadline?'block':'none'}}>Назначить дедлайн</ButtonTextLight>
          <div style={{display:deadline.visible?'flex':'none',marginTop:'4px'}}>
            <Light style={{marginTop:'1px'}}>{getDate(deadline.val)}</Light>
            <ButtonTextLight onClick={()=>{setDeadline({...deadline,set:true,visible:false})}} style={{margin:'5px', transform:'translateY(-1px)'}}>Изменить</ButtonTextLight>
          </div>
          <div style={{display:!deadline.visible&&info.deadline?'flex':'none',marginTop:'4px'}}>
            <Light style={{marginTop:'1px'}}>{getDate(info.deadline)}</Light>
            <ButtonTextLight onClick={()=>{setDeadline({...deadline,set:true,visible:false})}} style={{margin:'5px', transform:'translateY(-1px)'}}>Изменить</ButtonTextLight>
          </div>
        </div>
        
        

        }
        
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
                      <div style={{display:'flex',height:'25px'}}>
                          <StyledIn style={{textDecoration:'none', cursor:'default'}} >
                            Изменить статус
                          </StyledIn>
                          <Select name='emergency'onChange={(e)=>{changeSomeField(e)}} style={{ cursor:'pointer',width:'110px',marginBottom:'50px',height:'35px', marginTop:'1px',marginLeft:'30px'}} defaultValue={info.emergency}>
                            <option value='Обычная'>Обычная</option>
                            <option value='Регулярная'>Регулярная</option>
                            <option value='Срочная'>Срочная</option>
                          </Select>
                      </div>
                      <div style={{display:'flex',height:'25px',justifyContent:'space-between',alignItems:'center'}}>
                        <StyledIn style={{textDecoration:'none', cursor:'default'}}>
                              {chosen?'Убрать из избранного':'Добавить в избранное'}
                        </StyledIn>
                        <img  onClick={toChosen} src={Path+'star.png'} style={{width:'25px',height:'25px' ,cursor:'pointer',marginTop:'10px', backgroundColor:chosen?'#FFAF30':'rgba(0,0,0,0)'}}>
                          </img>
                      </div>
                   
                      <StyledIn
                            style={{display:'flex',height:'24px'}}
                            onClick={()=>setDeleteWindow({
                            status:true,
                            id: info._id
                          })}
                        >
                          Удалить карточку
                        </StyledIn>
                     
            </div>
          </CSSTransition>
        </div>
          
        </div>
          
      </div>
      <div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div className={cardOpen.editList}>
              <div style={{ display:info.type==='Одна задача'? 'none' : 'flex' }}>
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