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
