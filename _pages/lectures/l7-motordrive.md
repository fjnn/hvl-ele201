---
layout: single
title: "Lecture 7 - DC motor drive and H-bridge"
permalink: /lectures/l7-motordrive
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
DC motordrift. H-bridge

# Motor Drives
In general a motor drive is a power electronic device used to control the power delivered to a motor. The purpose could be either torque, speed or position control of the rotating motor shaft. At a high level the motor drive consists of a controller, and an amplifier (power electronics) which amplify the output from the controller to levels sufficient to drive the motor.

There are many different types of motors in existence, and each type warrants its own particular motor drive design. Unless the controller is very simple, microcontrollers are typically used for the controller, and the power electronics will be selected depending on type and size of the motor.

**DC Motors:** This is a very common motor in cheap low power applications. We can see it in remote control cars, robots, etc. This motor has a simple structure. It will start rolling by applying proper voltage to its terminals and change it's rotational direction by switching voltage polarity. The DC motor torque (and thus speed) is directly controlled by the applied current. Current depends on voltage, and thus a voltage level less than the maximum tolerable voltage, will cause a speed that is less than maximum speed. By varying the applied voltage we will in practice wary the speed of the motor.

**Stepper Motors:** In some projects such as 3D printers, scanners and CNC machines we need to know motor spin steps accurately. In these cases, we may use stepper motors. Stepper motor are electric motors that divides a full rotation into a number of equal steps. The amount of rotation per step is determined by the motor structure. These kind of motors may be designed to have a very high accuracy if needed.

**Servo Motors:** There are many different types of motors that could be considered as servo motors. What they have in common it that they typically provide position control service. By using a servo you will be able to control the amount of shafts rotation and move it to a specific position. They usually have a small dimension and are the best choice for applications such as robotic arms.

**AC motors** Three phase AC motors are by far the largest consumer of electrical energy in the world. There are many different varieties of AC motors, but the type known as the induction motor serves a particularly important role in industry. This type of motor is typically used in applications where accuracy is less important, and for a very wide range of power levels from watts to megawatts. Examples include the driving of pumps, fans, drums, batching plants etc.

It is typically not possible to connect motors to microcontrollers or controller board such as Arduino or Nucleo directly. Unless the motor is really small it will require more current than the controller is able to supply. TheNucleo-144 has a maximum drive capability of 25 mA on each pin. Thus we need some form of circuit to amplify the signal from the controller, this kind of circuit is called motor driver, or motor drive. The driver is an interface circuit between the motor and controlling unit to facilitate driving. 

In this lecture we will look at DC-motor drives. The understanding of DC-motor drives is a good foundation for understanding more advanced AC-motor drives, which are more used in big industries.

# Introduction to DC motors

{: .notice--info}
An electric motor is a device that converts electrical energy to mechanical energy with the help of magnets.

DC motors are divided into 2 main categories: *brushed* and *brushless* DC motors. We can define a brushed DC motor as a motor with internal mechanical commutation. It is designed to be powered by a direct current source. On the other hand, in the brushless DC motors, there is no physical contact between coils and the field magnet (stationary and rotaty parts). The brushless DC motor is really an AC motor with a electronic DC to AC converter placed inside the motor housing.

![brushDC.png]({{site.baseurl}}/assets/images/brushDC.png)
(Source:[orientalmotor.com](https://blog.orientalmotor.com/brush-dc-motors-vs-brushless-dc-motors-which-is-better))

How does brushed DC motors work? [Watch this](https://www.youtube.com/watch?v=LAtPHANEfQo).

A brushless DC motor uses a permanent magnet as its external rotor and there are three phases of coils surrounding it. A specialized sensor is also typically placed in the setup to track the position of the rotor as it is moving, where the rotor position signals are being sent to a controller. A term often used for these devices is ESC (electronic speed controller). The ESC regulates the motor speed in order to track some reference speed, and can also provide dynamic braking where the rotational energy of the motor is converted back to electrical energy.

![brushlessDC.png]({{site.baseurl}}/assets/images/brushlessDC.png)
(Source:[orientalmotor.com](https://blog.orientalmotor.com/brush-dc-motors-vs-brushless-dc-motors-which-is-better))

How does brushless DC motors work? [Watch this](https://www.youtube.com/watch?v=bCEiOnuODac).

Brushed DC motors have been in commercial use since 1886. Brushless motors, on the other hand, did not become commercially viable until 1962. Brushed DC motors develop a maximum torque when stationary, linearly decreasing as velocity increases. Some limitations of brushed motors can be overcome by brushless motors; they include higher efficiency and a lower susceptibility to mechanical wear. These benefits come at the cost of potentially less rugged, more complex, and more expensive control electronics.

![simpleDCinside.jpg]({{site.baseurl}}/assets/images/simpleDCinside.jpg)
(Source:[itectec.com](https://itectec.com/electrical/electrical-self-inductance-in-steady-state-equivalent-model-of-brushed-dc-machine/))

![dcMotor.jpg]({{site.baseurl}}/assets/images/dcMotor.jpg)
(Source:[motioncontrolonline.org](https://www.motioncontrolonline.org/blog-article.cfm/Brushed-DC-Motors-Vs-Brushless-DC-Motors/24))

![simpleDCinside2.jpg]({{site.baseurl}}/assets/images/simpleDCinside2.jpg)
(Source:[timotion.com](https://www.timotion.com/en/news-and-articles/part-2-components-of-an-electric-linear-actuator))


# DC motor control
The idea behind DC motor control is to connect a power source between two pins of the DC motor, and it will just work. However, we want to control it. We want to automatically turn it on and off via our microcontroller. Since we don't have enough power to generate, we need to set a small circuit. We can use a simple transistor, MOSFET or a relay. 

![simple-motor-connect.png]({{site.baseurl}}/assets/images/simple-motor-connect.png)

As we set our difital switch on and off, we can make the motor rotate or stop. 

Can we change its speed?

![motor-drive-mosfet-potentiometer.jpg]({{site.baseurl}}/assets/images/motor-drive-mosfet-potentiometer.jpg)
(Source: [youtube/StuffBuilder](https://www.youtube.com/watch?v=ipiDHD4YEMM))

However our microcontroller is done in this scenario and everything became manual. Another thing missing is that what if we want to change the direction of the motor as well as the speed *automatically*?

## LM293D H-Brigde
An H bridge is an electronic circuit that switches the polarity of a voltage applied to a load. These circuits are often used in robotics and other applications to allow DC motors to run forwards or backwards.

This section provides a basic overview of the LM293D driver. More details about are available in the [datasheet](https://www.st.com/resource/en/datasheet/l293d.pdf)

![l293d_package.png]({{site.baseurl}}/assets/images/l293d_package.png)

The L293D is a quadruple high-current half-H driver. The D in the name signifies that this version incorporates diodes on the outputs. It has a maximum output current of 600 mA, a maximum switching frequency of 5 kHz, and supports a voltage range from 4.5 to 36 V.

![l293d_logic_diagram.png]({{site.baseurl}}/assets/images/l293d_logic_diagram.png)

Depending on the degree of control that your application requires there are several possible ways to connect the motor.

![l293d_motor_connection_examples.png]({{site.baseurl}}/assets/images/l293d_motor_connection_examples.png)

The following tables provides an overview of the possible control signal inputs, and the effect they will have in a DC motor drive application.

![table-3-part-1.png]({{site.baseurl}}/assets/images/table-3-part-1.png)
![table-3-part-2.png]({{site.baseurl}}/assets/images/table-3-part-2.png)

{: .notice--info}
EN pin as shown H or L here, but it is the pin we will provide PWM signal. 1A and 2A are only for deciding the direction.

## Exercise-1: Simple DC motor drive with L293D

<u>Hardware setup:</u> 

Set up this circuit. We will not use the potentiometer and the button in this exercise, but we will use them in the next ones.

{: .notice--warning}
PLEASE DO NOT CONNECT ANYTHING IF YOU ARE CONNECED TO YOUR PC VIA USB! FIRST UNPLUG THE POWER!

![h-bridge-circuit.png]({{site.baseurl}}/assets/images/h-bridge-circuit.png)

<u>STM32CubeMX setup:</u>

1. Create a new project for the STM32F767ZITx (or select the NUCLEO-F767ZI board).
1. On the left, go to ``System Core > RCC > HSE: Crystal/Ceramic Resonator``.
1. Configure GPIO for Direction Control:
  - Locate and configure pin ``PB3`` as ``GPIO_Output`` and label it as **IN_1A**. (This connects to **L293D 1A**).
  - Locate and configure pin ``PB5`` as ``GPIO_Output``and label it as **IN_2A**. (This connects to **L293D 2A**).
1. Configure PWM for Speed Control (Enable Pin). We will use ``TIM1``:
    * Set your clock configurations as usual.
    * Set **TIM1** Clock Source to `Internal Clock`.
    * Set **Channel 1** Mode to `PWM Generation CH1`. This will set `PE9` as PWM output. Change the label to **ENA**
    * Set the **Prescaler** to `108-1` and the **Counter Period (ARR)** to `999`. Note that TIM1 is on the APB2 bus, and and its clock will also be operating 108 MHz in this setup. 
1. `TIM1_CH1` pin is automatically set to `PE9`. *Note that you could change it by pressing CTRL, to `PA8` as well.*
1. Set your clock configurations as always with 8 MHz Input frequency, PLLCLK in system clock MUX, and HCLK 108 MHz. 
1. Give a proper name and generate the code as usual: Basic application structure, STM32CubeIDE Toolchain, untick "Generate under root" and generate the code.

<u>Code implementation</u>

1. Create a `platformio.ini` file with this content.
  ```c
  [env:nucleo_f767zi]
  platform = ststm32
  board = nucleo_f767zi
  framework = stm32cube
  build_flags = 
      -IInc
  upload_protocol = stlink
  debug_tool = stlink
  debug_build_flags = -O0 -g -ggdb
  monitor_speed = 115200
  ```

1. Open the project in PlatformIO. In the `main.c` add definitions for motor control state under ``/* USER CODE BEGIN PV */``:
  ```c
  uint32_t motor_speed = 0; // 0 to 999 (Counter Period value)
  ```
1. Add the following line to start the PWM signal under ``/* USER CODE BEGIN 2 */``:
  ```c
  HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);  // Note that htim1 is the handle generated by CubeMX for TIM1
  ```
1. Time to implement the motor control logic. 
  - Rotate the motor in one direction *slowly* for 2 seconds
  - Rotate the motor in one direction *faster* for 2 seconds
  - Rotate the motor in the other direction *slowly* for 2 seconds
  - Rotate the motor in the other direction *faster* for 2 seconds
  - Stop the motor for 2 seconds
1. Before paste-ing the code below, think about it. How you would implement this code?


  <button onclick="var c=document.getElementById('show-dir-code'); if(c.style.display==='none'){c.style.display='block'; this.textContent='Hide Code';}else{c.style.display='none'; this.textContent='Show code';}">Show code</button>
  <pre id="show-dir-code" style="display:none;"><code>
  // Set Direction (IN_1A HIGH, IN_2A LOW)
  HAL_GPIO_WritePin(IN_1A_P, GPIO_PIN_5, GPIO_PIN_SET);
  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_4, GPIO_PIN_RESET);
</code></pre>

