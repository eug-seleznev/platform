import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../../../../redux/actions/kanban";
import { ButtonTextLight } from "../../../../../../Styles/buttons";
import { Bold, Light, Regular } from "../../../../../../Styles/typography";
import { url } from "../../../../../utils/axios";
import style from "./cardOpen.module.css";
import getDateWithTime from "./getDateWithTime";
import InputTrigger from "react-input-trigger";
import {
  allUsers,
  userTableSearch,
} from "../../../../../../redux/actions/user";

let cancel;
const Comments = ({ id, emergency, history, theme }) => {
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
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
  const commentRef = useRef();
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
  // useEffect(() => {
  //     console.log(mentions)
  // }, [mentions])
  // useEffect(() => {
  //     console.log(link)
  // }, [link])
  const createComment = (e) => {
    e.preventDefault();
    return new Promise((resolve) => {
      dispatch(addComment(comment, id, mentions, link));
      setComment("");
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
      <div
        className={style.comments__array}
        ref={commentRef}
        style={{
          overflowY: comments.length > 7 ? "scroll" : "hidden",
          maxHeight: "19vh",
        }}
      >
        {comments &&
          comments.map((comm, i) => {
            return (
              <div key={i} className={style.comments__one}>
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
            );
          })}
      </div>

      <form
        className={style.comments__button__area}
        onSubmit={(e) => createComment(e).then(commentScroll)}
      >
        <InputTrigger
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
            onKeyPress={(e) =>
              e.key === "Enter" ? createComment(e).then(commentScroll) : ""
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
        <ButtonTextLight
          style={{
            transform: "translateX(-35px)",
            color: theme ? "white" : "#3F496C",
          }}
          type="submit"
        >
          Добавить комментарий
        </ButtonTextLight>
      </form>
    </div>
  );
};
export default Comments;
