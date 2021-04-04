import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from './form'
import Ideas from "./Ideas";



let ideas_arr = {
  new:[],
  progress: [],
  done: []
}




// let ideas = [
//   {
//     title: "hahah lol",
//     like: 3,
//     description: "lololo",
//     user: "fullname",
//   },

//   {
//     title: "hahah nooo",
//     like: 1,
//     description: "123",
//     user: "hah mda",
//   },
//   {
//     title: "hahah nooo",
//     like: 1,
//     description: "lololo",
//     user: "hah mda",
//   },
//   {
//     title: "фичу мне запили",
//     like: 5,
//     description: "lololo",
//     user: "gawr gura",
//   },
// ];



const New = () => {

  const [selectedIdea, setSelectedIdea] = useState(null)
  const new_ideas = useSelector(state => state.ideas.new)


    return (
      <div>
        {/* header */}
        <div style={{ textAlign: "center" }}>
          <img src="/illustration/boat.png" />
          <div style={{
            marginTop: "-50px"
          }}>
            <h2> Помогите нам улучшить платформу</h2>

            <p style={{
              marginTop: "-10px",
              marginBottom: "40px"
            }}>
              Тут можно создавать и голосовать за функционал, который вы хотите
              увидеть в следующем релизе
            </p>
          </div>
        </div>

        <div
          style={{
            width: "65vw",
            marginLeft: "10vw",
            border: "0.4px solid #b7b7b7",
            borderRadius: "7px",
            backgroundColor: "white",
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
              marginTop: "40px",
              // backgroundColor: "rgba(21,43,25,0.6)",
            }}
          >
            {new_ideas.length ? (
              new_ideas.map((idea, ind) => {
                return (
                  <div
                    key={ind}
                    style={{
                      paddingBottom: "5px",
                    }}
                  >
                    <Ideas idea={idea} setSelected={setSelectedIdea} />
                  </div>
                );
              })
            ) : (
              <p> Идей пока нет</p>
            )}
          </div>
        </div>
      </div>
    );
}

export default New

