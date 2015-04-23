/**
 * Created by ling on 15-4-17.
 */


function addUser(){
    var UserID=$("#addUserID").val();
    var UserName=$("#addUserName").val();
    var UserPassword=$("#addUserPassword").val();
    var UserPasswordConfirm=$("#addUserPasswordConfirm").val();
    var FullName=$("#addFullName").val();
    var EMail=$("#addEMail").val();
    var SSHKey=$("#addSSHKey").val();
    if(UserPassword!=UserPasswordConfirm)
    {
            document.getElementById("addUserPasswordCheck").style.display = "none";
            document.getElementById("addUserPasswordCheck").style.display = "block";
            return;
    }
    url="/ajax/checkAddUser/?"+"UserID="+UserID+"&UserName="+UserName+"&UserPassword="+UserPassword+"&FullName="
    +FullName+"&EMail="+EMail+"&SSHKey="+SSHKey;
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
    //alert(UserID+UserName+permitSudo+allowRepeatedUIDs);
    //document.getElementById('formAddUserPopover').submit();
}

