'use strict';


var Slate = function (ardoise,pen) {

    this.canvas = ardoise;
    this.context = this.canvas.getContext('2d');
    this.location = null;
    this.drawing = null;
    this.erasing = null;
    this.pen = pen;
    
    this.onClickDraw();

    var penButton = document.getElementById('penButton');
    penButton.addEventListener('click', this.onClickDraw.bind(this));

    var eraser = document.getElementById('eraser');
    eraser.addEventListener('click', this.onClickErase.bind(this));

}
    Slate.prototype.getPosition = function(event){
        
        //var positionMouse = {x: event.clientX , y: event.clientY};
        var offset = this.canvas.getBoundingClientRect();
        this.location = {x: event.clientX - offset.x , y: event.clientY- offset.y};

    }
    Slate.prototype.onClickDraw = function(event){

        eraser.classList.remove('active');
        penButton.classList.add('active');

        this.canvas.addEventListener('mousedown', this.onMouseDownDraw.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUpDraw.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMoveDraw.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseUpDraw.bind(this));
        
    }
        Slate.prototype.onMouseDownDraw = function(event){

            this.erasing = false;
            this.drawing = true;
            this.getPosition(event);
        }
        Slate.prototype.onMouseMoveDraw = function(event){
            if (this.drawing == true){

                this.context.beginPath();        
                this.pen.configure(this.context);        
                this.context.moveTo(this.location.x, this.location.y);       
                this.getPosition(event);     
                this.context.lineTo(this.location.x, this.location.y);
                this.context.stroke();
            }            
        }
        Slate.prototype.onMouseUpDraw = function(event){

            this.getPosition(event);
            this.drawing = false;
        }


    Slate.prototype.onClickErase = function(event){

        penButton.classList.remove('active');
        eraser.classList.add('active');

        this.canvas.style.cursor = "crosshair";
        this.canvas.addEventListener('mousedown', this.onMouseDownErase.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMoveErase.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUpErase.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseUpErase.bind(this));
        
    }

        Slate.prototype.onMouseDownErase = function(event){

            this.drawing = false;
            this.erasing = true;
            this.getPosition(event);
        }
        Slate.prototype.onMouseMoveErase = function(event){
        
            if (this.erasing == true){   
                this.getPosition(event);  
                this.context.clearRect(this.location.x, this.location.y, 20, 20);
            }        
        }
        Slate.prototype.onMouseUpErase = function(event){

            this.getPosition(event);
            this.erasing = false;
        }
    

    

    
    

































