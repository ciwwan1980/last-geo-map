sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/m/MessageToast",
	"GeoMapSpots/models/model"
], function(Controller, JSONModel, Device, MessageToast, model) {
	"use strict";

	return Controller.extend("GeoMapSpots.App", {
		onInit: function () {
			
			var GeoMapData = model.createMyJSONModel("models/mockdata/data.json");
         	this.getView().setModel(GeoMapData);

			// set the device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.getView().setModel(oDeviceModel, "device");
		},

		onPressLegend: function () {
			if (this.byId("vbi").getLegendVisible() == true) {
				this.byId("vbi").setLegendVisible(false);
				this.byId("btnLegend").setTooltip("Show legend");
			} else {
				this.byId("vbi").setLegendVisible(true);
				this.byId("btnLegend").setTooltip("Hide legend");
			 }
		},

		onPressResize: function () {
			if (this.byId("btnResize").getTooltip() == "Minimize") {
				if (Device.system.phone) {
					this.byId("vbi").minimize(132, 56, 1320, 560);//Height: 3,5 rem; Width: 8,25 rem
				} else {
					this.byId("vbi").minimize(168, 72, 1680, 720);//Height: 4,5 rem; Width: 10,5 rem
				}
				this.byId("btnResize").setTooltip("Maximize");
			} else {
				this.byId("vbi").maximize();
				this.byId("btnResize").setTooltip("Minimize");
			}
		},

		// onLegendItemClick: function ( e )
		
		// {
		// 	sap.m.MessageToast.show( "onLegendItemClick; clicked on  " + e.getParameters().id);
			
		// 	for ( var i = 0; i < oModel.regionProperties.length; ++i )
		// 	{
		// 		var txt = "/regionProperties/" + i + "/text";
		// 		var sel = "/regionProperties/" + i + "/select";
		// 		var test = oModel.getProperty( txt ); 
		// 		var row = e.oSource.getText();
		// 		if ( test == row ){
		// 			oModel.setProperty( sel, true );
		// 		}
		// 		else{
		// 			oModel.setProperty( sel, false );
		// 		}
		// 	}
		// },

		
		onDropItem: function (evt) {
			MessageToast.show( "Item dropped!!" );
		},

		onClickSpot: function (evt) {
			evt.getSource().openDetailWindow("My Detail Window");
		},

	
		onCloseDetail: function (evt) {
			MessageToast.show("onCloseDetail" + this);
		},

	});

});
