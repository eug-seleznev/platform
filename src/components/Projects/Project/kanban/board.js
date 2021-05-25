import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './kanban.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";
import KanbanCard from "./card/card";
import KanbanSection from "./section";
import Backlog from "./backlog";
import { addNewCard, addNewCategory, addNewColumn, loadBoard,deleteColumn } from "../../../../redux/actions/kanban";
import CreateForm from "./createForm";

import { Path } from "../../../Layout/header";
import BoardSettings from './boardSettings'



const Board = ({match}) => {
  const dispatch =useDispatch ()
  const project = useSelector(state=>state.projects.project)
  const user = useSelector(state => state.auth.user)
  const board = useSelector(state=>state.projects.kanban)
  const backlog = useSelector(state=>state.projects.backlog)

  const boardDiv = useRef(null)
  const boardDivChild = useRef(null)

  const [createOpen, setCreateOpen] =useState ({
    status:false,
    place:'backlog'
})
    const [sideOpen, setSideOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)

    
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
    }
    const onMoveEnd = (e) => {
      setMoving(false)
      setClientXY({x: e.clientX, y: e.clientY})
      boardDivChild.current.style.pointerEvents='all'
      document.body.style.cursor='auto'

    }
    
    useEffect(()=>{
        const boardId = project.boards.find(el=>el.name===match.params.board_name)._id
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',boardId)
        dispatch(loadBoard(boardId))
    },[])
    useEffect(()=>{
      console.log(backlog)
    },[backlog])


    const deleteColumnHandler = (el) => {
        dispatch(deleteColumn(board._id,el))
      }
    if(!board){
        return <div>loading board...</div>
    }

    return (
      <div className={styles.main} style={{gridTemplateColumns: sideOpen? '386px 1fr' : '35px 1fr'}}>
        <div 
          className={styles.backLog} 
          onClick={()=>setSideOpen(!sideOpen)}
          >
          <Backlog backlog={backlog} setCreateOpen={setCreateOpen} sideOpen={sideOpen} projectCrypt={project.crypt} boardId={board._id}/>
            <div className={styles.verticalText}>
              Все задачи
            </div>
        </div>

        <div className={styles.content}>
            <BoardSettings visible={settingsOpen} close={()=>setSettingsOpen(false)} boardId={board._id}  />
            <div onClick={()=>setSettingsOpen(true)}>Настройки</div>

            <div ref={boardDiv} className={styles.board} onMouseDown={(e)=>onMoveStart(e)} onMouseMove={(e)=>onMove(e)} onMouseUp={(e)=>onMoveEnd(e)}>
              <div ref={boardDivChild} style={{width: 'fit-content'}}>
              <div className={styles.title}  style={{backgroundColor: 'white'}}>
                <div className={styles.tr} style={{gridTemplateColumns: `minmax(50px,1fr) 530px 530px repeat(${board.columns.length-2},250px) minmax(50px,1fr)`}}>
                  <span/>
                    {board && board.columns && board?.columns?.map((el,i)=>{
                      return(
                        <div className={styles.titleTd}>
                          <div style={{width: '90%', overflow: 'hidden'}}>{el}</div>
                          <img alt='delite'  src={Path+'trash-sharp.png'}
                              title='удалить'
                              style={{display:user.permission==='user'?'none':'block',
                                  width:'15px', height:'15px',cursor:'pointer', marginLeft: '10px'
                                  }} 
                              onClick={()=>deleteColumnHandler(el)} /> 
                        </div>
                      )
                    })}
                    <span/>
                    </div>
              </div>
                {board && board.columns && board?.categories.map((el,i)=>{
                    return(
                        <KanbanSection main={i===0? true : false} board={board} category={el} />
                    )
                })}
                </div>
            </div>
        </div>
        
           <CreateForm crypt={project.crypt} visible={createOpen.status} place={createOpen.place} setCreateOpen={setCreateOpen} boardId={board._id}></CreateForm>
       
        
      </div>
    );    
}



export default Board