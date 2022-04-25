sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(JSONModel) {
    'use strict';
   
    return {
    createMyJSONModel: function (filePath){
        // step1 create a brand mew model 
        var oModel = new JSONModel();
        
        oModel.loadData(filePath)
        return oModel

    }
   }
});


