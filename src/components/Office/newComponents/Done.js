















import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ideas from "./New/Ideas";
import { Reverse, ReverseDate } from "../../../redux/actions/office";
import { Path } from "../../Layout/header";


const Done = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('');
  const [selectedIdea, setSelectedIdea] = useState(null)
  const reload = useSelector(state => state.office.reload)
  const new_ideas = useSelector(state => state.office.data)
  let isInitial;
  useEffect(()=>{
    setFilter('like')
    isInitial = true;
    dispatch(Reverse({isInitial}))
    
},[])
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
            Готово
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
              new_ideas.filter(el=>el.status==2).map((idea, ind) => {
                return (
                  <div
                    key={ind}
                    style={{
                      paddingBottom: "5px",
                    }}
                  >
                    <Ideas status='done' idea={idea} setSelected={setSelectedIdea} />
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

export default Done

