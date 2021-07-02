import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../../../../redux/actions/kanban";
import { ButtonTextLight } from "../../../../../../Styles/buttons";
import { Bold, Light, Regular, Thin } from "../../../../../../Styles/typography";
import { url } from "../../../../../utils/axios";
import style from "./cardOpen.module.css";
import getDateWithTime from "./getDateWithTime";
import InputTrigger from "react-input-trigger";
import {
  allUsers,
  userTableSearch,
} from "../../../../../../redux/actions/user";
import { Path } from "../../../../../Layout/header";
import editor from "../../../../../../Styles/modules/components/Project/newsprint.module.css";

let cancel;
const Comments = ({ id, emergency, history, theme }) => {
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [mentions, setMentions] = useState([]);
  const comments = useSelector((state) => state.projects.comments);
  const users = useSelector((state) => state.users.users);
  const [dropdown, setDropdown] = useState({
    top: null,
    left: null,
    show: false,
    text: "",
    startPosition: 0,
  });
  const  [file, setFile] = useState(null) 
  const commentRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch();
 
  useEffect(() => {
    let sortOrder = true;
    let query = "name";
    dispatch(allUsers({ query, sortOrder }));
    setLink(window.location.href);
    commentRef.current.scrollTo({
      top: commentRef.current.scrollHeight + 1000,
      left: 0,
    });
  }, []);

  const handleFile =(e)=>{
    let loadFile = new Promise((resolve)=>{
     setFile(e.target.files[0])
     resolve()
  })
  loadFile.then( 
    setMsg('Изображение загружено!')
  )
  }
   

      


  // useEffect(() => {
  //     console.log(link)
  // }, [link])
  const createComment = (e) => {
    e.preventDefault();
    return new Promise((resolve) => {
      let formData = {
        text:comment,
        mentions:mentions,
        url:link,
      }
      dispatch(addComment(formData,file,id));
      setComment("");
      setMsg('')
      setFile(null);
      setMentions([]);
      resolve();
    });
  };
  const commentScroll = () => {
    setTimeout(() => {
      commentRef.current.scrollTo({
        top: commentRef.current.scrollHeight + 1000,
        left: 0,
        behavior: "smooth",
      });
    }, 200);
  };
  const goToUser = (userid) => {
    history.push(`../../../../users/${userid}`);
  };
  const takeUser = (user) => {
    setMentions((mentions) => [...mentions, user._id]);
    return new Promise((resolve) => {
      const newText = `${comment.slice(0, dropdown.startPosition + 1)}${
        user.fullname + " "
      }${comment.slice(
        dropdown.startPosition + user.fullname.length,
        comment.length
      )}`;
      setComment(newText);
      setDropdown({
        show: false,
        left: null,
        top: null,
        text: null,
      });
      resolve();
    });
  };

  const handleInput = (meta) => {
    // console.log(meta)
    let field = "name";
    let value = meta.text;
    dispatch(userTableSearch({ value, field }));
  };

  const toggle = (metaInformation) => {
    // console.log(metaInformation)
    const { hookType, cursor } = metaInformation;
    if (hookType === "start") {
      setDropdown({
        startPosition: cursor.selectionStart,
        show: true,
        left: cursor.left,
        top: cursor.top - 60,
      });
    } else if (hookType === "cancel") {
      setDropdown({
        show: false,
        left: cursor.left,
        top: cursor.top + 50,
      });
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
            paddingTop: "5px",
            display: comments.length > 0 ? "block" : "none",
            marginTop: "5px",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              paddingBottom: "20px",
              paddingTop: "12px",
              marginTop: "-22px",
              marginLeft: "25px",
            }}
             className={editor.headtd}
          >
            <img src={Path + "actions.svg"} />
            <Regular
              color='#656565'
              style={{ color: theme ? "white" : "black", marginLeft: "5px" }}
              size="15.5"
            >
              Действия
            </Regular>
          </div>
        </div>
      </div>
      <div
        className={style.comments__array}
        ref={commentRef}
        style={{
          overflowY: "scroll" ,
          maxHeight: "21vh",marginTop:'20px'
        }}
      >
        {comments &&
          comments.map((comm, i) => {

            return (
              <div key={i}>
              <div  className={style.comments__one}>
                <img
                  draggable="false"
                  src={url + "/" + comm.author?.avatar}
                  onClick={() => goToUser(comm.author?._id)}
                  style={{
                    width: "25px",
                    height: "25px",
                    objectFit: "cover",
                    borderRadius: "100%",
                    cursor: "pointer",
                  }}
                ></img>
                <Bold
                  size="14"
                  color="#878787"
                  className={style.comments__author}
                  onClick={() => goToUser(comm.author?._id)}
                >
                  {comm.author?.name} 
                  {comm.author?.lastname && comm.author?.lastname?.charAt(0)}.
                </Bold>
                <Light
                  size="14"
                  color="#878787"
                  className={style.comments__date}
                >
                  {getDateWithTime(comm.date)}
                </Light>
                <Light
                  size="14"
                  color={
                    comm.text.includes("Дедлайн") && comm?.type === "history"
                      ? "#C64242"
                      : comm.text.includes("> Готово") &&
                        comm?.type === "history"
                      ? "#71D186"
                      : comm?.type === "history"
                      ? "#878787"
                      : theme
                      ? "white"
                      : "black"
                  }
                  className={style.comments__text}
                >
                  {comm.text}
                </Light>
                
               
              </div>
              { comm.image &&
                   <div className={style.comments__image__container}>
                      <div className={style.comments__image__border}></div>
                      <img src={url+'/'+comm.image} className={style.comments__image}></img>
                    </div>
                }
                </div>
            );
          })}
      </div>

      <form
        className={style.comments__button__area}
        onSubmit={(e) => createComment(e).then(commentScroll)}
      >
        <InputTrigger
          ref={inputRef}
          trigger={{
            keyCode: 50,
            shiftKey: true,
          }}
          onStart={(metaData) => toggle(metaData)}
          onType={(metaData) => handleInput(metaData)}
          onCancel={(metaData) => toggle(metaData)}
          className={style.comments__area}
          endTrigger={(endTriggerHandler) => (cancel = endTriggerHandler)}
        >
          <textarea
            className={style.comments__textarea}
            value={comment}
            style={{
              backgroundColor: !theme ? "white" : "#1E1E1E",
              color: theme ? "white" : "#3F496C",
            }}
            spellCheck="false"

            onKeyDown={(e) =>
              e.key === "Enter" ? createComment(e).then(commentScroll) :''
            }
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Добавить комментарий, чтобы упомянуть человека нажимте @ и выберите нужного из списка"
          />
        </InputTrigger>
        <div
          className={style.comments__dropdown}
          style={{
            position: "absolute",
            width: "170px",
            height: "55px",
            borderRadius: "5px",
            border: "1px solid black",
            background: "white",
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 4px",
            display: dropdown.show ? "block" : "none",
            top: dropdown.top,
            left: dropdown.left,
            padding: "10px",
            overflowY: users.length > 3 ? "scroll" : "hidden",
          }}
        >
          {users.map((user, i) => {
            return (
              <Regular
                className={style.comments__name}
                style={{ cursor: "pointer" }}
                onClick={() => takeUser(user).then(cancel())}
                key={i}
              >
                {user.fullname}
              </Regular>
            );
          })}
        </div>
      <div>
        <button
            // ref={buttonRef}
            
            className={style.anotherSumbmitButton}
            style={{  
              transform: "translateX(-30px)",
              color: theme ? "white" : "#3F496C",
              backgroundColor: !theme ? "rgba(196,196,196, 0.3)" : "#1E1E1E",
              marginRight:'30px'
            }}
            type='button'
            fontSize="14px"
          >
            Добавить файл
          </button>
          <input type='file'className={style.commentsImageInput} onChange={(e)=>handleFile(e)}></input>
          <Thin className={style.commentsImageMsg}>{msg}</Thin> 
         <button
            // ref={buttonRef}
            className={style.anotherSumbmitButton}
            style={{
              transform: "translateX(-30px)",
              color: theme ? "white" : "#3F496C",
              backgroundColor: !theme ? "rgba(196,196,196, 0.3)" : "#1E1E1E",
            }}
            type='submit'
            fontSize="14px"
          >
            Добавить комментарий
          </button>
      </div>
        
      </form>
    </div>
  );
};
export default Comments;
