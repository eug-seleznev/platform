import { useEffect, useState } from 'react';
import style from '../../Styles/modules/components/Project/projheader.module.css'
import { Thin } from '../../Styles/typography'


const Header =({history})=> {
    
    const [nameV, setNameV] = useState(window.location.pathname.slice(7));
   
    const handleRedirect = (name) => {
        setNameV(name)
        history.push(`../../ideas/${name}`)
    }
    return (
    <div>
        <div className={style.container}>
            <div className={style.row} style={{justifyContent:'center'}}>
                <div style={{display:'flex'}}>
                <Thin
                    style={{cursor:'pointer',borderBottom:`${nameV.includes("office")?'2px solid white':'2px solid transparent'}`,width:'30px',marginRight:'50px', fontFamily:`${nameV.includes("office")?'SuisseIntlRegular':'SuisseIntlThin'}`}}
                    color='white'
                    name="office"
                    value="123"
                    onClick={(e) => handleRedirect("office/new")}
                >Офис </Thin>

            <Thin style={{cursor:'pointer',borderBottom:`${nameV.includes("platform")?'2px solid white':'2px solid transparent'}`,width:'60px', fontFamily:`${nameV.includes("platform")?'SuisseIntlRegular':'SuisseIntlThin'}`}} 
                color='white' 
                name="platform" 
                onClick={(e) => handleRedirect("platform/new")}>
                Платформа
            </Thin>
                </div>
            </div>
        </div>
    </div>)
}
export default Header