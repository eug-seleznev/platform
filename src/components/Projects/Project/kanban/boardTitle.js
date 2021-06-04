import { useState } from 'react'
import ConfirmModal from './confirm'
import styles from './kanban.module.css'
import ModalMenu from './modalMenu'


const BoardColumnsTitle = ({user, board, Path, deleteColumn}) => {
  const [confirm, setConfirm] = useState({
    visible: false,
    column: ''
  })
// console.log('fck board',board)


    if(!board){
        return <div>loading board...</div>
    }

    return (
   <>
            <div className={styles.title}   style={{backgroundColor: 'white', width: 'fit-content', minWidth: '100%'}}>
                <div className={styles.tr} style={{gridTemplateColumns: `minmax(50px,1fr) 530px 530px repeat(${board.columns?.length-1},250px) minmax(50px,1fr)`, minWidth:'100%'}}>
                  <span/>

                    {board && board.columns && board?.columns?.map((el,i)=>{
                      const menuButtons = [
                        {
                          title: 'Удалить колонку',
                          handler: () => setConfirm({visible: true, column: el}),
                          icon: 'trash-sharp.png'
                        }
                      ]
                      return(
                        <div className={styles.titleTd}>
                          <div style={{width: '90%', overflow: 'hidden'}}>{el}</div>
                          {i>1 && user.permission!=='user' &&
                          <ModalMenu buttons={menuButtons}>
                            <img alt='delite'  src={Path+'three-dots.png'} style={{ marginLeft: '10px',marginRight: '10px',}} />
                          </ModalMenu> } 
                        </div>
                      )
                    })}

                    <div className={styles.titleTd} style={{width: '250px'}}>
                      <div style={{width: '90%', overflow: 'hidden'}}>Просрочено</div>
                    </div>
                    <span/>
                    </div>
              </div>

              <ConfirmModal  visible={confirm.visible} confirm={()=>deleteColumn(confirm.column)} close={()=>setConfirm(false)} text={'колонку '+confirm.column} />
       </>  
    );    
}



export default BoardColumnsTitle