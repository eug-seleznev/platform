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
             <div className={styles.tr} style={{gridTemplateColumns: `1fr 530px 530px repeat(${board.columns.length-2},250px) 1fr`}}>
                 <span>
                   <ButtonText onClick={()=>deleteCategoryHandler()}>Удалить категорию</ButtonText>
                 </span>
                 <div style={{display: "flex"}}>
                     {category.name}
                     {!main &&<div style={{transform: `rotate(${open?'90':'-90'}deg)`, marginLeft: '10px'}}>{'<'}</div>}
                 </div>
                 <span/>
                 <span/>
                 <span/>
             </div> 
          </div>
        
          <div className={styles.tr} style={{gridTemplateColumns: `1fr 530px 530px repeat(${board.columns.length-2},250px) 1fr`}}>
            <span/>
            {board.columns.map((el,i)=>{
              return(
                <KanbanSectionTd twoColumns={i===0? true : i===1? true : false} timeline={category.events.length>0? false : true} category={category} column={el} boardId={board._id} />
              )
            })}
            <span/>
          </div>
        </div>
   
    );    
}



export default KanbanSection