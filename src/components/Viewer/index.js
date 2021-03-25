import { useEffect, useRef, } from "react"
import './Extensions/setup'
import pdf from './pdf/test2.pdf'


let env = 'prod';
var viewer;
let Autodesk = window.Autodesk;

const Viewer = ({ oauth, projectTitle, urn, oldUrn }) => {
 
  const container = useRef();

  var options = {
    env: "AutodeskProduction",
    accessToken: oauth.token,
    api: "derivativeV2_EU", // for models uploaded to EMEA change this option to 'derivativeV2_EU'
  };


  var config3d = {
    extensions: ["Autodesk.DocumentBrowser", "VersionExtension"],
  };



      const options_load = {
        keepCurrentModels: true,
      };


    var extensionConfig = {};











  useEffect(() => {





    console.log(oldUrn, 'old ')

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
      let documentId = "urn:" + urn;
      let oldV = "urn:" + oldUrn[oldUrn.length - 2].urn;


  

      // Autodesk.Viewing.Document.load(
      //   oldV,
      //   onDocumentLoadSuccess,
      //   onDocumentLoadFailure
      // );

       Autodesk.Viewing.Document.load(
         documentId,
         onDocumentLoadSuccess,
         onDocumentLoadFailure
       );

      })
    }
   



     
  }, []);



  function onDocumentLoadSuccess(doc) {

        viewer.loadModel(
      "https://developer.api.autodesk.com/derivativeservice/v2/derivatives/urn%dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6emdzazR4b3o0OWFicXdrb2JldG9pbmwyb2hobDRka2xfYnVyb19tb2RlbF9idWNrZXQvYTRmNGQ1ZTVmODQ1OWQzMjA0ZGYyNWU1OTE3ZTFiNTcucnZ0.svf",
      {}, () => {
        console.log( "new");
      }
    );

        let viewables = doc.getRoot().getDefaultGeometry();
        // console.log(doc.getRoot().getDefaultGeometry());
        
        viewer.loadDocumentNode(doc, viewables).then(el => {
          console.log('loaded')
        })



        // viewer.loadDocumentNode(doc, viewables, options_load).then((i) => {
        //   extensionConfig.mimeType = "application/vnd.autodesk.revit";
        //   extensionConfig.primaryModels = [viewer.getVisibleModels()[1]];
        //   extensionConfig.diffModels = [viewer.getVisibleModels()[0]];
        //   extensionConfig.diffMode = "overlay";
        //   extensionConfig.versionA = "2";
        //   extensionConfig.versionB = "1";
        // }).then(() => {
        //  viewer
        //    .loadExtension("Autodesk.DiffTool", extensionConfig)
        //    .then(function (res) {
        //      window.DIFF_EXT = viewer.getExtension("Autodesk.DiffTool");
        //      console.log(window.DIFF_EXT);
        //    })
        //    .catch(function (err) {
        //      console.log(err);
        //    });

        // });


        
    


 

  }

  function onDocumentLoadFailure(viewerErrorCode) {
    console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
  }

  return (
      <div>
        <div
          id="forgeViewer"
          className="viewer-app"
          style={{
            position: "absolute",
            top: "3vh",
            left: "0",
            width: "98vw",
            height: "96vh",
          }}
          ref={container}
        >
          
        </div>
      </div>

  );
};



export default Viewer




