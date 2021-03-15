
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from './loader'
import Managment from './Managment';
import ModelsTable from './ModelsTable';
import LoadModel from './NewModel';

//project and models loader
//merge

const Models = ({match, history, location}) => {
    const {crypt} = match.params
    const project = useSelector(state => state.projects.project)

    const [focusRow, setFocusRow] = useState() //id of choosen model
    const [submitedModel, setSubmited] = useState(false) //

    const submitModel = () => {
      setSubmited(!submitedModel)
    }

    return (
      <Loader crypt={crypt}>
        
          <div>
            <p>{project.title} / models </p>
            <Managment  submited={submitModel}/>
            {!submitedModel ? (
            <ModelsTable
              models={project.urnNew}
              history={history}
              location={location}
            />
            ): (
          <LoadModel crypt={crypt}/>
        )}
          </div>
         
      </Loader>
    );
}



export default Models