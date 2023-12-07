export class Inputhandler{

    constructor(game) {
        this.keys= []
        this.game= game
        window.addEventListener('keydown', e => {
          if ((e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowDown' ||
                e.key === 'Enter' ||
                e.key === 'w' ||
                e.key === 'a' ||
                e.key === 's' ||
                e.key === 'd' ) 

        && this.keys.indexOf(e.key) === -1) {
            this.keys.push(e.key)
        }
        console.log(e.key)
        })

        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowRight' ||
             e.key === 'ArrowLeft'||
             e.key === 'ArrowUp' ||
             e.key === 'ArrowDown' ||
             e.key === 'w' ||
            e.key === 'a' ||
            e.key === 's' ||
            e.key === 'd' ) {
                this.keys.splice(this.keys.indexOf(e.key), 1)
             }
            
        })
    }
}