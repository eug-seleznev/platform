import { useDispatch } from "react-redux";
import BoardTitleIndex from "../Projects/Project/kanban/boardTitleIndex";
import style from '../../Styles/modules/components/Project/oneproj.module.css'
import { Light, Thin } from "../../Styles/typography";
const BoardsBlock = ({boards,  history}) => { 
    const dispatch = useDispatch();
    const handleRedirect = (name, crypt) => {
      history.push(`/projects/${crypt}/board/${name}`)
    }
    const handleRedirectProj = (crypt) => {
        history.push(`/projects/${crypt}/main`)
      }
      return (
        <div className={style.sprints}>
          {boards.length === 0 ? (
            <Thin size="22">Нет избранных досок</Thin>
          ) : (
            <div className={style.sprintdescr__cont}>
              {boards
                // .filter((sprint) => !sprint.status)
                .map((board, i) => {
                  return (
                    <div className={style.chosenBoard} >
                        <Light size='16' onClick={()=>handleRedirect(board.name,board.project)}  className={style.chosenTitle}>{board.name}</Light>
                        <Light  className={style.chosenTitle}onClick={()=>handleRedirectProj(board.project)} color='#878787' size='14'>{'Проект: '+ board.project_title}</Light>
                    </div>
                  );
                })}
            </div>
          )}
          <br />
          <br />
        </div>
      );
  }
  
  
  
  export default BoardsBlock
  