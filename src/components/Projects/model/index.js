


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../Styles/common";
import { cleardData, postModel, Status } from "../../../redux/actions/models";
import { Link } from "react-router-dom";

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
  });


  useEffect(() => {
    if(loaded.submit){
      if (model_status == "complete") {
               setLoad({ model: true, status: true, submit: false });
      } else {
               setLoad({ status: !loaded.status, model: false, submit: true });
      }
    }
  }, [model_status]);

  useEffect(() => {
    if(loaded.submit) {
        setTimeout(() => {
          dispatch(Status(project.crypt));
        }, 1000);
    } 
  }, [loaded.submit, loaded.status])

  

  //form for model loading
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoad({ model: false, submit: true });
    dispatch(postModel(formData));
  };
  return (
    <Card>
      {!loaded.submit && (
        <form onSubmit={onSubmit}>
          <input type="file" name="file" onChange={(e) => onChange(e)} />
          <button type="submit"> load model here</button>
        </form>
      )}
      {loaded.model ? (
        <p>
          {" "}
          model loaded <Link to={`${project.crypt}/model/test`}>here</Link>
        </p>
      ) : loaded.submit ? (
        <p> loading model.. this mi take a while, status: {model_status}</p>
      ) : (
        <p>model not found</p>
      )}
    </Card>
  );
};

export default Viewer;