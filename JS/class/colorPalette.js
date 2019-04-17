'use strict';


var ColorPalette = function(pen){
//pour la colorPalette, on créé un event ligne 67 de colorPalette.js ou on fait passer pen

	this.canvas      = document.getElementById('color-palette');    
    this.context     = this.canvas.getContext('2d');  
    
    this.pen = pen;// à créer si on veut l'utiliser ailleurs via colorPalette
    //sinon le rappeler dans la page seulement avec pen et non this.pen

//pour la colorPalette, on créé un event ligne 67 de colorPalette.js ou on fait passer pen
    this.pickedColor = { red: 0, green: 0, blue: 0 };
    this.location2 = null;
    
    this.canvas.addEventListener('click',this.onClickOnPickerCanvas.bind(this));
    
    this.build();

};


    ColorPalette.prototype.build = function()
        {
        var gradient;

            gradient = this.context.createLinearGradient(0, 0, this.canvas.width, 0);

            // Dégradé rouge -> vert -> bleu horizontal.
            gradient.addColorStop(0,    'rgb(255,   0,   0)');
            gradient.addColorStop(0.15, 'rgb(255,   0, 255)');
            gradient.addColorStop(0.32, 'rgb(0,     0, 255)');
            gradient.addColorStop(0.49, 'rgb(0,   255, 255)');
            gradient.addColorStop(0.66, 'rgb(0,   255,   0)');
            gradient.addColorStop(0.83, 'rgb(255, 255,   0)');
            gradient.addColorStop(1,    'rgb(255,   0,   0)');

            this.context.fillStyle = gradient;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


            gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);

            // Dégradé blanc opaque -> transparent -> noir opaque vertical.
            gradient.addColorStop(0,   'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(0.5, 'rgba(0,     0,   0, 0)');
            gradient.addColorStop(1,   'rgba(0,     0,   0, 1)');

            this.context.fillStyle = gradient;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        };
    ColorPalette.prototype.getPosition = function(event){
        
        var positionMouse = {x: event.clientX , y: event.clientY};
        var offset = this.canvas.getBoundingClientRect();
        this.location2 = {x: event.clientX - offset.x , y: event.clientY- offset.y};

    }
    ColorPalette.prototype.onClickOnPickerCanvas = function(event){

        this.getPosition(event);
        var colorRGB = this.context.getImageData(this.location2.x, this.location2.y, 1, 1);
        this.pickedColor.red = colorRGB.data[0];
        this.pickedColor.green = colorRGB.data[1];
        this.pickedColor.blue = colorRGB.data[2];
        
        //Si on fait passer pen : this.pen.color = 'rgb('+this.pickedColor.red+','+this.pickedColor.green+','+this.pickedColor.blue+')';
        //En jquery : $.event.trigger('magical-slate:pick-color');
        var event = document.createEvent('event');
        event.initEvent('magical-slate:pick-color',true,true);
        document.dispatchEvent(event);
    }
    ColorPalette.prototype.getPickedColor = function(){

        return this.pickedColor;
    };