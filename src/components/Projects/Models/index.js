
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './loader'
import Managment from './Managment';
import ModelsTable from './ModelsTable';
import LoadModel from './NewModel';
import UpdateModel from './NewModel/UpdateModel';

//project and models loader
//merge

const Models = ({match, history, location}) => {
    const dispatch = useDispatch();
    const {crypt} = match.params
    const project = useSelector(state => state.projects.project)
    const loadingStatus = useSelector((state) => state.projects.modelLoaded);


    const [focusRow, setFocusRow] = useState(null) //id of choosen model
    const [submitedModel, setSubmited] = useState({
      submit: false,
      loaded: false
    }) //load new model


    const [updateExistModel, setUpdate] = useState(false)

    useEffect(() => {
      if(loadingStatus){

        setSubmited({...submitedModel, loaded: false, submit: false})
      }
    }, [project])

    const submitModel = () => {
      setSubmited({ ...submitedModel, submit: !submitedModel.submit });
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

          {!submitedModel.submit ? (
            // ВСЕ МОДЕЛИ ПРОЕКТА
            <ModelsTable
              focusRow={focusRow}
              setFocus={setFocusRow}
              models={project.urnNew}
              history={history}
              location={location}
            />
          ) : (
            // ЗАГРУЗКА НОВОЙ МОДЕЛИ
            <div>
              {!submitedModel.loaded ? (
                <LoadModel crypt={crypt} setSubmited={setSubmited} />
              ) : (
                <p>Модель загружается</p>
              )}
            </div>
          )}
          {focusRow && updateExistModel && (
            <UpdateModel crypt={crypt} model={focusRow} setUpdate={setUpdate} setSubmited={setSubmited} />
          )}
        </div>
      </Loader>
    );
}



export default Models



