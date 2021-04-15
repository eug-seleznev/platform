import {useSelector} from 'react-redux'
import {MenuHead, StyledLink,StyledIn} from '../../Styles/layout'
import {ButtonText} from '../../Styles/buttons'
import {CSSTransition} from 'react-transition-group'
import styles from '../../Styles/modules/components/headerMenu.module.css'
import DepartmentForm from '../Department/depForm'
import { useState } from 'react'



const Menu = ({addPodsos, closeAll, state, createProj, createTicket,createNews, user}) => {

const [depForm, setDepForm] = useState(false)
const exit = () => {
  
    localStorage.removeItem('token')
    window.location.reload();
}
const plusMenuClick = (callback) => {
    closeAll()
    callback()
}

    return (
        <>
        <CSSTransition
        in={state.menu}
        timeout={300}
        classNames={{
            enter:          styles.transitionsEnter,
            enterActive:    styles.transitionsEnterActive,
            exit:           styles.transitionsExit,
            exitActive:     styles.transitionsExitActive,
        }}
        unmountOnExit
        >
        <MenuHead right='110px' onMouseLeave={closeAll}>
            

                    <div className='my__name'>
                         
                   </div>

                    <StyledIn onClick={()=>plusMenuClick(createTicket)} className='menu__nav' to='/help'>
                        Проблемы с компом
                    </StyledIn>
                    <StyledLink to='../../../mytasks' className='menu__nav' >
                        Мои задачи
                    </StyledLink>
                    {user.permission!=='user' && <StyledIn onClick={()=>plusMenuClick(createNews)} className='menu__nav' to='/admin/news'>
                        Добавить новость
                    </StyledIn>}

                    {user.permission!=='user' &&  <StyledLink className='menu__nav' to='/admin/newproject'>

                        Создать проект
                    </StyledLink>}

                    {user.permission!=='user' && <StyledIn onClick={()=>plusMenuClick(()=>setDepForm(true))}>
                        Создать отдел
                    </StyledIn>}
                    {user.permission!=='user' && <StyledIn onClick={()=>plusMenuClick(addPodsos)}>
                        Добавить субподрядчика
                    </StyledIn>}
            
        </MenuHead>

        </CSSTransition>



        <CSSTransition
            in={state.menuProfile}
            timeout={300}
            classNames={{
                enter:   styles.transitionsEnter,
                enterActive:   styles.transitionsEnterActive,
                exit:  styles.transitionsExit,
                exitActive:   styles.transitionsExitActive,
            }}
            unmountOnExit
            >
            <MenuHead right='30px' onMouseLeave={closeAll}>
        
                   
                    <div className='my__name'>
                        {user.name}
                   </div>
                   
                    {/* <StyledLink to='/users/me' onClick={closeAll}>
                        Мой профиль
                    </StyledLink> */}

                    <StyledLink to='/myprojects' onClick={closeAll}>
                        Мои проекты
                    </StyledLink>

                    <StyledLink to='/department' onClick={closeAll}>
                        Отдел
                    </StyledLink>

                    <StyledLink style={{display:`${user.permission==='user'?'none':'block'}`}} to='/news' onClick={closeAll}>
                        Новости
                    </StyledLink>

                    {user.permission==='admin'?(
                    <StyledLink to='/tickets' onClick={closeAll}>
                        Панель сисадмина
                    </StyledLink>):<></>}
                    

                    <ButtonText fontSize='16px' onClick={()=>exit()}
                    >Выйти</ButtonText>
            
            </MenuHead>

        </CSSTransition>

        {depForm && <DepartmentForm closeForm={()=>setDepForm(false)}/>}
        </>
    )
}



export default Menu