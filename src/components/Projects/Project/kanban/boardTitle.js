import styles from './kanban.module.css'
import { Path } from "../../../Layout/header";



const BoardColumnsTitle = ({user, board, Path, deleteColumn}) => {

    if(!board){
        return <div>loading board...</div>
    }

    return (
   
            <div className={styles.title}   style={{backgroundColor: 'white', width: 'fit-content'}}>
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