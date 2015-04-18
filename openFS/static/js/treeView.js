/**
 * Created by mingyong on 4/13/15.
 */
 function handleSelectedEvent(e) {
    var model = this.dataItem(e.node);
    if (model.text == "Add Group") {
        $('#lingjiancongModalAddGroup').modal({backdrop: "static"});
        document.getElementById("addGroupIDCheck").style.display="none";
        document.getElementById("addGroupNameCheck").style.display="none";
        document.getElementById("addGroupID").value="";
        document.getElementById("addGroupName").value="";
        document.getElementById("permitSudo").checked=false;
        document.getElementById("allowRepeatedGIDs").checked=false;
    }
    else if(model.text=="View Groups")
        alert("View Groups");
    else if(model.text=="Add User")
        alert("Add User")
    else if(model.text=="View Users")
        alert("View Users")
    else if(model.text=="Categorized Mail")
        alert("Categorized Mail")
    else if(model.text=="Large Mail")
        alert("Large Mail")
    else if(model.text=="Unread Mail")
        alert("Unread Mail")
}