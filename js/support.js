var w,h;
$(function () {
   w=$(".cell").outerWidth(true);
   h=$(".cell").outerHeight(true);
});
//设置单个表格的位置
function getLeft(j) {
    return j*w;
}
function getTop(i) {
    return i*h;
}
//取得不同数字的背景颜色和字体颜色
function getNumberBackgroundColor(number){
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#eee4da";
            break;
        case 8:
            return "#f26179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e36";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#3365a5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6bc";
            break;
        case 8192:
            return "#93c";
            break;
        default:
            return "white";
            break;
    }
}
function getNumberColor(number){
    if (number <= 4){
        return "pink";
    }
    return "#776e65";
}
//随机生成数字的时候判断16宫格是否还有空间
function nospace(board) {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}

//实现判断是否可移功能
function canMove(board,dir){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]!=0){
                    if(dir=='left'){
                        if(typeof board[i][j-1]=='undefined'){
                            continue;
                        }else if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
                            return true;
                        }
                    }
                    if(dir=='right'){
                        if(typeof board[i][j+1]=='undefined'){
                            continue;
                        }else if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
                            return true;
                        }
                    }
                    if(dir=='up'){
                        if(typeof board[i-1]=='undefined'){
                            break;
                        }else if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
                            return true;
                        }
                    }
                    if(dir=='down'){
                        if(typeof board[i+1]=='undefined'){
                            break;
                        }else if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
                            return true;
                        }
                    }
                }
            }
        }

    return false;
}
//判断水平方向是否有障碍物
function noBlock(r1,r2,r3,board,dir){

    if(dir=='h'){//水平方向
        for(var i=r2+1;i<r3;i++){
            if(board[r1][i]!=0){
                return false;
            }
        }
    }
    if(dir=='v'){
        for(var i=r1+1;i<r2;i++){
            if(board[i][r3]!=0){
                return false;
            }
        }
    }

    return true;
}
//最后不能移动
function nomove(board) {
    if(canMove(board,'left')||canMove(board,'right')||canMove(board,'up')||canMove(board,'down')){
        return false;
    }
    return true;
}
//多为数组的深拷贝
function deepcopy(obj) {
    var out = [],i = 0,len = obj.length;
    for (; i < len; i++) {
        if (obj[i] instanceof Array){
            out[i] = deepcopy(obj[i]);
        }
        else out[i] = obj[i];
    }
    return out;
}