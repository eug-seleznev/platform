
import { useState } from 'react'
import ModalWindow from '../Projects/components/ModalWindow'
import Header from './header'
import Sidebar from './sidebar'


const Layout = ({dimensions, histCurrent}) => {
    const [currentElem, setCurrentElem] = useState (false)
    const [currentTitle, setCurrentTitle] = useState (false)
    const [status, setStatus] = useState (false)
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
        <Header createProj={createProj} createTicket={createTicket} createNews={createNews} dimensions={dimensions} />
        <Sidebar dimensions={dimensions} />
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