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
			
			
			this.oModel = model.createMyJSONModel("models/mockdata/data.json");
			
			this.getView().setModel(this.oModel, "ViewModel");
		
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
					this.byId("vbi").minimize(200, 150, 1320, 560);//Height: 3,5 rem; Width: 8,25 rem
				} else {
					this.byId("vbi").minimize(300, 200, 1680, 720);//Height: 4,5 rem; Width: 10,5 rem
				}
				this.byId("btnResize").setTooltip("Maximize");
			} else {
				this.byId("vbi").maximize();
				this.byId("btnResize").setTooltip("Minimize");
			}
		},

		onLegendItemClick: function ( e )
		{
			//var oModel = this.getView().getModel();
			var sLegendRegionText = this.oModel.getProperty("/LegendItems/" + e.getParameter("row") + "/text");
			//var sLegendRegionText = this.oModel.getProperty("/LegendItems/" + e.getParameter("row")).text;
			
			//var aRegionProperties = this.oModel.getData().regionProperties;
			var aRegionProperties = this.oModel.getProperty("/regionProperties");
			for ( var i = 0; i < aRegionProperties.length; ++i )	{
				
				var sTextBindingPath = "/regionProperties/" + i + "/text";
				var sSelBindingPath = "/regionProperties/" + i + "/select";
				var sRegtionText = this.oModel.getProperty( sTextBindingPath ); 
				console.log( "onLegendItemClick; clicked on " + e.getParameters().i);
				//var row = e.oSource.getText();
				if ( sRegtionText === sLegendRegionText ){
					
					this.oModel.setProperty( sSelBindingPath, true );
				}
				else{
					this.oModel.setProperty( sSelBindingPath, false );
				}
			}
		},
		

	// 	onLegendItemClick: function( e )
	// {
	// 	// this.getView().getModel(this.oModel);
	// 	sap.m.MessageToast.show( "onLegendItemClick; clicked on  " + e.getParameters().id  );
		
	// 	for ( var nJ = 0; nJ < this.oModel.oData.regionProperties.length; ++nJ )
	// 	{
	// 	   var txt = "/regionProperties/" + nJ + "/text";
	// 	   var sel = "/regionProperties/" + nJ + "/select";
	// 	   var test = this.oModel.getProperty( txt ); 
	// 	   var row = this.oModel.getProperty( sel ); 	
	// 	   if ( test == row ){
	// 		   this.oModel.setProperty( sel, true );
	// 	   }
	// 	   else{
	// 		   this.oModel.setProperty( sel, false );
	// 	   }
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
		
		onClickCircle: function (evt)	{
			evt.getSource().openDetailWindow("Circle", "0", "0" );   
			detailContent = evt.getSource().getTooltip();
		},
		
		onClickGeoCircle: function (evt)	{
			evt.getSource().openDetailWindow("Geo Circle", "0", "0" );   
			detailContent = evt.getSource().getTooltip();
		},


	});

});
