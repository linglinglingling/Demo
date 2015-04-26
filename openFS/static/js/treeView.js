/**
 * Created by mingyong on 4/13/15.
 */
 function handleSelectedEvent(e) {
    var model = this.dataItem(e.node);
    if (model.text == "Add Group") {
        $('#lingjiancongModalAddGroup').modal({backdrop: "static"});
        document.getElementById("addGroupID").value="";
        document.getElementById("addGroupName").value="";
        document.getElementById("permitSudo").checked=false;
        document.getElementById("allowRepeatedGIDs").checked=false;
    }
    else if(model.text=="View Groups")
        alert("View Groups");
    else if(model.text=="Add User")
        alert("Add User");
    else if(model.text=="View Users")
        alert("View Users");
    else if(model.text=="Categorized Mail")
        alert("Categorized Mail");
    else if(model.text=="Large Mail")
        alert("Large Mail");
    else if(model.text=="Unread Mail")
        alert("Unread Mail");
    else if(/^\d+$/.test(model.text)){
        document.getElementById('EditGroupModalLabel').innerHTML=model.text;
        groupName=model.text;
        url="/search?groupName="+groupName;
        $.get(url,function(data){
            all=JSON.parse(data);
            document.getElementById('editGroupName').value=all[0]["fields"]["groupName"];
            document.getElementById('editGroupID').value=all[0]["fields"]["groupID"];
            document.getElementById('editGroupID').readOnly=true;
            document.getElementById('editGroupID').style.backgroundColor = "#efefef";
            if(all[0]["fields"]["permitSudo"]==false){
                document.getElementById('permitSudo123').checked=false;
            }
            else
                document.getElementById('permitSudo123').checked=true;
        })
        $('#lingjiancongEditGroup').modal({backdrop: "static"});
    }
}