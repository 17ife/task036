
var config = {
    row:6,
    column:7
}

var cubebox = {
    deg:0,
    forward : 0,// 0-up 1-left 2-bottom 3-right 
    commandline:0,
    errorline:0,
    topPos:0,
    leftPos:0,
    wallArr:[],
    BUILD:function(cube){
        var nowposition = (this.topPos - 23)/42 * config.row + (this.leftPos-43)/42 + 1,
            nextposition = 0,
            exist = false;
        if(this.forward == 0){
            nextposition = nowposition - config.row;
        }else if(this.forward == 1){
            nextposition = nowposition - 1;
        }else if(this.forward == 3){
            nextposition = nowposition + 1;
        }else if(this.forward == 2){
            nextposition = nowposition + config.row;
        }
        
        if((nextposition<=0)||(nextposition>(config.row*config.column))){
            console.log("ERROR BUILD")
        }
        else{
            for(var i=0,max=this.wallArr;i<max;i++){
                if(this.wallArr[i]==nextposition){
                    document.getElementById("grid_"+(nextposition-1)).style.backgroundColor = "#FFF";
                    exist = true;
                    this.wallArr.splice(i, 1);
                }
            }
            if(exist == false){
                document.getElementById("grid_"+(nextposition-1)).style.backgroundColor = "#DDD";
                this.wallArr.push(nextposition);
            }
        }
    },
    TEST:function(){
        var nowposition = (this.topPos - 23)/42 * config.row + (this.leftPos-43)/42 + 1,
            nextposition = 0,
            exist = false,
            wall = this.wallArr;

        if(this.forward == 0){
            nextposition = nowposition - config.row;
        }else if(this.forward == 1){
            nextposition = nowposition - 1;
        }else if(this.forward == 3){
            nextposition = nowposition + 1;
        }else if(this.forward == 2){
            nextposition = nowposition + config.row;
        }

        for(var i=0,max=wall.length;i<max;i++){
            if(wall[i]==nextposition){
                exist = true;
            }
        }
       
        return exist;
    },
    COLOR:function(cube){
        
    },
    RANDOMWALL:function(cube){
        var wall = this.wallArr;
        function buildWall(){
            var randomwall = Math.ceil(Math.random() * config.row * config.column) -1,
                exist = false;
            for(var i=0,max=this.wallArr;i<max;i++){
                if(this.wallArr[i]==randomwall){
                    exist = true;
                    buildWall();
                }
            }
            if(exist == false){
                wall.push((randomwall+1));
                document.getElementById("grid_"+randomwall).style.backgroundColor = "#DDD";
            }
        }
        buildWall();
    },
    TURNLEFT:function(cube){
        this.forward++;
        if(this.forward==4){
            this.forward = this.forward - 4;
        }
        this.deg -= 90;
        cube.style.transform = "rotate(" + this.deg + "deg)";
        this.commandline++;
    },
    TURNRIGHT:function(cube){
        this.forward--;
        if(this.forward==-1){
            this.forward = this.forward + 4;
        }
        this.deg += 90;
        cube.style.transform = "rotate(" + this.deg + "deg)";
        this.commandline++;
    },
    TURNBACK:function(cube){
        this.forward = this.forward + 2;
        if(this.forward>3){
            this.forward = this.forward - 4;
        }
        if(this.forward<0){
            this.forward = this.forward + 4;
        }
        this.deg += 180;
        cube.style.transform = "rotate(" + this.deg + "deg)";
        this.commandline++;
    },
    GO:function(cube){
        var next = this.At;
        if(this.forward == 0){
            this.topPos -= 42;
            if(this.topPos < 23){
               this.topPos += 42;
               this.error();
               return
            }
            cube.style.top = this.topPos + 'px';
        }else if(this.forward == 2){
            this.topPos += 42;
            if(this.topPos > 23+ 42*(config.column-1)){
               this.topPos -= 42;
               this.error();
               return
            }
            cube.style.top = this.topPos + 'px';
        }else if(this.forward == 1){
            this.leftPos -= 42
            if(this.leftPos<42){
               this.leftPos += 42
               this.error();
               return
            }
            cube.style.left = this.leftPos + 'px';
        }else if(this.forward == 3){
            this.leftPos += 42;
            if(this.leftPos> 43+42*(config.row-1)){
               this.leftPos -= 42;
               this.error();
               return
            }
            cube.style.left = this.leftPos + 'px';
        }   
        this.commandline++;
    },
    TRALEF:function(cube){
        this.leftPos -= 42
        if(this.leftPos<42){
            this.leftPos += 42;
            this.error();
            return
        }
        cube.style.left = this.leftPos + 'px';
        this.commandline++;
    },
    TRATOP:function(cube){
        this.topPos -= 42;
        if(this.topPos < 23){
            this.topPos += 42;
            this.error();
            return
        }
        cube.style.top = this.topPos + 'px';
        this.commandline++;
    },
    TRARIG:function(cube){
        this.leftPos += 42;
        if(this.leftPos> 43+42*(config.row-1)){
            this.leftPos -= 42;
            this.error();
            return
        }
        cube.style.left = this.leftPos + 'px';
        this.commandline++;
    },
    TRABOT:function(cube){
        this.topPos += 42;
        if(this.topPos > 23+ 42*(config.column-1)){
            this.topPos -= 42;
            this.error();
            return
        }
        cube.style.top = this.topPos + 'px';
        this.commandline++;
    },
    MOVLEF:function(cube){
        this.forward = 1;
        this.deg = -90;
        cube.style.transform = "rotate(" + this.deg + "deg)";
        this.GO(cube);
        this.commandline++;
    },
    MOVTOP:function(cube){
        this.forward = 0;
        this.deg = 0;
        cube.style.transform = "rotate(" + this.deg + "deg)";
        this.GO(cube);
        this.commandline++;
    },
    MOVRIG:function(cube){
        this.forward = 3;
        this.deg = 90;
        cube.style.transform = "rotate(" + this.deg + "deg)";
        this.GO(cube);
        this.commandline++;
    },
    MOVBOT:function(cube){
        this.forward = 2;
        this.deg = 180;
        cube.style.transform = "rotate(" + this.deg + "deg)";
        this.GO(cube);
        this.commandline++;
    },
    error:function(){
        console.log("err at "+(this.errorline+1));
        if(document.getElementById("linenum_"+(this.errorline+1))){
            document.getElementById("linenum_"+(this.errorline+1)).style.backgroundColor = "#FF9A9A"
        }
    },
    init:function(cube){
        var startAt = Math.ceil(Math.random() * config.row * config.column) -1,//随机起始点
            forwardAT = Math.ceil(Math.random()*100);
        // 
        // this.deg = (-90)*forward;
        this.forward =  (forwardAT % 4);
        this.deg = (-90)*this.forward;
        cube.style.transform = "rotate(" + this.deg + "deg)";
        var x = startAt % config.row;
        var y = (startAt - x)/config.row;
        this.topPos = 23 + 42*y;
        this.leftPos = 43 + 42*x;

        cube.style.top = this.topPos + 'px';
        cube.style.left = this.leftPos + 'px';
    }
    
}

function buildGrid(){
    var row = config.row,
        column = config.column,
        htmlStr = "",
        nowid=0;
    htmlStr += '<div id="cube" class="cube"><div class="cube-bar"></div></div>';    
    htmlStr += '<div class="group"><div class="box-bord"></div>';   
    for(var i = 0;i<row;i++){
        htmlStr += '<div class="box-bord">'+(i+1)+'</div>';
    }
    htmlStr +='</div>';
    for(var i = 0;i<column;i++){
        htmlStr += '<div class="group"><div class="box-bord">'+(i+1)+'</div>';
        for(var j = 0;j<row;j++){
            htmlStr += '<div id="grid_'+ nowid +'" class="box"></div>';
            nowid++;
        }
        htmlStr +='</div>';
    }
    document.getElementById("Grid").innerHTML = htmlStr;
}

function updateLineNumber(){
    var val = document.getElementById("order").value;
    var lineNum = val.split('\n').length+1;
    var temp = 1;
    var innerStr = '';
    while(temp!=lineNum){
        innerStr += '<li id="linenum_'+temp+'">'+temp+'</li>';
        temp++;
    }
    document.getElementById("line").innerHTML = innerStr;
}

function init(){
    var cube = document.getElementById("cube")
    cubebox.init(cube);
    //bind events
    document.getElementById("tl").addEventListener("click",function(){
        cubebox.TURNLEFT(cube);
    })
    document.getElementById("tr").addEventListener("click",function(){
        cubebox.TURNRIGHT(cube);
    })
    document.getElementById("tb").addEventListener("click",function(){
        cubebox.TURNBACK(cube);
    })
    document.getElementById("go").addEventListener("click",function(){
        var test = cubebox.TEST();
        if(test==false){
            cubebox.GO(cube);
        }
    })
    document.getElementById("init").addEventListener("click",function(){
        cubebox.init(cube);
        document.getElementById("order").value = "";
        updateLineNumber();
    })
    document.getElementById("execute").addEventListener("click",function(){
       var orders = document.getElementById("order").value.split('\n');
       var i = 0;
       function al(){
           i++;
           if(i<=orders.length){
               setTimeout(function(){
                   var command = orders[i-1].replace(/\s/g, "").toUpperCase();
                   var test = cubebox.TEST();
                   console.log(test);
                   if(test==false){
                       cubebox[command](cube);
                   }else{
                       console.log("hit the wall");
                   }
                   al()
               },500)
           }
           
       }
       al();
    })
    document.getElementById("build").addEventListener("click",function(){
        cubebox.BUILD(cube);
    })
    document.getElementById("randomwall").addEventListener("click",function(){
        cubebox.RANDOMWALL(cube);
    })
}

buildGrid();
init();

