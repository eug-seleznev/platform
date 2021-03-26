import { useEffect, useRef, useState, } from "react"
import './Extensions/setup'
import pdf from './pdf/test2.pdf'
import { DangerButton } from "./Extensions/setup";

let env = 'prod';
var viewer;
let Autodesk = window.Autodesk;

const Viewer = ({ oauth, urn, oldUrn }) => {
 
  const container = useRef();
  const [value, setValue] = useState(false)

  const [versions, setVersions] = useState({
    loaded: false,
    urn: null
  })


 const Test = () => {
   console.log("test me");
 };


  var config3d = {
    extensions: ["Autodesk.DocumentBrowser", "VersionExtension"],
    metadata: oldUrn,
    test: value,
    setTest: setValue
  };



      const options_load = {
        keepCurrentModels: true,
      };

      var extensionConfig = {};
    
  var options = {
    env: "AutodeskProduction",
    accessToken: oauth.token,
    api: "derivativeV2_EU", // for models uploaded to EMEA change this option to 'derivativeV2_EU'
  };

      let documentId = "urn:" + urn;


  useEffect(( ) => {
    console.log(value, 'value use effect')
  }, [value])
 

  useEffect(() => {

      if(env==='dev'){
          Autodesk.Viewing.Initializer(options, function() {
          var viewer = new Autodesk.Viewing.GuiViewer3D(container.current, {}); 
          viewer.start();
         if (!pdf) return;
         viewer
           .loadExtension("Autodesk.PDF", "Autodesk.DocumentBrowser")
           .then(() => {
             viewer.loadModel(window.location.origin + "/pdf/test.pdf", {});
           });

});
      
      
      
      
      }


      
       

      if(env == 'prod'){


    Autodesk.Viewing.Initializer(options, () => {
      viewer = new Autodesk.Viewing.GuiViewer3D(container.current, config3d);
      viewer.start();
      // let oldV = "urn:" + oldUrn[oldUrn.length - 2].urn;


      console.log(oldUrn)

      // 
       Autodesk.Viewing.Document.load(
         documentId,
         onDocumentLoadSuccess,
         onDocumentLoadFailure
       );
        if(versions.loaded){
                 Autodesk.Viewing.Document.load(
                   'urn:'+versions.urn,
                   onDocumentLoadSuccess,
                   onDocumentLoadFailure
                 );
        }
      })
    }
   



     
  }, [versions.loaded]);


  function onDocumentLoadSuccess(doc) {

        let viewables = doc.getRoot().getDefaultGeometry();


        console.log(versions, 'VBERSIONS HERE')


        if(!versions.loaded){
              viewer.loadDocumentNode(doc, viewables).then((el) => {
                console.log("loaded");
              });

        } else {
          

          console.log(viewables, 'view!!!!!!!!!')

            viewer
              .loadDocumentNode(doc, viewables, options_load)
              .then((i) => {
                extensionConfig.mimeType = "application/vnd.autodesk.revit";
                extensionConfig.primaryModels = [viewer.getVisibleModels()[1]];
                extensionConfig.diffModels = [viewer.getVisibleModels()[0]];
                extensionConfig.diffMode = "overlay";
                extensionConfig.versionA = "2";
                extensionConfig.versionB = "1";
              })
              .then(() => {
                viewer
                  .loadExtension("Autodesk.DiffTool", extensionConfig)
                  .then(function (res) {
                    window.DIFF_EXT = viewer.getExtension("Autodesk.DiffTool");
                    console.log(window.DIFF_EXT);
                  })
                  .catch(function (err) {
                    console.log(err);
                  });
              });




        }
 

  }

  const  onDocumentLoadFailure = (viewerErrorCode) => {
    console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
  }


  const EnableVersionPlugin = (urn) => {
    if(!versions.urn){
        setVersions({ urn: urn, loaded: true });
    } else {
      setVersions({ urn: null, loaded: false})
    }
  }



  return (
    <div>
      <div
        id="forgeViewer"
        className="viewer-app"
        style={{
          position: "absolute",
          top: "6vh",
          left: "5vw",
          width: "95vw",
          height: "94vh",
        }}
        ref={container}
      ></div>
      {value && (
        <div
          style={{
            backgroundColor: "grey",
            position: "absolute",
            top: "0",
            height: "100vh",
            width: "15vw",
            left: "85vw",
            zIndex: "99999",
            display: "flex",
            flexDirection: "column",
            color: "white",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {oldUrn.map(element => {
            return (
              <div
                style={{
                  display: "flex",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                  width: "80%",
                }}
                onClick={() =>EnableVersionPlugin(element.urn)}
              >
                <p> {element.date.split("T")[0]}</p>
                <p> version: {element.version}</p>
              </div>
            );
          })}
         


        </div>
      )}
    </div>
  );
};



export default Viewer




