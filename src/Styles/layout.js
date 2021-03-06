import styled from 'styled-components'
import { NavLink } from "react-router-dom"






export const Header =  styled.div`
    position: fixed;
    display: grid;
    grid-template-columns: 1fr max-content max-content max-content;
    // flex-direction: row;
    // justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #C4C4C4;
    left:0;
    right:0;
    top: 0;
    width: auto;
    height: 67px;

    background-color: white;
    z-index:999;
    @media(max-width: 1000px){
        background-color: #3F496C
    }
`

export const ItemHead = styled.div`
    margin-right: 23px;
    display: grid;
    grid-template-columns: max-content max-content;
    column-gap:5px;
    cursor: pointer;

    &.mobile__menu{
       opacity: 0;
       width:  0px;
       margin-left: 0px;

    }
        .avatar{
          
            overflow:hidden;
            width:40px;
            height:40px;
            border-radius:50px;
            
            
        }
           
        
        .invert{
            filter: invert(0) ;
        }

        .arrow{
           align-self:center;
            filter: invert(0) ;
        }
@media(max-width: 1000px){

    &.mobile__menu{
        opacity: 1;
        width: max-content;
        margin-left: 20px;
 
     }
     .invert{
        filter: invert(1) ;
    }
    .arrow{
        align-self:center;
        filter: invert(1) ;
     }
}
`


export const BackendMsg = styled.div`
z-index:10001;
position: fixed;
top:2vh;
left:20vw;
width:60vw;
background-color:${props => props.color==='green'?'rgba(0,255,0,0.1)':props => props.color==='red'?'rgba(255,0,0,0.1)':''};
border: solid ${props => props.color} 1px;
font-family: SuisseIntlThin;
padding-top: 10px;
padding-bottom: 10px;
font-size: 18px;
border-radius: 10px;
padding-top:10px;
padding-left:10px;
@media(max-width:1000px){
    font-family: SuisseIntlSemibold;
    background-color:${props => props.color==='green'?'rgba(0,208,86,1)':props => props.color==='red'?'rgba(255,0,0,1)':''};
}
`

export const MenuHead = styled.div`

    z-index: 99999;
    right: ${props => props.right};
    border:1px solid black;
    background-color: white;
    height: max-content;
    width: 238px;
    position: fixed;
    top:81px;
    padding:10px;
    border-radius: 15px;
    // display: grid;
    row-gap: 14px;

@media(max-width: 1000px){
    right: 30px;
}
    
    div.my__name{
        position: static;
        margin:0;
        padding:0;
        padding-bottom: 15px;
        padding-top: 5px;
        min-height: 1em;
        text-align: left;
        font-family: SuisseIntlSemiBold;
        font-size: 16px;
        border-bottom: 0.5px solid #BABABA;
        background-color: transparent;
        border-radius: 0px;

    }
       
  
    button{
        margin-top: 40px;
        width: 100%;
        text-align: left;
    }

`

export const MobMenuLink = styled(NavLink)`
font-family: SuisseIntlSemiBold;
font-size: 22px;
color: white;
text-decoration: none;

`


export const StyledIn = styled.div`

margin-top: 10px;
cursor: pointer;
font-family: SuisseIntlLight;
font-size: 16px;

&:hover{
    text-decoration:underline;
   
}
`

export const StyledLink = styled(NavLink)`
display:block;
font-size: 25px;
text-decoration:none;
margin: 0;
color: black;
text-align:left;
z-index:999;
margin-top: 10px;
cursor: pointer;
font-family: SuisseIntlLight;
font-size: 16px;

&:hover{
    text-decoration:underline;
   
}
`

export const TasksContainer = styled.div`
  display: block;
  position: fixed;
  width: 450px;
  left:auto;
  right:0px;
  margin-top:67px;
  min-height: 100vh;
  padding-top: 43px;
  z-index: 9999;
  color: white;
  background-color: #3F3F3F;
  text-align: center;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const SidebarContainer = styled.div`
  display: block;
  position: fixed;
  width: 45px;
  min-height: 100vh;
  padding-top: 73px;
  z-index: 9999;
  background-color: #0d1117;
  text-align: center;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const SidebarLink = styled(NavLink)`
// display:block;
font-family: SuisseIntlRegular;
font-size: 12px;
text-decoration:none;
width: max-content;
height: max-content;
cursor: pointer;
color: white;
text-align:center;


img{
    margin:0;
    margin-bottom:30px
}
    img.sidebar__logo{
        margin-bottom: 30px;

    }
p{
    margin:0;
    margin-bottom: 30px;
}

&:hover{
    text-decoration:underline;
   
}
`








// /////////////   not in use??  ////////////////////////////////////


export const SidebarOpen = styled.div`
display: ${props => props.open? 'block' : 'none'};
position: absolute;
left:110px;
top: ${props=>props.top}px;
width: max-content;
background-color: white;
`


export const MenuPro = styled.div`
    position: absolute;
    width: 10vw;
    heigth: 20vh;
    background-color: grey;
    top: 8vh;
    left: 84vw;
`
