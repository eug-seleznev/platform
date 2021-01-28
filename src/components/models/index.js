import { useState } from "react";
import { useDispatch } from "react-redux";
import {postModel} from '../../redux/actions/models'


const Viewer = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
      crypt: "8633",
      sprintId: "600ffe9e68bdeb0022fb47db",
      file: null
    });

   const [file, setFile] = useState(null);

   const handleFile = (e) => {
     setFile(e.target.files[0]);
   };
   const onChange = (e) => {
     e.preventDefault();
     console.log(e.target.value);
     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
   };
     
    const onSubmit =(e) => {
        e.preventDefault();
        dispatch(postModel(formData))
        console.log(formData, 'my form data')
        console.log('hello')
    }
    return (
      <div>
        <p> hello world</p>
        <form onSubmit={onSubmit}>
            <input type="file" name="file" onChange={e => onChange(e)}/>
          <button type="submit"> hey</button>
        </form>
      </div>
    );
}



export default Viewer