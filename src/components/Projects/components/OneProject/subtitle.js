import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { Light } from '../../../../Styles/typography'


const Subtitle = ({title, src, buttonFunc, buttonActive, subtwidth, srcplus,open, isopen, openfunc}) => {
    // const [overCard, setOvercard] = useState(false)

    return(
		<div className={styles.sprint__title} style={{width:subtwidth}}>
			<div className={styles.sprint__in}>
				<img alt='sprint' className={styles.sprint__title__img} src={src}></img>
				<Light size='22' style={{width:'250px'}}>{title}</Light>
				<img alt='sprint' className={styles.sprint__title__plus} style={{display:`${buttonActive?'flex':'none'}`}} onClick={buttonFunc} src={srcplus?'/minus.png':'/plus.png'}></img>
			</div>
			
			<div>
				{/* <img alt='sprint' style={{display:`${open?'block':'none'}`,cursor:'pointer', transform:`${isopen?'rotate(180deg)':'rotate(0deg)'}`}} onClick={openfunc} src='/openicon.png'></img> */}
			</div>
	  	</div>
    )
}
export default Subtitle