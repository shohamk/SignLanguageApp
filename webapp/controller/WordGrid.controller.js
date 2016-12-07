sap.ui.define([
	"sign/controller/BaseWordController"
], function(BaseWordController) {
	"use strict";

	return BaseWordController.extend("sign.controller.WordGrid", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sign.view.WordGrid
		 */
		onInit: function() {
			this.getRouter().getRoute("wordgrid").attachPatternMatched(this._routePatternMatched, this);
			this.setContent("wordGridPage");
		},

		_routePatternMatched: function(oEvent) {
			var sId = oEvent.getParameter("arguments").wordId;
			this.assignRoutePattern(sId, "wordGridPage");
		},

		handleNavButtonPress: function(oEvent) {
			this.handleNavigation("mastergrid");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sign.view.WordGrid
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sign.view.WordGrid
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sign.view.WordGrid
		 */
		//	onExit: function() {
		//
		//	}

	});

});