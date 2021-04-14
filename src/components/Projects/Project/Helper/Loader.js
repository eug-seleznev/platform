import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProject } from "../../../../redux/actions/projects";






const Loader = (props) => {
    const dispatch = useDispatch();
    const project = useSelector(state => state.projects.project);

    
    useEffect(() => {
        setTimeout(() => dispatch(getProject(props.crypt)), 0 ); 
    }, [])

    if(!project){
        return <p> loading...</p>
    }
    return (
            <div>
                {props.children}
            </div>
    )
}




export default Loader