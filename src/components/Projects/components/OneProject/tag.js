import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { Light } from '../../../../Styles/typography'



const Tag = ({tagColor, tagText, size}) => {
    // const [overCard, setOvercard] = useState(false)

    return(
		<Light className={styles.tag} color='#3F496C'size={size===undefined?'16':size} style={{backgroundColor:tagColor}}>
			{tagText}
	  	</Light>
    )
}
export default Tag