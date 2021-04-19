
import './sidebar.css'

import {SidebarContainer, SidebarLink} from '../../Styles/layout'


const Sidebar = () => {

// const user = useSelector(state => state.auth.user)
// const adminka = useRef(null)



    return (
      <SidebarContainer>
        <SidebarLink to="/" className="nav-link">
          <img alt="logo" style={{width: "60px", height: "60px", marginTop: "-10px"}} className="sidebar__logo" src="/logo3.svg" />
          <p></p>
        </SidebarLink>

        <SidebarLink to="/" className="nav-link">
          <img alt="main" src="/sidebarIcon.png" />
          <p>Главная</p>
        </SidebarLink>

        <SidebarLink to="/projects" className="nav-link">
          <img alt="project" src="/sidebarIcon.png" title="Все проекты" />
          <p>Проекты</p>
        </SidebarLink>

        <SidebarLink to="/users" className="nav-link">
          <img alt="users" src="/sidebarIcon.png" title="Команда" />
          <p>Команда</p>
        </SidebarLink>

        <SidebarLink to="/office" className="nav-link">
          <img alt="office" src="/sidebarIcon.png" title="Офис" />
          <p>Офис</p>
        </SidebarLink>

        <SidebarLink to="/department" className="nav-link">
          <img alt="depart" src="/sidebarIcon.png" title="Отдел" />
          <p>Отделы</p>
        </SidebarLink>
        
        <SidebarLink to="/idea/new" className="nav-link">
          <img alt="deps" src="/sidebarIcon.png" title="Идеи на платформу" />
          <p>Идеи</p>
        </SidebarLink>
        <SidebarLink to="/docs" className="nav-link">
          <img alt="deps" src="/sidebarIcon.png" title="Документация" />
          <p>Документ ация</p>
        </SidebarLink>
      </SidebarContainer>
    );
}



export default Sidebar