
import { useEffect, useState } from 'react'
import ModalWindow from '../Projects/components/ModalWindow'
import Header from './header'
import Sidebar from './sidebar'
import {useSelector} from 'react-redux'
import { BackendMsg }  from '../../Styles/layout'

const Layout = ({dimensions, histCurrent}) => {
    const errorAuth = useSelector(state => state.auth.error)
    const msgAuth = useSelector(state => state.auth.error)
    const errorNews = useSelector(state => state.news.error)
    const errorProject = useSelector(state => state.projects.error)
    const errorTickets = useSelector(state => state.tickets.error)
    const msgUser = useSelector(state => state.users.msg)
    const state = useSelector(state => state)
    const [error, setError] = useState ('')
    const [msg, setMsg] = useState (false)
    const [currentElem, setCurrentElem] = useState (false)
    const [currentTitle, setCurrentTitle] = useState (false)
    const [status, setStatus] = useState (false)
    useEffect(()=>{
        if(errorAuth !=""){
            setError(errorAuth)
        }
        
    },[errorAuth])
    useEffect(()=>{
        if(msgAuth !=""){
            setError(msgAuth)
        }
    },[msgAuth])
    useEffect(()=>{
        if(errorNews !=""){
            setError(errorNews)
        }
    },[errorNews])
    useEffect(()=>{
        if(errorProject !=""){
            setError(errorProject)
        }
    },[errorProject])
    useEffect(()=>{
        if(errorTickets !=""){
            setError(errorTickets)
        }
    },[errorTickets])
    useEffect(()=>{
        if(msgUser !=""){
            setError(msgUser)
        }
    },[msgUser])
    useEffect(()=>{
        if(error!=''){
             setMsg(true)
                setTimeout(()=>{
                    setMsg(false)
                },5500)
        }
     
    },[error])
    const createProj =()=>{
        console.log(state)
        setCurrentTitle ('Создание нового проекта')
        setCurrentElem ('CreateProject')
        setStatus(true)
    }
    const createTicket =()=>{
        setCurrentTitle ('Проблемы с компьютером')
        setCurrentElem ('CreateTicket')
        setStatus(true)
    }
    const createNews =()=>{
        setCurrentTitle ('Создание новости')
        setCurrentElem ('CreateNews')
        setStatus(true)
    }
    const closeWindow =()=>{
        setStatus(false)
    }
    return <div style={{zIndex: '9999'}}>
        <Header createProj={createProj} createTicket={createTicket} createNews={createNews} dimensions={dimensions} />
        <Sidebar dimensions={dimensions} />
        <BackendMsg color={'red'} style={{opacity:`${msg?1:0}`, transition:'500ms ease all'}}>
            {error}
         
      </BackendMsg>
        <ModalWindow 
            bigTitle={currentTitle} 
            histCurrent={histCurrent} 
            customElements={currentElem} 
            status={status} 
            closeWindow={closeWindow}
        ></ModalWindow>
        </div>
}



export default Layout