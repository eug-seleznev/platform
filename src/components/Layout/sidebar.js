import { useSelector } from 'react-redux'
import './sidebar.css'
import { useRef } from "react";
import {SidebarContainer, SidebarLink} from '../../Styles/layout'


const Sidebar = () => {

// const user = useSelector(state => state.auth.user)
// const adminka = useRef(null)



    return (
         <SidebarContainer>

            <SidebarLink to='/' className="nav-link" >
                    <img alt='logo' className='sidebar__logo' src='/sidebarIcon.png' />
                    <p></p>
            </SidebarLink>


            <SidebarLink to='/' className="nav-link" >
                    <img alt='main' src='/sidebarIcon.png'  />
                    <p>Главная</p>
            </SidebarLink>
        

            
        
            <SidebarLink to='/projects' className="nav-link" >
                    <img alt='project' src='/sidebarIcon.png' title="Все проекты" />
                    <p>Проекты</p>
            </SidebarLink>
       

            <SidebarLink to='/users' className="nav-link" > 
                    <img  alt='users' src='/sidebarIcon.png' title="Команда"/>
                    <p>Команда</p>
            </SidebarLink>
         
            <SidebarLink to='/office' className="nav-link" > 
                    <img alt='office' src='/sidebarIcon.png' title="Офис"/>
                    <p>Офис</p>
            </SidebarLink>

            <SidebarLink to='/department' className="nav-link" > 
                    <img alt='depart' src='/sidebarIcon.png' title="Отдел"/>
                    <p>Отдел</p>
            </SidebarLink>
            <SidebarLink to='/contractors' className="nav-link" > 
                    <img alt='contactors' src='/sidebarIcon.png' title="Субподрядчики"/>
                    <p>Субподряд
                            чики</p>
            </SidebarLink>
            <SidebarLink to='/departments' className="nav-link" > 
                    <img alt='deps' src='/sidebarIcon.png' title="Все отделы"/>
                    <p>Все отделы</p>
            </SidebarLink>
           
           

         </SidebarContainer>
         )
}



export default Sidebar