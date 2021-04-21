
import table from '../../../../Styles/modules/components/Project/allproj.module.css'
import { NEW_TABLE, NEW_TD, NEW_TR} from "../../../../Styles/tables";
import { Bold} from "../../../../Styles/typography"
export const url = process.env.REACT_APP_IP;


const ProjTeam = ({userName,userPos,userAvatar,userId,histProp, userTask}) => {
	
	return (
    <NEW_TABLE
      style={{ width: "100%", textAlign: "center" }}
    >
      <NEW_TR onClick={() => histProp.push(`/users/${userId}`)}>
        <NEW_TD style={{
          // backgroundColor: "blue",
         minWidth:'100px',maxWidth:'100px',
         
          paddingRight:'20px'
        }}>{userTask}</NEW_TD>

        <NEW_TD
          style={{
            textAlign: "left",
            whiteSpace: "nowrap", 
            paddingRight:'5px'
            // backgroundColor: "green",
            // width: ""
          }}
        >
          <div
            style={{
              marginTop: "-5px",
            }}
          >
             
            <p
              style={{
                alignItems:'start',
                minWidth:'170px',
                marginTop: "-2px",
           
              }}
            >
              {userName}
            </p>
          </div>
        </NEW_TD>

        <NEW_TD style={{
          textAlign: "right", padding:'0px'
                
          // backgroundColor: "red"
        }}>
          <img
              alt="Пользователь"
              style={{
                // alignContent: "center",
                marginLeft: "0px",
                width: "35px",
                height: "35px",
               
              }}
              className={table.image}
              src={url + "/" + userAvatar}
            />
        </NEW_TD>

        <NEW_TD
          style={{
            whiteSpace: "nowrap",
            textAlign: "right",
            minWidth:'140px'
          }}
        >
          {userPos}
        </NEW_TD>
      </NEW_TR>
    </NEW_TABLE>
  );
}
export default ProjTeam