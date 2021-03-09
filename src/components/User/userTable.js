import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUserToTeam } from "../../redux/actions/projects";
import style from '../../Styles/modules/components/Project/editproj.module.css'
import { Light, Regular, Thin } from "../../Styles/typography";

const UserTable = ({crypt}) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.searchResult)
    const [formData, setFormData] = useState({
      crypt: crypt,
      user: "",
      position: "",
      task: "",
    });
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})

    }

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log(formData)
        //server
        dispatch(AddUserToTeam(formData))
    }

    return (
      <form onSubmit={onSubmit}>
        <table className={style.people__table} style={{borderWidth:`${users.length == 0?'0px':'1px'}`}}>
          {users.length == 0 ? (
            <Thin style={{marginTop:'25px', marginLeft:'20px'}}>Пользователей не найдено</Thin>
          ) : (
            <>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Light size='14'>{user.fullname}</Light>
                    </td>

                    <td>
                      <input type="text" required name="position" onChange={onChange} placeholder="Должность"></input>
                    </td>
                    <td>
                      <input type="text" required name="task" onChange={onChange} placeholder="Раздел"></input>
                    </td>

                    <td>
                      <button type="submit" onClick={() => setFormData({...formData, user: user._id})}><img src='/plus.png'></img></button>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </table>
      </form>
    );
}
export default UserTable