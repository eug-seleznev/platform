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
    const [hideUser,setHideUser] =useState([])
    const [position,setPosition] =useState('')
    const [task,setTask] =useState('')
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
        if(e.target.name==='position') {
          setPosition(e.target.value)
        }
        if(e.target.name==='task') {
          setTask(e.target.value)
        }
        console.log(id)
        setFormData({...formData,
           user: id,
             [e.target.name]: e.target.value
          })
    }

    const onSubmit = (e, id) => {
      setHideUser(hideUser => [...hideUser, id])
      // e.preventDefault()
      setPosition('')
  setTask('')
  if(formData.user==="") {
    return new Promise((resolve)=>{
     setFormData({...formData, user: id })
     resolve()
   })
  
  }
  else {
    setHideUser(hideUser => [...hideUser, formData.user])
    return dispatch(AddUserToTeam(formData))
  }
 
       
    }
	useEffect(()=>{
		if(user) {
      dispatch(AddUserToTeam(formData))
      setFormData({...formData, user: '' })
      setUser(false)
    }
    
	},[user])
  useEffect(()=>{
    setHideUser([])
  },[users])
    return (
   
        <table className={style.people__table} style={{borderWidth:`${users.length === 0?'0px':'1px'}`}}>
          {users.length === 0 ? (
            <Thin style={{marginTop:'25px', marginLeft:'20px'}}>Пользователей не найдено</Thin>
          ) : (
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index} style={{display:hideUser.includes(user._id)?'none':''}}>
                    <td>
                      <Light size='14'>{user.fullname}</Light>
                    </td>

                    <td>
                      <input type="text" name="position" value={user._id===formData.user?position:''}onKeyDown={(e)=>e.key==='Enter'&&onSubmit(e, user._id)} onChange={(e)=>onChange(e, user._id)} placeholder="Должность"></input>
                    </td>
                    <td>
                      <input type="text" name="task" value={user._id===formData.user?task:''} onKeyDown={(e)=>e.key==='Enter'&&onSubmit(e, user._id)} onChange={(e)=>onChange(e, user._id)} placeholder="Раздел"></input>
                    </td>

                    <td>
                      <button type="button" 
					//   onClick={() =>  setFormData({...formData, user: user._id})}
                      onClick={(e) => onSubmit(e, user._id).then( 
                        setUser(true)
                       )}
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