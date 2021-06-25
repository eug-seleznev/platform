import { useState } from "react"
import { useSelector } from "react-redux"
import AddUsers from "./Setttings/addUsers"
import ChangeType from "./Setttings/changeType"
import Copy from "./Setttings/copy"
import Deadline from "./Setttings/deadline"
import VisibleDeadline from "./Setttings/visibleDeadline"
import Like from "./Setttings/like"
import Notifications from "./Setttings/notifications"
import settings from './Setttings/settings.module.css'

const NewSettings = ({theme,info,users,projTeam,eventUsers,timelineId}) => {
    const [open,setOpen]=useState('')
    
    return (
        <div className={settings.main}>
            <div className={settings.imagesRow}>
                <AddUsers open={open} setOpen={setOpen} users={users} info={info} theme={theme}  eventUsers={eventUsers} projTeam={projTeam}></AddUsers>
                <Notifications open={open} theme={theme}  setOpen={setOpen} deadline={info.deadline} id={info._id}></Notifications>
                <Deadline id={info._id} theme={theme}  emergency={info.emergency} open={open} setOpen={setOpen}></Deadline>
                <Like info={info} theme={theme} ></Like>
                <Copy theme={theme}  timelineId={timelineId} id={info._id} title={info.title} open={open} setOpen={setOpen}></Copy>
            </div>
            <div className={settings.visibleRow}>
                {info.deadline && <VisibleDeadline theme={theme} info={info}/>}
                <ChangeType theme={theme} info={info}/>
            </div>
            
        </div>
        
    )

}
export default NewSettings