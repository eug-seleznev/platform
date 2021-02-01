


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../Styles/common";
import { postModel, Status } from "../../../redux/actions/models";
import { Link } from "react-router-dom";

const Viewer = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.project);
  const status = useSelector((state) => state.models.status);
  const newModel = useSelector((state) => state.models.urn);

  let crypt = project.crypt;

  const [formData, setFormData] = useState({
    crypt: project.crypt,
    file: null,
  });


  const [loaded, setLoad] = useState({
    model: false,
    status: false
  })

  
  useEffect(() => {
    dispatch(Status(crypt));
  }, []);

  useEffect(() => {
        dispatch(Status(crypt));

  }, [newModel])

  useEffect(() => {
    if(status){
      if (status.status == "success" && status.progress == "complete") {
        setLoad({ model: true, status: true });
      } else {
        setLoad({ status: false, model: false });
      }
  }
  }, [status, newModel])

  useEffect(() => {
    if(!loaded.status){
        setTimeout(() => {
          dispatch(Status(crypt));
        }, 2000);
    }
    
  }, [loaded.status])

  
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postModel(formData));
  };
  return (
    <Card>
      
      <form onSubmit={onSubmit}>
        <input type="file" name="file" onChange={(e) => onChange(e)} />
        <button type="submit"> load model here</button>
      </form>

      {loaded.model ? 
      <p> model loaded  <Link to={`${project.crypt}/model/test`}>here</Link></p>
      : <p>model not found</p>}

    </Card>
  );
};

export default Viewer;