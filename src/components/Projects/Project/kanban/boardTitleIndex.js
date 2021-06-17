import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBoardToChosen, deleteBoard, renameBoard } from "../../../../redux/actions/kanban"
import { Path } from "../../../Layout/header"
import ConfirmModal from "./confirm"
import styles from './kanban.module.css'
import ModalMenu from "./modalMenu"

    const BoardTitleIndex =({el,handleRedirect})=>{
        const [chosen,setChosen] =useState(false)
        const [edit, setEdit] = useState(false)
        const [newName, setNewName] = useState(el.name)
        const [confirm, setConfirm] = useState(false)
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
        const chosenBoard =()=>{
            setChosen(!chosen)
            dispatch(addBoardToChosen(el._id))
        }

        const editName =()=>{
            dispatch(renameBoard(el._id, newName))
            setEdit(false)
        }
        const deleteThisBoard = () => {
            dispatch(deleteBoard(el._id))
        }


        const menuButtons = [
            {
                title: 'Редактировать название',
                handler: ()=>setEdit(true),
                icon: 'edit1.jpg'
            },
            {
                title: chosen?'Убрать из избранных':'Добавить в избранные',
                handler: ()=>chosenBoard(),
                icon: 'starr.png'
            },
            {
                title: 'Удалить доску',
                handler: ()=>setConfirm(true),
                icon: 'trash-sharp.png'
            },
        ]

        return (
            <div style={{display:'flex', alignItems:'center'}}>
                
                    <div className={styles.main__board__item} onClick={()=>handleRedirect(el.name)} onDoubleClick={()=>setEdit(true)}>
                    {!edit
                        ?<div>{el.name}</div>
                        :<form onSubmit={editName}>
                            <input 
                                defaultValue={el.name}
                                onClick={e=>e.stopPropagation()}
                                onChange={(e)=>setNewName(e.target.value)}
                                />
                        </form>
                        }
                        <ModalMenu buttons={menuButtons}>
                            <img src={Path+'three-dots.png'}/>
                        </ModalMenu>
                    </div>
                    
                    <ConfirmModal  visible={confirm} confirm={()=>deleteThisBoard()} close={()=>setConfirm(false)} text={'доску '+el.name} />
                    
            </div>
        )
    }           
    export default BoardTitleIndex