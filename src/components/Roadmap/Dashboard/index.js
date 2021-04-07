import { useDispatch, useSelector } from "react-redux"
import { moveIdea } from "../../../redux/actions/ideas";
import { NEW_TABLE, NEW_TD, NEW_TH, NEW_TR } from "../../../Styles/tables"










const Dashboard = () => {
    const dispatch = useDispatch();
    const ideas = useSelector(state => state.ideas.new)

    const ManageIdea = ({idea, e}) => {
        //server call
        console.log(idea, e)
        let type = e.target.value
        let id = idea._id;
        dispatch(moveIdea({id, type}))
    }   

    return (
      <div>
        <h1> scope</h1>
        <NEW_TABLE>
          <NEW_TR>
            <NEW_TH>date</NEW_TH>
            <NEW_TH>titile</NEW_TH>
            <NEW_TH>description</NEW_TH>

            <NEW_TH>likes</NEW_TH>
            <NEW_TH>user</NEW_TH>
          </NEW_TR>

          {ideas.map((idea) => {
            return (
              <NEW_TR>
                <NEW_TD
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {idea.dateOpen.split("T")[0]}
                </NEW_TD>

                <NEW_TD>{idea.title}</NEW_TD>
                <NEW_TD>{idea.description}</NEW_TD>
                <NEW_TD>{idea.likeCount}</NEW_TD>
                <NEW_TD>{idea.user.fullname}</NEW_TD>

                <NEW_TD>
                  <select onChange={(e) => ManageIdea({idea, e})}>
                    <option>Опции</option>
                    <option value={1}>Утвердить в работу </option>
                    <option value={2}>Перенести в готово </option>
                    {/* <option value="world">Удалить </option> */}
                  </select>
                </NEW_TD>
              </NEW_TR>
            );
          })}
        </NEW_TABLE>
      </div>
    );
}


export default Dashboard