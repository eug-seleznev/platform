import { useEffect, useState } from "react"
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
import { Input } from "../../../../Styles/Forms";
import { ButtonText } from "../../../../Styles/buttons";
import { Path } from "../../../Layout/header";




const Board = ({match}) => {
  const dispatch =useDispatch ()
  const project = useSelector(state=>state.projects.project)
  const user = useSelector(state => state.auth.user)

  const board = useSelector(state=>state.projects.kanban)
//   console.log('match',match.params.board_name)
//   console.log('project',project)
//   console.log('board',board)
  const backlog = useSelector(state=>state.projects.backlog)
  const [createOpen, setCreateOpen] =useState ({
    status:false,
    place:'backlog'
})
    const [sideOpen, setSideOpen] = useState(false)
    const [category, setCategory] = useState({
        name: '',
        step: '',
        start: undefined,
        end: undefined,
    })
    const [column, setColumn] = useState('')
    
    
    useEffect(()=>{
        const boardId = project.boards.find(el=>el.name===match.params.board_name)._id
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',boardId)
        dispatch(loadBoard(boardId))
    },[])
    useEffect(()=>{
      console.log(backlog)
    },[backlog])

    const createCategory = () => {
        dispatch(addNewCategory(board._id,category))
    }
    const createColumn = () => {
        dispatch(addNewColumn(board._id,column))
    }
    const deleteColumnHandler = (el) => {
        dispatch(deleteColumn(board._id,el))
      }
    if(!board){
        return <div>loading board...</div>
    }

    return (
      <div className={styles.main} style={{gridTemplateColumns: sideOpen? '386px 1fr' : 'max-content 1fr'}}>
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
            <div>
                <div>
                    Новая категория
                </div>
               <Input 
                    name='category'
                    type='text'
                    value={category.name}
                    onChange={(e)=>setCategory({...category, name: e.target.value})}
                />
                <Input 
                    name='category'
                    type='number'
                    value={category.step}
                    onChange={(e)=>setCategory({...category, step: Number(e.target.value)})}
                />
                <Input 
                    name='category'
                    type='date'
                    value={category.start}
                    onChange={(e)=>setCategory({...category, start: e.target.value})}
                />
                <Input 
                    name='category'
                    type='date'
                    value={category.end}
                    onChange={(e)=>setCategory({...category, end: e.target.value})}
                />
                <ButtonText onClick={()=>createCategory()}>Создать категорию</ButtonText> 
            </div>
            <div>
                <div>
                    Новая колонка
                </div>
               <Input 
                    name='column'
                    value={column}
                    onChange={(e)=>setColumn(e.target.value)}
                />
                <ButtonText onClick={()=>createColumn()}>Создать колонку</ButtonText> 
            </div>
            <div className={styles.title}  style={{backgroundColor: 'white'}}>
              <div className={styles.tr}>
                <span/>
                  {board && board.columns && board?.columns?.map((el,i)=>{
                    return(
                      <div className={styles.titleTd}>
                        {el}
                        <img alt='delite'  src={Path+'delete.png'}
                            title='удалить'
                            style={{display:user.permission==='user'?'none':'block',
                                width:'10px', height:'10px',cursor:'pointer', marginLeft: '10px'
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
        <div style={{display:createOpen.status?'block':'none'}}>
           <CreateForm crypt={project.crypt} visible={createOpen.status} place={createOpen.place} setCreateOpen={setCreateOpen} boardId={board._id}></CreateForm>
        </div>
       
        
      </div>
    );    
}



export default Board