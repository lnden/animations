/**
 * Create By lnden on 2018/4/28
 */

    var canvas = document.getElementById("myCanvas"),
        ctx = canvas.getContext("2d"),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,
        particles = [],
        pos = {x:w/2,y:h/2};

    //定义个对象Particle
    function Particle(){
        this.x = pos.x;
        this.y = pos.y;
        this.r = 0.03;
        this.color = "#" + ((Math.random()*0xffffff) | 0).toString(16);
        this.vx = random(-5,5);
        this.vy = random(-3,3);
    }

    Particle.prototype.update = function(){
        this.x += this.vx;
        this.y += this.vy;
        this.r += 0.02;
    };

    Particle.prototype.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fill();
    };

    function spawn(){
        var p = new Particle();
        particles.push(p);
    }

    function render(){
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(0,0,w,h);
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.draw();
            p.update();
            p.r > 5 && particles.splice(i,1)
        }
    }

    ~function(){
        spawn();
        render();
        requestAnimationFrame(arguments.callee);
    }();

    function random(min,max){
        return Math.random()*(max-min)+min;
    }

    // document.onmousemove = function(e){
    //     pos.x = e.pageX;
    //     pos.y = e.pageY;
    // };
