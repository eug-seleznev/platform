import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getTicket } from "../../redux/actions/tikets";
import { url } from "../utils/axios";
import style from '../../Styles/modules/components/Tickets/createTicket.module.css'
import { Card } from '../../Styles/common';
import {  Regular, Thin} from '../../Styles/typography'


const Ticket = ({match}) => {
    let {id} = match.params;
    const dispatch = useDispatch();
    const loaded = useSelector(state => state.tickets.ticketLoad)
    const ticket = useSelector(state => state.tickets.ticket)

    useEffect(() => {
        dispatch(getTicket(id));
        
    }, [])

    useEffect(()=>{
        if(ticket!==null)
        console.log(ticket.screenshot)
    },[ticket])
    return (
        <div>
            <Card>
            {!loaded ? <p> loading...</p>: (
                // console.log(ticket),
                <div className={style.ticket}>
                    <Regular>Название: {ticket.problemname}</Regular>
                    <Thin>Кто прислал: {ticket.user.fullname} </Thin>
                    <Thin>Описание проблемы: {ticket.text} </Thin>
                    <Thin>Дата: {ticket.date}</Thin>
                    <Thin>Насколько срочно: {ticket.emergency}</Thin>
                    <Thin>Пароль от компа: {ticket.pcpass}</Thin>
                    <img alt='screen' style={{display:`${ticket.screenshot!==undefined?'block':'none'}`}} width="100%"src={`${url}/${ticket.screenshot}`} />  
                </div>
            )}
            </Card>
        </div>
    )
}



export default Ticket