import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {postModel, Status} from '../../redux/actions/models'


const Viewer = () => {
    const dispatch = useDispatch();
    const project = useSelector(state => state.projects.project)
    const [formData, setFormData] = useState({
      crypt: project.ctypt,
      sprintId: "600ffe9e68bdeb0022fb47db",
      file: null
    });


  useEffect(() => {
    let crypt = project.crypt;
    dispatch(Status(crypt))
  }, [])

   const onChange = (e) => {
     e.preventDefault();
     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
   };
     
    const onSubmit =(e) => {
        e.preventDefault();
        dispatch(postModel(formData))
    }




    return (
      <div>
        <p> hello world</p>
        <form onSubmit={onSubmit}>
            <input type="file" name="file" onChan-ge={e => onChange(e)}/>
          <button type="submit"> load model</button>
        </form>
      </div>
    );
}



export default Viewer