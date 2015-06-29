function showAccount(account){
    $("div#contentR").load("/get?id=account&account=" + account);
}


function ShowReporting(reporting){
    $("div#contentR").load("/get?id=reporting&reporting=" + reporting);
}


function hideAll(){
    $("div#contentR").load("/get?id=clear");
}