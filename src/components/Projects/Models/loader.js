import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getProject } from "../../../redux/actions/projects";










const Loader = (props) => {
    // const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getProject(props.crypt))
    }, [])
    return props.children
    
}


export default Loader