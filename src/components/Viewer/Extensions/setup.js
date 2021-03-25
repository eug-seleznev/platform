let Autodesk = window.Autodesk;

class VersionExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this._group = null;
    this._button = null;
  }

  load() {
    console.log("MyAwesomeExtensions has been loaded");
    return true;
  }

  unload() {
    if (this._group) {
      this._group.removeControl(this._button);
      if (this._group.getNumberOfControls() === 0) {
        this.viewer.toolbar.removeControl(this._group);
      }
    }
    console.log("MyAwesomeExtensions has been unloaded");
    return true;
  }

  onToolbarCreated() {
    // Create a new toolbar group if it doesn't exist
    this._group = this.viewer.toolbar.getControl(
      "VersionToolBar"
    );
    if (!this._group) {
      this._group = new Autodesk.Viewing.UI.ControlGroup("VersionToolBar");
      this.viewer.toolbar.addControl(this._group);
    }

    // Add a new button to the toolbar group
    this._button = new Autodesk.Viewing.UI.Button("VersionButton");
    this._button.onClick = (ev) => {
      console.log('hello world')
      // Execute an action here
      // Get current selection
      const selection = this.viewer.getSelection();
      this.viewer.clearSelection();
      // Anything selected?
      if (selection.length > 0) {
        let isolated = [];
        // Iterate through the list of selected dbIds
        selection.forEach((dbId) => {
          // Get properties of each dbId
          this.viewer.getProperties(dbId, (props) => {
            // Output properties to console
            console.log(props);
            // Ask if want to isolate
            if (window.confirm(`Isolate ${props.name} (${props.externalId})?`)) {
              isolated.push(dbId);
              this.viewer.isolate(isolated);
            }
          });
        });
      } else {
        // If nothing selected, restore
        this.viewer.isolate(0);
      }
    };
    this._button.setToolTip("Сравнить модели");
    this._button.addClass("VersionIcon");
    this._group.addControl(this._button);
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  "VersionExtension",
  VersionExtension
);
