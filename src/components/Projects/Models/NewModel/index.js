import { useState } from "react";
import { useDispatch } from "react-redux";
import { postModel, Status } from "../../../../redux/actions/models";









const LoadModel = ({crypt, setSubmited, user}) => {
  const dispatch = useDispatch();

   const [formData, setFormData] = useState({
     crypt: crypt,
     file: null,
     title: "default",
     tags: ['b_loh'],
     user_id: user,
   });

 const onChangeFile = (e) => {

   setFormData({ ...formData, [e.target.name]: e.target.files[0] });

 };



 const onChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });

 } 

   const onSubmit = (e) => {
     e.preventDefault();
     console.log(formData)
     dispatch(Status({crypt, name:''}))
     dispatch(postModel(formData));
     setSubmited({submit: true, loaded: true})


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
