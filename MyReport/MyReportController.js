({
	doInit : function(component, event, helper) {
		var self = this;
        helper.getReportList(component, function(list){
            if (list.length > 0){
                component.set("v.reportId", list[0].Id);
                helper.getReportResponse(component, component.get("v.reportId"));
            }
        });
	},
    reportChanged: function(component, event, helper){
        helper.getReportResponse(component, component.get("v.reportId"));
    },
    visibilityChanged: function(component, event, helper){
        console.log('event', event);
        var id = event.target.id;
        var checked = event.target.checked;
        var reportId = component.get('v.reportId');
        var columns = document.getElementsByClassName(reportId+'-column-'+id);
        console.log('columns', columns);
        for (var i=0; i<columns.length; i++){
            (checked ? $A.util.removeClass : $A.util.addClass)(columns[i], 'hide');
        }
    }
})