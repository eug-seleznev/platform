import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addComment } from "../../../../../../redux/actions/kanban"
import { ButtonTextLight } from "../../../../../../Styles/buttons"
import { Bold, Light } from "../../../../../../Styles/typography"
import { url } from "../../../../../utils/axios"
import style from './cardOpen.module.css'
import getDateWithTime from "./getDateWithTime"
import InputTrigger from 'react-input-trigger';
import { allUsers } from "../../../../../../redux/actions/user"

const Comments =({id})=>{
    const [comment,setComment] =useState('')
    const comments = useSelector(state=>state.projects.comments)
    const users = useSelector(state => state.users.users)
    const [dropdown, setDropdown] =useState({
        top:null,
        left:null,
        show:false,
        text:''
    })
    const dispatch = useDispatch()
    useEffect(() => {
        let sortOrder = true
        let query = 'name'
        dispatch(allUsers({query, sortOrder}))
    }, [])
    useEffect(() => {
      console.log(users)
    }, [users])
    const createComment = (e) =>{
        e.preventDefault()
        dispatch(addComment(comment,id))
        setComment('')
    }
    const handleInput =(meta)=>{
        console.log(meta.text)
        dispatch(allUsers({query, sortOrder}))
    }
    const toggle = (metaInformation)=> {
        console.log(metaInformation)
        const { hookType, cursor } = metaInformation;
        if (hookType === 'start') {
            setDropdown({
                show: true,
                left: cursor.left,
                top: cursor.top + 50
            });
        }
        else if (hookType === 'cancel') {
            setDropdown({
                show: false,
                left: cursor.left,
                top: cursor.top + 50
            });
        }
    }

    return (
        <div>
           <div className={style.comments__array} 
            style={{overflowY:comments.length>7?'scroll':'hidden'}}
           >
            {comments&&comments.map((comm,i)=>{
                return(
                    <div key={i} className={style.comments__one} >
                        <img src={url+'/'+comm.author?.avatar} style={{width:'25px',height:'25px', objectFit:'cover', borderRadius:'100%'}}></img>
                        <Bold size='14' color='#878787'className={style.comments__date}>{comm.author?.name} {comm.author?.lastname&&comm.author?.lastname?.charAt(0)}.</Bold>
                        <Light size='14' color='#878787'className={style.comments__date}>{getDateWithTime(comm.date)}</Light>
                        <Light size='14' color={comm.text.includes('Дедлайн')&&comm?.type==='history'?'#C64242':
                        comm.text.includes('> Готово')&&comm?.type==='history'?'#71D186':comm?.type==='history'?'#878787':
                        'black'}className={style.comments__text}>{comm.text}</Light>
                    </div>
                )
            }).reverse()}
            </div> 
                
                 <form className={style.comments__button__area} onSubmit={createComment}>
                    <InputTrigger
                        trigger={{
                            keyCode: 50,
                            shiftKey: true,
                        }}
                        onStart={(metaData) => toggle(metaData)}
                        onType={(metaData) => {handleInput(metaData)}}
                        onCancel={(metaData) => toggle(metaData)}
                        className={style.comments__area}
                    >
                    <textarea 
                        className={style.comments__textarea}
                        value={comment} 
                        onKeyPress={(e)=>e.key==='Enter'?createComment(e):''}
                        onChange={(e)=>{setComment(e.target.value)}}
                        placeholder='Добавить комментарий, @упомянуть человека'/>
                    </InputTrigger>
                    <div className={style.comments__dropdown}
                        style={{
                            position: "absolute",
                            width: "170px",
                            height:'55px',
                            borderRadius: "5px",
                            border:'1px solid black',
                            background: "white",
                            boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 4px",         
                            display: dropdown.show?"block":"none",
                            top: dropdown.top,
                            left: dropdown.left,
                            padding:'10px',
                            overflowY:users.length>3?'scroll':'hidden'
                        }}
                        >
                            {
                            users.map((user,i)=>{
                            return(<Bold  style={{cursor:'pointer'}} key={i}>{user.fullname}</Bold>)
                        })

                        }
                        </div>
                    <ButtonTextLight style={{transform:'translateX(-30px)'}} type='submit'>Добавить комментарий</ButtonTextLight>
                 </form> 
                
                    
        </div>
        
    )
}
export default Comments