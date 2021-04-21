import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from './form'
import Ideas from "./Ideas";
import Boat from "../../../Illustration/boat.png";
import { inWork, Reverse, ReverseDate } from "../../../../redux/actions/office";
import { ModalContainer } from "../../../../Styles/common";
import SearchUser from "../../searchUser";
import { Light } from "../../../../Styles/typography";


const New = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('');
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [id, setId] = useState (null)
  const [modal, setModal] = useState(false)
  const [onBoard, setOnBoard] = useState (false)
  const new_ideas = useSelector(state => state.office.data)
  const reload = useSelector(state => state.office.reload)
  let isInitial;
  useEffect(()=>{
    setFilter('like')
    isInitial = true;
    dispatch(Reverse({isInitial}))
    
},[])
const addExecutor =(id) =>{
  setModal(true) 
  setId(id)
}
const workDispatch =(user)=>{
  // console.log(user)
  dispatch(inWork(id, user))
  setModal(false)
}
useEffect(()=>{


  if (filter==='like'){
      isInitial = true
      
      return dispatch(Reverse({isInitial}))
  } if (filter==='date'){
      isInitial = true

      return dispatch(ReverseDate({isInitial}))
  }


},[reload])
    if(new_ideas) isInitial=false;
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
            <h2> Предложения для офиса</h2>

            <p
              style={{
                marginTop: "-10px",
                marginBottom: "40px",
              }}
            >
              Тут можно предлагать и голосовать за вещи, которые вы хотите увидеть в офисе.
            </p>
          </div>
        </div>
        {!modal?'':
                    <ModalContainer>
                        <SearchUser func={workDispatch}/>
                    </ModalContainer>}
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
            {new_ideas && new_ideas.length ? (
              new_ideas.filter(el=>el.status==0).map((idea, ind) => {
                return (
                  <div
                    key={ind}
                    style={{
                      paddingBottom: "5px",
                    }}
                  >
                    <Ideas addExecutor={addExecutor} status='new' idea={idea} setSelected={setSelectedIdea} />
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

