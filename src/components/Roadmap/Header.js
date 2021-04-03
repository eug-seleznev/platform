import { Link } from "react-router-dom"






const Header = () => {





    return (
      <div style={{
          backgroundColor: "red",
          width: "107vw",
          marginLeft: "-7vw",
          height: '40px',
          marginTop: "-45px"
      }}>
        <div
          style={{
            
            display: "flex",
            flexDirection: "row",
            width: "50%",
            marginLeft: "23%",
            backgroundColor: "green",
            justifyContent: "space-between",
            // backgroundColor: "red"
            textDecoration: "none",
          }}
        >
          <Link to="/idea/new">Idea</Link>
          <Link to="/idea/work">WIP</Link>
          <Link to="/idea/done">Done</Link>
        </div>
      </div>
    );
}


export default Header