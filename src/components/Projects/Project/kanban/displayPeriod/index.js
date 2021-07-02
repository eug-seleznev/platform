
import styles from './period.module.css'


const DisplayPeriod =({close})=>{



    return (
        <div className={styles.bg} onClick={close}>
            <div className={styles.container}>
        display period
            </div>
        </div>
        
    )
}
export default DisplayPeriod