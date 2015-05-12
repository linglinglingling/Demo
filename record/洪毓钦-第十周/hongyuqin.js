/**
 * Created by hong
 */
function addUser(){
    var UserID=$("#addUserID").val();
    var UserName=$("#addUserName").val();
    var UserPassword=$("#addUserPassword").val();
    var UserPasswordConfirm=$("#addUserPasswordConfirm").val();
    var FullName=$("#addFullName").val();
    var EMail=$("#addEMail").val();
    var SSHKey=$("#addSSHKey").val();
    var groupName=$("#addGroupName").val();
    if(UserPassword!=UserPasswordConfirm)
    {
            document.getElementById("addUserPasswordCheck").style.display = "none";
            document.getElementById("addUserPasswordCheck").style.display = "block";
            return;
    }
    url="/ajax/checkAddUser/?"+"UserID="+UserID+"&UserName="+UserName+"&UserPassword="+UserPassword+"&FullName="
    +FullName+"&EMail="+EMail+"&SSHKey="+SSHKey+"&groupName="+groupName;
    $.get(url,function(data){
        if(data=="2") {
            alert("data=2");
            document.getElementById("addUserIDCheck").style.display = "none";
            document.getElementById("addUserNameCheck").style.display = "none";
            document.getElementById("addUserIDCheck").style.display = "block";
        }
        if(data=="1") {
        alert("data=1");
            document.getElementById("addUserIDCheck").style.display="none";
            document.getElementById("addUserNameCheck").style.display="none";
            document.getElementById("addUserNameCheck").style.display="block";
        }
        if(data=='0'){
        alert("data=0");
            $('#hongyuqinModalAddUser').modal('hide');
            //alert("12");
            window.location.href="/home/";
        }

        });
}
function EditUser(){
    var UserID=$("#EditUserID").val();
    var UserName=$("#EditUserName").val();
    var UserPassword=$("#EditUserPassword").val();
    var UserPasswordConfirm=$("#EditUserPasswordConfirm").val();
    var FullName=$("#EditFullName").val();
    var EMail=$("#EditEMail").val();
    var SSHKey=$("#EditSSHKey").val();
    var groupName=$("#EditGroupName").val();
    if(UserPassword!=UserPasswordConfirm)
    {
            document.getElementById("EditUserPasswordCheck").style.display = "none";
            document.getElementById("EditUserPasswordCheck").style.display = "block";
            return;
    }
    url="/ajax/checkEditUser/?"+"UserID="+UserID+"&UserName="+UserName+"&UserPassword="+UserPassword+"&FullName="
    +FullName+"&EMail="+EMail+"&SSHKey="+SSHKey+"&groupName="+groupName;
    $.get(url,function(data){
        if(data=="1") {
        alert("data=1");
            document.getElementById("EditUserIDCheck").style.display="none";
            document.getElementById("EditUserNameCheck").style.display="none";
            document.getElementById("EditUserNameCheck").style.display="block";
        }
        if(data=='0'){
        alert("data=0");
            $('#hongyuqinModalEditUser').modal('hide');
            //alert("12");
            window.location.href="/home/";
        }

        });
}
function DeleteUser()
{
    var UserID=$("#EditUserID").val();
    url="/ajax/deleteUser/?UserID="+UserID;
    $.get(url,function(data){
         if(data=='0'){
             $('#hongyuqinModalEditUser').modal('hide');
            //alert("12");
            window.location.href="/home/";
         }
    })
}

