

# neopixel is om de leds aan te sturen, machine is om de pins aan te sturen, time is om het programma te laten wachten

import neopixel, machine, time

# maak een variable aan die op een korte manier de leds aanspreekt
# neopixel.NeoPixel is het led programma. machine.Pin(23) geeft aan dat pin 23 wordt aangestuurd.
# ,2 geeft aan dat we twee leds hebben (np[0] en np[1])
np=neopixel.NeoPixel(machine.Pin(23),2)

# maak een functie aan
def loop():
    i = 1
    r=255
    g=0
    b=0
    
    r2=0
    g2=255
    b2=0
    while i < 6:
        for g in range(255):
            r=r-1
            g=g+1
            
            g2=g2-1
            b2=b2+1
            
            np[0]=(r,g,b)
            np[1]=(r2,g2,b2)
            np.write()
            time.sleep(0.005)
            
        for b in range(255):
            g=g-1
            b=b+1
            
            b2=b2-1
            r2=r2+1
            
          
            
            np[0]=(r,g,b)
            np[1]=(r2,g2,b2)
            np.write()
            time.sleep(0.005)
            
        for r in range(255):

b=b-1
            r=r+1
            
            r2=r2-1
            g2=g2+1
            
            np[0]=(r,g,b)
            np[1]=(r2,g2,b2)
            np.write()
            time.sleep(0.005)
            
            
            
        
        np.write()
    
loop()

# np[0]=(255,0,0) betekend led op rood (0,0,0) is uit
# np.write() schrijf waarde naar led
# time.sleep(2) laat de code wachten voor twee seconden