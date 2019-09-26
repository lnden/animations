
var can = document.getElementById('clock');
if(can.getContext){
    var ctx = can.getContext('2d');
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var r = width / 2;
    //这里定义一个比例:200/width = 10/x
    var rem = width / 200;
    function drawBackground() {
        ctx.save();
        ctx.translate(r,r);
        ctx.beginPath();
        ctx.lineWidth = 10 * rem;
        ctx.arc(0,0,r-ctx.lineWidth/2,0,Math.PI*2,false);
        ctx.stroke();

        var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
        ctx.foot = rem +'px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        hourNumbers.forEach(function(value,index){
            //获取每个小时的弧度
            var rad = 2 * Math.PI / 12 * index;
            //在获取每个小时的x,y坐标
            var x = Math.cos(rad) * (r-30 * rem);
            var y = Math.sin(rad) * (r-30 * rem);
            ctx.fillText(value,x,y);

        });

        for(var i=0;i<60;i++){
            var rad = 2 * Math.PI / 60 * i;
            var x = Math.cos(rad) * (r - 18 * rem);
            var y = Math.sin(rad) * (r - 18 * rem);
            ctx.beginPath();
            if(i%5==0){
                ctx.fillStyle = '#000';
            }else{
                ctx.fillStyle = '#ccc';
            }
            ctx.arc(x,y,2 * rem,0,Math.PI*2,false);
            ctx.fill();
        }
    }
    //画一个时针
    function drawHour(hour,minute){
        ctx.save();
        ctx.beginPath();
        var rad = Math.PI * 2 / 12 * hour;
        //分针所引起的弧度
        var mrad = Math.PI * 2 / 12 / 60 * minute;
        ctx.rotate(rad + mrad);
        ctx.lineWidth = 6 * rem;
        ctx.lineCap = 'round';
        ctx.moveTo(0,10 * rem);
        ctx.lineTo(0,-r/2);
        ctx.stroke();
        ctx.restore();
    }
    //画一个分针
    function drawMinute(minute){
        ctx.save();
        ctx.beginPath();
        var rad = Math.PI * 2 / 60 * minute;
        ctx.rotate(rad);
        ctx.lineWidth =3 * rem;
        ctx.lineCap = 'round';
        ctx.moveTo(0,10 * rem);
        ctx.lineTo(0,-r+30 * rem);
        ctx.stroke();
        ctx.restore();
    }
    //画一个秒针
    function drawSecond(second){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = '#f00';
        var rad = Math.PI * 2 / 60 * second;
        ctx.rotate(rad);
        ctx.moveTo(-2 * rem,20 * rem);
        ctx.lineTo(2 * rem,20 * rem);
        ctx.lineTo(1,-r+18 * rem);
        ctx.lineTo(-1,-r+18 * rem);
        ctx.fill();
        ctx.restore();
    }

    function drawDot(){
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(0,0,3 * rem,0,Math.PI*2,false);
        ctx.fill();
    }

    // drawBackground();
    // drawHour(4,30);
    // drawMinute(30);
    // drawSecond(59);
    // drawDot();

    function draw(){
        ctx.clearRect(0,0,width,height);
        var date  = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        drawBackground();
        drawHour(hour,minute);
        drawMinute(minute);
        drawSecond(second);
        drawDot();
        ctx.restore();
    }

    setInterval(draw,1000);
}