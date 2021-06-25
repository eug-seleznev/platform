
import { Light } from '../../../../../../../Styles/typography'
import getDateWithTime from '../getDateWithTime'

const ChangeType = ({info,theme}) =>{

    return(
        <Light size='14' style={{ color: theme ? "white" : "black",
        backgroundColor: !theme ? '#EFEFEF' : "#1E1E1E",borderRadius:'5px',padding:'4px'}}>{info.emergency==='Событие'?'Дата события: '+getDateWithTime(info.deadline):'Дедлайн: '+getDateWithTime(info.deadline)}</Light>
    )
}
export default ChangeType