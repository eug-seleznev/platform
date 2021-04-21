import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeContainer } from '../../redux/actions/user';
import style from '../../Styles/modules/components/docs.module.css'

export const url = process.env.REACT_APP_IP_DOCS;

const Docs =()=>{
	const dispatch = useDispatch()
	useEffect(()=>{
		let style= {
			padding:0
		}
		dispatch(changeContainer(style))
		return ()=>{
			let style= {
				
			}
			dispatch(changeContainer(style))
		}
	},[])
	const post =(e)=>{
		e.target.contentWindow.postMessage(localStorage.token,url)
	}
	return(
		<div className={style.editor} >
			<iframe 
			onLoad={(e)=>post(e)}
			className={style.iframe}
			 src={url} title="description"></iframe>
		</div>
	)
}
export default Docs