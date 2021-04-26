import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeIdea } from "../../../redux/actions/ideas";
import { Card } from "../../../Styles/modules/Roadmap";
import { Bold, Light } from "../../../Styles/typography";
import { Path } from "../../Layout/header";






const Ideas = ({idea, setSelected,ideaDelete,inWork, status,skip,end}) => {
      const dispatch = useDispatch();
      const user = useSelector(state => state.auth.user)
      const likeTrue =  idea.likes.some(el => el === user._id)
      const handleRequest = () => {
        let id = idea._id
        dispatch(likeIdea({id}))
      };
    return (
      <Card
        style={{
          display: "flex",
          justifyContent:'space-between',
          alignItems: "center",
          height: "50px",
        }}
        
      >
        <div style={{display:'flex',
            alignItems: "center"}}>
        <img
          src={Path + "like.png"}
          style={{backgroundColor:`${likeTrue?'red':'white'}`,
           display:status==='new'?'block':'none',
           width: "23px", height: "30px", marginLeft: "5px",cursor:'pointer' }}
          onClick={() => handleRequest(idea.title)}
        />

        <Light
          style={{
            marginLeft: "15px",
            marginTop: "-3px",
            cursor:'pointer'
          }}
          size="22"
          onClick={() => setSelected(idea.description)}
        >
          {idea.title}
        </Light>
        </div>
        <div style={{display:'flex',
            alignItems: "center"}}>
              <div style={{marginRight:"15px"}}>
                {user.permission==='admin' && <Bold size='12' 
                        style={{display:status==='work'?'block':'none',cursor:'pointer'}}
                        onMouseEnter={(e)=>{e.target.style.textDecoration='underline'}}
                        onMouseLeave={(e)=>{e.target.style.textDecoration='none'}}
                        color='#3F496C' 
                        onClick={()=>end(idea._id)}>
                    завершить</Bold>}
                {user.permission==='admin' && <Bold size='12' 
                      style={{display:status!=='done'?'block':'none',cursor:'pointer'}}
                      onMouseEnter={(e)=>{e.target.style.textDecoration='underline'}}
                      onMouseLeave={(e)=>{e.target.style.textDecoration='none'}}
                      color='#3F496C' 
                      onClick={()=>status==='new'?inWork(idea._id): 
                    skip(idea._id)}>
                  {status==='new' ? 'в работу' : 'отложить'}</Bold>}
              </div>
             
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
                <img alt='delite'src={Path + "delete.png"} 
                    title='удалить'
                    style={{display:user.permission==='user'?'none':'block',
                     width:'10px', height:'10px',cursor:'pointer',
                     transform:'translateX(56px)'}} 
                      onClick={()=>ideaDelete(idea._id)} /> 
                :''} 
          </div>
          
        </div>
      </Card>
      
    );
}



export default Ideas;