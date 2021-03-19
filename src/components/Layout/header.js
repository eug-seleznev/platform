

import { useState } from 'react'
import { useSelector } from 'react-redux'
import {Header, ItemHead} from '../../Styles/layout'
import {Bold} from '../../Styles/typography'
import { url } from '../utils/axios'
import Menu from './Menu'
import MenuMobile from './menuMobile'


const HeaderL = ({addPodsos, createProj, createNews, createTicket}) => {
    const loaded = useSelector(state => state.auth.loaded)
    const user = useSelector(state => state.auth.user)
   
    const [open, setOpen] = useState({
        menu: false,
        menuProfile: false,
        mobile: false
    })


    const mobClick = () => { 
        setOpen({...open, mobile: !open.mobile})
        // console.log(open)
    }


    const allFalse= () => {
        setOpen({...open, mobile: false, menu:false, menuProfile: false})
    }

    return (
        <>
        {!loaded? <div>loading...</div> :(
        <Header>

            <ItemHead className='mobile__menu' onClick={() => mobClick()}>
                <Bold size='14' color='white'>меню</Bold>
                <img alt='arrow' className='arrow' src='/headerArrow.png'/>
            </ItemHead>

            <ItemHead onClick={() => setOpen({...open, menuProfile:false , menu: !open.menu})}>
                <img alt='plus' className='invert' src='/headerPlus.png'/>
                <img alt='arrow' className='arrow' src='/headerArrow.png'/>
            </ItemHead>
            
            <ItemHead onClick={() => setOpen({...open, menu:false, menuProfile: !open.menuProfile})}>
                <div className='avatar' >
                    <img alt='avatar'  height="100%"  src={`${url}/${user !== null? (user!= undefined? user.avatar:''):''}`}/>
                </div>
                <img alt='arrow'  className='arrow' src='/headerArrow.png'/>
            </ItemHead>
            
           

        </Header>
)}
        <Menu addPodsos={addPodsos} createTicket={createTicket} createNews={createNews} createProj={createProj} closeAll={()=>allFalse()}  state={open} user={user}/>
        <MenuMobile open={open.mobile} closeAll={()=>allFalse()} />

          </>
    )
}


export default HeaderL