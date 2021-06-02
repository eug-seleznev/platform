import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



import styles from './kanban.module.css'
import { Bold, } from "../../../../Styles/typography";
import KanbanSection from "./section";
import Backlog from "./backlog";
import {  loadBoard,deleteColumn } from "../../../../redux/actions/kanban";
import CreateForm from "./createForm";

import { Path } from "../../../Layout/header";
import BoardSettings from './boardSettings'
import BoardColumnsTitle from "./boardTitle";
import { ButtonTextLight } from "../../../../Styles/buttons";



const Board = ({match, history}) => {
  const dispatch =useDispatch ()
  const project = useSelector(state=>state.projects.project)
  const user = useSelector(state => state.auth.user)
  const board = useSelector(state=>state.projects.kanban)
  const backlog = useSelector(state=>state.projects.backlog)

  const boardDiv = useRef(null)
  const boardDivChild = useRef(null)
  const boardTitle = useRef(null)

  const [createOpen, setCreateOpen] =useState ({
    status:false,
    place:'backlog'
})
    const [sideOpen, setSideOpen] = useState(true)
    const [createColumn, setCreateColumn] = useState(false)
    const [createCategory, setCreateCategory] = useState(false)
    
    const [clientXY, setClientXY] = useState({
      x:0,
      y:0
    })
    const [moving, setMoving] = useState(false)
    const [currentBoardXY, setCurBoardXY] = useState({
      x:0,
      y:0
    })

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

    useEffect(()=>{
        const boardId = project.boards.find(el=>el.name===match.params.board_name)._id
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',boardId)
        dispatch(loadBoard(boardId))
    },[])
    // useEffect(()=>{
    //   console.log(board)
    // },[board])


    const deleteColumnHandler = (el) => {
        dispatch(deleteColumn(board._id,el))
      }
    if(!board){
        return <div>loading board...</div>
    }

    return (
      <div className={styles.main} style={{gridTemplateColumns: sideOpen? '240px 1fr' : '35px 1fr'}}>
        <div className={styles.backLog} onClick={()=>setSideOpen(!sideOpen)}>
            <Backlog history={history} backlog={backlog} setCreateOpen={setCreateOpen} sideOpen={sideOpen} projectCrypt={project.crypt} boardId={board._id}/>
            <div className={styles.verticalText} style={{display: sideOpen? 'none' : 'block'}}>
              Все задачи
            </div>
        </div>

        <div className={styles.content}>
            <BoardSettings visible={createCategory} type='category' close={()=>setCreateCategory(false)} boardId={board._id}  />
            <BoardSettings visible={createColumn}type='column'  close={()=>setCreateColumn(false)} boardId={board._id}  />
            <div style={{display:'flex',marginLeft:'14px'}}>
              <div className={styles.backLogButton}  style={{marginBottom:'10px'}}>
                <Bold size='24'>{board.name}</Bold>
              </div>
              <div className={styles.backLogButton} onClick={()=>setCreateCategory(true)} style={{marginBottom:'10px',marginTop:'2px'}}>
                <img alt='plus' src={Path+'plus1.png'} style={{width:'12px',marginRight:'5px',marginLeft:'30px', backgroundColor:'white'}}></img>
                <ButtonTextLight color='black'style={{fontStyle:'italic'}}>Добавить категорию</ButtonTextLight>
              </div>
              <div className={styles.backLogButton} onClick={()=>setCreateColumn(true)} style={{marginBottom:'10px',marginTop:'2px'}}>
                  <img alt='plus' src={Path+'plus1.png'} style={{width:'12px',marginRight:'5px',backgroundColor:'white'}}></img>
                  <ButtonTextLight color='black'style={{fontStyle:'italic'}}>Добавить колонку</ButtonTextLight>
              </div>
            </div>
            
            
            <div ref={boardTitle} style={{width:'87vw', overflow:'hidden', scrollbarWidth: '0px', scrollbarColor: "transparent", }}>
              <BoardColumnsTitle Path={Path} board={board} user={user} deleteColumn={(el)=>deleteColumnHandler(el)} />
            </div>

            <div ref={boardDiv} className={styles.board} onMouseDown={(e)=>onMoveStart(e)} onMouseMove={(e)=>onMove(e)} onMouseUp={(e)=>onMoveEnd(e)} onScroll={(e)=>titleScroll(e)}>
              <div ref={boardDivChild} style={{width: 'fit-content',minWidth:"100%" }}>
                {board && board.columns && board?.categories.map((el,i)=>{
                    return(
                        <KanbanSection history={history} key={i} main={i===0? true : false} board={board} category={el} />
                    )
                })}
                </div>
            </div>
        </div>


          {/* <BoardSettings visible={settingsOpen} close={()=>setSettingsOpen(false)} boardId={board._id}  /> */}
          <CreateForm crypt={project.crypt} visible={createOpen.status} place={createOpen.place} setCreateOpen={setCreateOpen} boardId={board._id}></CreateForm>
       
        
      </div>
    );    
}



export default Board