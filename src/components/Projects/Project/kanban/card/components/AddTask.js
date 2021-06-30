import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskCard } from "../../../../../../redux/actions/kanban";
import {
  addTask,
  clearSprint,
  deleteSprint,
  finishSprint,
} from "../../../../../../redux/actions/projects";
import { Button, CancelButton } from "../../../../../../Styles/buttons";
import style from "../../../../../../Styles/modules/components/Project/newsprint.module.css";
import Confirm from "../../../../components/OneProject/confirm";
import TextareaAutosize from 'react-autosize-textarea';

const AddTask = ({ id, proj_id, theme }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [input, setInput] = useState(false);
  const inputRef = useRef()
  const buttonRef = useRef()
  const onChange = (e) => {  
    setTask(e.target.value);
  };
  
  const inputFocus = (e) => {
    setInput(true)
    setTimeout(()=>{
      inputRef.current.focus()
      buttonRef.current.type='submit'
    },100)
    
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addTaskCard(task, id, proj_id));
    setTask("");
  };
  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          marginLeft: "20px",
          paddingBottom: "20px",
          // borderBottom: "1px solid #AFAFAF",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection:'column',
            marginTop:'12px'
          }}
        >
          <TextareaAutosize
            ref={inputRef}
            maxRows={3}
            value={task}
            className={style.input}
            placeholder="Название задачи..."
            style={{
              fontFamily:'SuisseIntlLight',
              display: !input?'none':'block',
              resize:'none',
              // height:targetHeight,
              width:'630px',
              border: "none",
              color: theme ? "white" : "black",
              backgroundColor: !theme ? "white" : "#1E1E1E",
              marginBottom:"15px"
            }}
            onChange={onChange}
            onKeyPress={(e)=>e.key==='Enter'?onSubmit(e):''}
          />

          <button
            ref={buttonRef}
            onClick={inputFocus}
            style={{
              overflowWrap: 'normal',
              fontFamily:'SuisseIntlLight',
              cursor:'pointer',
              outline:'none',
              fontSize:'16px',
              borderRadius:'5px',
              height:'28px',
              width:'210px',
              whiteSpace: "nowrap",
              border: "none",
              left: "250px",
              color: theme ? "white" : "#3F496C",
              backgroundColor: !theme ? "rgba(196,196,196, 0.3)" : "#1E1E1E",
            }}
            type='button'
            fontSize="14px"
          >
            Добавить новую задачу
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
