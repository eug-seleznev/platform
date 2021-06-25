import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeCard } from "../../../../../../../redux/actions/kanban";
import { Regular } from "../../../../../../../Styles/typography";
import { Path } from "../../../../../../Layout/header";
import settings from './settings.module.css'
const Like = ({theme,info}) =>{
    const dispatch = useDispatch()
    const userid = useSelector(state=>state.auth.user._id)
    const [like,setLike]=useState(false)
    const [button,setButton]=useState(false)
    useEffect(()=>{
        if(info.likeUsers.includes(userid)) {
            setLike(true)
        }
    },[])
    const pressLike =()=>{
        dispatch(likeCard(info._id))
        setLike(!like)
    }
   
    return(
        <div style={{zIndex:1}}>
            <div className={settings.description} style={{display:button?'block':'none'}}>
                <Regular size='14' color='white'>{like?'Убрать лайк':'Поставить лайк'}</Regular>
            </div>
            <div 
                className={settings.imageBackground}
                style={{opacity:like?1:0.5, cursor:'pointer'}}
                onClick={pressLike}
                onMouseEnter={()=>{setButton(true)}}
                onMouseLeave={()=>{setButton(false)}}
            >
                <img draggable='false' style={{opacity:button?1:0.5, cursor:'pointer'}} src={Path+'heart22.png'}  />
            </div>
        </div>
        
    )
}
export default Like