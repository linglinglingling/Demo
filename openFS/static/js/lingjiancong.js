/**
 * Created by ling on 15-4-17.
 */


function addGroup(){
    var groupID=$("#addGroupID").val();
    var GroupName=$("#addGroupName").val();
    var permitSudo=$("#permitSudo").val();
    var allowRepeatedGIDs=$("#allowRepeatedGIDs").val();
    url="/ajax/checkAddGroup/?"+"groupID="+groupID+"&GroupName="+GroupName+"&permitSudo="+permitSudo+"&allowRepeatedGIDs="+allowRepeatedGIDs;
    $.get(url,function(data){
        if(data=="2") {
            document.getElementById("addGroupIDCheck").style.display = "none";
            document.getElementById("addGroupNameCheck").style.display = "none";
            document.getElementById("addGroupIDCheck").style.display = "block";
        }
        if(data=="1") {
            document.getElementById("addGroupIDCheck").style.display="none";
            document.getElementById("addGroupNameCheck").style.display="none";
            document.getElementById("addGroupNameCheck").style.display="block";
        }
        if(data=='0'){
            $('#lingjiancongModalAddGroup').modal('hide');
            //alert("12");
            window.location.href="/home/";
        }

        });
    //alert(groupID+GroupName+permitSudo+allowRepeatedGIDs);
    //document.getElementById('formAddGroupPopover').submit();
}

