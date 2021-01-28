


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../Styles/common";
import { postModel } from "../../../redux/actions/models";
import { Link } from "react-router-dom";

const Viewer = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.project);
  const [formData, setFormData] = useState({
    crypt: project.crypt,
    file: null,
  });

  const [file, setFile] = useState(null);
  const [loaded, setLoad] = useState(false)


  useEffect(() => {
    if(project.urn){
        setLoad(true)
    }
  }, [project.urn])
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postModel(formData));
    console.log(formData, "my form data");
    console.log("hello");
  };
  return (
    <Card>
      
      <form onSubmit={onSubmit}>
          <label> load model</label>
        <input type="file" name="file" onChange={(e) => onChange(e)} />
        <button type="submit"> hey</button>
      </form>

      {loaded ? <p> model loaded  <Link to={`${project.crypt}/model/test`}>here</Link></p> : <p>model not found</p>}

    </Card>
  );
};

export default Viewer;