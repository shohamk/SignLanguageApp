sap.ui.define([
	"sign/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sign.gridcomponent.controller.CategoryGrid", {

		_iCurrPageNumber: 0,
		_iPagesNumber: -1,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sign.view.CategoryGrid
		 */
		onInit: function() {
			this.getRouter().getRoute("categorygrid").attachPatternMatched(this._loadCategory, this);
		},

		_loadCategory: function(oEvent) {
			debugger;
			var oWordGrid = this.getView().byId("wordsGrid");
			//this._changeNoDataTextToIndicateLoading(oWordGrid);
			var oBinding = oWordGrid.getBinding("content");
			//		oBinding.attachDataReceived(this.fnDataReceived, this);
			var sId = oEvent.getParameter("arguments").categoryId;
			var categoryContext = oWordGrid.getModel('sign').getContext('/categories/' + sId + "/name");
			var categoryName = categoryContext.getObject();
			this.getView().byId("wordsGridPage").setTitle(categoryName);

			var aWord = _.filter(oBinding.oList, function(o) {
				return o.categoryId == sId;
			});

			var iNumOfCat = 4;
			//Calculate the number of pages only once
			if (this._iPagesNumber === -1) {
				var modulu = aWord.length % iNumOfCat;
				if (modulu > 0) {
					this._iPagesNumber = Math.floor(aWord.length / iNumOfCat);
				} else {
					this._iPagesNumber = aWord.length / iNumOfCat - 1;
				}
			}
			aWord.sort(function(a, b) {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			});

			var iFrom = iNumOfCat * this._iCurrPageNumber;
			var iTo = iFrom + iNumOfCat - 1;
			if (iTo > aWord.length - 1) {
				iTo = aWord.length - 1;
			}
			var aDispalyWord = [];
			//var num = parseInt(sId, 10) - 1 ;
			if (aWord.length > 0) {
				for (var i = iFrom; i <= iTo; i++) {
					aDispalyWord.push(new sap.ui.model.Filter("id", sap.ui.model.FilterOperator.EQ, aWord[i].id));
				}
				oBinding.filter(aDispalyWord);
			}
			// var oFilter = new sap.ui.model.Filter("categoryId", sap.ui.model.FilterOperator.EQ, sId);
			// oBinding.filter([oFilter]);
		},

		handleNavButtonPress: function() {
			this.getRouter().navTo("mastergrid", {}, true);
		},

		
		handleSearch : function (oEvent) {
    		this._gridSearch("wordsGrid", "filteredGridCont");
    	},


		leftArrowPressed: function(oEvent) {
			if (this._iCurrPageNumber === 0) {
				var oRightArrow = this.getView().byId("rightArrow");
				oRightArrow.setEnabled(true);
			}
			this._iCurrPageNumber++;
			this._loadCategory(oEvent);
			if (this._iCurrPageNumber === this._iPagesNumber) {
				var oLeftArrow = this.getView().byId("leftArrow");
				oLeftArrow.setEnabled(false);
			}

		},

		rightArrowPressed: function(oEvent) {
			if (this._iCurrPageNumber === this._iPagesNumber) {
				var oLeftArrow = this.getView().byId("leftArrow");
				oLeftArrow.setEnabled(true);
			}
			this._iCurrPageNumber--;
			this._loadCategory(oEvent);
			if (this._iCurrPageNumber === 0) {
				var oRightArrow = this.getView().byId("rightArrow");
				oRightArrow.setEnabled(false);
			}

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