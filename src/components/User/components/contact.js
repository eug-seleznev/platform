import { Light } from "../../../Styles/typography"
import styles from '../../../Styles/modules/components/profile.module.css'
const Contact = ({src, text}) =>{
	return (
		<div className={styles.info__point}>
			<img alt='inf'  src={src}></img>
			<Light style={{marginLeft:'10px'}}>{text}</Light>
		</div>
	)
}
export default Contact