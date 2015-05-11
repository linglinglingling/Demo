

<script>
        $("#formAddGroupPopover").validate({
          rules:{
            addGroupID:{
              required:true,
              digits:true,
              remote:"/checkAddGroup"
            },
            addGroupName:{
              required:true,
              minlength:2,
              remote:"/checkAddGroup"
            }
            },
            messages:{
              addGroupID:{
                remote:"The groupID already exits"
              },
              addGroupName:{
                 remote:"The groupName already exits"
              }
          }
        });
 </script>


 function handleSelectedEvent(e) {
    var model = this.dataItem(e.node);
    if (model.text == "Add Group") {
        $('#lingjiancongModalAddGroup').modal({backdrop: "static"});
        document.getElementById("addGroupID").value="";
        document.getElementById("addGroupName").value="";
        document.getElementById("permitSudo").checked=false;
        document.getElementById("allowRepeatedGIDs").checked=false;
    }
}