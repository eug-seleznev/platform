
import { useEffect, useState } from 'react'
import ModalWindow from '../Projects/components/ModalWindow'
import Header from './header'
import Sidebar from './sidebar'
import {useDispatch, useSelector} from 'react-redux'
import { BackendMsg }  from '../../Styles/layout'

import {errorAuthClear, msgAuthClear}  from "../../redux/actions/auth";
const Layout = ({ histCurrent}) => {
    const dispatch = useDispatch()

    const errorAll = useSelector(state => state.messages.error) 
    const msgAll = useSelector(state => state.messages.msg)
    const [error, setError] = useState ('')
    const [msg, setMsg] = useState (false)
    const [msgTiming, setMsgTiming] = useState (false)
    const [currentElem, setCurrentElem] = useState (false)
    const [currentTitle, setCurrentTitle] = useState (false)
    const [color, setColor] = useState (false)
    const [status, setStatus] = useState (false)

    useEffect(()=>{
        if(errorAll !=""){
            setError(errorAll)
            setColor('red')
        }
    },[errorAll])
    useEffect(()=>{
        if(msgAll !==""&& msgAll !==undefined){
            setMsg(msgAll)
            setColor('green')
        }
    },[msgAll])
    
    useEffect(()=>{
        if(msg!==''&&msg!==undefined&&msg!==false){
            console.log(msg)
            setMsgTiming(true)
                setTimeout(()=>{ 
                    setMsgTiming(false)
                    
                         setMsg('')
                         dispatch(msgAuthClear())
               
                   
                },3500)
        }
    },[msg])
    useEffect(()=>{
        if(error!==''){
         
            setMsgTiming(true)
                setTimeout(()=>{
                    setMsgTiming(false)
                        
                        setError('')
                        dispatch(errorAuthClear())
             
                },4500)
        }
    },[error])
    const createProj =()=>{
        histCurrent.replace('/admin/newproject')
        // setCurrentTitle ('Создание нового проекта')
        // setCurrentElem ('CreateProject')
        // setStatus(true)
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
    const addPodsos =()=>{
        setCurrentTitle ('Добавить субподрядчика')
        setCurrentElem ('addPodsos')
        setStatus(true)
    }
    const closeWindow =()=>{
        setStatus(false)
    }
    return <div style={{zIndex: '9999'}}>
        <Header createProj={createProj} addPodsos={addPodsos} createTicket={createTicket} createNews={createNews}/>
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