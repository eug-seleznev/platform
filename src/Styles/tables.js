import styled from 'styled-components'


export const Table = styled.div`
margin:0;
margin-bottom:40px;
border-bottom: 2px solid Black;

`

export const Sprint_Table = styled.table`
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
export const Sprint_Td = styled.td`
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