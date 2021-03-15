import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Oauth } from "../../redux/actions/models"
import { getProject } from "../../redux/actions/projects"
import Viewer from "./index"





const Helper = ({match, history}) => {
    let {name, crypt} = match.params
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch();
    const oauth = useSelector(state => state.projects.oauth);
    const project = useSelector((state) => state.projects.project);


    const [urn, setUrn] = useState(null)

    useEffect(() => {
     
                dispatch(Oauth(crypt));
                dispatch(getProject(crypt));
            
    }, [])

    useEffect(() => {
      if (project._id && oauth) {
        //set currnet urn
        setUrn(project.urnNew.filter((urn) => urn._id === name));
      }
    }, [project, oauth]);


    useEffect(() => {
        if(urn){
            setLoaded(true)
        }
    }, [urn])


    if(!loaded){
        return <p>loading..</p>
    }
    

    return (

            <Viewer oauth={oauth} projectTitle={project.title} urn={urn[0].urn} />
      
    )
}



export default Helper