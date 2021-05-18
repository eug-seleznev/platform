import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTag, DeleteTask, deleteTag, EditSprint, getProject } from "../../../../../../redux/actions/projects";
import {  Bold, Light, Regular, Thin } from "../../../../../../Styles/typography"
import style from "../../../../../../Styles/modules/components/Project/newsprint.module.css"
import { addToChosen } from "../../../../../../redux/actions/auth";
import TagSearch from "../../../../components/tagSearch";
import Tag from "../../../../components/OneProject/tag";
import cardOpen from "./cardOpen.module.css"






const CardEditor = (
  // {tags, id,status, title, setStatus, sprint_description, crypt, focusRow, editebleRow, creator, tasks}
  ) => {
//   const dispatch = useDispatch();

//   //description handler
//   const [sprintInfo, setSprintInfo] = useState({
//     description: sprint_description,
//     title: title
//   });

//   const [isSubmit, setSubmited] = useState(false)
 
//   const [completeTasks, setCompleteTasks] = useState(0);
//   const [allTasks, setAllTasks] = useState(1);
//   //add description to sprint
//   const descriptionHandler = (e) => {
//     setSprintInfo({...sprintInfo, description: e.target.value});
//     dispatch(EditSprint(sprintInfo, id));
//   };



//  const handleUserKeyPress = useCallback(event => {
//     const { key } = event;
//     if(focusRow !== '' && key === 'Delete'){
//         dispatch(DeleteTask({ id, focusRow }));

//     }
  
//  })
 


//  useEffect(() => {
//   setSprintInfo({...sprintInfo, title: title})
//  }, [isSubmit])




//   useEffect(() => {
//         window.addEventListener("keydown", handleUserKeyPress);
// return () => {
//   window.removeEventListener("keydown", handleUserKeyPress);
// };

//   })
//   const onEditSubmit = (e) => {
//     e.preventDefault();
//     dispatch(EditSprint(sprintInfo, id));
   
//   };

//   //edit task
//   const editHandler = () => {
//     editebleRow();
//   };
//   const addCh = () => {
//     dispatch(addToChosen(id))
//     setStatus(!status)
//   };
 
  

//   const deletehandler = (e) => {
//         // console.log(e.key)
//         dispatch(DeleteTask({id, focusRow}))
//   }



//   useEffect(()=>{
    
//     if (tasks!==undefined){
//       // console.log(tasks)
//       setCompleteTasks(tasks.filter(task=>task.taskStatus).length)
//       setAllTasks(tasks.length)
//     }
    
//   },[tasks])


//  const AddTag =(value)=>{
//   if(value!=='') {
//     dispatch(addTag(id, value))
//   }
  
//  }
//  const delTag =(tag)=>{
//   dispatch(deleteTag(id, tag))
//  }

// const onChange = (e) => {
//   setSprintInfo({...sprintInfo, title: e.target.value})
//   // dispatch(EditSprint(sprintInfo, id));
  
// }
//  const onSubmit = (e) => {
//    e.preventDefault();
//        dispatch(EditSprint(sprintInfo, id));
//        setSubmited(false)
//        setTimeout(() => dispatch(getProject(crypt)), 500);

//       //  dispatch(getProject(crypt))

   

//  }
  return (
    <div
      className={cardOpen.main}
    >
      <form 
      // onSubmit={onSubmit}
      >
        {/* {!isSubmit ? ( */}
          <Bold size="28" 
          // onClick={() =>  // setSubmited(true)}
          >
            {/* // {title} */}
          </Bold>
        {/* ) : ( */}
          <input
            style={{
              border: "none",
              fontSize: "20px",
            }}
            className={style.titleChange}
            // onChange={onChange}
            // value={sprintInfo.title}
            value='Название'
          />
        {/* )} */}
      </form>
      <div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div className={style.editList}>
            {/* {tasks !== undefined ? ( */}
              <div style={{ display: "flex" }}>
                <Light style={{ width: "40px" }}>
                  9/18
                  {/* {completeTasks}/{allTasks} */}
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
            {/* ) : ( */}
              {/* "" */}
            {/* )} */}

            <div className={style.creator}>
              <Light color="#3F496C"> Создатель: 
              {/* {creator} */}
               </Light>
            </div>
            <div className={style.taglist}>
              {/* {tags !== undefined */}
                {/* ? tags.map((el, i) => {
                    return ( */}
                      <div
                        style={{
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        {/* <Tag
                          tagText={el}
                          key={i}
                          tagColor={
                            i === 0
                              ? "#C8D9E9"
                              : i === 1
                              ? "#E9E3C8"
                              : "#AAF8A8"
                          }
                        /> */}
                        <div className={style.cross} 
                        // onClick={() => delTag(el)}
                        >
                          x
                        </div>
                      </div>
                    {/* ); */}
                  {/* })
                : ""} */}
            </div>
            {/* {tags !== undefined && tags.length < 2 ? ( */}
              <TagSearch 
                // tagCount={false} func={AddTag}
                ></TagSearch>
            {/* ) : (
              ""
            )} */}

            {/* <Light color='#A3A3A3'> Добавить модель </Light> */}
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
              // onClick={() => addCh()}
            >
              {" "}
              {/* {!status ? "Добавить в избранное" : "Убрать из избранного"} */}
            </Light>
          </div>
        </div>
        <div style={{ height: "20px" }}>
          {/* {focusRow !== "" ? ( */}
            <div className={style.edit__task}>
              <Light
                color="#3F496C"
                // onClick={editHandler}
                style={{ cursor: "pointer", marginRight: "50px" }}
              >
                Редактировать задачу 
              </Light>
              <Light
                color="#3F496C"
                // onClick={deletehandler}
                style={{ cursor: "pointer" }}
              >
                Удалить задачу
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
                  <Thin size="16">Описание: </Thin>
                  <input
                    type="text"
                    // value={sprintInfo.description}
                    placeholder="Добавить описание"
                    // onChange={descriptionHandler}
                    className={style.changeDescr}
                  ></input>
                </div>
              </form>
            </div>
          {/* ) : (
            <div>
              <form onSubmit={onEditSubmit}>
                <div
                  style={{
                    display: "flex",
                    // paddingLeft: "40px",
                  }}
                >
                  <Thin size="16">Описание: </Thin>
                  <input
                    type="text"
                    value={sprintInfo.description}
                    placeholder="Добавить описание"
                    // onChange={descriptionHandler}
                    className={style.changeDescr}
                  ></input>
                </div>
              </form>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};



export default CardEditor; 