import styles from '../../Styles/modules/department/index.module.css'
import {Card} from '../../Styles/common'
import { Bold } from '../../Styles/typography'
import { useState } from 'react'


const DepartmentSmallCard = ({department,func}) => {
   const [enter, setEnter] = useState (false)

    return(
		console.log (department),
            <Card className={styles.small__card} onClick={()=>func(department.divname)} onMouseLeave={()=>setEnter(false)} onMouseEnter={()=>setEnter(true)} style={{paddingTop:"65px",  backgroundImage:`${enter?'url("/grey.png")':'url("/grey.png")'}`,backgroundSize:'50%', cursor:'pointer'}}>
				<Bold color={enter?'white':'#3F496C'}>{department.divname.toUpperCase()}</Bold>
            </Card>
  
    )
}
export default DepartmentSmallCard