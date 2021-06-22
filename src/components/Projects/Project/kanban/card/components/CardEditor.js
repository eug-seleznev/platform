import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Light, Regular, Thin } from "../../../../../../Styles/typography";
import style from "../../../../../../Styles/modules/components/Project/newsprint.module.css";
import card from "../card.module.css";
import cardOpen from "./cardOpen.module.css";
import cardEditor from "./cardEditor.module.css";
import {
  addCardToChosen,
  addUserToEvent,
  changeCardField,
  finishExpired,
} from "../../../../../../redux/actions/kanban";
import { Path } from "../../../../../Layout/header";
import { CSSTransition } from "react-transition-group";
import { StyledIn } from "../../../../../../Styles/layout";
import styles from "../../../../../../Styles/modules/components/headerMenu.module.css";
import getDate from "../../../../getDate";
import { url } from "../../../../../utils/axios";
import getDateWithTime from "./getDateWithTime";
import { Input } from "../../../../../../Styles/Forms";
import { userTableSearch } from "../../../../../../redux/actions/user";
import NewSettings from "./NewSettings";

const CardEditor = ({
  info,
  setDeleteWindow,
  chosenCard,
  boardId,
  history,
  theme,
}) => {
  const users = useSelector((state) => state.users.users);
  const project = useSelector((state) => state.projects.project);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chosen, setChosen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [evDateVal, setEvDateVal] = useState(null);
  const [visibleName, setVisibleName] = useState("");
  const [eventUsers, setEventUsers] = useState([]);
  const [projTeam, setProjTeam] = useState([]);
  const [changeTitle, setChangeTitle] = useState(false);
  const [evDate, setEvDate] = useState(false);
  const [deadline, setDeadline] = useState({
    set: false,
    change: false,
    val: "",
    visible: false,
  });
  useEffect(() => {
    if (info) {
      // console.log(info)
      setChosen(chosenCard);
      setTitle(info.title);
      setDescription(info.description);
    }
    if (info.event_date) {
      setEvDate(true);
    }
  }, []);
  useEffect(() => {
    info.event_users.map((user) => {
      setEventUsers((eventUsers) => [...eventUsers, user._id]);
    });
    project.team2.map((user) => {
      setProjTeam((projTeam) => [...projTeam, user.user._id]);
    });
  }, [info]);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const takeUser = (id) => {
    dispatch(addUserToEvent(info._id, id));
    setAddUser(false);
  };
  const onEnter = (e) => {
    e.target.blur();
    setChangeTitle(false);
  };
  const toChosen = () => {
    setChosen(!chosen);
    dispatch(addCardToChosen(info._id));
  };
  const handleInput = (e) => {
    let field = "name";
    let value = e.target.value;
    dispatch(userTableSearch({ value, field }));
  };
  const changeEventDate = () => {
    let id = info._id;
    let val = evDateVal;
    let field = "event_date";
    dispatch(changeCardField(val, field, id));
    setEvDate(true);
  };
  const changeSomeField = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "event_date") {
      setEvDate(true);
    }
    // console.log(e.target.value)
    let val = e.target.value;
    let field = e.target.name;
    let id = info._id;
    dispatch(changeCardField(val, field, id));
  };
  const goToUser = (userid) => {
    history.push(`../../../../users/${userid}`);
  };
  const changeVal = (e) => {
    let val = new Date(e.target.value);
    let field = "deadline";
    let id = info._id;
    setDeadline({ ...deadline, val: e.target.value });
    dispatch(changeCardField(val, field, id));
  };

  const finish = () => {
    let id = info._id;
    dispatch(finishExpired(id, boardId));
  };
  const changeDeadline = () => {
    let val = new Date(deadline.val);
    let field = "deadline";
    let id = info._id;
    console.log(deadline.val);

    if (deadline.val !== "") {
      dispatch(changeCardField(val, field, id));
      setDeadline({ ...deadline, set: false, visible: true });
    }
  };
  return (
    <div className={cardOpen.main}>
      <div className={cardEditor.title}>
        {changeTitle ? (
          <input className={cardEditor.title__input}
            style={{
              filter: theme ? "invert(1)" : "invert(0)",
            }}
            value={title}
            name="title"
            onKeyPress={(e) => (e.key === "Enter" ? onEnter(e) : "")}
            onChange={(e) => changeSomeField(e)}
          />
        ) : (
          <div  style={{ display: "flex", alignItems: "center" }}>
            <div className={cardEditor.title__static}
              style={{
                color: !theme ? "black" : "white",
              }}
              onDoubleClick={() => {
                setChangeTitle(true);
              }}
            >
              {title}
            </div>
            <img
              className={cardEditor.title__threedot}
              draggable="false"
              onClick={() => {
                setSettings(!settings);
              }}
              src={Path + "three-dots.png"}
            ></img>
            <div>
              <CSSTransition
                in={settings}
                timeout={300}
                classNames={{
                  enter: styles.transitionsEnter,
                  enterActive: styles.transitionsEnterActive,
                  exit: styles.transitionsExit,
                  exitActive: styles.transitionsExitActive,
                }}
                unmountOnExit
              >
                <div
                  className={style.settings__menu}
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                  onMouseLeave={() => setSettings(false)}
                >
                  <div
                    style={{
                      display: "flex",
                      height: "25px",
                      justifyContent: "space-between",
                    }}
                  >
                    <StyledIn
                      style={{ textDecoration: "none", cursor: "default" }}
                    >
                      Изменить дедлайн
                    </StyledIn>

                    <div>
                      {deadline.set ? (
                        <div style={{ marginTop: "3px" }}>
                          <div
                            style={{
                              display: !deadline.visible ? "block" : "none",
                            }}
                          >
                            <div
                              style={{
                                display: !deadline.set ? "none" : "flex",
                              }}
                            >
                              <input
                                type="date"
                                onKeyPress={(e) =>
                                  e.key === "Enter" ? changeDeadline(e) : ""
                                }
                                onChange={(e) => {
                                  changeVal(e);
                                }}
                                style={{
                                  width: "45px",
                                  border: "none",
                                  outline: "none",
                                  borderRadius: "0px",
                                }}
                              ></input>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <img
                            draggable="false"
                            onClick={() => {
                              setDeadline({ ...deadline, set: true });
                            }}
                            src={Path + "plus thin.png"}
                            style={{
                              display:
                                !deadline.visible && !info.deadline
                                  ? "block"
                                  : "none",
                              marginTop: "10px",
                              width: "18px",
                              height: "18px",
                              transform: "translateX(-3px)",
                              cursor: "pointer",
                            }}
                          ></img>
                          <div
                            style={{
                              display: deadline.visible ? "flex" : "none",
                              marginTop: "4px",
                            }}
                          >
                            <Light
                              onDoubleClick={() => {
                                setDeadline({
                                  ...deadline,
                                  set: true,
                                  visible: false,
                                });
                              }}
                              style={{
                                marginTop: "1px",
                                cursor: "pointer",
                                marginTop: "6px",
                              }}
                            >
                              {getDate(deadline.val)}
                            </Light>
                          </div>
                          <div
                            style={{
                              display:
                                !deadline.visible && info.deadline
                                  ? "flex"
                                  : "none",
                              marginTop: "4px",
                            }}
                          >
                            <Light
                              onDoubleClick={() => {
                                setDeadline({
                                  ...deadline,
                                  set: true,
                                  visible: false,
                                });
                              }}
                              style={{ marginTop: "1px", cursor: "pointer" }}
                            >
                              {getDate(info.deadline)}
                            </Light>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      height: "25px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <StyledIn
                      style={{ textDecoration: "none", cursor: "default" }}
                    >
                      {chosen ? "Убрать из избранного" : "Добавить в избранное"}
                    </StyledIn>
                    <img
                      draggable="false"
                      onClick={toChosen}
                      src={Path + "star.png"}
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                        marginTop: "10px",
                        backgroundColor: chosen ? "#FFAF30" : "rgba(0,0,0,0)",
                      }}
                    />
                  </div>
                  <StyledIn
                    style={{
                      display: boardId ? "flex" : "none",
                      height: "24px",
                    }}
                    onClick={() => finish()}
                  >
                    Готово
                  </StyledIn>
                  <StyledIn
                    style={{
                      display: "flex",
                      height: "24px",
                      marginTop: "0px",
                    }}
                    onClick={() =>
                      setDeleteWindow({
                        status: true,
                        id: info._id,
                      })
                    }
                  >
                    Удалить карточку
                  </StyledIn>
                </div>
              </CSSTransition>
            </div>
          </div>
        )}

       
      </div>
      <div>
        <div
          style={{
            display: "flex",
          }}
        ></div>
        <div className={style.edit__task}>
          <form onSubmit={onSubmit} >
            <div
              style={{
                display: "flex",
                width: "100%",
                marginTop:'10px',
                whiteSpace: "initial",
              }}
            >
              <textarea
                type="text"
                value={description}
                name="description"
                onKeyPress={(e) =>
                  e.key === "Enter" ? onEnter(e) : ""
                }
                onChange={(e) => changeSomeField(e)}
                style={{
                  width: "635px",
                  resize: "none",
                  height: "40px",
                  zIndex: 1,
                  color: theme ? "white" : "black",
                  backgroundColor: !theme ? "white" : "#1E1E1E",
                }}
                placeholder="Добавить описание"
                className={style.changeDescr}
              ></textarea>
            </div>
          </form>
        </div>
        <NewSettings theme={theme}info={info}></NewSettings>
        <div
          style={{
            height: "20px",
            marginTop: "5px",
            marginBottom: info.emergency === "Событие" ? "170px" : "0px",
          }}
        >
          <div
            style={{ display: info.emergency === "Событие" ? "block" : "none" }}
          >
            <div
              style={{
                borderTop: "1px solid #AFAFAF",
                borderBottom: "1px solid #AFAFAF",
                marginTop: "10px",
              }}
            >
              <Light
                style={{ marginTop: "7px", color: theme ? "white" : "black" }}
                size="15.5"
              >
                Участники
              </Light>
              <div style={{ display: "flex" }}>
                {info.event_users?.map((el, i) => {
                  return (
                    <div>
                      <img
                        key={i}
                        src={url + "/" + el.avatar}
                        draggable="false"
                        style={{
                          display: addUser ? "none" : "block",
                          cursor: "pointer",
                          height: "30px",
                          width: "30px",
                          objectFit: "cover",
                          borderRadius: "100%",
                          marginRight: "10px",
                          marginTop: "14px",
                          marginBottom: "23px",
                        }}
                        onClick={() => goToUser(el._id)}
                        onMouseEnter={() => {
                          setVisibleName(el.fullname);
                        }}
                        onMouseLeave={() => {
                          setVisibleName("");
                        }}
                      ></img>
                      <div
                        className={card.card__exec__name}
                        style={{
                          display: `${
                            visibleName === el.fullname ? "block" : "none"
                          }`,
                          transform: "translate(-40px,-20px)",
                        }}
                      >
                        {el.fullname}
                      </div>
                    </div>
                  );
                })}

                {!addUser ? (
                  <img
                    draggable="false"
                    src={Path + "plus thin.png"}
                    style={{
                      height: "25px",
                      width: "25px",
                      objectFit: "cover",
                      borderRadius: "100%",
                      marginRight: "10px",
                      marginTop: "14px",
                      marginBottom: "23px",
                      marginLeft: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setAddUser(true);
                    }}
                  ></img>
                ) : (
                  <div style={{ filter: theme ? "invert(1)" : "invert(0)" }}>
                    <Input
                      style={{ width: "180px" }}
                      onChange={handleInput}
                    ></Input>
                    <div
                      className={cardOpen.comments__dropdown}
                      style={{
                        position: "absolute",
                        width: "170px",
                        height: "55px",
                        borderRadius: "5px",
                        border: "1px solid black",
                        background: "white",
                        boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 4px",
                        padding: "10px",
                        overflowY: users.length > 3 ? "scroll" : "hidden",
                      }}
                    >
                      {users.map((user, i) => {
                        if (
                          projTeam.includes(user._id) &&
                          !eventUsers.includes(user._id)
                        ) {
                          return (
                            <Regular
                              className={cardOpen.comments__name}
                              onClick={() => takeUser(user._id)}
                              style={{ cursor: "pointer" }}
                              key={i}
                            >
                              {user.fullname}
                            </Regular>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              {!evDate ? (
                <>
                  <Light
                    style={{
                      marginBottom: "10px",
                      color: theme ? "white" : "black",
                      marginTop: "5px",
                    }}
                  >
                    Введите дату события
                  </Light>
                  <div
                    style={{
                      display: "flex",
                      filter: theme ? "invert(1)" : "invert(0)",
                    }}
                  >
                    <input
                      type="datetime-local"
                      name="event_date"
                      onChange={(e) => {
                        setEvDateVal(e.target.value);
                      }}
                      onKeyPress={(e) =>
                        e.key === "Enter" && e.target.value !== "Invalid Date"
                          ? changeEventDate()
                          : ""
                      }
                    ></input>
                    <button
                      style={{
                        background: "none",
                        outline: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        changeEventDate();
                      }}
                    >
                      <img
                        style={{ width: "12px", marginTop: "6px" }}
                        src="/check.png"
                      ></img>
                    </button>
                  </div>
                </>
              ) : (
                <Light
                  className={cardOpen.event__date}
                  onDoubleClick={() => {
                    setEvDate(false);
                  }}
                  style={{
                    borderBottom: "1px solid #AFAFAF",
                    paddingBottom: "13px",
                    marginTop: "13px",
                    color: theme ? "white" : "black",
                  }}
                >
                  {getDateWithTime(info?.event_date)}
                </Light>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEditor;
