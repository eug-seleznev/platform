import styled from 'styled-components'


export const Button =  styled.button`
  display: inline-block;
  border: 0.4px solid #B7B7B7;
  border-radius: 13px;
  font-size:${props => props.fontSize};
  font-family: SuisseIntlSemibold;
  
  padding-left: ${props => props.padd};
  padding-right: ${props => props.padd};
  padding-top: 11px;
  padding-bottom: 9px;
 
  outline: none;
  text-decoration: none;
  color: white;
  background-color: ${props => props.grey ? "grey" : "#3F496C"};
  ;

  &:hover{
  // text-decoration: underline;
  background-color: black;

}


`
export const CancelButton =  styled.div`
  display: inline-block;
  border: 0.4px solid #B7B7B7;
  border-radius: 13px;
  font-size:${props => props.fontSize};
  font-family: SuisseIntlSemibold;
  
  padding-left: ${props => props.padd};
  padding-right: ${props => props.padd};
  padding-top: 11px;
  padding-bottom: 9px;
 
  outline: none;
  text-decoration: none;
  color: white;
  background-color: ${props => props.grey ? "grey" : "#3F496C"};
  ;

  &:hover{
  // text-decoration: underline;
  background-color: black;

}


`
export const ButtonText =  styled.button`
  display: inline-block;
  border: none;
  background: none;
  width: max-content;
  padding: 0;

  font-size:${props => props.fontSize};
  font-family: SuisseIntlRegular;
  
 
  outline: none;
  text-decoration: none;
  color:  ${props => props.color || '#3F496C'};
  ;

  &:hover{
  text-decoration: underline;


}


`




export const LoginButton =  styled.button` 
  outline: none;

  display: grid;
  grid-template-columns: minmax(170px, max-content);
  border: 1px solid white;
  border-radius: 13px;
  font-size: 16px;
  font-family: SuisseIntlSemibold;
  
  
  
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 20px;
  padding-right: 20px;
 
  outline: none;
  text-decoration: none;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  ;

  &:hover{
  // text-decoration: underline;
  background-color: black;

}

`