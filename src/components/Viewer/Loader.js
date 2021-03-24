import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { Status } from "../../redux/actions/models";




let new_interval;

const Loader = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
       if (props.status.split(" ")[0] !== "complete") {
         setLoading(true)
       } 

    }, [])

    useEffect(() => {
        if(loading){
            let {crypt, name} = props;
             new_interval = setInterval(() => {
                 if (props.status.split(" ")[0] === "complete" ) {
                        setLoading(false);
                 }
                dispatch(Status({ crypt, name }));
            }, 5000)

            
        } 

        return () => clearInterval(new_interval)


    }, [loading]);

useEffect(() => {
    if (props.status.split(" ")[0] === "complete" ) {
        setLoading(false);
        clearInterval(new_interval);
    }

}, [props.status])

    
    if(props.status.split(' ')[0] !== 'complete'){
        return <p>{props.status.split(" ")[0]}</p>;
    }




    return (
        <div>
            {props.children}
        </div>
    )

}



export default Loader