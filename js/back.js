$(function () {
   $("#back").click(function(){
       board=deepcopy(boardBack);
       setTimeout("updateBoardView()",100);
   });
});