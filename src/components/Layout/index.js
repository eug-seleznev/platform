
import { useEffect, useState } from 'react'
import ModalWindow from '../Projects/components/ModalWindow'
import Header from './header'
import Sidebar from './sidebar'
import {useDispatch, useSelector} from 'react-redux'
import { BackendMsg }  from '../../Styles/layout'

import {errorAuthClear, msgAuthClear}  from "../../redux/actions/auth";
const Layout = ({ histCurrent}) => {
    const dispatch = useDispatch()
    const project = useSelector(state => state.projects)
    const createSprMsg = useSelector(state => state.projects.sprint_msg)
    const createProjMsg = useSelector(state => state.projects.msg)
    const errorAuth = useSelector(state => state.auth.error)
    const msgAuth = useSelector(state => state.auth.msg)
    const errorNews = useSelector(state => state.news.error)
    const msgNews = useSelector(state => state.news.msg)
    const errorProject = useSelector(state => state.projects.error)
    const msgTask = useSelector(state => state.projects.hey)
    const errorTickets = useSelector(state => state.tickets.error)
    const msgTickets = useSelector(state => state.tickets.msg)
    const msgUser = useSelector(state => state.users.msg)
    const state = useSelector(state => state)
    const [error, setError] = useState ('')
    const [msg, setMsg] = useState (false)
    const [msgTiming, setMsgTiming] = useState (false)
    const [currentElem, setCurrentElem] = useState (false)
    const [currentTitle, setCurrentTitle] = useState (false)
    const [color, setColor] = useState (false)
    const [status, setStatus] = useState (false)
 
   
   

    useEffect(()=>{
        if(errorAuth !=""){
            setError(errorAuth)
        }
    },[errorAuth])
    useEffect(()=>{
        if(msgTask !=""&& msgTask !=undefined){
            setMsg(msgTask.msg)
        }
    },[msgTask])
    useEffect(()=>{
        if(msgAuth !=""&& msgAuth !=undefined){
            setMsg(msgAuth)
        }
    },[msgAuth])
    useEffect(()=>{
        if(createProjMsg !=""&& createProjMsg !=undefined){
            setMsg(createProjMsg)
        }
    },[createProjMsg])
    useEffect(()=>{
        if(createSprMsg !=""&& createSprMsg !=undefined){
            console.log(createSprMsg)
            setMsg(createSprMsg)
        }
    },[createSprMsg])
    useEffect(()=>{
        if(errorNews !=""&&errorNews !=undefined){
            setError(errorNews)
        }
    },[errorNews])
    useEffect(()=>{
        if( msgTickets !=""&& msgTickets !=undefined){
            setMsg( msgTickets)
        }
    },[msgTickets])
    useEffect(()=>{
        if(msgNews !=""&&msgNews !=undefined){
            setMsg(msgNews)
        }
    },[msgNews])
    useEffect(()=>{
        if(errorProject !=""&&errorProject !=undefined){
            setError(errorProject)
        }
    },[errorProject])
    useEffect(()=>{
        if(errorTickets !=""&&errorTickets !=undefined){
            setError(errorTickets)
        }
    },[errorTickets])
    useEffect(()=>{
        if(msgUser !=""&&msgUser !=undefined){
            setMsg(msgUser)
        }
    },[msgUser])
    useEffect(()=>{
        setColor('red')
        if(error!=''){
            setMsgTiming(true)
                setTimeout(()=>{
                    setMsgTiming(false)
                    
                        setError('')
                        dispatch(errorAuthClear())
             
                },4500)
        }
    },[error])
    useEffect(()=>{
        if(msg!=''){
            setColor('green')
           
            setMsgTiming(true)
                setTimeout(()=>{ 
                    setMsgTiming(false)
                    
                         setMsg('')
                         dispatch(msgAuthClear())
               
                   
                },3500)
        }
    },[msg])
    const createProj =()=>{
   
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
        <Header createProj={createProj} createTicket={createTicket} createNews={createNews}/>
        <Sidebar/>
        <BackendMsg color={color} style={{opacity:`${msgTiming?1:0}`,zIndex:`${msgTiming?10000:-1000}`}}>
            {color==='red'?error:color==='green'?msg:''}
         
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