({
    getReportList: function(component, callback){
        var action = component.get("c.listReports");
        var self = this;
        action.setCallback(this, function(a){
            console.log('report list:', a.getReturnValue());
            component.set("v.reportList", a.getReturnValue());
            callback(a.getReturnValue());
        });
         $A.enqueueAction(action);
    },
    getReportResponse : function(component, id) {
        // Load report data
        var action = component.get("c.runReport");
        action.setParams({id: id});
        var self = this;
        action.setCallback(this, function(a){
            var json = JSON.parse(a.getReturnValue());
            console.log('response', json);
            self.transformReportResponse(component, json);
        });
        $A.enqueueAction(action);
    },
	transformReportResponse : function(component, response) {
		var columns = [];
        var data = [];
        
        var cols = response.reportMetadata.detailColumns;
        var colDetails = response.reportExtendedMetadata.detailColumnInfo;
        console.log('colDetails:', colDetails);
        for (var i=0;i<cols.length; i++){
            columns.push({
                label: colDetails[cols[i]].label
            });
        }
        var factMap = response.factMap['T!T'].rows;
        console.log('factMap:',factMap);
        if (factMap){
            for (var i=0; i<factMap.length; i++){
                var row = [];
                for (var j=0; j<factMap[i].dataCells.length; j++){
                    var cell = factMap[i].dataCells[j];
                    row.push({
                        label: cell.label,
                        value: cell.value
                    });
                }
                data.push(row);
            }
        }
        console.log('headers: ', columns);
        console.log('data', data);
        component.set("v.columns", columns);
        component.set("v.data", data);
	}
})