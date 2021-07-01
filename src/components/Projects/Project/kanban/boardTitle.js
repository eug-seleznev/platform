import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { renameColumn } from '../../../../redux/actions/kanban'
import { useSelector } from 'react-redux'
import ConfirmModal from './confirm'
import styles from './kanban.module.css'
import ModalMenu from './modalMenu'


const BoardColumnsTitle = ({user, board, Path, deleteColumn, boardRef}) => {

  console.log(boardRef)
  const theme = useSelector(state => state.auth.user.theme)
  const [boardWidth, setBoardWidth] = useState('fit-content')
    const [confirm, setConfirm] = useState({
    visible: false,
    column: ''
  })

  useEffect(()=>{
    console.log('boardRef',boardRef)
    boardRef!==null && setBoardWidth(boardRef.current.offsetWidth)

  },[boardRef])

    if(!board){
        return <div>loading board...</div>
    }

    return (
          <>
            <div className={styles.title} style={{backgroundColor: !theme?'rgba(0,0,0,0)':'#292929', width: boardWidth, minWidth: '100%'}}>
                <div className={styles.tr} style={{gridTemplateColumns: `minmax(50px,1fr) 530px 530px repeat(${board.columns?.length-1},250px) minmax(50px,1fr)`, minWidth:'100%'}}>
                  <span/>
                    {board && board.columns && board?.columns?.map((el,i)=>{
                      
                      return(
                        <ColumnTitle key={'boardTitle'+el} boardId={board._id} el={el} index={i} Path={Path} setConfirm={setConfirm} editable={i>1 && user.permission!=='user'} theme={theme}/>
                      )
                    })}
                    <div className={styles.titleTd} style={{width: '250px'}}>
                      <div style={{width: '90%', overflow: 'hidden',color:theme?'white':'black'}}>Просрочено</div>
                    </div>
                  <span/>
                </div>
              </div>

              <ConfirmModal  visible={confirm.visible} confirm={()=>deleteColumn(confirm.column)} close={()=>setConfirm(false)} text={'колонку '+confirm.column} />
       </>  
    );    
}



export default BoardColumnsTitle


const ColumnTitle = ({el, Path, setConfirm, editable, boardId, index, theme}) => {
  const dispatch = useDispatch()
  const [edit, setEdit] = useState()
  const [newName, setNewName] = useState()


  const editName = (el) => {
    setEdit(true)
    setNewName(el)
  }
  const submit = (e) => {
    e.preventDefault()
    dispatch(renameColumn(boardId,newName, index))
    setEdit(false)
  }

  const menuButtons = [
    {
      title: 'Редактировать название',
      handler: () => editName(el),
      icon: 'trash-sharp.png'
    },
    {
      title: 'Удалить колонку',
      handler: () => setConfirm({visible: true, column: el}),
      icon: 'trash-sharp.png'
    }
  ]

  return(
   
    <div className={styles.titleTd}>
      {!edit
          ?<div onDoubleClick={()=>setEdit(true)} style={{width: '90%', overflow: 'hidden', color:theme?'white':'black'}}>{el}</div>
          :<form onSubmit={submit}>
              <input 
                  defaultValue={el}
                  onClick={e=>e.stopPropagation()}
                  onChange={(e)=>setNewName(e.target.value)}
                  />
            </form>
      }
      {editable && 
      <ModalMenu buttons={menuButtons}>
        <img alt='delite'  src={Path+'three-dots.png'} style={{ marginLeft: '10px',marginRight: '10px',}} />
      </ModalMenu> 
      } 
    </div>
      
  )
}