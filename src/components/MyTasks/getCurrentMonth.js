
const getCurrentMonth = (date) =>{

	if(date!==undefined){
		let date11 = new Date (date)
		
	  	let date22 = 
			  date11.getMonth()+1===1?'Январь':
			  date11.getMonth()+1===2?'Февраль':
			  date11.getMonth()+1===3?'Март':
			  date11.getMonth()+1===4?'Апрель':
			  date11.getMonth()+1===5?'Май':
			  date11.getMonth()+1===6?'Июнь':
			  date11.getMonth()+1===7?'Июль':
			  date11.getMonth()+1===8?'Август':
			  date11.getMonth()+1===9?'Сентябрь':
			  date11.getMonth()+1===10?'Октябрь':
			  date11.getMonth()+1===11?'Ноябрь':
			  date11.getMonth()+1===12?'Декабрь':''
			return (date22) 
}
}

export default getCurrentMonth