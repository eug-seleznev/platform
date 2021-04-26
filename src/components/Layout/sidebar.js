
import './sidebar.css'

import {SidebarContainer, SidebarLink} from '../../Styles/layout'
import {useState } from 'react';

export const Path = process.env.REACT_APP_PATH;
const Sidebar = () => {

// const user = useSelector(state => state.auth.user)
// const adminka = useRef(null)
const [sidebarInfo, setSidebarInfo] = useState ('')


    return (
      <SidebarContainer>
        <SidebarLink to="/" >
          <img alt="logo"
          onMouseEnter={()=>{setSidebarInfo('main')}}
          onMouseLeave={()=>{setSidebarInfo('')}}
          src={Path + "logo3.svg"}
      
          />
          <div className='descr'
          style={{display:`${sidebarInfo==='main'?'block':'none'}`, marginTop:'-70px'}}
          >Главная</div>
        </SidebarLink>
{/* 
        <SidebarLink to="/" className="nav-link">
          <img alt="main" src="/sidebarIcon.png" />
          <p>Главная</p>
        </SidebarLink> */}

        <SidebarLink to="/projects" >
          <img alt="project" 
          
          onMouseEnter={()=>{setSidebarInfo('project')}}
          onMouseLeave={()=>{setSidebarInfo('')}}
           src={Path + "folder.svg"}
           className='icon' />
          <div className='descr'
          style={{display:`${sidebarInfo==='project'?'block':'none'}`}}
          >Проекты</div>
        </SidebarLink>

        <SidebarLink to="/users" >
          <img alt="users"style={{width: "18px"}}
           src={Path + "users.svg"}
           onMouseEnter={()=>{setSidebarInfo('team')}}
           onMouseLeave={()=>{setSidebarInfo('')}} 
           className='icon'
           />
         <div className='descr'
         style={{display:`${sidebarInfo==='team'?'block':'none'}`}}
         >Команда</div>
        </SidebarLink>

        <SidebarLink to="/ideas/office/new" >
          <img alt="office" src={Path + "office.svg"}
            onMouseEnter={()=>{setSidebarInfo('office')}}
            onMouseLeave={()=>{setSidebarInfo('')
            }} className='icon'
            />
          <div className='descr'
          style={{display:`${sidebarInfo==='office'?'block':'none'}`}}
          >Предложения</div>
        </SidebarLink>

        <SidebarLink to="/department">
          <img alt="depart" src={Path + "sidebar.svg"}
          onMouseEnter={()=>{setSidebarInfo('department')}}
          onMouseLeave={()=>{setSidebarInfo('')
          }} className='icon'
          style={{height: "22px"}} />
          <div className='descr'
          style={{display:`${sidebarInfo==='department'?'block':'none'}`}}
          >Отделы</div>
        </SidebarLink>
{/*         
        <SidebarLink to="/idea/new" className="nav-link">
          <img alt="deps" src="/sidebarIcon.png" title="Идеи на платформу" />
          <p></p>
        </SidebarLink> */}
        <SidebarLink to="/docs">
          <img alt="deps" src={Path + "docs.svg"}
          onMouseEnter={()=>{setSidebarInfo('docs')}}
          onMouseLeave={()=>{setSidebarInfo('')}} 
          className='icon'
           />
         <div className='descr'
         style={{display:`${sidebarInfo==='docs'?'block':'none'}`}}
         >Документация</div>
        </SidebarLink>
      </SidebarContainer>
    );
}



export default Sidebar