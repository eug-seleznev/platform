import { url } from '../utils/axios';
import styles from '../../Styles/modules/components/profile.module.css'
import {useDispatch, useSelector} from  'react-redux'
import { Bold, Light } from '../../Styles/typography'
import { ButtonText } from '../../Styles/buttons'
import { useEffect, useState } from 'react';
import UserInfo from '../User/components/infoCard';
import TopInfo from '../User/components/topInfo';
import Tag from '../Projects/components/OneProject/tag';
import { changeAvatar } from '../../redux/actions/auth';

const ProfileComponent = ({user, history, change, mainPage}) => {
  const me = useSelector(state => state.auth.user)
  const [link,setLink] = useState ('')
  const[file,setFile] = useState(null)
  const[enter,setEnter] = useState(false)
  const dispatch = useDispatch();
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
  const handleFile = e => {
    setFile(e.target.files[0])
}
  useEffect(()=>{
    if (file !== null && file !== undefined) {
      
        dispatch (changeAvatar(file))
      
    }
  },[file])

  
    return (
      <div className={styles.profile}>
        <Bold style={{opacity:enter?1:0}} className={styles.change__avatar}>Сменить аватар</Bold>
        <input className={styles.set__file}
          style={{display:`${mainPage?'block':'none'}`}}
          type='file'
          placeholder='загрузите изображение'
          onChange={handleFile}
          style={{display:`${user._id!==me._id?'none':'block'}`}}
          onMouseEnter={()=>user._id!==me._id?'':setEnter(true)}
          onMouseLeave={()=>setEnter(false)}
          
        ></input>
        <img
          style={{opacity:enter?0.5:1}}
          alt='avatar'
          className={user.avatar==='avatars/spurdo.png'?styles.no_avatar:styles.no_avatar}
          src={`${url}/${
            user !== null ? (user !== undefined ? user.avatar : "") : ""
          }`}
          // onMouseEnter
			  />
       
        <div className={styles.gap}>
          <TopInfo user={user}  enter={enter} history={history} change={change} url={url}></TopInfo>
          <div className={styles.parts}>
            {user.partition!==undefined?user.partition.map((el,i)=>{
              return(<Tag tagText={el} tagColor='#D3E1EE' />)
          }):''}
        </div>
        <UserInfo user={user}me={me}  change={change} link={link}></UserInfo></div>
      </div>
     
    );
}
export default ProfileComponent