'use strict';

var Program = function(ardoise){

    this.pen = new Pen();
    this.slate = new Slate(ardoise, this.pen);
    this.colorPalette = new ColorPalette(this.pen);
//pour la colorPalette, on créé un event ligne 67 de colorPalette.js ou on fait passer pen
    
    this.colorButton = document.querySelectorAll('.colorButton');
    this.sizeButton = document.querySelectorAll('.sizeButton');
    this.eraseAll = document.getElementById('eraseAll');
    this.dropper = document.getElementById('dropper');
    
    this.listener();       
}

    Program.prototype.listener = function() {

        for (var i= 0; i<this.colorButton.length ; i++) {
            this.colorButton[i].addEventListener('click', this.onclickChangeColor.bind(this));
        }

        for (var i= 0; i<this.sizeButton.length ; i++) {
            this.sizeButton[i].addEventListener('click', this.onclickChangeSize.bind(this));
        }

        this.eraseAll.addEventListener('click', this.onClickEraseAll.bind(this));
        this.dropper.addEventListener('click',this.showColorpalette.bind(this));

        // Ecoute sur un évènement créé ligne 67 de colorPalette.js
        document.addEventListener('magical-slate:pick-color',this.onPickColor.bind(this));

    }
    Program.prototype.onPickColor = function(){
    
        var color = this.colorPalette.getPickedColor();
        this.pen.color = 'rgb('+color.red+','+color.green+','+color.blue+')';
    }
    Program.prototype.onclickChangeColor = function(event){
    
        this.pen.color =  event.currentTarget.dataset.id;
    }
    Program.prototype.onclickChangeSize = function (event){
        if (event.currentTarget.dataset.id == "fine"){
            //Changement de couleur des sizeButtons
            document.getElementById('lineNormal').classList.remove('active');
            document.getElementById('lineThick').classList.remove('active');
            event.currentTarget.classList.add('active');
            
            this.pen.size = 1;
        }
        else if (event.currentTarget.dataset.id == "normal"){
            //Changement de couleur des sizeButtons
            document.getElementById('lineFine').classList.remove('active');
            document.getElementById('lineThick').classList.remove('active');
            event.currentTarget.classList.add('active');

            this.pen.size = 3;
        }
        else {
            //Changement de couleur des sizeButtons
            document.getElementById('lineFine').classList.remove('active');
            document.getElementById('lineNormal').classList.remove('active');
            event.currentTarget.classList.add('active');

            this.pen.size = 6;
        }
    }
    Program.prototype.onClickEraseAll = function(event){
        this.slate.context.clearRect(0, 0, canvas.width, canvas.height);
    }
    Program.prototype.showColorpalette = function(event){
        this.colorPalette.canvas.classList.toggle('hidden');
    }

    





