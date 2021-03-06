
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleardData } from '../../../redux/actions/models';

import { Thin } from '../../../Styles/typography';
import Loader from './loader'
import Managment from './Managment';
import ModelsTable from './ModelsTable';
import LoadModel from './NewModel';
import UpdateModel from './NewModel/UpdateModel';
import modelsCss from '../../../Styles/modules/components/Project/models.module.css'

//project and models loader
//merge

const Models = ({match, history, location}) => {
    const dispatch = useDispatch();
    const {crypt} = match.params
    const project = useSelector(state => state.projects.project)
    const loadingStatus = useSelector((state) => state.projects.modelLoaded);
    const user = useSelector(state => state.auth.user)
    const newUrn = useSelector(state => state.projects.newUrn);
    const [focusRow, setFocusRow] = useState(null) //id of choosen model
    const [submitedModel, setSubmited] = useState({
      submit: false,
      loaded: false
    }) //load new model


    const [updateExistModel, setUpdate] = useState(false)

    useEffect(() => {
      if(loadingStatus){
        
        setSubmited({...submitedModel, loaded: false, submit: false})
        let new_id = project.urnNew.filter((el) => el.urn === newUrn);
        history.push(`view/${new_id[0]._id}`);
        dispatch(cleardData())
       
      }
      
      
    }, [project])

    const submitModel = () => {
      setSubmited({ ...submitedModel, submit: !submitedModel.submit });
    }



    return (
      <Loader crypt={crypt}>
        <div className={modelsCss.main}>
          {/* <div className={modelsCss.row} >
            <ButtonText fontSize='16px'  onClick={() => history.push(`/projects/${crypt}`)}>{project.title} </ButtonText>
            <Regular size='16'>/ модели</Regular>
          </div> */}
          <br />
          <br />
          <br />
         
          <Managment
            history={history}
            location={location}
            submited={submitModel}
            focusRow={focusRow}
            urnArr={project.urnNew}
            updateModel={updateExistModel}
            setUpdate={setUpdate}
            models={project.urnNew}
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
                <LoadModel crypt={crypt} setSubmited={setSubmited} user={user._id} />
              ) : (
                <Thin>Модель загружается</Thin>
              )}
            </div>
          )}
          {focusRow && updateExistModel && (
            <UpdateModel crypt={crypt} model={focusRow} setUpdate={setUpdate} setSubmited={setSubmited} user={user._id} />
          )}
        </div>
      </Loader>
    );
}



export default Models



