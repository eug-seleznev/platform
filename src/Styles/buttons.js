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
  cursor: pointer;
}


`
export const CancelButton =  styled.div`
  text-align: center;
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
  background-color: ${props => props.grey ? "#C4C4C4" : "#3F496C"};
  ;

  &:hover{
  // text-decoration: underline;
  background-color: black;
  cursor: pointer;

}

`
export const ButtonTextLight =  styled.button`
  display: inline-block;
  border: none;
  background: none;
  width: max-content;
  padding: 0;
  cursor:pointer;
  font-size:${props => props.fontSize};
  font-family: SuisseIntlLight;
  
 
  outline: none;
  text-decoration: none;
  color:  ${props => props.color || '#3F496C'};
  ;

  &:hover{
  text-decoration: underline;


}


`

export const ButtonText =  styled.button`
  display: inline-block;
  border: none;
  background: none;
  width: max-content;
  padding: 0;
  cursor:pointer;
  font-size:${props => props.fontSize};
  font-family: SuisseIntlLight;
  
 
  outline: none;
  text-decoration: none;
  color:  ${props => props.color || '#3F496C'};
  ;

  &:hover{
  text-decoration: underline;


}


`

export const ButtonTextDiv =  styled.div`
  display: inline-block;
  border: none;
  background: none;
  width: max-content;
  padding: 0;
  cursor: pointer;
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
export const FilterButton = styled.div`
display: inline-block;
outline:none;
filter:none;
background-color:none;
border:none;
margin-right: 20px;
cursor: pointer;
user-select: none;

&::after{
  content: '\u25BC';
  opacity: ${props=> props.arrow? 1 : 0 };
  display: inline-block;
  transform: ${props=> props.reverse?'rotate(180deg)':'rotate(0deg)'};
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
  filter: scale(1.1)

  @media (max-width: 1000px){
    &.hover{
      filter: none;
    }
  }
}

`

export const KanbanButton =  styled.button`
  display: inline-block;
  border: none;
  border-radius: 13px;
  font-size:${props => props.fontSize};
  font-family: SuisseIntlLightItalic;
  padding:3px 5px;
 
  outline: none;
  text-decoration: none;
  color: ${props => props.color};
  background-color: ${props => props.bg ? props.bg : "#404040"};
  ;

  img{
    margin-right: 5px;
  }
  
  &:hover{
  // text-decoration: underline;
  background-color: grey;
  cursor: pointer;
}
`

export const KanbanFormButton =  styled.button`
  display: inline-block;
  border: none;
  border-radius: 3px;
  font-size:${props => props.fontSize};
  font-family: SuisseIntlLightItalic;
  padding:3px 5px;
 
  outline: none;
  text-decoration: none;
  color: white;
  background-color: ${props => props.bg ? props.bg : "#648FC6"};
  ;

  &:hover{
  // text-decoration: underline;
  background-color: #424658;
  cursor: pointer;
}
`
export const KanbanInsideButton =  styled.button`
color: white;
  font-family: SuisseIntlLight;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  // height: 28px;
  width: 180px;
  white-space: nowrap;
  border: none;
  left: 250px;
  color: "#3F496C";
  background-color: rgba(196,196,196, 0.3) ;
  // background-color:  "#1E1E1E";
  font-size:14px;
`
