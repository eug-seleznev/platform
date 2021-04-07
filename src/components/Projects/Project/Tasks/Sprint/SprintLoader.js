import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProject, getSprint } from "../../../../../redux/actions/projects";

export const SprintLoader = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSprint(props.sprint_id));
    dispatch(getProject(props.crypt))
  }, []);


  useEffect(() => {
    // console.log(props.sprint, 'my sprint on loader')
  }, [props.sprint])

  if (props.sprint.length === 0 && !props.project.team ) {
    return <p> loading...</p>;
  }


  if(props.sprint==false){
    return <p>loading...</p> 
  }
  return <div>
      {props.children}
  </div>
};
