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
            url="/ajax/getGroup/";
            $.get(url,function(data){
               all=JSON.parse(data);
               for(var i=0, len = all.length;i<len;i++){
                 $('#addGroupName').append("<option>"+all[i]["fields"]["groupName"]+"</option>");
               }
            }
            );
    }
    else if(model.text=="View Users")
        alert("View Users")
    else if(model.text=="Categorized Mail")
        alert("Categorized Mail")
    else if(model.text=="Large Mail")
        alert("Large Mail")
    else if(model.text=="Unread Mail")
        alert("Unread Mail")
    else//if click the username
    {
        var UserName=model.text;
        $('#hongyuqinModalEditUser').modal({backdrop: "static"});
        url="/ajax/getGroup/";
        $.get(url,function(data){
               all=JSON.parse(data);
               for(var i=0, len = all.length;i<len;i++){
                 $('#EditGroupName').append("<option>"+all[i]["fields"]["groupName"]+"</option>");
               }
            }
         );
        url1="/ajax/getUser/?"+"UserName="+UserName;
         $.get(url1,function(data){
            all=JSON.parse(data);
            document.getElementById('EditUserID').value=all[0]["fields"]["userID"];
            document.getElementById('EditUserName').value=all[0]["fields"]["username"];
            document.getElementById('EditUserPassword').value=all[0]["fields"]["password"];
            document.getElementById('EditUserPasswordConfirm').value=all[0]["fields"]["password"];
            document.getElementById('EditFullName').value=all[0]["fields"]["fullname"];
            document.getElementById('EditEMail').value=all[0]["fields"]["email"];
            document.getElementById('EditSSHKey').value=all[0]["fields"]["sshkey"];
         }
         );
    }
}