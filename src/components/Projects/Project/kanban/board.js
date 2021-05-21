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
import { addNewCard, addNewColumn, addNewRow } from "../../../../redux/actions/kanban";
import CreateForm from "./createForm";
import { Input } from "../../../../Styles/Forms";
import { ButtonText } from "../../../../Styles/buttons";





const Board = ({match}) => {
  const dispatch =useDispatch ()
  const project = useSelector(state=>state.projects.project)
  const board = project && project.boards.find(el=>el.name===match.params.board_name)
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
      console.log(backlog)
    },[backlog])

    const createCategory = () => {
        dispatch(addNewRow(board._id,category))
    }
    const createColumn = () => {
        dispatch(addNewColumn(board._id,column))
    }

    return (
      <div className={styles.main} style={{gridTemplateColumns: sideOpen? '386px 1fr' : 'max-content 1fr'}}>
        <div 
          className={styles.backLog} 
          onClick={()=>setSideOpen(!sideOpen)}
          >
          <Backlog backlog={backlog} setCreateOpen={setCreateOpen} sideOpen={sideOpen}/>
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
            
            {board?.categories.map((el,i)=>{
                return(
                    <KanbanSection main={i===0? true : false} board={board} category={el} />
                )
            })}
        </div>
        <div style={{display:createOpen.status?'block':'none'}}>
           <CreateForm crypt={project.crypt} setCreateOpen={setCreateOpen}></CreateForm>
        </div>
       
        
      </div>
    );    
}



export default Board