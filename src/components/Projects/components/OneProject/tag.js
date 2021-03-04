import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { Light } from '../../../../Styles/typography'



const Tag = ({tagColor, tagText}) => {
    // const [overCard, setOvercard] = useState(false)

    return(
		<Light className={styles.tag} color='#3F496C'size='16' style={{backgroundColor:tagColor}}>
			{tagText}
	  	</Light>
    )
}
export default Tag