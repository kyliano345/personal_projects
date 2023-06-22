const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

const scoreEl = document.querySelector('#scoreEl')
const startgameBtn = document.querySelector('#startgameBtn')
const modalEl = document.querySelector('#modalEl')
const startgameScoreEl = document.querySelector('#startgameScoreEl')


class Player {
    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
     draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }   
}
class Enemy{
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
     draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
     
    
}
const friction = 0.98
class Particle{
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }
     draw(){
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
    }
    update(){
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01
    }
     
    
}

const x = canvas.width / 2
const y = canvas.height / 2

let player = new Player(x, y, 15, 'white')
let projectiles = []
let enemies = []
let particles =[]
function init()
    {
        player = new Player(x, y, 15, 'white')
        projectiles = []
        enemies = []
        particles =[]
        score = 0
        scoreEl.innerHTML = score
    }

function spawnEnemies(){
       
    setInterval(() => {
                
        const radius = Math.random() * (30 - 7) + 7
        let x
        let y
        
        if (Math.random() < 0.5){
        x = Math.random() <0.5 ? 0 - radius : canvas.width + radius
        y = Math.random() * canvas.height
      
       
        } else {
               x = Math.random() * canvas.width
               y = Math.random() <0.5 ? 0 - radius : canvas.height + radius
            
        }
        
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
    
        const velocity ={
        x: Math.cos(angle) * 0.95,
        y: Math.sin(angle) * 0.95
    }
            enemies.push(new Enemy(x, y, radius, color, velocity))
        
    
    
    
    
    }, 1000)
}
  let animationId
  let score = 0
  

function animate(){
    animationId = requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
      particles.forEach((Particle, index ) => {
          if (Particle.alpha <= 0){
              particles.splice(index, 1)
          }else{Particle.update()}
              
          
          
                                        })
    projectiles.forEach((Projectile, Projectileindex ) => {
        Projectile.update()
        
                                        })
    enemies.forEach((enemy, index) =>{
    enemy.update()
         if (
             Projectile.x + Projectile.radius < 0 || 
             Projectile.x - Projectile.radius > canvas.width ||
             Projectile.y + Projectile.radius < 0 || 
             Projectile.y - Projectile.radius > canvas.height)
         {
           Projectiles.splice(Projectileindex, 1) 
         }
        
     const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
     if(dist - enemy.radius - player.radius <1){
         cancelAnimationFrame(animationId)
         modalEl.style.display = 'flex'
         startgameScoreEl.innerHTML = score
         
     }
     
    projectiles.forEach((Projectile, ProjectileIndex) => {
     const dist = Math.hypot(Projectile.x - enemy.x, Projectile.y - enemy.y)
     //when enemy hit projectile
     if(dist - enemy.radius - Projectile.radius <1){
         
         score += 100
         scoreEl.innerHTML = score
         
         for(i = 0; i < enemy.radius * 2;i++){
             particles.push(new Particle(Projectile.x, 
                                         Projectile.y,
                                         Math.random() * 2, 
                                         enemy.color,
                                         {x: (Math.random() - 0.5) * (Math.random() * enemy.radius / 3.5),
                                          y: (Math.random() - 0.5) * (Math.random() * enemy.radius / 3.5)}))
         }
          
         
         if(enemy.radius - 10 > 10){
             score += 100
         scoreEl.innerHTML = score
               gsap.to(enemy, {
                   radius: enemy.radius - 10
               })
               setTimeout(() => {
         projectiles.splice(ProjectileIndex, 1)
     }, 0)
         
         }else{
              setTimeout(() => {
         enemies.splice(index, 1)
         projectiles.splice(ProjectileIndex, 1)
         score += 150
         scoreEl.innerHTML = score
         
     }, 0)
          
         }
       
    }                     
    })
    
    
    
})
}

addEventListener('click',(event) =>{
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)
    
    const velocity ={
        x: Math.cos(angle) * 3,
        y: Math.sin(angle) * 3
    }

    
    
    projectiles.push(new Projectile(canvas.width / 2, 
                                    canvas.height / 2,
                                    5,
                                    'white',
                                    velocity
                                    ))
   
})
   startgameBtn.addEventListener('click', () => {
        init()
        animate() 
        spawnEnemies()
        modalEl.style.display = 'none'
   })                     
   


                        