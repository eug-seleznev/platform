import AddUsers from "./Setttings/addUsers"
import ChangeType from "./Setttings/changeType"
import Deadline from "./Setttings/deadline"
import Notifications from "./Setttings/notifications"
import settings from './Setttings/settings.module.css'

const NewSettings = ({theme,info}) => {
    return (
        <div className={settings.main}>
            <div>
                <AddUsers></AddUsers>
                <Notifications></Notifications>
                <Deadline></Deadline>
            </div>
            <ChangeType theme={theme} info={info}></ChangeType>
        </div>
        
    )

}
export default NewSettings