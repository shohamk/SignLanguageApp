sap.ui.define([
	"sign/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sign.controller.Master", {

		onInit : function () {
				this._search();
		},
		
		handleSearch : function (oEvent) {
    		this._search();
    	},


    	_search : function () {
    		var oView = this.getView();
    		var oProductList = oView.byId("wordsList");
    		var oCategoryList = oView.byId("categoryList");
    		var oSearchField = oView.byId("searchField");
    
    		// switch visibility of lists
    		var bShowSearch = oSearchField.getValue().length !== 0;
    		
    		oProductList.setVisible(bShowSearch);
    		oCategoryList.setVisible(!bShowSearch);
    		
    		if (bShowSearch) {
    			this._changeNoDataTextToIndicateLoading(oProductList);
    		}
    
    		// filter product list
    		var oBinding = oProductList.getBinding("items");
    		if (oBinding) {
    			if (bShowSearch) {
    				var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, oSearchField.getValue());
    				oBinding.filter([oFilter]);
    			} else {
    				oBinding.filter([]);
    			}
    		}
    	},
		
		_changeNoDataTextToIndicateLoading: function (oList) {
    		var sOldNoDataText = oList.getNoDataText();
    		oList.setNoDataText("Loading...");
    		oList.attachEventOnce("updateFinished", function() {oList.setNoDataText(sOldNoDataText);});
    	},
	
		handleCategoryListItemPress : function (oEvent) {
			var oBindContext = oEvent.getSource().getBindingContext();
			var oModel = oBindContext.getModel();
			debugger;
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