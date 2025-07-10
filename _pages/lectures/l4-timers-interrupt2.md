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

{: .notice--info}
Detaljert om GPIO. Inngang og utgang, push-pull vs open-drain. Pull-up og pull-down. Bruk av tabellar (array) med fleire trykknappar og lysdiodar.


Debugging, reading register value using platformIO.

debouncing, oscilloscope.

binary operations: adding, subtracting, compliment
Example: binary decoders and MUX/DEMUX.


Any port, any pin, SOS exercise with button.

Tilt button example

Look at some digital sensors, IR count maybe?

External interrupts are here

# Exercise (Home/Lab): Tilt sensor with LED blink
Make a project that your where you will blink two LEDs. One green one red. Additionally you will have a tilt sensor. As the project stays horizontal, a only green LED will blink at 2 Hz. As the project tilted, the only red LED will blink at 5 Hz.