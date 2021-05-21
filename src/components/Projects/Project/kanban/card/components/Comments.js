import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addComment } from "../../../../../../redux/actions/kanban"
import { ButtonTextLight } from "../../../../../../Styles/buttons"
import { Bold, Light } from "../../../../../../Styles/typography"
import { url } from "../../../../../utils/axios"
import style from './cardOpen.module.css'
import getDateWithTime from "./getDateWithTime"


const Comments =({id})=>{
    const [comment,setComment] =useState('')
    const comments = useSelector(state=>state.projects.comments)
    const dispatch = useDispatch()
    const createComment = (e) =>{
        e.preventDefault()
        dispatch(addComment(comment,id))
        setComment('')
    }
    return (
        <div>
           <div className={style.comments__array}>
            {comments&&comments.map((comm,i)=>{
                console.log(comm.author)
                return(
                    <div key={i} className={style.comments__one} >
                        <img src={url+'/'+comm.author.avatar} style={{width:'20px',borderRadius:'100%'}}></img>
                        <Bold size='14' color='#878787'className={style.comments__date}>{comm.author.name} {comm.author.lastname&&comm.author.lastname.charAt(0)}.</Bold>
                        <Light size='14' color='#878787'className={style.comments__date}>{getDateWithTime(comm.date)}</Light>
                        <Light size='14' color='#878787'className={style.comments__text}>{comm.text}</Light>
                    </div>
                )
            }).reverse()}
            </div> 
            
                 <form className={style.comments__button__area} onSubmit={createComment}>
                    <textarea 
                        className={style.comments__area} value={comment} 
                        onKeyPress={(e)=>e.key==='Enter'?createComment(e):''}
                        onChange={(e)=>{setComment(e.target.value)}}
                        placeholder='Добавить комментарий, @упомянуть человека'
                    >
                    </textarea>
                    <ButtonTextLight style={{transform:'translateX(-30px)'}} type='submit'>Добавить комментарий</ButtonTextLight>
                 </form>
        </div>
        
    )
}
export default Comments