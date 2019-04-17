'use strict';



var Pen = function(){

    this.color="black"
    this.size = 2;
}
    Pen.prototype.configure = function(context){
            
        context.strokeStyle = this.color;
        context.lineWidth   = this.size;
    };
