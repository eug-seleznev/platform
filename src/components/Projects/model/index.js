import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../Styles/common";
import { cleardData, postModel, Status } from "../../../redux/actions/models";
import { Link } from "react-router-dom";
import { clearUrn } from "../../../redux/actions/projects";
import { Button } from "../../../Styles/buttons";
import Subtitle from "../components/OneProject/subtitle";
import style from "../../../Styles/modules/components/Project/oneproj.module.css";
import { Thin } from "../../../Styles/typography";

const Viewer = ({ project }) => {
  const dispatch = useDispatch();

  const model_status = useSelector((state) => state.models.status);

  const [formData, setFormData] = useState({
    crypt: project.crypt,
    file: null,
  });

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
      console.log("first useEffect if submit true", model_status);
      if (new_status[0] == "complete") {
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
        console.log("trying to dispatch value");
        dispatch(Status(project.crypt));
      }, 5000);
    }
  }, [loaded.submit, loaded.status]);

  //form for model loading
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setLoad({
      ...loaded,
      button: true,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoad({ model: false, submit: true });
    dispatch(postModel(formData));
    dispatch(clearUrn());
  };
  const openfunc = () => {
    setOpen(!open);
  };
  return (
    <div className={style.model__cont} style={{ height: `${!open ? "65px" : "auto"}`, overflowY: "hidden", marginBottom:'25px' }}>
      <Subtitle
        title="Модель проекта"
        openfunc={openfunc}
        subtwidth="90%"
        isopen={open}
        src="/model.png"
        open={true}
      ></Subtitle>
      <div style={{ width: "80%" }}>
        {loaded.model ? (
          <Link to={`${project.crypt}/model/view`}>
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
              Модель проекта
            </Thin>
          </Link>
        ) : loaded.submit ? (
          <p>
            {" "}
            модель загружается, это займет некоторое время, status:{" "}
            {model_status.split(" ")[0]}
          </p>
        ) : (
          <p>Модели в проекте пока что нет, но можно загрузить</p>
        )}
        {!loaded.submit && (
          <form onSubmit={onSubmit}>
            <Thin
              style={{
                backgroundColor: "white",
                width: "243px",
                textAlign: "center",
                padding: "2px",
                cursor: "pointer",
                transform: "translateY(23px)",
                borderRadius: "5px",
                height: "35px",
                border: "1px solid #C4C4C4",
              }}
            >
              Загрузить новую модель
            </Thin>
            <input
              type="file"
              name="file"
              style={{ opacity: 0, cursor: "pointer" }}
              onChange={(e) => onChange(e)}
            />
            {loaded.button && <Button type="submit"> Загрузка модели</Button>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Viewer;
