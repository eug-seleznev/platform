import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeCardField } from "../../../../../../../redux/actions/kanban"
import { Regular } from "../../../../../../../Styles/typography"
import { Path } from "../../../../../../Layout/header"
import { useClickOutside } from "../../../hooks/hooks";
import settings from './settings.module.css'

const Deadline = ({open, setOpen,emergency,id}) =>{
    const [button,setButton]=useState(false)
    const dispatch =useDispatch()
    const [curentDate,setCurrentDate]=useState(null)
    const takeCurrentDate =()=>{
            let val = new Date(curentDate);
            let field = "deadline";
            dispatch(changeCardField(val, field, id));
    }
    const outclick = useClickOutside(()=>open==='deadline'&&curentDate&takeCurrentDate())
    const changeDate =(e)=>{
        e.preventDefault()
        console.log('hi')
        setCurrentDate(e.target.value)
        if(e.key==='Enter'&&curentDate) {
            takeCurrentDate()
            setOpen('')
        }
    }
    return(
        <div style={{zIndex:1}}>
            <div className={settings.description} style={{display:button?'block':'none'}}>
                <Regular size='14' color='white'>{emergency==='Событие'?'Дата события':'Дедлайн'}</Regular>
            </div>
           <div className={settings.imageBackground} 
               
                onClick={()=>{setOpen(open!=='deadline'?'deadline':'')}}
                onMouseEnter={()=>{setButton(true)}}
                onMouseLeave={()=>{setButton(false)}}
                style={{
                    opacity:open==='deadline'?1:0.5, cursor:'pointer',
                    zIndex:open==='deadline'?1:-1
                }}
                >
                <img draggable='false' src={Path+'clock.png'} style={{opacity:button?1:0.5}}/>    
            </div>
            <div className={settings.calendar}style={{zIndex:open==='deadline'?-1:1}}>
                <input type='datetime-local'
                ref={outclick}
                onChange={(e)=>changeDate(e)}
                onKeyPress={(e)=>changeDate(e)}
                className={settings.calendar__input}
                onMouseEnter={()=>{setButton(true)}}
                onMouseLeave={()=>{setButton(false)}}
                onBlur={()=>{setOpen(open!=='deadline'?'deadline':'')}}
                onClick={()=>{setOpen(open!=='deadline'?'deadline':'')}}></input>    
            </div>
            
        </div>
        
    )
}
export default Deadline