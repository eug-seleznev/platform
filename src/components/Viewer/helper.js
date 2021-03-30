import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Oauth, Status } from "../../redux/actions/models"
import { getProject } from "../../redux/actions/projects"
import Viewer from "./index"
import Loader from "./Loader"





const Helper = ({match}) => {
    let {name, crypt} = match.params
    const dispatch = useDispatch();

    const oauth = useSelector(state => state.projects.oauth);
    const project = useSelector((state) => state.projects.project);


    const status = useSelector(state => state.models.status)


    const [loaded, setLoaded] = useState(false); //data loading from server
    const [urn, setUrn] = useState(null) //urn from params

    useEffect(() => {
     
                dispatch(Oauth(crypt));
                dispatch(Status({crypt, name}))
                dispatch(getProject(crypt));
            
    }, [])

    useEffect(() => {
      if (project._id && oauth &&status ) {
        //set currnet urn
        setUrn(project.urnNew.filter((urn) => urn._id === name));
        console.log(urn, 'urn????')
        setLoaded(true);

      }
    }, [project, oauth, status]);




    if(!loaded){
        return <p>loading..</p>
    }
    

    return (
      <Loader status={status} crypt={crypt} name={name}>
        <Viewer oauth={oauth} projectTitle={project.title} urn={urn[0].urn} oldUrn={urn[0].old} />
      </Loader>
    );
}



export default Helper