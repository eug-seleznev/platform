import styles from './kanban.module.css'
import { Path } from "../../../Layout/header";
import { updateTimeline } from '../../../../redux/actions/kanban';



const BoardColumnsTitle = ({user, board, Path, deleteColumn}) => {
console.log('fck board',board)
    if(!board){
        return <div>loading board...</div>
    }

    return (
   
            <div className={styles.title}   style={{backgroundColor: 'white', width: 'fit-content', minWidth: '100%'}}>
                <div className={styles.tr} style={{gridTemplateColumns: `minmax(50px,1fr) 530px 530px repeat(${board.columns.length-2},250px) minmax(50px,1fr)`, minWidth:'100%'}}>
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
                              onClick={()=>deleteColumn(el)} /> 
                        </div>
                      )
                    })}
                    <span/>
                    </div>
              </div>
         
    );    
}



export default BoardColumnsTitle