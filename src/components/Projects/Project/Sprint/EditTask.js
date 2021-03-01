import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteTask, EditDescription } from "../../../../redux/actions/projects";
import { Bold } from "../../../../Styles/typography"






const TaskManagment = ({ id, sprint_description, focusRow, editebleRow, creator }) => {
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
      <Bold> Задачи </Bold>
      <div>
        <p> Создал: {creator} </p>
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
                ? sprint_description + "  "
                : "Добавить описание  "}{" "}
            </p>
          )}
        </form>

        {focusRow !== "" && (
          <div>
            <p onClick={editHandler}> edit task  </p>
            <p onClick={deletehandler} >
              {" "}
              delete{" "}
            </p>
          </div>
        )}
      </div>
    </>
  );
};



export default TaskManagment; 