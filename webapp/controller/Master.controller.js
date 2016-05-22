sap.ui.define([
	"sign/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sign.controller.Master", {

		onInit : function () {
				this._search("categoryList", "wordsList");
		},
		
		handleSearch : function (oEvent) {
    		this._search("categoryList", "wordsList");
    	},

		handleCategoryListItemPress : function (oEvent) {
			var oBindContext = oEvent.getSource().getBindingContext("sign");
			var oModel = oBindContext.getModel("sign");
			var sCategoryId = oModel.getProperty(oBindContext.getPath()).id;
			this.getRouter().navTo("category", {categoryId: sCategoryId},true);
		}
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sign.view.Master
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sign.view.Master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sign.view.Master
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sign.view.Master
		 */
		//	onExit: function() {
		//
		//	}

	});

});