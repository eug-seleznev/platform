import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserToEvent } from "../../../../../../../redux/actions/kanban";
import { Light, Regular } from "../../../../../../../Styles/typography";
import { Path } from "../../../../../../Layout/header"
import { url } from "../../../../../../utils/axios";
import { useClickOutside } from "../../../modalMenu";

import settings from './settings.module.css'

const AddUsers = ({users,projTeam, info,eventUsers,open,setOpen,theme}) =>{
    const [button,setButton]=useState(false)
    const outclick = useClickOutside(()=>open==='users'&&setOpen(''))
    const dispatch = useDispatch()
    const takeUser = (id) => {
        dispatch(addUserToEvent(info._id, id));
        setOpen('')
    };
    return(
        <div style={{zIndex:1}}>
            <div className={settings.description} style={{display:button?'block':'none'}}>
                <Regular size='14' color='white'>Добавить пользователя</Regular>
            </div>
            <div 
                className={settings.imageBackground} 
               
                style={{opacity:open==='users'?1:0.5, cursor:'pointer'}}
                onClick={()=>{ setOpen(open!=='users'?'users':'')}}
                onMouseEnter={()=>{setButton(true)}}
                onMouseLeave={()=>{setButton(false)}}
            >
                <img draggable='false' src={Path+'user-add.png'}style={{opacity:button?1:0.5}} />
            </div>
            <div    className={settings.users__dropdown} 
                    ref={outclick}
                    style={{
                        width: '185px',
                        height: '78px',
                        visibility:open==='users'?'visible':'hidden',
                        backgroundColor: !theme ? "white" : "#1E1E1E",
                        border:theme ?'1px solid grey':'none'
                    }}>
                    {users.map((user, i) => {
                if (
                    projTeam?.includes(user._id) &&
                    !eventUsers.includes(user._id)
                ) {
                    return (
                        <div className={settings.users__name} >
                            <img src={url+'/'+user.avatar} className={settings.users__avatar}/>
                            <Light
                                color={theme ? "white" : "black"}
                                onClick={() => takeUser(user._id)}
                                style={{ cursor: "pointer" }}
                                key={i}
                            >
                                {user.fullname}
                            </Light> 
                        </div>
                   
                    );
                }
                })}
            </div>
        </div>
        
    )
}
export default AddUsers