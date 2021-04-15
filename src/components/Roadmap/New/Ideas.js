import { useDispatch } from "react-redux";
import { likeIdea } from "../../../redux/actions/ideas";
import { Card } from "../../../Styles/modules/Roadmap";
import { Light } from "../../../Styles/typography";






const Ideas = ({idea, setSelected}) => {
      const dispatch = useDispatch();

      const handleRequest = () => {
        let id = idea._id
        dispatch(likeIdea({id}))

      };
    return (
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "50px",
        }}
        onClick={() => setSelected(idea.title)}
      >
        <img
          src="/heart.svg"
          style={{ width: "30px", height: "30px", marginLeft: "5px",cursor:'pointer' }}
          onClick={() => handleRequest(idea.title)}
        />

        <Light
          style={{
            marginLeft: "15px",
            marginTop: "-3px",
          }}
          size="22"
        >
          {idea.title}
        </Light>

        <div
          style={{
            width: "30px",
            height: "20px",
            background: "#EEEEEE",
            borderRadius: "30%",
            marginLeft: "auto",
            marginRight: "20px",
          }}
        >
          <Light style={{ position: "absolute", marginLeft: "10px" }}>
            <b> {idea.likeCount}</b>
          </Light>
        </div>
      </Card>
    );
}



export default Ideas;