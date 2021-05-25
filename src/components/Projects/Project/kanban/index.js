import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from './kanban.module.css'
import { addNewBoard, addNewCard } from "../../../../redux/actions/kanban";
import { Button, ButtonText, ButtonTextLight } from "../../../../Styles/buttons";
import { Input } from "../../../../Styles/Forms";
import modelsCss from '../../../../Styles/modules/components/Project/models.module.css'
import { NEW_TABLE, NEW_TBODY, NEW_TD, NEW_TR } from "../../../../Styles/tables";
import { Bold, Light } from "../../../../Styles/typography";
import { Path } from "../../../Layout/header";




const Kanbans = ({history}) => {
  const dispatch =useDispatch ()
  const project = useSelector(state=>state.projects.project)
  
  const [title, setTitle] = useState('')

  const handleRedirect = (name) => {
    history.push(`/projects/${project.crypt}/board/${name}`)
  }
  const createBoard = () => {
    dispatch(addNewBoard(project.crypt, title))
    setTitle('')
  }

    return (
      <div className={styles.main}>
        <div>
        {/* header */}
        <div style={{ textAlign: "center" }}>
          <img style={{height:'300px'}} src={Path+'Illustration/kanban.jpg'} />
          <div className={styles.main__board}>
            <h2>Новый подход к спринтам</h2>
            <p className={styles.main__board__text}>
              Теперь задачи проекта, это канбан доски, которые поделены как по вертикали (статусы задач), так и по горизонтали (категории, разные спринты). В разделах доски можно создавать карточки, которые могут содержать как одну задачу, так и несколько. На этой странице можно создать доску или выбрать из уже существующих.
            </p>
            <div className={styles.main__board__list}>
              <div className={styles.main__board__create}>
                <Input 
                  name='name'
                  placeholder='Введите название доски'
                  style={{width:'99%',height:'29px'}}
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />
                <Button style={{marginLeft:'20px',
                  transform:'translateY(-36px)translateX(2px)',width:'100px'}}
                  onClick={()=>createBoard()}>Создать
                </Button>
              </div>
              {project && project.boards.map((el,i)=>{
                  return (
                    
                      <div key={i} className={styles.main__board__item} onClick={()=>handleRedirect(el.name)}>
                        {el.name}
                      </div>
                    
                  )
              })}
          </div>
        </div> 
        </div>
        </div>
  
        
            
   
   
      </div>
    
    );    
}



export default Kanbans