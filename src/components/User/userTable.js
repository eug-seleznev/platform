import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUserToTeam } from "../../redux/actions/projects";
import style from '../../Styles/modules/components/Project/editproj.module.css'
import { Light, Thin } from "../../Styles/typography";
import { Path } from "../Layout/header";

const UserTable = ({crypt, project}) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.searchResult)
    const [user,setUser] =useState(false)
    const [formData, setFormData] = useState({
      crypt: crypt,
      user: "",
      position: "",
      task: "",
    });
    const onChange = (e, id) => {
        // setFormData({...formData, 
        //   [e.target.name]: e.target.value
        // })
        console.log(id)
        setFormData({...formData,
           user: id,
             [e.target.name]: e.target.value
          })
    }

    const onSubmit = (e, id) => {
      document.getElementById(id).style.opacity = 1
      e.preventDefault()
  console.log(id)
  
  if(formData.user==="") {
    console.log('weeeeeeee')
    let setUser = new Promise((resolve)=>{
     setFormData({...formData, user: id })
     resolve()
   })
   setUser.then( 
    console.log(formData,id),
    setUser(true)
   ) 
  }
  else {
     dispatch(AddUserToTeam(formData))
  }
 
       
    }
	useEffect(()=>{
		if(user) {
      dispatch(AddUserToTeam(formData))
    }
    setUser(false)
	},[formData])
  useEffect(()=>{
    
    
  },[users])
    return (
   
        <table className={style.people__table} style={{borderWidth:`${users.length === 0?'0px':'1px'}`}}>
          {users.length === 0 ? (
            <Thin style={{marginTop:'25px', marginLeft:'20px'}}>Пользователей не найдено</Thin>
          ) : (
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index} id={user._id}>
                    <td>
                      <Light size='14'>{user.fullname}</Light>
                    </td>

                    <td>
                      <input type="text" name="position"  onChange={(e)=>onChange(e, user._id)} placeholder="Должность"></input>
                    </td>
                    <td>
                      <input type="text" name="task" onChange={(e)=>onChange(e, user._id)} placeholder="Раздел"></input>
                    </td>

                    <td>
                      <button type="submit" 
					//   onClick={() =>  setFormData({...formData, user: user._id})}
                      onClick={(e) => onSubmit(e, user._id)}
                    ><img alt='plus' src={Path + 'plus.png'}></img></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
    
    );
}
export default UserTable