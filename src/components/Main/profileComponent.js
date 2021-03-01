import { url } from '../utils/axios';
import styles from '../../Styles/modules/components/profile.module.css'
import {useSelector} from  'react-redux'
import { Bold, Light } from '../../Styles/typography'
import { ButtonText } from '../../Styles/buttons'
import { useEffect, useState } from 'react';
import UserInfo from '../User/components/infoCard';
import TopInfo from '../User/components/topInfo';

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
        <div className={styles.gap}>
        <TopInfo user={user} url={url}></TopInfo>
        
          <div className={styles.info__title}>
            <Bold size="18" color='#3F496C' className={styles.contacts}>
              Информация
            </Bold>
            {!change ? (
                <div className={styles.change}></div>
              ) : (
                <ButtonText
                  color="#445AAA"
                  fontSize="12"
                  
                  onClick={() => history.replace(`/edit`)}
                >
                  изменить
                </ButtonText>
              )}
            </div>
        <UserInfo user={user}me={me} change={change} link={link}></UserInfo></div>
      </div>
     
    );
}
export default ProfileComponent