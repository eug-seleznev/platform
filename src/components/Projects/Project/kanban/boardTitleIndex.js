import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBoardToChosen } from "../../../../redux/actions/kanban"
import { Path } from "../../../Layout/header"
import styles from './kanban.module.css'

    const BoardTitleIndex =({el,handleRedirect})=>{
        const [chosen,setChosen] =useState(false)
        const favBoards = useSelector(state=>state.auth.user.fav_boards)
        const dispatch = useDispatch ()
        useEffect(()=>{
            favBoards.map(board=>{
            // console.log(board.board_id===el._id,board.board_id,el._id)
              if(board.board_id===el._id){
                    setChosen(true)
                }
              })
          },[])
        const chosenBoard =(id)=>{
            console.log(id)
            setChosen(!chosen)
            dispatch(addBoardToChosen(id))
        }
        return (
            <div style={{display:'flex'}}>
                <div className={styles.main__board__item} onClick={()=>handleRedirect(el.name)}>
                {el.name}
                </div>
                <img onClick={()=>{chosenBoard(el._id)}} style={{cursor:'pointer',width:'30px', height:'30px',transform:'translate(10px, 15px)', backgroundColor:`${chosen?'#FFAF30':'rgba(0,0,0,0)'}`}} src={Path+'star.png'}></img>
            </div>
        )
    }           
    export default BoardTitleIndex