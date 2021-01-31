import { url } from '../utils/axios';
import styles from '../../Styles/modules/department/departmentCard.module.css'

import { Bold, Light } from '../../Styles/typography'
import { ButtonText } from '../../Styles/buttons'
import { useDispatch } from 'react-redux';
import { allDepartments, deleteDepartment, joinDepartment } from '../../redux/actions/department';
import Confirm from './confirm'
import { useState } from 'react';

const DepartmentCard = ({content, user}) => {

const dispatch = useDispatch()

const [showConfirm, setShowConfirm] = useState(false)



    const join = () => {
        dispatch(joinDepartment(content._id))
        setTimeout(() => {
        dispatch(allDepartments())
    }, 100);
    }

    const deleteDep = () => {
        dispatch(deleteDepartment(content._id))
        setShowConfirm(false)
        setTimeout(() => {
            dispatch(allDepartments())
        }, 100);
    }

    return(
        <div className={styles.container}>
            <Bold className={styles.title} size='30'>Отдел по борьбе с наркотиками 
               { user.permission=='admin' && <ButtonText className={styles.deleteBtn} fontSize='12' onClick={()=>setShowConfirm(true)}> удалить отдел</ButtonText>}
            </Bold>
            <ButtonText className={styles.joinBtn}  fontSize='16px' onClick={()=>join()}>Вступить в отдел</ButtonText>
            <div className={styles.members}>
                <div>111</div>
                <div>222</div>
                <div>333</div>
                <div>444</div>

                {/* {content.users.map((el,i_=>{

                return(
                    <Profile user={el}/>
                )
                }))} */} 
            </div>
            <Bold className={styles.activeTitle}  size='30'>Активные проекты</Bold>
            <div className={styles.activeProjects}>
                <div>111</div>
                <div>222</div>
                <div>333</div>
                <div>444</div>

                {/* {content.users.map((el,i_=>{

                return(
                    <ProjectCard user={el}/>
                )
                }))} */} 
            </div>


             {showConfirm && <Confirm accept={()=>deleteDep()} decline={()=>setShowConfirm(false)} title={'content.title'}/> }  


        </div>
    )
}
export default DepartmentCard