import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getUserTasks } from "../../redux/actions/auth";










const TaskLoader = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserTasks())
        
    }, [])
    return props.children
    
}


export default TaskLoader