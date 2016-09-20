sap.ui.define([
	"sign/controller/BaseController",
	"sap/ui/core/routing/History"
], function(BaseController, History) {
	"use strict";

	return BaseController.extend("sign.controller.Word", {

		onInit: function() {
			debugger;
    		this.getRouter().getRoute("word").attachPatternMatched(this._routePatternMatched, this);
    		
    		var oView = this.getView().byId("wordPage");
    		var html1 = new sap.ui.core.HTML("html1", {
                content:
                        "<video width='100%' height='100%' autoplay controls>" +
                        "<source src='c.mp4' type='video/mp4'>" +
                        "Your browser does not support the video tag." +
                        "</video>"
            });
            
            oView.addContent(html1);
            
          //  	if (!sap.ui.Device.system.phone) {
          //  	     var oBtn = this.getView().byId("wordNavBackBtn");
          //           oBtn.setVisible(false);
          //  	}
           
		},
		
		_routePatternMatched: function(oEvent) {
    		var sId = oEvent.getParameter("arguments").wordId ,
    			oView = this.getView().byId("wordPage"),
    			sPath = "/words('" + sId + "')";
    
    		/**
    		 * This is how you would implement deepLinking in your app.
    		 *
    		 * Because the oDataService which we use is not fully implemented, we cannot deep link. This code only workds
    		 * with the mockserver, which can be enabled via URL-parameter "responerOn=true"
    		 */
    		var that = this;
    		var oModel = oView.getModel("sign");
    		var oData = oModel.getData(sPath);
    		oView.bindElement(sPath);
    		var video = $("#html1");
			video.attr("src", oData.words[sId].video);
    		
    	//	oView.setTitle(oData.words[sId].name);
    	//	oView.setIcon( oData.words[sId].image);
    		// var iconView = this.getView().byId("headerImage");
      //  	iconView.setSrc(oData.words[sId].image);
        	
      //  	var titleView = this.getView().byId("headerTitle");
      //  	titleView.setText(oData.words[sId].name);
        	
    	//	var iconView = $("#headerImage");
    	//    iconView.attr("src", oData.words[sId].image);
    		
    		//if there is no data the model has to request new data
    		if (!oData) {
    			oView.getElementBinding().attachEventOnce("dataReceived", function() {
    				that._checkIfProductAvailable(sPath, sId);
    			});
    		}
    	
    	
	    },
	    
	    	handleNavButtonPress: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true /*no history*/ );
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