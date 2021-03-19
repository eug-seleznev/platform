



import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allTickets } from "../../redux/actions/tikets";

import style from '../../Styles/modules/components/Project/allproj.module.css'
//styled components
import {NEW_THEAD, NEW_TR, NEW_TH, NEW_TBODY, NEW_TABLE,NEW_TD} from '../../Styles/tables'
import {  Regular} from '../../Styles/typography'
import { background } from "../../redux/actions/user";


const Dashboard = ({history}) => {
    const dispatch = useDispatch();
    const loaded = useSelector(state => state.tickets.loaded)
    const tickets = useSelector(state => state.tickets.tickets)


    useEffect(() => {
        dispatch(allTickets())
            dispatch(background('white'))
            return () => {
              dispatch(background('#ECECEC'))
            }
         
        
    }, [])

    
    return (
        <div> 
           
           <Regular size='16' color='#3F496C' className={style.title}> Входящие тикеты ({tickets.length})</Regular>
            
     

            {!loaded ? <p>loading...</p> : (
            
                    <NEW_TABLE>
                        <NEW_THEAD>
                            <NEW_TR className={style.first}>
                                <NEW_TH>Номер</NEW_TH>
                                <NEW_TH>Проблема</NEW_TH>
                                <NEW_TH>Статус</NEW_TH>
                            </NEW_TR>
                        </NEW_THEAD>
                            
                        <NEW_TBODY>
                            
                            {tickets.map((ticket,index) => 
                                
                                <NEW_TR columns='1fr 5fr 1fr' onClick={() => history.push(`/tickets/${ticket._id}`)}>
                                    <NEW_TD>{index+1}</NEW_TD>
                                    <NEW_TD>{ticket.problemname}</NEW_TD>
                                    <NEW_TD>{ticket.status ? <p>получен</p>:<p>выполнено</p>}</NEW_TD>
                                    
                                </NEW_TR>
                                
                            )}
                        </NEW_TBODY>
                            
                     
                    </NEW_TABLE>
                
            )}
           
        </div>
    )
}



export default Dashboard