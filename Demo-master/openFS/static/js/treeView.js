/**
 * Created by mingyong on 4/13/15.
 */
 function handleSelectedEvent(e){
    var model = this.dataItem(e.node);
    if(model.text=="Add Group")
       alert("Add Group")
    else if(model.text=="View Groups")
        alert("View Groups");
    else if(model.text=="Add User")
    {
            $('#hongyuqinModalAddUser').modal({backdrop: "static"});
            document.getElementById("addUserIDCheck").style.display="none";
            document.getElementById("addUserNameCheck").style.display="none";
            document.getElementById("addUserID").value="";
            document.getElementById("addUserName").value="";
    }
    else if(model.text=="View Users")
        alert("View Users")
    else if(model.text=="Categorized Mail")
        alert("Categorized Mail")
    else if(model.text=="Large Mail")
        alert("Large Mail")
    else if(model.text=="Unread Mail")
        alert("Unread Mail")
}