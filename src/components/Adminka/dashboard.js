



import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allTickets } from "../../redux/actions/tikets";

import style from '../../Styles/modules/components/Project/allproj.module.css'
//styled components
import {Table, Tr, Td, New_thead, New_Tr, New_Th, New_tbody, New_table, New_Td} from '../../Styles/tables'
import {Container, Card, Title,} from '../../Styles/common'
import { H1, H3, Regular} from '../../Styles/typography'
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
            
                    <New_table>
                        <New_thead>
                            <New_Tr className={style.first}>
                                <New_Th>Номер</New_Th>
                                <New_Th>Проблема</New_Th>
                                <New_Th>Статус</New_Th>
                            </New_Tr>
                        </New_thead>
                            
                        <New_tbody>
                            
                            {tickets.map((ticket,index) => 
                                
                                <New_Tr columns='1fr 5fr 1fr' onClick={() => history.push(`/tickets/${ticket._id}`)}>
                                    <New_Td>{index+1}</New_Td>
                                    <New_Td>{ticket.problemname}</New_Td>
                                    <New_Td>{ticket.status ? <p>получен</p>:<p>выполнено</p>}</New_Td>
                                    
                                </New_Tr>
                                
                            )}
                        </New_tbody>
                            
                     
                    </New_table>
                
            )}
           
        </div>
    )
}



export default Dashboard