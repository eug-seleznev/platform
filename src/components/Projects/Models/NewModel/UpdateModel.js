

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postModel, Status } from "../../../../redux/actions/models";
import { Card } from "../../../../Styles/common";

const UpdateModel = ({ crypt, model, setUpdate, setSubmited }) => {
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
    setFormData({ ...formData, title: model.title });
  }, [model]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postModel(formData));
    dispatch(Status({crypt, name:''}))
    setSubmited({ submit: true, loaded: true });
    setUpdate(false);
  };
  return (
    <Card>
      <form onSubmit={onSubmit}>
        <input type="file" name="file" onChange={(e) => onChangeFile(e)} />
        <button type="submit"> submit </button>
      </form>
    </Card>
  );
};

export default UpdateModel;
