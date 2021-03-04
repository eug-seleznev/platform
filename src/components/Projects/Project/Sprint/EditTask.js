import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteTask, EditDescription } from "../../../../redux/actions/projects";
import { Bold, Light, Regular } from "../../../../Styles/typography"
import style from "../../../../Styles/modules/components/Project/newsprint.module.css"





const TaskManagment = ({ id, sprint_description, focusRow, editebleRow, creator, tasks }) => {
  const dispatch = useDispatch();

  //description handler
  const [descript, setDescription] = useState(sprint_description);
  const [isSubmit, setSubmit] = useState(true);

  //add description to sprint
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
    dispatch(EditDescription(descript, id));
  };



 const handleUserKeyPress = useCallback(event => {
    const { key } = event;
    if(focusRow !== '' && key === 'Delete'){
        dispatch(DeleteTask({ id, focusRow }));

    }
  
 })


  useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
return () => {
  window.removeEventListener("keydown", handleUserKeyPress);
};

  })
  const onEditSubmit = (e) => {
    e.preventDefault();
    dispatch(EditDescription(descript, id));
    setSubmit(true);
  };

  //edit task
  const editHandler = () => {
    editebleRow();
  };


  

  const deletehandler = (e) => {
        console.log(e.key)
        dispatch(DeleteTask({id, focusRow}))
  }





  return (
    <>
      <Regular size='24'> Задачи </Regular>
      <div>
        <div
          style={{
            display: "flex",
            width: "50%",
            justifyContent: "space-between",
            color: "#3F496C",
          }}
        >
           
            {tasks!==undefined?
              <div style={{display: "flex"}}>
              <Light >{tasks.filter(task=>task.status).length}/{tasks.length}</Light>
                <div className={style.card__thing}>
                  <div style={{width:`${Math.trunc(7/13*100)}%`}} className={style.card__thing__full}></div>
                </div>
              </div>:''}
            
							
             
            
          <Light color='#3F496C'> Создал: {creator} </Light>
          <Light color='#A3A3A3'> Добавить тег </Light>
          <Light color='#A3A3A3'> Добавить модель </Light>

          {focusRow !== "" && (
            <>
              <p onClick={editHandler}> edit task  </p>
              <p onClick={deletehandler}> delete </p>
            </>
          )}
        </div>

        <form onSubmit={onEditSubmit}>
          {!isSubmit ? (
            <input
              type="text"
              value={descript}
              placeholder="Добавить описание"
              onChange={descriptionHandler}
            ></input>
          ) : (
            <p onClick={() => setSubmit(false)}>
              {sprint_description !== ""
                ? "Описание " + sprint_description + "  "
                : "Добавить описание  "}{" "}
            </p>
          )}
        </form>
      </div>
    </>
  );
};



export default TaskManagment; 