
import table from '../../../../Styles/modules/components/Project/allproj.module.css'
import { NEW_TABLE, NEW_TD, NEW_TR} from "../../../../Styles/tables";
import { Bold} from "../../../../Styles/typography"
export const url = process.env.REACT_APP_IP;


const ProjTeam = ({userName,userPos,userAvatar,userId,histProp, userTask}) => {
	
	return (
    <NEW_TABLE style={{width: "100%"}}>
      <NEW_TR onClick={() => histProp.push(`/users/${userId}`)}>
        <NEW_TD>{userTask}</NEW_TD>
        <NEW_TD>
          {userName}
          <img
            alt="нет"
            style={{marginLeft: "5px", width: "35px", height: "35px" }}
            className={table.image}
            src={url + "/" + userAvatar}
          />
        </NEW_TD>

        <NEW_TD >{userPos}</NEW_TD>
      </NEW_TR>
    </NEW_TABLE>
  );
}
export default ProjTeam