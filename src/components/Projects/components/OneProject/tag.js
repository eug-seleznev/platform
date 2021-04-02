import { useDispatch } from 'react-redux'
import { getProject, sortByTags } from '../../../../redux/actions/projects'
import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { Light } from '../../../../Styles/typography'



const Tag = ({tagColor, tagText, size, projectPage, crypt}) => {
    // const [overCard, setOvercard] = useState(false)
	const dispatch = useDispatch()
	const sortSprints =()=>{
		if(tagText!=='Все') {
			dispatch(sortByTags(crypt,tagText))
		}
		
		else if(tagText==='Все') {
			dispatch(getProject(crypt))
		}
	}
    return(
		<Light className={styles.tag} color='#3F496C'size={size===undefined?'16':size} onClick={()=>projectPage?sortSprints():''} style={{backgroundColor:tagColor, cursor:`${projectPage?'pointer':'default'}`}}>
			{tagText}
	  	</Light>
    )
}
export default Tag