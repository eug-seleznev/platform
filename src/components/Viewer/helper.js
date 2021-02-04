import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Oauth } from "../../redux/actions/models"
import Viewer from "./index"





const Helper = ({match, history}) => {
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch();
    const oauth = useSelector(state => state.projects.oauth);

    useEffect(async () => {
        let crypt = match.params.id
        await dispatch(Oauth(crypt))
        // console.log('auth success')

    }, [ ])


    useEffect(() => {
        if(oauth){
            setLoaded(true)
            // console.log(oauth.urn, 'urn', oauth.token, 'toke')
        }
    }, [oauth])



    return (
        <>
        {!loaded ? <p> loading...</p> :(
            <Viewer oauth={oauth} />
            
        )}
        </>
    )
}



export default Helper