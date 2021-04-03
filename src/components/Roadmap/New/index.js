import { useDispatch } from "react-redux";
import Form from './form'
import Ideas from "./Ideas";



let ideas_arr = {
  new:[],
  progress: [],
  done: []
}




let ideas = [
  {
    title: "hahah lol",
    like: 3,
    description: "lololo",
    user: "fullname",
  },

  {
    title: "hahah nooo",
    like: 1,
    description: "123",
    user: "hah mda",
  },
  {
    title: "hahah nooo",
    like: 1,
    description: "lololo",
    user: "hah mda",
  },
  {
    title: "фичу мне запили",
    like: 5,
    description: "lololo",
    user: "gawr gura",
  },
];



const New = () => {

    return (
      <div>
        {/* header */}
        <div style={{ textAlign: "center" }}>
          <img src="/illustration/boat.png" />

          <h2> Помогите нам улучшить платформу</h2>

          <p>
            Тут можно создавать и голосовать за функционал, который вы хотите
            увидеть в следующем релизе
          </p>
        </div>


        <div
          style={{
            width: "85vw",
            backgroundColor: "gray",
            height: "auto",
            padding: "20px",
          }}
        >
          {/* new idea form */}
          <div>
            <Form />
          </div>

          {/* ideas card */}
          <div
            style={{
              width: "100%",
              marginTop: "0px",
              backgroundColor: "rgba(21,43,25,0.6)",
            }}
          >
            {ideas.map((idea, ind) => {
              return <Ideas key={ind} idea={idea} />;
            })}
          </div>
        </div>
      </div>
    );
}

export default New

