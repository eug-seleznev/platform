import { Link } from "react-router-dom"






const Header = () => {





    return (
      <div
        style={{
          backgroundColor: "black",
          width: "107vw",
          marginLeft: "-7vw",
          height: "40px",
          marginTop: "-45px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            marginLeft: "23%",
            color: "white",
            // backgroundColor: "green",
            justifyContent: "space-between",
            // backgroundColor: "red"
            textDecoration: "none",
            paddingTop: "17px",
          }}
        >
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/idea/new"
          >
            Idea
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/idea/work"
          >
            WIP
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/idea/done"
          >
            Done
          </Link>
        </div>
      </div>
    );
}


export default Header