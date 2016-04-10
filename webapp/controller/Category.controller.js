sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sign.controller.Category", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sign.view.Category
		 */
		onInit : function () {
			this._router = sap.ui.core.UIComponent.getRouterFor(this);
			this._router.getRoute("categories").attachMatched(this._loadCategory, this);
		},
		
		_loadCategory : function(oEvent) {
			var oWordList = this.getView().byId("wordsList");
			this._changeNoDataTextToIndicateLoading(oWordList);
			var oBinding = oWordList.getBinding("items");
			oBinding.attachDataReceived(this.fnDataReceived, this);
			var sId = oEvent.getParameter("arguments").id;
		//	this._sWordId = oEvent.getParameter("arguments").id;
			this.getView().byId("page").setTitle(sId);
			var oFilter = new sap.ui.model.Filter("categoryId", sap.ui.model.FilterOperator.EQ, sId);
			oBinding.filter([ oFilter ]);
		},
		
		_changeNoDataTextToIndicateLoading: function (oList) {
			var sOldNoDataText = oList.getNoDataText();
			oList.setNoDataText("Loading...");
			oList.attachEventOnce("updateFinished", function() {oList.setNoDataText(sOldNoDataText);});
		},
		
		fnDataReceived: function(oEvent) {
			var that = this,
				oList = this.getView().byId("wordList");
			var aListItems = oList.getItems();
			aListItems.some(function(oItem) {
				if (oItem.getBindingContext().sPath === "/Words('" + that._sWordId + "')") {
					oList.setSelectedItem(oItem);
					return true;
				}
			});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sign.view.Category
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sign.view.Category
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sign.view.Category
		 */
		//	onExit: function() {
		//
		//	}

	});

});