import { cow, Pollution, Carbon } from "./enemy.js"
import { Player } from "./player.js"
import { Inputhandler } from "./input.js"
import { background } from "./background.js"


window.addEventListener('load',function(){
    const canvas= this.document.getElementById('biome1')
    const infoDisplay= this.document.querySelector('#info')
    //infoDisplay.textContent = "Is Bob destroying methane in the glob?"
    let gamescore= this.document.querySelector('#score')
    //gamescore.textContent= "Score:"
    const ctx= canvas.getContext('2d')
    const CANVAS_WIDTH= canvas.width=1500
    const CANVAS_HEIGHT= canvas.height=600
    let x=0
    let y=0

    class Game {
        constructor(width,height) {
            this.width=width
            this.height=height
            //this.image= document.getElementById('layer-1')
            this.background = new background(this)
            this.player= new Player(this)
            this.input= new Inputhandler(this)
            this.enemies= []
            this.enemyTimer= 0
            this.enemyInterval=1000
            this.score= 0
            this.gameSpeed = 0
            this.endgame = false

        }

        update(deltaTime){
           //this.x ++
            //this.y ++ 
            this.background.update(this.input.keys)
            this.player.update(this.input.keys)
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy()
                this.enemyTimer= 0
            }  
            else 
                this.enemyTimer += deltaTime
            
        this.enemies.forEach (enemy => {
                enemy.update(deltaTime)
                if (enemy.markedforDeletion == true) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1)
                }
            })
            

        }

        draw(context){
            this.background.draw(context)
            this.player.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
            //context.fillStyle='lightblue'
            //context.drawImage(this.image,0,0,60,60)
            //context.fillRect(x,y,100,100)
        }

        addEnemy() {
            this.enemies.push(new cow(this))
            this.enemies.push(new Pollution(this))
            this.enemies.push(new Carbon(this))
        }


    }   

    
    const game= new Game(CANVAS_WIDTH,CANVAS_HEIGHT)

    function animate(){
        //gamescore.textContent= "Score:" + game.score
        //console.log(gamescore.textContent, infoDisplay.textContent)
        ctx.clearRect(0,0,canvas.width,canvas.height)
        game.update(10)
        game.draw(ctx)
        //display score
        displayscore (game,ctx)
        endgame(game)
        if(!game.endgame){
        requestAnimationFrame(animate)}
    }

    function endgame(game) {
        if(game.score < -500) {
            ctx.fillText("Earth explodes", (game.width/2) - 60, game.height/2)
            ctx.font = "150px Helvetica"
            ctx.textAlign = "center"
            game.endgame = true
        }
    }

    function displayscore (game,ctx) {
        ctx.font = "20px Helvetica"
        ctx.textAlign = "left"
        ctx.textBaseLine = "top"
        ctx.fillText("Score:" + game.score, 1350, 20)

        if(game.score <= 0) {
            ctx.fillRect(15, 115, 50, 30)
            ctx.fillStyle = 'red'
        }

        else if(game.score > 0 && game.score < 500) {
            ctx.fillRect(15, 115, 50, 55)
            ctx.fillStyle = 'orange'
        }

        else if(game.score >= 500) {
            ctx.fillRect(15, 115, 50, 130)
            ctx.fillStyle = 'green'
        }
    }

    animate()
})