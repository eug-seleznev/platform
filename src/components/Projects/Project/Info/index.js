
import { useSelector } from "react-redux"
import { Path } from "../../../Layout/header"
import ProjInfo from "../../components/OneProject/projInfo"
import NewFields from "./newFields"


const Info = ({history}) => {
    const project = useSelector (state=>state.projects.project)

    return (
        <div>
          <ProjInfo history={history} project={project} singlePage={true}></ProjInfo>
          <NewFields project={project}></NewFields>
        </div>
    )

}
export default Info
{/* <ProjectTeam/> */}