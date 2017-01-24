sap.ui.define([
	"sign/controller/BaseController",
	"sap/ui/core/routing/History"
], function(BaseController, History) {
	"use strict";

	return BaseController.extend("sign.controller.BaseWord", {

		setContent: function(viewId) {
			var oView = this.getView().byId(viewId);
			var html1 = new sap.ui.core.HTML( {
				content: "<video width='100%' height='100%' autoplay controls>" +
					"<source src='c.mp4' type='video/mp4'>" +
					"Your browser does not support the video tag." +
					"</video>"
			});

			oView.addContent(html1);
		},
		
		
		assignRoutePattern: function(sId, viewId) {
			var that = this;
			var oView = this.getView().byId(viewId);
			var sPath = "/words('" + sId + "')";
			var oModel = oView.getModel("sign");
			var oData = oModel.getData(sPath);
			oView.bindElement(sPath);
			var video = $("video");
			video.attr("src", oData.words[sId].video);

			//if there is no data the model has to request new data
			if (!oData) {
				oView.getElementBinding().attachEventOnce("dataReceived", function() {
					that._checkIfProductAvailable(sPath, sId);
				});
			}
		},

		handleNavigation: function(defaultRouteName) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo(defaultRouteName, {}, true /*no history*/ );
			}
		}
	});

});