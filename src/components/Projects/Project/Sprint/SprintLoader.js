import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProject, getSprint } from "../../../../redux/actions/projects";

export const SprintLoader = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props.sprint_id)
    dispatch(getSprint(props.sprint_id));
    dispatch(getProject(props.crypt))
  }, []);

  if(props.sprint.length==0 && props.project.team ){
      return <p> loading...</p>
  }

  return <div>
      {props.children}
  </div>
};
