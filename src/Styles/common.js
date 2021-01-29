import styled from 'styled-components'


export const Container =  styled.div`
padding-left: ${props => props.dimensions.width<600? '30' : props.dimensions.width<1700? '135': '250'}px;
padding-right:${props => props.dimensions.width<600? '30' : props.dimensions.width<1700? '70': '70'}px;
width: 100%;
height: 100%;
padding-top: 200px;
padding-bottom: 200px;
background-color: #ECECEC;
@media (max-width:700px){
    padding-left:0;
    padding-top: 110px;
}

`

export const ModalContainer = styled.div`
z-index:10000;
left:0;
top:0;
position: fixed;
width: 100vw;
height: 100vh;
background-color: rgba(0,0,0, 0.5)

`
export const ModalWind = styled.div`
padding: 60px;
margin-top: 15vh;
width: 60vw;
margin-left:15vw;
height: 55vh;
background-color: white;
@media(max-width:700px) {
    margin-top: 0vh;
    height:100vh;
    margin-left:0;
    width: 85vw;    
}
`



export const Card = styled.div`
background: #FFFFFF;

padding: 15px;
padding-left:25px;
border: 1px solid #CECECE;
border-radius: 15px;
`





// не используем, не удалял, чтоб не ломались импорты старые, вся типография переносится в typography.js
export const SmallContainer =  styled.div`
margin-left: 30vw;
width: 40vw;
margin-top: 20vh;

`


export const Title =  styled.h1`
    align-items: center;
  
`
// /////////////////////////////////////////////



