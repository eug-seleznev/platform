import { useState } from "react";
import { useDispatch } from "react-redux";
import { postModel } from "../../../../redux/actions/models";









const LoadModel = ({crypt}) => {
  const dispatch = useDispatch();

   const [formData, setFormData] = useState({
     crypt: crypt,
     file: null,
     title: "default",
   });

 const onChangeFile = (e) => {

   setFormData({ ...formData, [e.target.name]: e.target.files[0] });

 };



 const onChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });

 } 

   const onSubmit = (e) => {
     e.preventDefault();
       console.log(crypt);
     dispatch(postModel(formData));

   }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          type="text"
          name="title"
          onChange={onChange}/>
        
        <input
          type="file"
          name="file"
          // style={{ opacity: 0, cursor: "pointer" }}
          onChange={(e) => onChangeFile(e)}
        />
        <button type="submit"> submit </button>
      </form>
    </div>
  );
};

export default LoadModel;
