import { useDispatch } from "react-redux";
import { Card } from "../../../Styles/modules/Roadmap";






const Ideas = ({idea}) => {
      const dispatch = useDispatch();

      const handleRequest = (data) => {
        // dispatch()
        console.log(data);
      };
    return (
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <img
          src="/heart.svg"
          style={{ width: "25px", height: "25px" }}
          onClick={() => handleRequest(idea.title)}
        />

        <p>{idea.title}</p>

        <p style={{
          marginLeft: "auto",
          marginRight: "20px"
        }}>/ likes {idea.like}</p>
      </Card>
    );
}



export default Ideas;