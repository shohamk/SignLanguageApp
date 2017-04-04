sap.ui.define([
	"sign/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sign.gridcomponent.controller.MasterGrid", {

		_iCurrPageNumber: 0,
		_iPagesNumber: -1,

		handleSearch : function (oEvent) {
    		this._gridSearch("masterGridCont", "filteredGridCont");
    	},

		handleMasterGridItemPress: function(oEvent) {
			var oBindContext = oEvent.getSource().getBindingContext("sign");
			var oModel = oBindContext.getModel("sign");
			var sCategoryId = oModel.getProperty(oBindContext.getPath()).id;
			this.getRouter().navTo("categorygrid", {
				categoryId: sCategoryId
			}, true);
		},

		handleListViewButtonPress: function() {
			var oComp = sap.ui.getCore().getComponent("sign.listcomponent");
			if (oComp === undefined) {
				oComp = sap.ui.getCore().createComponent("sign.listcomponent");
			}
			var oContainer = sap.ui.getCore().byId("shell");
			oContainer.setComponent(oComp);
		},

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sign.view.view.MasterGrid
		 */
		onInit: function() {
			var oModel = sap.ui.getCore().getModel("sign");
			oModel.attachRequestCompleted(this._loadCategory, this);
			this._gridSearch("masterGridCont", "filteredGridCont");
		},

		_loadCategory: function(oEvent) {

			var oMasterGridCont = this.getView().byId("masterGridCont");
			var oBinding = oMasterGridCont.getBinding("content");
			var aCategory = oBinding.oList.slice();
			var iNumOfCat = 4;
			//Calculate the number of pages only once
			if(this._iPagesNumber === -1){
				var modulu = aCategory.length%iNumOfCat;
				if(modulu >0){
					this._iPagesNumber = Math.floor(aCategory.length/iNumOfCat) ;
				}
				else{
					this._iPagesNumber = aCategory.length/iNumOfCat - 1;
				}	
			}
			aCategory.sort(function(a, b) {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			});
		
			var iFrom = iNumOfCat * this._iCurrPageNumber;
			var iTo = iFrom + iNumOfCat - 1;
			if (iTo > aCategory.length -1){
				iTo = aCategory.length -1;
			}
			var aDispalyCat = [];

			if (aCategory.length > 0) {
				for (var i = iFrom; i <= iTo; i++) {
					aDispalyCat.push(new sap.ui.model.Filter("id", sap.ui.model.FilterOperator.EQ, aCategory[i].id));
				}
				oBinding.filter(aDispalyCat);
			}

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sign.view.view.MasterGrid
		 */
		onBeforeRendering: function() {

		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sign.view.view.MasterGrid
		 */
		onAfterRendering: function() {

		},

		leftArrowPressed: function(oEvent) {
			if(	this._iCurrPageNumber === 0){
				var oRightArrow = this.getView().byId("rightArrow");
       			oRightArrow.setEnabled(true);
			}
			this._iCurrPageNumber++;
			this._loadCategory(oEvent);
			if(	this._iCurrPageNumber === this._iPagesNumber){
				var oLeftArrow = this.getView().byId("leftArrow");
       			oLeftArrow.setEnabled(false);
			}
			
		},
		
		rightArrowPressed: function(oEvent) {
			if(	this._iCurrPageNumber === this._iPagesNumber){
				var oLeftArrow = this.getView().byId("leftArrow");
       			oLeftArrow.setEnabled(true);
			}
			this._iCurrPageNumber--;
			this._loadCategory(oEvent);
			if(	this._iCurrPageNumber === 0){
				var oRightArrow = this.getView().byId("rightArrow");
       			oRightArrow.setEnabled(false);
			}
			
		}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sign.view.view.MasterGrid
		 */
		//	onExit: function() {
		//
		//	}

	});

});