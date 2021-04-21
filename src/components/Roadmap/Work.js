








import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Ideas from "./New/Ideas";
import Boat from "../Illustration/boat.png";
import { ModalContainer } from "../../Styles/common";
import { Light } from "../../Styles/typography";
import { deleteIdea, moveIdea } from "../../redux/actions/ideas";


const Work = () => {
  const dispatch = useDispatch()
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [onBoard, setOnBoard] = useState (false)
  const work_ideas = useSelector(state => state.ideas.work)



const ideaDelete =(id)=>{
  dispatch(deleteIdea(id))
}
const skip =(id)=>{
  let type = 0
  dispatch(moveIdea({id,type}))
}
const end =(id)=>{
  let type = 2
  dispatch(moveIdea({id,type}))
}
    return (
      <div>
        {/* header */}
        <div style={{ textAlign: "center" }}>
          <img src={Boat} />
          <div
            style={{
              marginTop: "-50px",
            }}
          >
            <h2> Помогите нам улучшить платформу</h2>

            <p
              style={{
                marginTop: "-10px",
                marginBottom: "40px",
              }}
            >
              Эти предложения утверждены и находятся в работе.
            </p>
          </div>
        </div>
        {selectedIdea?
        <ModalContainer onClick={()=>!onBoard?setSelectedIdea(null):''}>
            <div onMouseEnter={()=>{setOnBoard(true)}} onMouseLeave={()=>{setOnBoard(false)}}
              style={{marginLeft:'20vw',width:'60vw',backgroundColor:'white',borderRadius:'5px',marginTop:'50vh',transform:'translateY(-50%)', height:'160px',padding:'20px'}}>
                <Light size='25'>{selectedIdea}</Light>
            </div>
        </ModalContainer>:''
        }
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
          <div
            style={{
              width: "100%",
              marginTop: "40px",
              // backgroundColor: "rgba(21,43,25,0.6)",
            }}
          >
            {work_ideas.length ? (
              work_ideas.map((idea, ind) => {
                return (
                  <div
                    key={ind}
                    style={{
                      paddingBottom: "5px",
                    }}
                  >
                    <Ideas end={end} skip={skip} status='work'  ideaDelete={ideaDelete}  idea={idea} setSelected={setSelectedIdea} />
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

export default Work

