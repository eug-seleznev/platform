import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Oauth, Status } from "../../redux/actions/models"
import { getProject } from "../../redux/actions/projects"
import Viewer from "./index"
import Loader from "./Loader"





const Helper = ({match, history}) => {
    let {name, crypt} = match.params
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch();
    const oauth = useSelector(state => state.projects.oauth);
    const project = useSelector((state) => state.projects.project);


    const status = useSelector(state => state.models.status)

    const [urn, setUrn] = useState(null)

    useEffect(() => {
     
                dispatch(Oauth(crypt));
                dispatch(Status({crypt, name}))
                dispatch(getProject(crypt));
            
    }, [])

    useEffect(() => {
      if (project._id && oauth &&status ) {
        //set currnet urn
        setUrn(project.urnNew.filter((urn) => urn._id === name));
        setLoaded(true);

      }
    }, [project, oauth, status]);




    if(!loaded){
        return <p>loading..</p>
    }
    

    return (
      <Loader status={status} crypt={crypt} name={name}>
        <Viewer oauth={oauth} projectTitle={project.title} urn={urn[0].urn} />
      </Loader>
    );
}



export default Helper