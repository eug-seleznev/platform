
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from './loader'
import Managment from './Managment';
import ModelsTable from './ModelsTable';
import LoadModel from './NewModel';
import UpdateModel from './NewModel/UpdateModel';

//project and models loader
//merge

const Models = ({match, history, location}) => {
    const {crypt} = match.params
    const project = useSelector(state => state.projects.project)

    const [focusRow, setFocusRow] = useState(null) //id of choosen model
    const [submitedModel, setSubmited] = useState(false) //load new model

    const [updateExistModel, setUpdate] = useState(false)



    const submitModel = () => {
      setSubmited(!submitedModel)
    }



    return (
      <Loader crypt={crypt}>
        <div>
          <p>{project.title} / models </p>
          <Managment
            history={history}
            location={location}
            submited={submitModel}
            focusRow={focusRow}
            urnArr={project.urnNew}
            updateModel={updateExistModel}
            setUpdate={setUpdate}
          />

          {!submitedModel ? (
            <ModelsTable
              focusRow={focusRow}
              setFocus={setFocusRow}
              models={project.urnNew}
              history={history}
              location={location}
            />
          ) : (
            <LoadModel crypt={crypt} />
          )}
          {focusRow && updateExistModel && (
            <UpdateModel crypt={crypt} model={focusRow} />
          )}
        </div>
      </Loader>
    );
}



export default Models



