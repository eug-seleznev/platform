import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAll } from "../../redux/actions/ideas"



const Loader = (props) => {
    const dispatch = useDispatch();
    const ideas = useSelector(state => state.ideas)
    useEffect(() =>  dispatch(getAll()), []);
    
    if(!ideas.new){
        return <p> loading...</p>
    }

    return  (
        <div>
                {props.children}
        </div>
    )
}


export default Loader