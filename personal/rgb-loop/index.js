const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;


function animate() {
    color_onscreen()
    requestAnimationFrame(animate)
}

i = 0;
colorscreen = true;

function color_onscreen() {

    while (colorscreen) {
      
         colorscreen = false;
         c.fillStyle = `hsl(${0 + i}, 100%, 50%)`;
         c.fillRect(0, 0, canvas.width, canvas.height)
        
         i++
           setTimeout(() => {
            colorscreen = true;
        }, 15); // hier verander je de snelheid van je loop
    }
}
   


animate()

