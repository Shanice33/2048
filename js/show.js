function showNumberWithAnimation(i,j,randNumber){
    var numberCell=$("#numbercell-"+i+j);
    numberCell.css({'background-color':getNumberBackgroundColor(randNumber),'color':getNumberColor(randNumber)});
    numberCell.text(randNumber);

    numberCell.animate({
        width: '100px',
        height: '100px',
        top: getTop(i)+'px',
        left: getLeft(j)+'px'
    },50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
    //alert("hello js");
    var numberCell=$("#numbercell-"+fromx+fromy);
    //console.log(numberCell);
    numberCell.animate({top:getTop(tox)+'px',left:getLeft(toy)+'px'},200);

}

//弹出框
function divAlert(flag){
    var txt1=$("<p>恭喜你通关顺利</p>");
    var txt2=$("<p>很遗憾，通关失败</p>");
    var aAlert=$(".alert");
    aAlert.append($("<button id='yes'>再来一局</button>  <button id='no'>不玩了</button>"));
    if(flag){
        aAlert.prepend(txt1).show();
    }else{
        aAlert.prepend(txt2).show();
    }
    $("button").click(function () {
        if($(this).attr("id")=="yes"){
            newGame();
        }else{
            init();
        }
        aAlert.empty().hide();
    });

}