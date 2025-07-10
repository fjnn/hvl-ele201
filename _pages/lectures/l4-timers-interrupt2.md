---
layout: single
title: "Lecture 4 - Timers and Interrupt 2"
permalink: /lectures/l4-timers-interrupt2
toc: true
breadcrumbs: true
sidebar:
  - title: "Lectures"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: lectures
taxonomy: markup
---

<!-- {: .notice--info}
Detaljert om GPIO. Inngang og utgang, push-pull vs open-drain. Pull-up og pull-down. Bruk av tabellar (array) med fleire trykknappar og lysdiodar. -->


# binary operations: 
adding, subtracting, compliment
Example: binary decoders and MUX/DEMUX.



# External Interrupts
definition
Debugging, reading register value using platformIO.

# Edge detection
pass

# Debouncing
debouncing, oscilloscope.

# Pull-up vs Pull-down



# Exercise: SOS
Any port, any pin, SOS exercise with button.

# Exercise (Home/Lab): Tilt sensor with LED blink
<!-- Look at some digital sensors, IR count maybe? -->
Make a project that your where you will blink two LEDs: one green one red. Additionally you will have a tilt sensor. As the project stays horizontal, a only green LED will blink at 2 Hz. As the project tilted, the only red LED will blink at 5 Hz.
1. You should figure our which pin numbers are connected to green and red LEDs using user manual.
  Alternatively, you can connect external LEDs.
2. You should choose an input pin as GPIO_Input for the tilt sensor.
3. Make sure the clock calculations are correct and you get desired blink frequencies.