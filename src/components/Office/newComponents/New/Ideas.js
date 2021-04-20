import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deletePropose, endPropose, inWork, likePropose } from "../../../../redux/actions/office";
import { Card } from "../../../../Styles/modules/Roadmap";
import { Bold, Light, Thin } from "../../../../Styles/typography";






const Ideas = ({idea, setSelected, status,addExecutor,skip}) => {
      
      const dispatch = useDispatch();
      const user = useSelector(state => state.auth.user)
      const likeTrue =  idea.likes.some(el => el.user === user._id)
      // const handleRequest = () => {
      //   let id = idea._id
      //   dispatch(likeIdea({id}))

      // };
      const likeButton =() =>{
        let id = idea._id
        dispatch(likePropose(id))
        
    }
    
    const deleteButton =() =>{
      let id = idea._id
      dispatch(deletePropose(id))
   
   }
   const endButton =() =>{
    let id = idea._id
    dispatch(endPropose(id))
    
 }


    return (
      <div>
        <Card
          style={{
            display: "flex",
            justifyContent:'space-between',
            alignItems: "center",
            height: "50px",
        }}
        onClick={() => setSelected(idea.title)}
      >
        <div style={{display:'flex',
            alignItems: "center"}}>
           <img
            src="/like.png"
            style={{display:`${status==='new'?'block':'none'}`,
            width: "23px", height: "30px",
            backgroundColor:`${likeTrue?'red':'white'}`,
            marginLeft: "5px",cursor:'pointer' }}
            onClick={() =>likeButton()}
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
        </div>
       
        <div style={{display:'flex',
            alignItems: "center"}}>
          
          {user.permission==='admin' && <Bold size='12' 
                    style={{display:status!=='done'?'block':'none',cursor:'pointer'}}
                    onMouseEnter={(e)=>{e.target.style.textDecoration='underline'}}
                    onMouseLeave={(e)=>{e.target.style.textDecoration='none'}}
                    color='#3F496C' 
                    onClick={()=>status==='new'?addExecutor(idea._id): 
                   skip(idea._id)}>
                {!idea.status ? 'в работу' : 'отложить'}</Bold>}
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
          {idea.user._id===user.id||user.permission==='admin' ? 
                <img alt='delite' src='/delete.png'  
                    title='удалить'
                    style={{display:user.permission==='user'?'none':'block',
                     width:'10px', height:'10px',cursor:'pointer',
                     transform:'translateX(56px)'}} 
                    onClick={()=>deleteButton()} /> 
                :''} 

            {/* {idea.user._id===user.id||user.permission==='admin' ? 
                <img alt='check' src='/check.png'  
                    style={{display:user.permission==='user'?'none':'block',height:'30px',width:'30px'}} 
                    onClick={()=>endButton()} /> 
                :'' } */}
        </div>
        </div>
      </Card>
      <div style={{display:`${idea.executor?'block':'none'}`}}> {idea.executor&&'Исполнитель: '+idea.executor.fullname}</div>
      </div>
      
      
    );
}



export default Ideas;