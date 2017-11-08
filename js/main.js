var board=new Array();
var boardBack;
var score,scoreBack;
var top=240;

$(function () {
   $("#start").click(function () {
       if($("#container").is(":hidden")){
           $("#container").show();
       }
       newGame();
   });
});
//开始游戏
function newGame() {
    //初始化棋盘格
    init();
    //随机两个各自生成的数字
    generateOneNumber();
    generateOneNumber();
    boardBack=deepcopy(board);
}

function init() {
    score=scoreBack=0;
    updateScore();
    for (var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var cell=$("#cell-"+i+j);
            cell.css({"left":getLeft(j)+"px","top":getTop(i)+"px"});
        }
    }
    for(var i=0;i<4;i++){
        board[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
        }
    }
    updateBoardView();  //对board二位数组进行设定
}

function updateBoardView() {
    $(".numbercell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var numberId="numbercell-"+i+j;
            $("#container").append('<div class="numbercell" id='+numberId+'></div>');
            var theNumberCell=$("#numbercell-"+i+j);
            if(board[i][j]==0){
                theNumberCell.css({'width':'0px','height':'0px','top':getTop(i)+'px','left':getLeft(j)+'px'}); //设置不可见
            }else{
                //覆盖cell
                theNumberCell.css({'width':'100px','height':'100px','top':getTop(i)+'px','left':getLeft(j)+'px'});
                //设置其背景颜色和字体颜色
                theNumberCell.css({'background-color':getNumberBackgroundColor(board[i][j]),'color':getNumberColor(board[i][j])});
                //显示数字
                theNumberCell.text(board[i][j]);
            }
        }
    }
}
//随机生成一个数
function generateOneNumber() {
    if(nospace(board)){
        return false;
    }
    //随机选一个位置
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    while(true){
        if(board[randx][randy]==0){
            break;
        }
        var randx=parseInt(Math.floor(Math.random()*4));
        var randy=parseInt(Math.floor(Math.random()*4));
    }
    //随机选一个数字
    var randNumber=Math.random()<0.5?2:4;
    //在随机的位置上显示随机数字
    board[randx][randy]=randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}

//事件响应循环
$(document).keydown(function (event) {
    boardBack=deepcopy(board);
    scoreBack=score;
    //每次移动都会新增加一个数字
    switch(event.keyCode){
        case 37://left
            if(move('left')){
                generateOneNumber();
                isgameover();  //判断是否游戏结束
            }
            break;
        case 38://up
            if(move('up')){
                generateOneNumber();
                isgameover();  //判断是否游戏结束
            }
            break;
        case 39://right
            if(move('right')){
                generateOneNumber();
                isgameover();  //判断是否游戏结束
            }
            break;
        case 40://down
            if(move('down')){
                generateOneNumber();
                isgameover();  //判断是否游戏结束
            }
            break;
        default:
            break;
    }
});
//判断游戏是否结束
function isgameover(){
    var arr=board.join(",").split(",");
    var max=Math.max.apply({},arr);
    if(nospace(board)&&nomove(board)){
        divAlert(false);
    }else if(max==2048) {
        divAlert(true);
    }
}

//left
function move(dir) {
    //判断格子是否能够移动
    if(!canMove(board,dir)){
        return false;
    }
    //真正的移动
    //左移
    if(dir=='left'){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]!=0){
                    //(i,j)左侧的元素
                    for(var k=0;k<j;k++){
                        //落脚位置是否为空&&中间没有障碍物
                        if(board[i][k]==0&&noBlock(i,k,j,board,'h')){
                            showMoveAnimation(i,j,i,k);
                            board[i][k]=board[i][j];
                            board[i][j]=0;
                        }
                        if(board[i][k]==board[i][j]&&noBlock(i,k,j,board,'h')){
                            showMoveAnimation(i,j,i,k);
                            board[i][k]+=board[i][j];
                            score+=board[i][k];
                            board[i][j]=0;
                        }

                    }
                }
            }
        }
    }else if(dir=='right') {  //右移
        for (var i = 0; i < 4; i++) {
            for (var j = 3; j > -1; j--) {
                if (board[i][j] != 0) {
                    for (var k = 3; k > j; k--) {
                        //落脚位置为空&&中间没有障碍
                        if (board[i][k] == 0 && noBlock(i, j, k, board, 'h')) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                        }
                        //落脚位置的数字和本来数字相等&&中间没有障碍
                        if (board[i][k] == board[i][j] && noBlock(i, j, k, board, 'h')) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] += board[i][j];
                            score+=board[i][k];
                            board[i][j] = 0;
                        }
                    }
                }
            }
        }
    }
    if(dir=='up'){//上移
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]!=0){
                    for(var k=0;k<i;k++){
                        //可以向上移
                        if(board[k][j]==0&&noBlock(k,i,j,board,'v')){
                            showMoveAnimation(i,j,k,j);
                            board[k][j]=board[i][j];
                            board[i][j]=0;
                        }
                        if(board[k][j]==board[i][j]&&noBlock(k,i,j,board,'v')){
                            showMoveAnimation(i,j,k,j);
                            board[k][j]+=board[i][j];
                            score+=board[k][j];
                            board[i][j]=0;
                        }
                    }
                }
            }
        }
    }
    if(dir=='down'){//下移
       for(var i=3;i>-1;i--){
           for(var j=0;j<4;j++){
               if(board[i][j]!=0){
                   for(var k=3;k>i;k--){
                       //可以向下移
                       if(board[k][j]==0&&noBlock(i,k,j,board,'v')){
                           showMoveAnimation(i,j,k,j);
                           board[k][j]=board[i][j];
                           board[i][j]=0;
                       }
                       if(board[k][j]==board[i][j]&&noBlock(i,k,j,board,'v')){
                           showMoveAnimation(i,j,k,j);
                           board[k][j]+=board[i][j];
                           score+=board[k][j];
                           board[i][j]=0;
                       }

                   }
               }
           }
       }
    }
    updateScore(score);
    setTimeout("updateBoardView()",200);
    return true;
}