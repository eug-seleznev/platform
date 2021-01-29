import styled from 'styled-components'


export const Container =  styled.div`
padding-left: ${props => props.dimensions.width<600? '0' : props.dimensions.width<1700? '135': '250'}px;
padding-right:${props => props.dimensions.width<600? '0' : props.dimensions.width<1700? '70': '70'}px;
width: 100%;
height: 100%;
padding-top: 200px;
padding-bottom: 200px;
background-color: #ECECEC;
@media (max-width:700px){
    width: 100vw;
    padding-left:5px;
    padding-top: 110px;
    padding-right:5px;
    padding-bottom: 100px;
}

`
export const LoginContainer =  styled.div`
padding-left:  250px;
padding-right: 250px;
width: 100%;
height: 100%;
padding-top: 200px;
padding-bottom: 200px;
background-color: #ECECEC;
@media (max-width: 1600px){
    padding-left:150px;
    padding-top: 80px;
    padding-right:150px;
}
@media (max-width: 1250px){
    padding-left:50px;
    padding-top: 80px;
    padding-right:50px;
}
@media (max-width:1000px){
  
    padding-left:25vw;
    padding-top: 15px;
    padding-right:25vw;
    padding-bottom: 15px;

    background-color: #3F496C;
}
@media (max-width:500px){
  
    padding-left:10px;
    padding-top: 15px;
    padding-right:10px;
    padding-bottom: 15px;

    background-color: #3F496C;
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
@media(min-width:700px) and (max-height:720px) {
    padding: 30px;
    margin-top: 50px;
    height:500px;
        
}
@media(max-width:700px) {
    padding: 30px;
    margin-top: 0vh;
    height:100vh;
    margin-left:0;
    width: 85vw;    
}
`



export const Card = styled.div`
background: #FFFFFF;

padding: 10px;
padding-left:20px;
border: 1px solid #CECECE;
border-radius: 15px;
@media(max-width:700px) {
    padding: 10px;
    padding-left:10px;   
}
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



