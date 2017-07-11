/*global history */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("sign.controller.BaseController", {
		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function(sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Event handler  for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 */
		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("master", {}, bReplace);
			}
		},

		_search: function(mainList, searchList) {
			var oView = this.getView();
			var oProductList = oView.byId(searchList);
			var oCategoryList = oView.byId(mainList);
			var oSearchField = oView.byId("searchField");

			// switch visibility of lists
			var bShowSearch = oSearchField.getValue().length !== 0;

			oProductList.setVisible(bShowSearch);
			oCategoryList.setVisible(!bShowSearch);

			if (bShowSearch) {
				this._changeNoDataTextToIndicateLoading(oProductList);
			}
			
			if(bShowSearch){
				oSearchField.setShowSearchButton(false);
			}
			else{
				oSearchField.setShowSearchButton(true);
			}

			// filter product list
			var oBinding = oProductList.getBinding("items");
			if (oBinding) {
				if (bShowSearch) {
					var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.StartsWith, oSearchField.getValue());
					oBinding.filter([oFilter]);
				} else {
					oBinding.filter([]);
				}
			}
		},
		
		_gridSearch: function(mainGrid, searchGrid) {
			var oView = this.getView();
			var oFilteredGrid = oView.byId(searchGrid);
			var oMainGrid = oView.byId(mainGrid);
			var oSearchField = oView.byId("gridSearchField");

			// switch visibility of lists
			var bShowSearch = oSearchField.getValue().length !== 0;

			oFilteredGrid.setVisible(bShowSearch);
			oMainGrid.setVisible(!bShowSearch);
			
			if(bShowSearch){
				oSearchField.setShowSearchButton(false);
			}
			else{
				oSearchField.setShowSearchButton(true);
			}

			// if (bShowSearch) {
			// 	this._changeNoDataTextToIndicateLoading(oFilteredGrid);
			// }

			// filter list
			var oBinding = oFilteredGrid.getBinding("content");
			if (oBinding) {
				if (bShowSearch) {
					var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.StartsWith, oSearchField.getValue());
					oBinding.filter([oFilter]);
				} else {
					oBinding.filter([]);
				}
			}
		},

		_changeNoDataTextToIndicateLoading: function(oList) {
			var sOldNoDataText = oList.getNoDataText();
			oList.setNoDataText("Loading...");
			oList.attachEventOnce("updateFinished", function() {
				oList.setNoDataText(sOldNoDataText);
			});
		},

		handleWordListSelect: function(oEvent) {
			var oBindContext = oEvent.getParameters().listItem.getBindingContext("sign");
			var oModel = oBindContext.getModel("sign");
			var sCategoryId = oModel.getProperty(oEvent.mParameters.listItem.oBindingContexts.sign.sPath).categoryId;
			var sWordId = oModel.getProperty(oEvent.mParameters.listItem.oBindingContexts.sign.sPath).id;
			this.getRouter().navTo("word", {
				categoryId: sCategoryId,
				wordId: sWordId
			});
		},

		handleWordListPress: function(oEvent) {
			var oBindContext = oEvent.getSource().getBindingContext("sign");
			var oModel = oBindContext.getModel("sign");
			var sCategoryId = oModel.getProperty(oBindContext.getPath()).categoryId;
			var sWordId = oModel.getProperty(oBindContext.getPath()).id;
			this.getRouter().navTo("word", {
				categoryId: sCategoryId,
				wordId: sWordId
			});
		},

		handleWordGridPress: function(oEvent) {
			var oBindContext = oEvent.getSource().getBindingContext("sign");
			var oModel = oBindContext.getModel("sign");
			var sCategoryId = oModel.getProperty(oBindContext.getPath()).categoryId;
			var sWordId = oModel.getProperty(oBindContext.getPath()).id;
			this.getRouter().navTo("wordgrid", {
				categoryId: sCategoryId,
				wordId: sWordId
			});
		}

	});

});