

import {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cursorStatus, tasksStatus } from '../../redux/actions/user'
import {Header, ItemHead} from '../../Styles/layout'
import {Bold} from '../../Styles/typography'
import { url } from '../utils/axios'
import Menu from './Menu'
import MenuMobile from './menuMobile'

export const Path = process.env.REACT_APP_PATH;

const HeaderL = ({addPodsos, createProj, createNews, createTicket, tasks}) => {
    const dispatch = useDispatch()
    const loaded = useSelector(state => state.auth.loaded)
    const user = useSelector(state => state.auth.user)
    const [open, setOpen] = useState({
        menu: false,
        menuProfile: false,
        mobile: false
    })


    const mobClick = () => { 
        setOpen({...open, mobile: !open.mobile})
        // console.log(open)
    }

   
    const allFalse= () => {
        setOpen({...open, mobile: false, menu:false, menuProfile: false})
    }
  
    return (
      <>
        {!loaded ? (
          <div>loading...</div>
        ) : (
          <div>
              
            <Header>
              
              <ItemHead className="mobile__menu" onClick={() => mobClick()}>
                <Bold size="14" color="white">
                  меню
                </Bold>
                <img alt="arrow" className="arrow" src={Path + "headerArrow.png"}/>
              </ItemHead>
              <ItemHead>
              
                <div
                onClick={()=>{dispatch(tasksStatus(!tasks))}}
                onMouseEnter={()=>{dispatch(cursorStatus(true))}}
                onMouseLeave={()=>{dispatch(cursorStatus(false))}}
                style={{textDecoration:'none',display:`${tasks===null?'none':'flex'}`}}
              >
                
                <img alt="tasks" draggable="false" style={{width:'15px',height:'30px'}}
                className="invert" src={Path + "lightn.png"}
                 />
                
                <div style={{
                      opacity:`${!tasks?1:0}`,
                      fontSize:'10px',
                      color:'white',
                      transform:'translate(-3px,15px)',
                      width:'15px',height:'15px',
                      borderRadius:'100%',
                      backgroundColor:'grey',
                      textAlign:'center'}}>{user.tasks&&user.tasks.filter(task=>!task.taskStatus).length}
                </div>
                
              </div>
              </ItemHead>
              <ItemHead
                onClick={() =>
                  setOpen({ ...open, menuProfile: false, menu: !open.menu })
                }
              >
                <img alt="plus" draggable="false" className="invert" src={Path + "headerPlus.png"}/>
                <img alt="arrow" draggable="false" className="arrow" src={Path + "headerArrow.png"}/>
              </ItemHead>

              <ItemHead
                onClick={() =>
                  setOpen({
                    ...open,
                    menu: false,
                    menuProfile: !open.menuProfile,
                  })
                }
              >
                <div className="avatar">
                  <img
                  draggable="false"
                    alt="avatar"
                    height="100%"
                    src={`${url}/${
                      user !== null
                        ? user != undefined
                          ? user.avatar
                          : ""
                        : ""
                    }`}
                  />
                </div>
                <img draggable="false" alt="arrow" className="arrow" src={Path + "headerArrow.png"} />
              </ItemHead>
            </Header>
          </div>
        )}
        <Menu
          addPodsos={addPodsos}
          createTicket={createTicket}
          createNews={createNews}
          createProj={createProj}
          closeAll={() => allFalse()}
          state={open}
          user={user}
        />
        <MenuMobile open={open.mobile} closeAll={() => allFalse()} />
      </>
    );
}


export default HeaderL