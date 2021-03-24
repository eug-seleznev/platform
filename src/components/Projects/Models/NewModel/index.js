import { useState } from "react";
import { useDispatch } from "react-redux";
import { postModel, Status } from "../../../../redux/actions/models";
import { Button } from "../../../../Styles/buttons";
import modelsCss from '../../../../Styles/modules/components/Project/models.module.css'
import { Thin } from "../../../../Styles/typography";









const LoadModel = ({crypt, setSubmited, user}) => {
  const dispatch = useDispatch();

   const [formData, setFormData] = useState({
     crypt: crypt,
     file: null,
     title: "default",
     tags: [],
     user_id: user,
   });

 const onChangeFile = (e) => {

   setFormData({ ...formData, [e.target.name]: e.target.files[0] });

 };


 const onChangeTags = (e) => {
    setFormData({ ...formData, tags: [e.target.value] });

} 
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
    <div >
      <form className={modelsCss.loading} onSubmit={onSubmit}>
        <input
          className={modelsCss.loading__input}
          type="text"
          name="title"
          placeholder='Введите название'
          onChange={onChange}/>
        <input 
          className={modelsCss.loading__input}
          type="text"
          name="tags"
          placeholder='Введите тип'
          onChange={onChangeTags}/>
          <Thin
            className={modelsCss.load__model}
            style={{
              
            }}
          >
            Загрузить модель
          </Thin>
        <input
          type="file"
          name="file"
          style={{ opacity: 0,zIndex:99, cursor: "pointer",height:'40px',	transform: 'translateY(-46px)' }}
          onChange={(e) => onChangeFile(e)}
        />
        <Button type="submit"> Сохранить </Button>
      </form>
    </div>
  );
};

export default LoadModel;
