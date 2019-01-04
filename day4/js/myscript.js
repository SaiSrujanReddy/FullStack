var x=1;
function disp(check){
    
    if(x==1){
        var dis=check.nextElementSibling;
        dis.style="display:block;"
        x=0;
    }
    else{
        var dis=check.nextElementSibling;
        dis.style="display:none;"
        x=1;
    }

}

function show(ids){

}