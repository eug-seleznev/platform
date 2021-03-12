
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from './loader'
import Managment from './Managment';
import ModelsTable from './ModelsTable';
import LoadModel from './NewModel';

//project and models loader
//merge

const Models = ({match}) => {
    const {crypt} = match.params
    const project = useSelector(state => state.projects.project)

    const [focusRow, setFocusRow] = useState() //id of choosen model
    const [submitedModel, setSubmited] = useState(false) //



    return (
      <Loader crypt={crypt} >
          {!submitedModel ? (
              <div>
                <p>{project.title} / models </p>
                <Managment />
                <ModelsTable />
              </div>
          ) : <LoadModel />}
        
        

      </Loader>
    );
}



export default Models