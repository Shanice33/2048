$(function () {
   $("#back").click(function(){
       board=deepcopy(boardBack);
       score=scoreBack;
       updateScore();
       setTimeout("updateBoardView()",100);
   });
});