import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSprint } from "../../../../redux/actions/projects";

export const SprintLoader = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSprint(props.sprint_id));
  }, []);

  if(props.sprint.length==0){
      return <p> loading...</p>
  }

  return <div>
      {props.children}
  </div>
};
