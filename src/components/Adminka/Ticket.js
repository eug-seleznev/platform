import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";



import { useLocation} from "react-router";
import { getTicket } from "../../redux/actions/tikets";
import { url } from "../utils/axios";
import style from '../../Styles/modules/components/Tickets/createTicket.module.css'

import { Container, Card, } from '../../Styles/common';
import { Button } from '../../Styles/buttons';
import { Bold, H1, H3, Regular, Thin} from '../../Styles/typography'


const Ticket = ({match}) => {
    let {id} = match.params;
    const dispatch = useDispatch();
    const loaded = useSelector(state => state.tickets.ticketLoad)
    const ticket = useSelector(state => state.tickets.ticket)

    useEffect(() => {
        dispatch(getTicket(id));
        
    }, [])

    
    return (
        <div>
            <Card>
            {!loaded ? <p> loading...</p>: (
                console.log(ticket),
                <div className={style.ticket}>
                    <Regular>Название: {ticket.problemname}</Regular>
                    <Thin>Кто прислал: {ticket.user.fullname} </Thin>
                    <Thin>Описание проблемы: {ticket.text} </Thin>
                    <Thin>Дата: {ticket.date}</Thin>
                    <Thin>Насколько срочно: {ticket.emergency}</Thin>
                    <Thin>Пароль от компа: {ticket.pcpass}</Thin>
                    <img width="100%"src={`${url}/${ticket.screenshot}`} />  
                </div>
            )}
            </Card>
        </div>
    )
}



export default Ticket