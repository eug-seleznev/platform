import { useState } from "react";
import { Link } from "react-router-dom";

import Subtitle from "../components/OneProject/subtitle";
import style from "../../../Styles/modules/components/Project/oneproj.module.css";
import { Thin } from "../../../Styles/typography";

const Viewer = ({ project }) => {


  const [open, setOpen] = useState(true);

  const openfunc = () => {
    setOpen(!open);
  };
  return (
    <div
      className={style.model__cont}
      style={{
        overflowY: "hidden",
        paddingBottom: "30px",
        marginBottom: "0px",
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
      <div style={{ width: "80%", marginTop: "-27px" }}>
        <Link to={`models`} style={{ textDecoration: "none" }}>
          <Thin
            style={{
              backgroundColor: "#EBF5FF",
              width: "240px",
              textAlign: "center",
              padding: "0px",
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
        </Link>

        <Link to={`models`} style={{ textDecoration: "none" }}>
          <Thin
            style={{
              backgroundColor: "white",
              width: "240px",
              textAlign: "center",
              padding: "0px",
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
