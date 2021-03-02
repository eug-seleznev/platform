import { useSelector } from 'react-redux'
import './sidebar.css'
import { useRef } from "react";
import {SidebarContainer, SidebarLink} from '../../Styles/layout'


const Sidebar = () => {

const user = useSelector(state => state.auth.user)
const adminka = useRef(null)



    return (
         <SidebarContainer>

            <SidebarLink to='/' className="nav-link" >
                    <img className='sidebar__logo' src='sidebarIcon.png' title="Главная" />
                    <p></p>
            </SidebarLink>


            <SidebarLink to='/' className="nav-link" >
                    <img src='sidebarIcon.png' title="Главная" />
                    <p>Главная</p>
            </SidebarLink>
        

            
        
            <SidebarLink to='/projects' className="nav-link" >
                    <img src='/sidebarIcon.png' title="Все проекты" />
                    <p>Проекты</p>
            </SidebarLink>
       

            <SidebarLink to='/users' className="nav-link" > 
                    <img src='/sidebarIcon.png' title="Команда"/>
                    <p>Команда</p>
            </SidebarLink>
         
            <SidebarLink to='/office' className="nav-link" > 
                    <img src='/sidebarIcon.png' title="Офис"/>
                    <p>Офис</p>
            </SidebarLink>

            <SidebarLink to='/department' className="nav-link" > 
                    <img src='/sidebarIcon.png' title="Отдел"/>
                    <p>Отдел</p>
            </SidebarLink>
            <SidebarLink to='/contractors' className="nav-link" > 
                    <img src='/sidebarIcon.png' title="Субподрядчики"/>
                    <p>Субподряд
                            чики</p>
            </SidebarLink>
            <SidebarLink to='/departments' className="nav-link" > 
                    <img src='/sidebarIcon.png' title="Все отделы"/>
                    <p>Все отделы</p>
            </SidebarLink>
           
           

         </SidebarContainer>
         )
}



export default Sidebar