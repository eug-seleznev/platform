import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import style from '../../../Styles/modules/components/Project/projheader.module.css'





const Header = () => {
const [nameV, setNameV] = useState('')

const nameOnly =(name)=> {
  let replacement = name.substr(name.lastIndexOf('/') + 1);
  return replacement
}
useEffect(()=>{
  setNameV(nameOnly(window.location.pathname))
},[])


    return (
      <div
      className={style.ideasHead}
       
      >
        <div
          className={style.ideasHeadRow}
        >
          <Link
             style={{cursor:'pointer', color: "white", textDecoration: "none",borderBottom:`${nameV==="new"?'2px solid white':'2px solid transparent'}`,width:'30px',marginRight:'50px', fontFamily:`${nameV==="new"?'SuisseIntlRegular':'SuisseIntlThin'}`}}
            to="/ideas/office/new"
            onClick={(e) => setNameV("new")}
          >
            Новые
          </Link>
          <Link
            style={{cursor:'pointer',color: "white", textDecoration: "none",borderBottom:`${nameV==="work"?'2px solid white':'2px solid transparent'}`,whiteSpace:"nowrap",width:'30px',marginRight:'70px', fontFamily:`${nameV==="work"?'SuisseIntlRegular':'SuisseIntlThin'}`}}
            to="/ideas/office/work"
            onClick={(e) => setNameV("work")}>
          
            В работе
          </Link>
          <Link
            style={{cursor:'pointer',color: "white", textDecoration: "none",borderBottom:`${nameV==="done"?'2px solid white':'2px solid transparent'}`,width:'30px',marginRight:'50px', fontFamily:`${nameV==="done"?'SuisseIntlRegular':'SuisseIntlThin'}`}}
            to="/ideas/office/done"
            onClick={(e) => setNameV("done")}>
          
            Готово
          </Link>
        </div>
      </div>
    );
}


export default Header