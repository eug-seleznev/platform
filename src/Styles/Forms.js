import styled from 'styled-components'

export const Input = styled.input`
	
	height: 20px;
	background-color:white;
	filter: none;
	text-decoration: none;
	outline: none
` 
export const SearchInput = styled.input`
	border: none;
	border-radius: 5px
	height: 20px;
	background: none;
	filter: none;
	text-decoration: none;
	
` 
export const KanbanSearchInput = styled.input`
	border: none;
	height: 20px;
	margin-left: 4px;
	font-size: 14px;
	background: none;
	filter: none;
	text-decoration: none;
	font-family: SuisseIntlLight;
	color: #CACACA;
	margin-top: 7px;
	margin-bottom: 5px;
	padding: 5px;

	&::placeholder{
		font-family: SuisseIntlLight;
		color: #BEBEBE;
	};
	&:focus{
		border: 1px solid rgba(82, 168, 236, 0.8);
		border-radius: 5px;
		outline: 0;
	}
` 
export const LogForm = styled.form`
	

` 

