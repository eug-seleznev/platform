
import table from '../../../../Styles/modules/components/Project/allproj.module.css'
import { NEW_TABLE, NEW_TD, NEW_TR} from "../../../../Styles/tables";
import { Bold, Thin} from "../../../../Styles/typography"
export const url = process.env.REACT_APP_IP;


const ProjTeam = ({userName,userPos,userAvatar,userId,histProp, userTask}) => {
	
	return (

     
    <div style={{display:'flex',alignItems:'center',width:'110%',marginBottom:'10px'}}>
      
          <img
              alt="Пользователь"
              style={{
                // alignContent: "center",
                marginLeft: "0px",
                width: "35px",
                height: "35px",
                marginRight:'10px'
              }}
              className={table.image}
              src={url + "/" + userAvatar}
            />
       
          
             
            <Thin
              style={{
                // paddingLeft:'20xp',
                alignItems:'start',
                
                minWidth:'180px',
                
           
              }}
            >
              {userName}
            </Thin>
          <Thin style={{
            
                
                minWidth:'190px',
                
           
              }}>
          {userPos}
          </Thin>
          <Thin style={{
            
                
            maxWidth:'50px',
            
       
          }}>
          {userTask}
          </Thin>
      </div>
  );
}
export default ProjTeam