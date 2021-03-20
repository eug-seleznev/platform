import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Status } from "../../../redux/actions/models";
import { Link } from "react-router-dom";

import Subtitle from "../components/OneProject/subtitle";
import style from "../../../Styles/modules/components/Project/oneproj.module.css";
import { Thin } from "../../../Styles/typography";

const Viewer = ({ project }) => {
  const dispatch = useDispatch();

  const model_status = useSelector((state) => state.models.status);

  // const [formData, setFormData] = useState({
  //   crypt: project.crypt,
  //   file: null,
  //   title: 'default'
  // });

  const [loaded, setLoad] = useState({
    model: project.urn ? true : false, //initial check of model's availability
    status: false, //status of loaded model
    submit: false, // for form submit
    button: false, //render model load button
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (loaded.submit) {
      let new_status = model_status.split(" ");
      // console.log("first useEffect if submit true", model_status);
      if (new_status[0] === "complete") {
        setLoad({ model: true, status: true, submit: false });
      } else {
        setTimeout(() => {
          setLoad({ status: !loaded.status, model: false, submit: true });
        }, 2000);
      }
    }
  }, [model_status]);

  useEffect(() => {
    if (loaded.submit) {
      setTimeout(() => {
        // console.log("trying to dispatch value");
        dispatch(Status(project.crypt));
      }, 5000);
    }
  }, [loaded.submit, loaded.status]);

  //form for model loading
  // const onChange = (e) => {
  //   e.preventDefault();
  //   setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  //   setLoad({
  //     ...loaded,
  //     button: true,
  //   });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   setLoad({ model: false, submit: true });
  //   dispatch(postModel(formData));
  //   dispatch(clearUrn());
  // };
  const openfunc = () => {
    setOpen(!open);
  };
  return (
    <div
      className={style.model__cont}
      style={{
        height: `${!open ? "25px" : "auto"}`,
        overflowY: "hidden",
        paddingBottom: "30px",
        marginBottom: "25px",
      }}
    >
      <Subtitle
        title="Модель проекта"
        openfunc={openfunc}
        subtwidth="90%"
        isopen={open}
        src="/model.png"
        open={true}
      ></Subtitle>
      <div style={{ width: "80%" }}>
        {/* <Link
          to={`${project.crypt}/model/view`}
          style={{ textDecoration: "none" }}
        >
          <Thin
            style={{
              backgroundColor: "#EBF5FF",
              width: "243px",
              textAlign: "center",
              padding: "2px",
              cursor: "pointer",
              transform: "translateY(23px)",
              borderRadius: "5px",
              marginBottom: "10px",
              height: "35px",
              border: "1px solid #C4C4C4",
            }}
          >
            Сводная модель
          </Thin>
        </Link> */}

        <Link to={`${project.crypt}/m/view`} style={{ textDecoration: "none" }}>
          <Thin
            style={{
              backgroundColor: "#EBF5FF",
              width: "243px",
              textAlign: "center",
              padding: "2px",
              cursor: "pointer",
              transform: "translateY(23px)",
              borderRadius: "5px",
              marginBottom: "10px",
              height: "35px",
              border: "1px solid #C4C4C4",
            }}
          >
            Все модели проекта
          </Thin>
        </Link>
      </div>
    </div>
  );
};

export default Viewer;
