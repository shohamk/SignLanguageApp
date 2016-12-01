sap.ui.define([
	"sign/controller/BaseController",
	"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History"
], function(BaseController, JSONModel, History) {
	"use strict";

		return BaseController.extend("sign.controller.Settings", {

		onChange: function(oEvent) {
			var view = this.getView();
			var oModel = view.getModel();
			var item = oEvent.getParameters().selectedItem;
			var key = item.getKey();
			if (key === "grid") {
				oModel.setData({
					enabled: true
				}, true);
			} else {
				oModel.setData({
					enabled: false
				}, true);
			}
		},

		handleNavButtonPress: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("welcome", {}, true /*no history*/ );
			}
		},

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sign.view.Settings
		 */
		onInit: function() {
			var view = this.getView();
			var oModel = new JSONModel({
				layout: [{
						key: "grid",
						value: "טבלה"
					}, //TBD get from i18n
					{
						key: "scroll",
						value: "גלילה"
					}
				],
				categoriesNum: [{
					key: "1"
				}, {
					key: "2"
				}, {
					key: "3"
				}, {
					key: "4"
				}, {
					key: "5"
				}, {
					key: "6"
				}, {
					key: "7"
				}, {
					key: "8"
				}, {
					key: "9"
				}],
				enabled: true
			});
			view.setModel(oModel); //TBD:Set name to the model

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sign.view.Settings
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sign.view.Settings
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sign.view.Settings
		 */
		//	onExit: function() {
		//
		//	}

	});

});