sap.ui.define([
	"sign/controller/BaseWordController"
], function(BaseWordController) {
	"use strict";

	return BaseWordController.extend("sign.listcomponent.controller.Word", {

		onInit: function() {
			this.getRouter().getRoute("word").attachPatternMatched(this._routePatternMatched, this);
			this.setContent("wordPage");
		},

		_routePatternMatched: function(oEvent) {
			var sId = oEvent.getParameter("arguments").wordId;
			this.assignRoutePattern(sId, "wordPage");
		},

		handleNavButtonPress: function(oEvent) {
			this.handleNavigation("master");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sign.view.Word
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sign.view.Word
		 */
		//onAfterRendering: function() {
		// 
		//}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sign.view.Word
		 */
		//	onExit: function() {
		//
		//	}

	});

});