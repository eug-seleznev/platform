

const getDate = (date) =>{

	if(date!==undefined){
		let date11 = new Date (date)
		
	  	let date22 = date11.getDate() +' '+ (
			  date11.getMonth()+1===1?'января':
			  date11.getMonth()+1===2?'февраля':
			  date11.getMonth()+1===3?'марта':
			  date11.getMonth()+1===4?'апреля':
			  date11.getMonth()+1===5?'мая':
			  date11.getMonth()+1===6?'июня':
			  date11.getMonth()+1===7?'июля':
			  date11.getMonth()+1===8?'августа':
			  date11.getMonth()+1===9?'сентября':
			  date11.getMonth()+1===10?'октября':
			  date11.getMonth()+1===11?'ноября':
			  date11.getMonth()+1===12?'декабря':'')
		let date33 = date11.getFullYear()
			return (date22+" "+date33) 
}
}

export default getDate