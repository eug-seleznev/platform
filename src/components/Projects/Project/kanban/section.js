import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './kanban.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";
import KanbanCard from "./card/card";
import KanbanSectionTd from "./sectionTd";
import { Path } from "../../../Layout/header";
import { deleteCategory, deleteColumn } from "../../../../redux/actions/kanban";
import { ButtonText } from "../../../../Styles/buttons";





const KanbanSection = ({main, board, category}) => {
  const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    // console.log('category',category)


    const deleteCategoryHandler = (el) => {
      dispatch(deleteCategory(board._id,category._id))
    }

    return (
  
        <div className={styles.category} style={{height: main? 'max-content' : open? 'max-content' : '30px'}}>
          {/* {main && } */}

          <div className={styles.title} onClick={()=>setOpen(!open)} style={{backgroundColor: main? 'white' : '#FCFCFC'}}>
             <div className={styles.tr}>
                 <span>
                   <ButtonText onClick={()=>deleteCategoryHandler()}>Удалить категорию</ButtonText>
                 </span>
                 <div>
                     {category.name}
                 </div>
                 <span/>
                 <span/>
                 <span/>
             </div> 
          </div>
          <div className={styles.tr}>
            <span/>
            {board.columns.map((el,i)=>{
              return(
                <KanbanSectionTd twoColumns={i===0? true : i===1? true : false} category={category} column={el} boardId={board._id} />
              )
            })}
            <span/>
          </div>
        </div>
   
    );    
}



export default KanbanSection