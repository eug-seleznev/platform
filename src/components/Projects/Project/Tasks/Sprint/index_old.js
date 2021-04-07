import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTasks, deleteSprint, EditTask, finishSprint, finishTask, getSprint } from "../../../../redux/actions/projects";
import { addToChosen } from '../../../../redux/actions/auth'
import { useForm,  useFieldArray } from "react-hook-form";
// import '../sprint.css'
import style from "../../../../Styles/modules/components/Project/oneproj.module.css";
import sprintCss from '../../../../Styles/modules/components/Project/onesprint.module.css'
import {Button, CancelButton} from '../../../../Styles/buttons'
import { Card } from "../../../../Styles/common";
import { Light, Regular,Bold, Thin} from '../../../../Styles/typography'

const Sprint = ({match, history}) => {
    const dispatch = useDispatch();
    let {id} = match.params;
  
    const chosenSprints = useSelector(state => state.auth.user.sprints)
    let back = match.url;
    const sprint = useSelector(state => state.projects.sprint)
    const taskArr = useSelector(state => state.projects.sprint)
    // const project = useSelector(state => state.projects.project)
    const loading = useSelector(state => state.projects.sprintLoad)
    const msg = useSelector(state => state.projects.msg)

    const user = useSelector(state => state.auth.user)
    const [newFields, setNewFields]= useState(false)
    const [actualClose, setActualClose] = useState (0)
    const [close, setClose] = useState ('??')
    const [diff, setDiff] = useState (0)
    const [loaded, setLoaded] = useState (0)
    const [dateOpenIn, setDateOpenIn] = useState (0)
    const [duration, setDuration] = useState (7)
    const [sprintId,setSprintId] = useState (0)
    const [status, setStatus] = useState (false)
  //edit states
    const [isEdit, setEdit] = useState(false) //enable edit for ongoing tasks
    const [editTask, setEditTask] = useState({
      taskid: '',
      taskTitle: '',
      editIndex: -1
    })

    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            tasks: [{ 
              taskTitle: "задача",
              workVolume: "5",
              taskState: false 
            }]
          }
    });
    
    const { fields, append,  remove } = useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "tasks", // unique name for your Field Array
    });




	useEffect(() => {
    setSprintId(match.params.id);
    // console.log('hello sprint update')
    if (loading) {
      setDateOpenIn(sprint.dateOpen);
      if (sprint.dateClosePlan != null && sprint.dateClosePlan != undefined) {
        let d2 = new Date(sprint.dateClosePlan.slice(0, 10).replace(/-/g, "/"));

        setActualClose(d2);
      } else if (
        sprint.dateClosePlan == null ||
        sprint.dateClosePlan == undefined
      ) {
        let noData = new Date(sprint.dateOpen.slice(0, 10).replace(/-/g, "/"));
        setActualClose(noData);
      }
    }
    {
      chosenSprints
        .filter((sprint) => sprint._id === id)
        .map(() => {
          setStatus(true);
        });
    }
  }, [loading, sprint, taskArr]);

  useEffect (()=> {
     
    if (actualClose!=0){
      let d0 = new Date (sprint.dateOpen.slice(0, 10).replace(/-/g, "/"))
      let d1 = new Date ()
      // console.log(actualClose, d1)
      setDiff (Math.abs(actualClose-d1)/86400000)
      setDuration (Math.abs(actualClose-d0)/86400000)
      
      if (sprint.dateClosePlan != null) {
        setClose(sprint.dateClosePlan.slice(5,10).split('-').reverse().join('.'))
      }

      else if (sprint.dateClosePlan == null) {
        setClose('??')
      } 
        setLoaded (true)
      
    }
    
  
},[dateOpenIn])

    //submit for new tasks array;
    const onSubmit = (data) =>{
            let tasks = data;
            dispatch(addTasks({tasks, sprintId }))
            setTimeout(() => {
              return history.push(`./`);
          }, 200);
            

    }
   
    useEffect(() => {
        
            dispatch(getSprint(id))    
        
    }, [])


 
    const chosenSprint = (e) => {
      setStatus(!status)
      dispatch(addToChosen(id));
      
     
  }
   
    const onChange = (e) => {
       
    
        let taskid = e.target.value;
        dispatch(finishTask({taskid, id}))
       
    }

    const editTasksHandler = (e, ind) => {
      // console.log(e.target.value, ind)
      if(ind>=0){
      
      setEditTask({
        ...editTask,
        taskid: taskArr.tasks[ind]._id,
        taskTitle: e.target.value,
      });
      }


    }
    const handleEditSubmit = (e) => {
      e.preventDefault();
    
      let id = match.params.id
      dispatch(EditTask({editTask, id})); 
      setEdit(!isEdit);
      setEditTask({
        ...editTask,
        editIndex: -1
      })
      dispatch(getSprint(id));    

    }



    const createField =()=>{
      setNewFields(true)
    }

   const handleSprint = (e) => {
      
        dispatch(finishSprint(id));
        setTimeout(() => {
          return history.push(`./`);
  }, 200);
   }
 

   const handleDelete = () => {
          setTimeout(() => history.push(`./`), 50);
            dispatch(deleteSprint(id))
     

   }



   //а теперь и функция не нужна, можно сразу onClick сунуть.
   const prevPage = (e) => {
    // //зачем тут таймаут? 
    // setTimeout(() => {
      return history.push(`./`);
    // }, 200);
    
   }

    return (
      <div>
        {!loading ? (
          <p> loading...</p>
        ) : (
          <div>
            <div className={style.title}>
              <Bold size="24">
                Спринт 
                {sprint.dateOpen.slice(5, 10).split('-').reverse().join('.') + "-" + close}
              </Bold>
            </div>

            <Light
              className={style.title__small}
              style={{ marginBottom: "70px" }}
              size="16"
            >
              {!loaded ? (
                <div>...</div>
              ) : (
                <div className={style.title__deadline}>
                  Дней до дедлайна: {diff.toString().slice(0, 2)}
                </div>
              )}
              <div className={style.title__deadline}></div>
            </Light>

            <div className={sprintCss.first_flex}>
              <Card className={sprintCss.first_block}>
                <Regular size="30" className={sprintCss.info}>
                  Информация
                </Regular>
                <Light className={sprintCss.descr}>{sprint.description}</Light>
                <div className={sprintCss.time}>
                  <Light>Продолжительность:   </Light>
                  <Regular>
                    {duration === 7
                      ? "1 неделя"
                      : duration === 14
                      ? "2 недели"
                      : "??"}
                  </Regular>
                </div>
                <div style={{ display: `${sprint.status ? "block" : "none"}` }}>
                  <Regular size={30} className={sprintCss.tasks}>
                    {" "}
                    Задачи{" "}
                  </Regular>

                  {taskArr.tasks.map((task, ind) => {
                    return (
                      <div key={ind}>
                        <form>
                          <div className={sprintCss.tasks_cont}>
                            <label
                              style={{
                                display: `${!sprint.status ? "none" : "block"}`,
                              }}
                            >
                              test
                            </label>

                            <input
                              style={{
                                display: `${sprint.status ? "none" : "block"}`,
                              }}
                              type="checkbox"
                              id="vehicle1"
                              name="vehicle1"
                              defaultChecked={task.taskStatus}
                              value={task._id}
                              onChange={onChange}
                            />

                            <Light
                              className={sprintCss.one_task}
                              style={{
                                textDecoration: `${
                                  task.taskStatus ? "line-through" : "none"
                                }`,
                              }}
                              
                            >

                              {ind + 1}.{" "}
                              {task.taskTitle !== ""
                                ? task.taskTitle
                                : "Без названия"}
                            </Light>
                          </div>
                        </form>
                      </div>
                    );
                  })}
                </div>

                <Button
                  onClick={handleSprint}
                  fontSize={"16px"}
                  style={{
                    display: `${sprint.status ? "block" : "none"}`,
                    marginTop: "20px",
                    width: "100%",
                  }}
                >
                  {" "}
                  Восстановить спринт
                </Button>
                <CancelButton
                  onClick={() => prevPage()}
                  grey
                  style={{
                    display: `${sprint.status ? "block" : "none"}`,
                    marginTop: "20px",
                  }}
                >
                  Назад
                </CancelButton>
              </Card>
              {/* addInfoSprint */}

              <Card
                className={sprintCss.second_block}
                style={{
                  opacity: `${sprint.status ? 0 : 1}`,
                  pointerEvents: `${sprint.status ? "none" : "auto"}`,
                }}
              >
                <Regular size={30} className={sprintCss.tasks}>
                  {" "}
                  Задачи{" "}
                </Regular>
                {taskArr.tasks.map((task, ind) => {
                  return (
                    <div key={ind}>
                      <form onChange={editTasksHandler}>
                        <div className={sprintCss.tasks_cont}>
                          <label
                            style={{
                              display: `${!sprint.status ? "none" : "block"}`,
                            }}
                          ></label>

                          <input
                            style={{
                              display: `${sprint.status ? "none" : "block"}`,
                            }}
                            type="checkbox"
                            id="vehicle1"
                            name="vehicle1"
                            defaultChecked={task.taskStatus}
                            value={task._id}
                            onChange={onChange}
                          />
                          {isEdit && ind === editTask.editIndex && (
                            <input
                              className={sprintCss.one_task}
                              type="text"
                              name="task"
                              defaultValue={task.taskTitle}
                              onChange={(e) => editTasksHandler(e, ind)}
                              style={{
                                textDecoration: `${
                                  task.taskStatus ? "line-through" : "none"
                                }`,
                              }}
                            ></input>
                          )}

                          {ind !== editTask.editIndex && (
                            <Light
                              className={sprintCss.one_task}
                              style={{
                                textDecoration: `${
                                  task.taskStatus ? "line-through" : "none"
                                }`,
                              }}
                              onClick={(e) =>
                                isEdit
                                  ? setEditTask({ ...editTask, editIndex: ind })
                                  : ""
                              }
                            >
                              {ind + 1}.{" "}
                              {task.taskTitle !== ""
                                ? task.taskTitle
                                : "Без названия"}
                            </Light>
                          )}

                          {isEdit && <Thin  onClick={(e) =>
                                
                                   setEditTask({ ...editTask, editIndex: ind })}>     редактировать</Thin>}
                        </div>
                        {ind === taskArr.tasks.length - 1 && user.permission !== 'user'  && (
                          <>
                            {!isEdit && (
                              <Button onClick={() => setEdit(!isEdit)}>
                                edit fields
                              </Button>
                            )}

                            {isEdit && (
                              <Button type="submit" onClick={handleEditSubmit}>
                                {" "}
                                save
                              </Button>
                            )}
                          </>
                        )}
                      </form>
                    </div>
                  );
                })}
                

                {/* form for new tasks */}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <ul style={{ listStyleType: "none" }}>
                    <div style={{ display: `${newFields ? "block" : "none"}` }}>
                      {fields.map((item, index) => (
                        <li key={item.id} className={sprintCss.tasks_cont}>
                          <input
                            style={{ width: "35vw", height: "20px" }}
                            name={`tasks[${index}].taskTitle`}
                            ref={register()}
                            placeholder="Название задачи" // make sure to set up defaultValue
                          />

                          <Button
                            type="button"
                            style={{
                              display: `${
                                fields.length <= 1 ? "none" : "block"
                              }`,
                              color: "#3F496C",
                              backgroundColor: "white",
                              marginRight: "50px",
                              border: "none",
                              marginLeft: "auto",
                              marginRight: "0",
                            }}
                            onClick={() => remove(index)}
                          >
                            Удалить
                          </Button>
                        </li>
                      ))}
                    </div>
                  </ul>
                  <CancelButton
                    fontSize={"16px"}
                    style={{
                      display:"block",
                      color: "#3F496C",
                      backgroundColor: "white",
                      border: "none",
                      textAlign: "right",
                    }}
                    onClick={createField}
                  >
                    Добавить задачу
                  </CancelButton>

                  <div style={{ display: `${newFields ? "block" : "none"}` }}>
                    <Button
                      fontSize={"16px"}
                      type="button"
                      style={{
                        color: "#3F496C",
                        backgroundColor: "white",
                        border: "none",
                      }}
                      onClick={() =>
                        append({
                          firstName: "appendBill",
                          lastName: "appendLuo",
                        })
                      }
                    >
                      Добавить задачу
                    </Button>
                    <Button
                      fontSize={"16px"}
                      style={{
                        marginLeft: "50px",
                        color: "#3F496C",
                        backgroundColor: "white",
                        border: "none",
                      }}
                      type="submit"
                    >
                      Сохранить задачи
                    </Button>
                  </div>
                </form>
                <div className={sprintCss.buttons}>
                  <Button
                    fontSize={"16px"}
                    onClick={() => prevPage()}
                    style={{}}
                    grey
                  >
                    Вернуться к проекту
                  </Button>

                  <Button fontSize={"16px"} onClick={chosenSprint}>
                    {!status ? "Добавить в избранное" : "Убрать из избранного"}
                  </Button>

                  <Button
                    fontSize={"16px"}
                    style={{
                      display: `${user.permission === "user" ? "none" : "flex"}`,
                    }}
                    onClick={handleSprint}
                  >
                    Завершить спринт
                  </Button>

                  <Button
                    fontSize={"16px"}
                    style={{
                      display: `${user.permission === "user" ? "none" : "flex"}`,
                    }}
                    onClick={handleDelete}
                  >
                    Удалить спринт
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    );
}

export default Sprint