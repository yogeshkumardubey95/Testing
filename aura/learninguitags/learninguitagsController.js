({
    doInit: function(component, event, helper) {
        component.set("v.currentRecordId",component.get("v.recordId"));
       
        component.find("RecordCreator").getNewRecord(
            "Maserobject__c", 
            null,      
            false,    
            $A.getCallback(function() {
                var rec = component.get("v.newRecord");
                
                if( (rec === null)) {
                    console.log("Error initializing record template:");
                }
                else {
                    console.log("Record template initialized: " + rec.sobjectType);
                }
            })
        );
        
    },
    handleSave: function(component, event, helper) {
        
        component.find("RecordCreator").saveRecord(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                // record is saved successfully
                // alert('Success');
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Saved",
                    "message": "The record was saved.",
                    "type":"SUCCESS"
                });
                resultsToast.fire();
            } else if (saveResult.state === "INCOMPLETE") {
                // handle the incomplete state
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                // handle the error state
                console.log('Problem saving contact, error: ' + 
                            JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state +
                            ', error: ' + JSON.stringify(saveResult.error));
            }
        });
        
    },
    onGroup:function(component){
        var t=component.find("di").getElement();
        console.log('yv'+t.innerHTML);
        var output;
        for(var cmp in component.find("r0")){
            
            if(component.find("r0")[cmp].get("v.label")=='1'){
                output=component.find("r0")[cmp].set("v.value",true);
                
                
            }    }
        
    },
    handleUpdateRecord:function(component, event, helper) {
        
        
        component.find("RecordUpdate").saveRecord(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                // record is saved successfully
                //  alert('Success');
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Updated",
                    "message": "The record was Updated.",
                    "type":"SUCCESS"
                });
                resultsToast.fire();
                $A.get("e.force:refreshView").fire();
            } else if (saveResult.state === "INCOMPLETE") {
                // handle the incomplete state
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                // handle the error state
                console.log('Problem saving contact, error: ' + 
                            JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state +
                            ', error: ' + JSON.stringify(saveResult.error));
            }
        });
        
        
    },
    handleDeleteRecord:function(component, event, helper) {
        component.set("v.recordId",component.get("v.currentRecordId"));
        component.find("RecordUpdate").reloadRecord();
       /* component.find("RecordUpdate").deleteRecord($A.getCallback(function(deleteResult) {
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                console.log("Record is deleted.");
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Deleted",
                    "message": "The record was deleted.",
                    "type":"SUCCESS"
                });
                resultsToast.fire();
                $A.get("e.force:refreshView").fire();
                
            }
            else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            }
                else if (deleteResult.state === "ERROR") {
                    console.log('Problem deleting record, error: ' +
                                JSON.stringify(deleteResult.error));
                }
                    else {
                        console.log('Unknown problem, state: ' + deleteResult.state +
                                    ', error: ' + JSON.stringify(deleteResult.error));
                    }
        }));    
      
        */
        
    },
    change:function(component, event, helper) {
        
     console.log('Check validdity'+component.find("recordField1").checkValidity())   ;
        
        
    }
})