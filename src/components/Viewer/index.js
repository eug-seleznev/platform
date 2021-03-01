import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Oauth } from "../../redux/actions/models";


var viewer;




const Viewer = ({oauth, project}) => {
    const dispatch = useDispatch();
    let Autodesk = window.Autodesk;
    const container = useRef();           


// let options = {
//   env: "AutodeskProduction",
//   api: "derivativeV2", // for models uploaded to EMEA change this option to 'derivativeV2_EU'
//   getAccessToken: function (onTokenReady) {
//     var token = oauth.token
//     var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
//     onTokenReady(token, timeInSeconds);
//   },
// };


 var options = {
   env: "AutodeskProduction",
   accessToken: oauth.token,
   api: "derivativeV2_EU", // for models uploaded to EMEA change this option to 'derivativeV2_EU'
 };




    useEffect(()  =>  {
 

   Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(container.current);
    viewer.start();
    let documentId = 'urn:' + project.urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });

    }, []);
    
function onDocumentLoadSuccess(doc) {

  let viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then((i) => {
    console.log(Autodesk.Viewing.UI.ToolBar);

  });
}


function onDocumentLoadFailure(viewerErrorCode) {
  console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
}








    return (
    <>
        <h1> model for: {project.title}</h1>
        <div
          style={{
            width: "80vw",
            height: "80vh",
            backgroundColor: "grey",
            left: "0px",
          }}
        >
          <div
            id="forgeViewer" 
            className="viewer-app"
            style={{ position: "absolute", width: "80vw", height: "80vh" }}
            ref={container}
          ></div>


        </div>
      </>
    );
}



export default Viewer




