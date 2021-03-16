

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postModel } from "../../../../redux/actions/models";
import { Card } from "../../../../Styles/common";

const UpdateModel = ({ crypt, model }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    crypt: crypt,
    file: null,
    title: model.title,
  });

  const onChangeFile = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };


  useEffect(() => {
    setFormData({...formData, title: model.title})
  }, [model])

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    dispatch(postModel(formData));
  };
  return (
    <Card>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          // style={{ opacity: 0, cursor: "pointer" }}
          onChange={(e) => onChangeFile(e)}
        />
        <button type="submit"> submit </button>
      </form>
    </Card>
  );
};

export default UpdateModel;
