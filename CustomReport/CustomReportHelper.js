({
	getReportResponse : function(component, id) {
        // Load report data
        var action = component.get("c.getFullReport");
        action.setParams({id: id});
        var self = this;
        action.setCallback(this, function(a){
            console.log('response', a.getReturnValue());
            var reportResponseObj = JSON.parse(a.getReturnValue());
            component.set("v.reportResponse", reportResponseObj);
        	self.convertRowsData(component, reportResponseObj);
        });
         $A.enqueueAction(action);
    },
    convertRowsData: function(component, reportResponse){
    	var data = [];
        for (var idx=0; idx<reportResponse.rowsData.length; idx++){
            var rowData = reportResponse.rowsData[idx];
            var row = [];
            console.log('row data:', rowData);
            for (var i=0; i<reportResponse.columnsData.length; i++){
                row.push(rowData[reportResponse.columnsData[i].key].label);
            }
            data.push(row);
        }
        console.log(data);
        component.set("v.reportRows", data);
	}
})