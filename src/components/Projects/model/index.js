import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../Styles/common";
import { cleardData, postModel, Status } from "../../../redux/actions/models";
import { Link } from "react-router-dom";
import { clearUrn } from "../../../redux/actions/projects";
import { Button } from "../../../Styles/buttons";

const Viewer = ({project}) => {
  const dispatch = useDispatch();

  const model_status = useSelector((state) => state.models.status);


  const [formData, setFormData] = useState({
    crypt: project.crypt,
    file: null,
  });

  const [loaded, setLoad] = useState({
    model: project.urn ? true : false, //initial check of model's availability
    status: false, //status of loaded model
    submit: false, // for form submit
    button: false //render model load button
  });


  useEffect(() => {
    if(loaded.submit){
      let new_status = model_status.split(' ')
      console.log('first useEffect if submit true', model_status)
      if (new_status[0] == "complete") {
               setLoad({ model: true, status: true, submit: false });
      } else {
          setTimeout(() => {
            setLoad({ status: !loaded.status, model: false, submit: true });
          }, 2000)            
      }
    }
    return () => dispatch(cleardData())
  }, [model_status]);


  useEffect(() => {
    if(loaded.submit) {
        setTimeout(() => {
          console.log('trying to dispatch value')
          dispatch(Status(project.crypt));
        }, 5000);
    } 
  }, [loaded.submit, loaded.status])

  

  //form for model loading
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setLoad({
      ...loaded,
      button: true
    })

  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoad({ model: false, submit: true });
    dispatch(postModel(formData));
    dispatch(clearUrn())
  };
  return (
    <Card>
      {!loaded.submit && (
        <form onSubmit={onSubmit}>
          <label> Тут можно загрузить новую модель:  </label>
          <input type="file" name="file" onChange={(e) => onChange(e)} />
         {loaded.button && <Button type="submit"> Загрузка модели</Button> }
        </form>
      )}
      {loaded.model ? (
        <p>
          {" "}
          Модель загрузилась и доступна   <Link to={`${project.crypt}/model/view`}>тут</Link>
        </p>
      ) : loaded.submit ? (
        <p> модель загружается, это займет некоторое время, status: {model_status}</p>
      ) : (
        <p>Модели в проекте пока что нет, но можно загрузить</p>
      )}
    </Card>
  );
};

export default Viewer;