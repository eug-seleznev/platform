







import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ideas from "./New/Ideas";
import { inWork, Reverse, ReverseDate } from "../../../redux/actions/office";
import { Light } from "../../../Styles/typography";
import { ModalContainer } from "../../../Styles/common";
import { Path } from "../../Layout/header";


const Work = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('');
  const [onBoard, setOnBoard] = useState (false)
  const [selectedIdea, setSelectedIdea] = useState(null)
  const reload = useSelector(state => state.office.reload)
  const new_ideas = useSelector(state => state.office.data)
  let isInitial;
  useEffect(()=>{
    setFilter('like')
    isInitial = true;
    dispatch(Reverse({isInitial}))
    
},[])
const skip =(id) =>{
  dispatch(inWork(id))
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
        {selectedIdea?
        <ModalContainer onClick={()=>!onBoard?setSelectedIdea(null):''}>
            <div onMouseEnter={()=>{setOnBoard(true)}} onMouseLeave={()=>{setOnBoard(false)}}
              style={{marginLeft:'20vw',width:'60vw',backgroundColor:'white',borderRadius:'5px',marginTop:'50vh',transform:'translateY(-50%)', minHeight:'160px',padding:'20px'}}>
                <Light size='25'>{selectedIdea}</Light>
            </div>
        </ModalContainer>:''
        } 
        {/* header */}
        <div style={{ textAlign: "center" }}>
          <img src={Path+'Illustration/boat.png'} />
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
            Данные предложения находятся в работе
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
     
          {/* ideas card */}
          <div
            style={{
              width: "100%",
              marginTop: "40px",
              // backgroundColor: "rgba(21,43,25,0.6)",
            }}
          >
            {new_ideas && new_ideas.length ? (
              new_ideas.filter(el=>el.status==1).map((idea, ind) => {
                return (
                  <div
                    key={ind}
                    style={{
                      paddingBottom: "5px",
                    }}
                  >
                    <Ideas status='work'skip={skip} idea={idea} setSelected={setSelectedIdea} />
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
