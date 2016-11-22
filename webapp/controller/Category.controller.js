sap.ui.define([
	"sign/controller/BaseController",
	"sap/ui/core/routing/History"
], function(BaseController, History) {
	"use strict";

	return BaseController.extend("sign.controller.Category", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sign.view.Category
		 */
		onInit: function() {
			this.getRouter().getRoute("category").attachPatternMatched(this._loadCategory, this);
			this._search("wordsList", "searchedWordsList");
		},

		handleSearch: function() {
			this._search("wordsList", "searchedWordsList");
		},

		_loadCategory: function(oEvent) {
			var oWordList = this.getView().byId("wordsList");
			this._changeNoDataTextToIndicateLoading(oWordList);
			var oBinding = oWordList.getBinding("items");
			//		oBinding.attachDataReceived(this.fnDataReceived, this);
			var sId = oEvent.getParameter("arguments").categoryId;

			//var num = parseInt(sId, 10) - 1 ;
			var categoryContext = oWordList.getModel('sign').getContext('/categories/' + sId + "/name");
			var categoryName = categoryContext.getObject();
			this.getView().byId("page").setTitle(categoryName);
			var oFilter = new sap.ui.model.Filter("categoryId", sap.ui.model.FilterOperator.EQ, sId);
			oBinding.filter([oFilter]);
		},

		_changeNoDataTextToIndicateLoading: function(oList) {
			var sOldNoDataText = oList.getNoDataText();
			oList.setNoDataText("Loading...");
			oList.attachEventOnce("updateFinished", function() {
				oList.setNoDataText(sOldNoDataText);
			});
		},

		fnDataReceived: function(oEvent) {
			var that = this,
				oList = this.getView().byId("wordList");
			var aListItems = oList.getItems();
			aListItems.some(function(oItem) {
				if (oItem.getBindingContext("sign").sPath === "/Words('" + that._sWordId + "')") {
					oList.setSelectedItem(oItem);
					return true;
				}
			});
		},

		handleNavButtonPress: function(oEvent) {
			// 			var oHistory, sPreviousHash;
			// 			oHistory = History.getInstance();
			// 			sPreviousHash = oHistory.getPreviousHash();
			// 			if (sPreviousHash !== undefined) {
			// 				window.history.go(-1);
			// 			} else {
			this.getRouter().navTo("master", {}, true /*no history*/ );
			//}
		}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf sign.view.Category
			 */
			//	onBeforeRendering: function() {
			//		
			//	}

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