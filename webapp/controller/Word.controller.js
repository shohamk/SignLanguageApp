sap.ui.define([
	"sign/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sign.controller.Word", {

		onInit: function() {
    		this.getRouter().getRoute("word").attachPatternMatched(this._routePatternMatched, this);
		},
		
		_routePatternMatched: function(oEvent) {
    		var sId = oEvent.getParameter("arguments").wordId ,
    			oView = this.getView(),
    			sPath = "/words('" + sId + "')";
    
    		/**
    		 * This is how you would implement deepLinking in your app.
    		 *
    		 * Because the oDataService which we use is not fully implemented, we cannot deep link. This code only workds
    		 * with the mockserver, which can be enabled via URL-parameter "responerOn=true"
    		 */
    		var that = this;
    		var oModel = oView.getModel();
    		var oData = oModel.getData(sPath);
    		oView.bindElement(sPath);
    		//if there is no data the model has to request new data
    		if (!oData) {
    			oView.getElementBinding().attachEventOnce("dataReceived", function() {
    				that._checkIfProductAvailable(sPath, sId);
    			});
    		}
	    },
	    
	    fnUpdateProduct: function(sChannel, sEvent, oData) {
    		var sPath = "/Words('" + oData.wordId + "')";
    		this.getView().bindElement(sPath);
    		this._checkIfProductAvailable(sPath, oData.wordId);
    	},

    	_checkIfProductAvailable: function(sPath, sId) {
    		var oModel = this.getView().getModel();
    		var oData = oModel.getData(sPath);
    
    		// show not found page
    		if (!oData) {
    			this._router.getTargets().display("notFound", sId);
    		}
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
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sign.view.Word
		 */
		//	onExit: function() {
		//
		//	}

	});

});