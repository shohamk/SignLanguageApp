sap.ui.define([
	"sign/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sign.controller.CategoryGrid", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sign.view.CategoryGrid
		 */
		onInit: function() {
			this.getRouter().getRoute("categorygrid").attachPatternMatched(this._loadCategory, this);
		},

		_loadCategory: function(oEvent) {
			var oWordGrid = this.getView().byId("wordsGrid");
			//this._changeNoDataTextToIndicateLoading(oWordGrid);
			var oBinding = oWordGrid.getBinding("content");
			//		oBinding.attachDataReceived(this.fnDataReceived, this);
			var sId = oEvent.getParameter("arguments").categoryId;

			//var num = parseInt(sId, 10) - 1 ;
			var categoryContext = oWordGrid.getModel('sign').getContext('/categories/' + sId + "/name");
			var categoryName = categoryContext.getObject();
			this.getView().byId("wordsGridPage").setTitle(categoryName);
			var oFilter = new sap.ui.model.Filter("categoryId", sap.ui.model.FilterOperator.EQ, sId);
			oBinding.filter([oFilter]);
		},
		
		handleNavButtonPress : function(){
			this.getRouter().navTo("mastergrid", {}, true);
		}
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sign.view.CategoryGrid
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sign.view.CategoryGrid
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sign.view.CategoryGrid
		 */
		//	onExit: function() {
		//
		//	}

	});

});