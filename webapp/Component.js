sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/m/routing/Router",
	"sign/model/models"
], function(UIComponent, Device, Router, models) {
	"use strict";

	return UIComponent.extend("sign.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			this._router = this.getRouter();

			//navigate to initial page for !phone
			if (!sap.ui.Device.system.phone) {
				this._router.getTargets().display("MasterView");
			}

			// initialize the router
			this._router.initialize();
		},
		
		createContent: function () {
			// create root view
			return sap.ui.view({
				viewName: "sign.view.Main",
				type: "XML"
			});
		}
	});

});