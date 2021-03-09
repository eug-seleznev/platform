import { useSelector } from "react-redux"
import { Card } from "../../Styles/common"
import { Bold, H1, H3} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/allproj.module.css'
import { useEffect } from "react"
import {useDispatch} from "react-redux"
import { allContractors } from "../../redux/actions/user"
const { Table, Tr, Td } = require("../../Styles/tables")






const Contractors = ({history}) => {
	const dispatch = useDispatch ()
    const contractors = useSelector(state => state.users.contractors)

	useEffect (()=>{
		dispatch(allContractors())
	},[])
    const pushToEdit =(id)=>{
        history.push(`/contractors/${id}`)
    }
    return (
        <div>
            <Card>
             <H1>Субподрядчики</H1>
            {!contractors ? <p> проектов нет  </p>: (

            <Table>
                <Tr className={style.contractors} top='top'> 
                    <Td>Имя</Td>
                    <Td>Разделы</Td>
                    <Td>Телефон</Td>
                    <Td className={style.turn__off}>Почта</Td>
                    {/* <Td>Спринты</Td> */}
                </Tr>
          
                {contractors.map((contractor,index) => {
                    return(  
                    <Tr className={style.contractors} key={index} onClick={()=> pushToEdit(contractor._id)} title="Редактировать информацию">
                    
                        <Td>{contractor.fullname}</Td>
                        <Td style={{display:'flex',flexWrap:'wrap'}}>{contractor.partition.map((el,i)=>{
                            return(<Bold style={{marginRight:'15px'}}>
                                {el}
                            </Bold>)
                        })}</Td>
                        <Td>{contractor.phone}</Td>
                        <Td className={style.turn__off}>{contractor.email}</Td>
                        {/* <Td>{project.sprints.filter(sprint => sprint.status).length}/{project.sprints.length}</Td> */}
                    </Tr>
                    )
                })}
                
           
            </Table>
                        )}
            </Card>
        </div> 
    )
}
export default Contractors