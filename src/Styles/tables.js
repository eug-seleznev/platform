import styled from 'styled-components'


export const Table = styled.div`
margin:0;
margin-bottom:40px;
border-bottom: 2px solid Black;

`

export const SPRINT_TABLE = styled.table`
  margin: 0;
  margin-bottom: 40px;
  border: none;
  width: 100%;
  border-collapse: collapse
`;
export const TR = styled.tr`
    height: 28px;
    border: none;
  
`
export const SPRINT_TD = styled.td`
    height: 28px;
    border: none;
    font-family: SuisseIntlLight;
    font-size:16px;
`
export const Select = styled.select`
    outline: none;
    background:none;
    border: none;
    font-family: SuisseIntlLight;
    font-size:16px;
`
export const NEW_TABLE = styled.table`
border-collapse: collapse;
   border-radius:5px;
    background-color: white;
`
export const NEW_THEAD = styled.thead`
   width:100%;

  
`
export const NEW_TR = styled.tr`

padding:30px;
height:fit-content;
cursor:pointer;
text-align: center;
&:hover {
    background: #F1EFEF
}
`

export const NEW_TH = styled.th`

color: #8C8C8C;
font-family: SuisseIntlThin;
font-size: 14px;
text-align: center;
padding-right: 10px;
padding-top: 20px;
padding-bottom: 20px
`
export const NEW_TD = styled.td`
    font-size: 14px;
    text-align: center;
    height:fit-content;
    font-family: SuisseIntlLight;
    padding-right: 45px;
    min-height: 30px!important;
    color: ${props=>props.color===undefined?'#3F496C':props.color};
    &:first-child {
        text-align: left;
    }
`
export const Fr_Td = styled.td`
    font-size: 14px;
    text-align: left;
    vertical-align: middle;
    font-family: SuisseIntlLight;
    padding-right: 45px;
   
    color: ${props=>props.color===undefined?'#3F496C':props.color};
    &:first-child {
        text-align: left;
    }
`
export const NEW_TBODY = styled.tbody`
    width:100%;
`
export const Tr = styled.div` //need columns='...' on <Tr> and top='top' on sorting <Tr>
display: grid;
grid-template-columns: ${props => props.columns};     
column-gap: 0px;   
// grid-template-rows: 52px; 
border-bottom: .5px solid gray;  
cursor: ${props => props.top?'default':'pointer'};
font-weight: ${props => props.top?'bold':'normal'};


&:hover{
    background-color: ${props => props.top?'transparent':'rgb(211, 211, 211)'};
}




`
export const Td = styled.p`
font-family: SuisseIntlThin;
font-size: 16px;
overflow: hidden; 
white-space: nowrap;
text-overflow: ellipsis;

`