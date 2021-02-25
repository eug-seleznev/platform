import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Oauth } from "../../redux/actions/models"
import { getProject } from "../../redux/actions/projects"
import Viewer from "./index"





const Helper = ({match, history}) => {
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch();
    const oauth = useSelector(state => state.projects.oauth);
    const project = useSelector((state) => state.projects.project);


    useEffect(async () => {
     
                let crypt = match.params.id;
                dispatch(Oauth(crypt));
                dispatch(getProject(crypt));
            
    }, [])


    useEffect(() => {
        if(oauth && project){
            setLoaded(true)

        }
    }, [oauth, project])


    

    return (
        <>
        {!loaded ? <p> loading...</p> :(
            <Viewer oauth={oauth} project={project} />
            
        )}
        </>
    )
}



export default Helper