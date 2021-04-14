

import styled from "styled-components";





export const Button = styled.button`
  display: inline-block;
  border: 0.4px solid #b7b7b7;
  border-radius: 13px;
  font-size: ${(props) => props.fontSize};
  font-family: SuisseIntlSemibold;

  padding-left: ${(props) => props.padd};
  padding-right: ${(props) => props.padd};
  padding-top: 11px;
  padding-bottom: 9px;

  outline: none;
  text-decoration: none;
  color: white;
  background-color: ${(props) => (props.grey ? "grey" : "#3F496C")};
  &:hover {
    // text-decoration: underline;
    background-color: black;
    cursor: pointer;
  }
`




export const Card = styled.div`
  background-color: white;
  border: 0.4px solid #b7b7b7;
  border-radius: 7px;
  margin-bottom: 5px;
  height: auto;
`;