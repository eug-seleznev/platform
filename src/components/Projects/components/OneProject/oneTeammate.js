
import table from '../../../../Styles/modules/components/Project/allproj.module.css'
import { NEW_TABLE, NEW_TD, NEW_TR} from "../../../../Styles/tables";
import { Bold} from "../../../../Styles/typography"
export const url = process.env.REACT_APP_IP;


const ProjTeam = ({userName,userPos,userAvatar,userId,histProp, lastName, userMail, userTask}) => {
	
	return (
    <NEW_TABLE>
      <NEW_TR
        className={table.tr__inproj}
        onClick={() => histProp.push(`/users/${userId}`)}
      >

        <NEW_TD style={{ display: "flex" }}>
          <Bold>{userTask}</Bold>  {userName}
        </NEW_TD>

        <NEW_TD style={{ textAlign: "center" }} className={table.turn__off}>
          {userPos}
        </NEW_TD>

      </NEW_TR>
    </NEW_TABLE>
  );
}
export default ProjTeam