import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



import styles from './kanban.module.css'
import { Bold, Light, } from "../../../../Styles/typography";
import KanbanSection from "./section";
import Backlog from "./backlog/index";
import {  loadBoard,deleteColumn, clearBoard, addBoardToChosen, renameBoard, deleteBoard } from "../../../../redux/actions/kanban";

import { Path } from "../../../Layout/header";
import BoardSettings from './boardSettings'
import BoardColumnsTitle from "./boardTitle";

import ModalMenu from "./modalMenu";
import ConfirmModal from "./confirm";
import { changeThemeField } from "../../../../redux/actions/auth";
import { background } from "../../../../redux/actions/user";
import ExternalCategoryModal from "./externalCategoryModal";
import ExternalCategory from "./externalCategory";







const Board = ({match, history}) => {
  const dispatch = useDispatch ()
  const project = useSelector(state=>state.projects.project)
  const user = useSelector(state => state.auth.user)
  const board = useSelector(state=>state.projects.kanban)
  const backlog = useSelector(state=>state.projects.backlog)
  const favBoards = useSelector(state=>state.auth.user.fav_boards)
  const boardDiv = useRef(null)
  const boardDivChild = useRef(null)
  const boardTitle = useRef(null)

  const columnsGrid = `80px 530px 530px repeat(${board?.columns?.length-1},250px) minmax(50px,1fr)`

  const [createOpen, setCreateOpen] =useState ({
    status:false,
    place:'backlog'
})
    const [sideOpen, setSideOpen] = useState(false)

    const [createColumn, setCreateColumn] = useState(false)
    const [createCategory, setCreateCategory] = useState(false)
    const [externalCategory, setExternalCategory] = useState(false)

    const [clientXY, setClientXY] = useState({
      x:0,
      y:0
    })
    const [moving, setMoving] = useState(false)
    const [currentBoardXY, setCurBoardXY] = useState({
      x:0,
      y:0
    })
    const [edit, setEdit] = useState(false)
    const [newName, setNewName] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [chosen,setChosen] =useState(false)

    useEffect(()=>{
      if (board){
        setNewName(board.name)
        favBoards.map(el=>{
        if(el.board_id===board._id){
              setChosen(true)
          }
        })}
    },[board])

    const onMoveStart = (e) => {
      if(e.button===1){
        e.preventDefault()
        document.body.style.cursor='grab'
        setClientXY({x: e.clientX, y: e.clientY})
        setMoving(true)
        setCurBoardXY({x:boardDiv.current.scrollLeft, y:boardDiv.current.scrollTop})
        boardDivChild.current.style.pointerEvents='none'
      }
    }
    const onMove = (e) => {
      moving && boardDiv.current.scrollTo( currentBoardXY.x+clientXY.x-e.clientX,  currentBoardXY.y+clientXY.y-e.clientY)
      moving && boardTitle.current.scrollTo( currentBoardXY.x+clientXY.x-e.clientX,  0)
    }
    const onMoveEnd = (e) => {
      setMoving(false)
      setClientXY({x: e.clientX, y: e.clientY})
      boardDivChild.current.style.pointerEvents='all'
      document.body.style.cursor='auto'

    }
    const titleScroll = (e) => {
      boardTitle.current.scrollTo( boardDiv.current.scrollLeft,  0)
    }
    const changeTheme = () =>{
      dispatch (changeThemeField(!user.theme))
    }
  
    useEffect(()=>{
        const boardId = project.boards.find(el=>el.name===match.params.board_name)._id
        dispatch(loadBoard(boardId))
    },[match.params])

    const deleteColumnHandler = (el) => {
        dispatch(deleteColumn(board._id,el))
      }

      const chosenBoard =()=>{
        setChosen(!chosen)
        dispatch(addBoardToChosen(board._id))
    }

    const editName =()=>{
        dispatch(renameBoard(board._id, newName))
        setEdit(false)
        history.push(`/projects/${project.crypt}/board/${newName}`)
    }
    const deleteThisBoard = () => {
        dispatch(deleteBoard(board._id))
        history.push(`/projects/${project.crypt}/kanbans`)
    }
    const boardSettingsButtons = [
      {
        title: 'Добавить категорию',
        handler: ()=>setCreateCategory(true),
        icon: 'plus1.png'
      },
      {
        title: 'Добавить колонку',
        handler: ()=>setCreateColumn(true),
        icon: 'three-dots.png'
      },
      {
        title: 'Добавить категорию с другой доски',
        handler: ()=>setExternalCategory(true),
        icon: 'three-dots.png'
      },
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

    useEffect(()=>{
      dispatch (background(!user.theme?'rgba(0,0,0,0)':'#0D1117'))
      return () => {
        dispatch(clearBoard())
        dispatch(background('white'))
      }
    },[])

    if(!board){
        return <div>loading board...</div>
    }
    return (
      <div className={styles.main} style={{gridTemplateColumns: sideOpen? '255px 1fr' : '35px 1fr',backgroundColor:!user.theme?'rgba(0,0,0,0)':'#1C1E23'}}>
        <div className={styles.backLog}>
            <Backlog history={history} backlog={backlog} setCreateOpen={setCreateOpen} sideOpen={sideOpen} projectCrypt={project.crypt} boardId={board._id} project={project} closeBacklog={()=>setSideOpen(!sideOpen)}/>
            <div className={styles.verticalText} onClick={()=>setSideOpen(!sideOpen)} style={{display: sideOpen? 'none' : 'block',cursor: 'pointer'}}>
              Задачи
              <img src={Path+'backlogArrow.png'} style={{width: '8px', height: '16px', marginTop: '10px', marginLeft: '-7px', marginBottom: '-20px',cursor: 'pointer'}} />
            </div>
        </div>

        <div className={styles.content}>
            
            <div style={{display:'flex',alignItems: 'center',marginLeft:'14px'}}>
              
              {!edit
                  ?<Bold size='24' style={{marginBottom:'5px',color:user.theme?'white':'black'}}>{board.name}</Bold>
                  :<form onSubmit={editName}>
                      <input 
                          defaultValue={board.name}
                          onClick={e=>e.stopPropagation()}
                          onChange={(e)=>setNewName(e.target.value)}
                          />
                  </form>
                  }
              
              <ModalMenu buttons={boardSettingsButtons} theme={user.theme}>
                  <img src={Path+'three-dots.png'} style={{marginLeft: '20px',}} />
              </ModalMenu>
              <div style={{display:'flex',visibility:'hidden',alignItems: 'center',marginLeft:'14px', marginBottom:'10px'}}>
              <label className={styles.switch} style={{transform:'scale(0.7)'}} >
                <input type="checkbox" defaultChecked={user.theme} onClick={()=>changeTheme()} />
                <span className={styles.slider}></span>
              </label>
              <Light size='18' style={{marginLeft:'14px',color:user.theme?'white':'black'}} >Темная тема</Light>
              </div>
            </div>
            
            <div ref={boardTitle} style={{ width: sideOpen? '87vw' : '96vw', overflow:'hidden', scrollbarWidth: '0px', scrollbarColor: "transparent", }}>
              <BoardColumnsTitle Path={Path} boardRef={boardDivChild} board={board} user={user} deleteColumn={(el)=>deleteColumnHandler(el)} columnsGrid={columnsGrid} />
            </div>

            <div ref={boardDiv} className={styles.board} style={{ width: sideOpen? '88vw' : '97vw',backgroundColor:!user.theme?'rgba(0,0,0,0)':'#0D1117' }} onMouseDown={(e)=>onMoveStart(e)} onMouseMove={(e)=>onMove(e)} onMouseUp={(e)=>onMoveEnd(e)} onScroll={(e)=>titleScroll(e)}>
              <div ref={boardDivChild} style={{width: 'fit-content',minWidth:"100%" }}>
                {board && board.columns && board?.categories.map((el,i)=>{
                    return(
                        <KanbanSection history={history} key={i} main={i===0? true : false} board={board} category={el} columnsGrid={columnsGrid} />
                    )
                })}
                {board && board.monitor && board.monitor.map((el,i)=>{

                  return(
                    <ExternalCategory projectCrypt={project.crypt} history={history} key={i} board={board} category={el} />
                  )
                })}
                </div>
            </div>
        </div>

          {externalCategory && <ExternalCategoryModal boards={project.boards} currentBoardId={board._id} close={()=>setExternalCategory(false)}/>}
          {/* <PopUpMenu open={settingsOpen} buttons={boardSettingsButtons} close={()=>setSettingsOpen(false)}/> */}
          <ConfirmModal  visible={confirm} confirm={()=>deleteThisBoard()} close={()=>setConfirm(false)} text={'доску '+board.name} />
          <BoardSettings visible={createCategory} type='category' close={()=>setCreateCategory(false)} boardId={board._id}  />
          <BoardSettings visible={createColumn} type='column'  close={()=>setCreateColumn(false)} boardId={board._id}  />
          {/* <CreateForm crypt={project.crypt} visible={createOpen.status} place={createOpen.place} setCreateOpen={setCreateOpen} boardId={board._id}></CreateForm> */}
      </div>
    );    
}
export default Board



