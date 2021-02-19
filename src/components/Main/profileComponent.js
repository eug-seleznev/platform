import { url } from '../utils/axios';
import styles from '../../Styles/modules/components/profile.module.css'
import {useSelector} from  'react-redux'
import { Bold, Light } from '../../Styles/typography'
import { ButtonText } from '../../Styles/buttons'
import { useEffect, useState } from 'react';

const ProfileComponent = ({user, history, change}) => {
  const me = useSelector(state => state.auth.user)
  const [link,setLink] = useState ('')
  useEffect(()=>{
    if(user!=null&&user!=undefined&&user.report!=undefined) {
       if (user.report.match(/https:/)){
        setLink(user.report)
      }
     else {
        setLink(`https://${user.report}`)
     }
    }
   
     
  
  },[user])
  useEffect(()=>{
    console.log(link)
  },[link])
    return (
      <div className={styles.profile}>
        <img
          className={styles.avatar}
          src={`${url}/${
            user != null ? (user != undefined ? user.avatar : "") : ""
          }`}
        />
        
        <Bold size="30" mobSize="24" className={styles.name}>
          {" "}
          {user.name} {user.lastname}
        </Bold>
        {!change ? (
          <div className={styles.change}></div>
        ) : (
          <ButtonText
            color="#3F496C 80 %;"
            fontSize="12"
            className={styles.change}
            onClick={() => history.replace(`/edit`)}
          >
            изменить
          </ButtonText>
        )}

        <Light color="#4B4B4B" size="16" className={styles.pos}>
          Должность: {user.position}
        </Light>

        <Bold size="24" className={styles.contacts}>
          Контакты:
        </Bold>

        <Light color="#4B4B4B" size="16" className={styles.mail}>
          {user.email}
        </Light>

        <Light color="#4B4B4B" size="16" className={styles.rocket}>
          rocket:{" "}
          <a
            target="_blank"
            href={`https://chat.buro82.ru/direct/${user ? user.rocketId : ""}`}
          >
            {" "}
            {user.rocketchat && user.rocketchat}{" "}
          </a>
        </Light>
        {change||me.permission==='admin'? <div>Отчетность: <a target="_blank" href={link}>ссылка</a></div>:''}
      </div>
    );
}
export default ProfileComponent