import { useSelector } from "react-redux"
import { Card } from "../../Styles/common"
import { Bold, H1, H3, Regular, Thin} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/allproj.module.css'
import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import { allContractors, background, findContractorName } from "../../redux/actions/user"
import { SearchInput } from "../../Styles/Forms"
const { Table, Tr, Td, New_table, Select, New_thead, New_Tr, New_Th, New_Td, New_tbody } = require("../../Styles/tables")






const Contractors = ({history}) => {
	const dispatch = useDispatch ()
    const contractors = useSelector(state => state.users.contractors)
    const [sortOrder, setOrder] = useState(false)
	useEffect (()=>{
        let query = 'name'
		dispatch(allContractors({query, sortOrder}))
	},[])
    const sortFunction = (query) => {
        setOrder(!sortOrder)
        dispatch(allContractors({query, sortOrder}))
    }
    useEffect(()=>{ 
        dispatch(background('white'))
        return () => {
          dispatch(background('#ECECEC'))
        }
      }, [])
    const pushToEdit =(id)=>{
        history.push(`/contractors/${id}`)
    }
    const findContractor =(e)=>{
        let field = e.target.name
        let value = e.target.value
        dispatch (findContractorName({value,field}))
    }
    return (
        <div className={style.main}>
            
            <Regular size='16' color='#3F496C' className={style.title}> Все субподрядчики</Regular>
            <div className={style.row}>
                <div className={style.row__in}>
                        <img src='/lupa.png' className={style.row__img}></img>
                        <SearchInput size='14px' onChange={findContractor} name='name' placeholder='Поиск субподрядчика'  ></SearchInput>
                    </div>
                    <div className={style.row__in}>
                        <img src='/lupa.png' className={style.row__img}></img>
                        <SearchInput size='14' onChange={findContractor} name='partition' placeholder='По разделу'></SearchInput>
                    </div>
                    <div className={style.row__in}>
                        <Thin size='14'>
                            Всего субподрядчиков: {contractors.length}
                        </Thin>
                    </div>
                </div>
            {!contractors ? <p> проектов нет  </p>: (

            <New_table>
                <New_thead>
                    <New_Tr className={style.first} top='top'> 
                    <New_Th onClick={() => sortFunction("name")}>Имя &#8597;</New_Th>
                    <New_Th>Разделы</New_Th>
                    <New_Th>Телефон</New_Th>
                    <New_Th
                    onClick={() => sortFunction("email")}
                    className={style.turn__off}
                    >email &#8597;</New_Th>
                        {/* <Td>Спринты</Td> */}
                    </New_Tr>
                </New_thead>
                
                <New_tbody>
                    {contractors.map((contractor,index) => {
                    return(  
                    <New_Tr className={style.contractors} key={index} onClick={()=> pushToEdit(contractor._id)} title="Редактировать информацию">
                    
                        <New_Td>{contractor.fullname}</New_Td>
                        <New_Td style={{display:'flex',flexWrap:'wrap',alignItems:'center', maxWidth:'200px'}}>{contractor.partition.map((el,i)=>{
                            return(<Bold style={{marginRight:'15px'}}>
                                {el}
                            </Bold>)
                        })}</New_Td>
                        <New_Td>{contractor.phone}</New_Td>
                        <New_Td className={style.turn__off}>{contractor.email}</New_Td>
                        {/* <Td>{project.sprints.filter(sprint => sprint.status).length}/{project.sprints.length}</Td> */}
                    </New_Tr>
                    )
                })}
                </New_tbody>
               
                
           
            </New_table>
                        )}
           
        </div> 
    )
}
export default Contractors