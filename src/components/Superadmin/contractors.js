import { useSelector } from "react-redux"
import { Card } from "../../Styles/common"
import { H1, H3} from '../../Styles/typography'
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

    return (
        <div>
            <Card>
             <H1>Смежники</H1>
            {!contractors ? <p> проектов нет  </p>: (

            <Table>
                <Tr className={style.contractors} top='top'> 
                    <Td>Имя</Td>
                    <Td>Вид деятельности</Td>
                    <Td>Телефон</Td>
                    <Td className={style.turn__off}>Почта</Td>
                    {/* <Td>Спринты</Td> */}
                </Tr>
          
                {contractors.map((contractor,index) => {
                    return(  
                    <Tr className={style.contractors} key={index}  title="Открыть проект">
                    
                        <Td>{contractor.fullname}</Td>
                        <Td className={style.turn__off}>{contractor.job}</Td>
                        <Td>{contractor.contacts.phone}</Td>
                        <Td className={style.turn__off}>{contractor.contacts.email}</Td>
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