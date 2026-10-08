---
layout: single
title: "Interactive Explanation: Address Resolution Protocol (ARP)"
permalink: /network-practice/arp-demo
toc: false
breadcrumbs: true
sidebar:
  - title: "Interactive ARP Explanation"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: network-practice
taxonomy: markup
---

This page is an interactive explanation of the **Address Resolution Protocol (ARP)** used to discover **MAC Addresses** on the local network given the **IP Address** of a connected machine.

Use the panels below to explore how the process works and pause for every step to inspect the packets/frames that are being sent, to whom they are delivered and how this affects the ARP cache (quick reference lookup on our Host A machine to find IP to MAC mappings for the local network).

<br>

<div class="arp-demo">
<div class="container">
    <!-- Step Indicator -->
    <div class="step-indicator">
        <h2 style="margin-top: 0.25em;">Process Steps</h2>
        <div class="steps">
            <div class="step active" data-step="0">
                <div class="step-number">1</div>
                <span class="step-label">Initial State</span>
            </div>
            <div class="step" data-step="1">
                <div class="step-number">2</div>
                <span class="step-label">ARP Request</span>
            </div>
            <div class="step" data-step="2">
                <div class="step-number">3</div>
                <span class="step-label">Request Broadcast</span>
            </div>
            <div class="step" data-step="3">
                <div class="step-number">4</div>
                <span class="step-label">Target Response</span>
            </div>
            <div class="step" data-step="4">
                <div class="step-number">5</div>
                <span class="step-label">Cache Update</span>
            </div>
        </div>
    </div>
    <!-- Controls -->
    <div class="controls">
        <button class="btn btn-primary" id="prevBtn" disabled>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m15 18-6-6 6-6" /></svg>
            Previous
        </button>
        <button class="btn btn-primary" id="nextBtn">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m9 18 6-6-6-6" /></svg>
            Next
        </button>
        <button class="btn btn-secondary" id="playBtn">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m8 5 12 7-12 7z" /></svg>
            Play All
        </button>
        <button class="btn btn-secondary" id="pauseBtn" disabled>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 5h3v14H8zM15 5h3v14h-3z" /></svg>
            Pause
        </button>
        <button class="btn btn-danger" id="resetBtn">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" /><path d="M3 3v5h5" /></svg>
            Reset
        </button>
    </div>
    <div class="status">
        <h2 style="margin-top: 0.25em;">Current Status</h2>
        <div class="status-content" id="statusContent">
Host A wants to send data to Host D (192.168.1.40)
but doesn't know its MAC address.

Ready to begin ARP process...
        </div>
    </div>
    <!-- Network Diagram -->
    <div class="network-diagram">
        <div class="network-grid" id="networkGrid">
            <!-- Router -->
            <div class="router">
                <div class="router-icon">R</div>
                <div class="router-label">Internet Router</div>
                <div class="device-ip">192.168.1.1</div>
                <div class="device-mac">00:11:22:33:44:55</div>
            </div>
            <!-- Switch -->
            <div class="switch">
                <div class="switch-icon">S</div>
                <div class="switch-label">Ethernet Switch</div>
            </div>
            <!-- Devices Row -->
            <div class="devices-row">
                <div class="device" data-ip="192.168.1.10" data-mac="00:1A:2B:3C:4D:5E">
                    <div class="device-icon">A</div>
                    <div class="device-label">Host A (Sender)</div>
                    <div class="device-ip">192.168.1.10</div>
                    <div class="device-mac">00:1A:2B:3C:4D:5E</div>
                </div>
                <div class="device" data-ip="192.168.1.20" data-mac="00:1B:2C:3D:4E:5F">
                    <div class="device-icon">B</div>
                    <div class="device-label">Host B</div>
                    <div class="device-ip">192.168.1.20</div>
                    <div class="device-mac">00:1B:2C:3D:4E:5F</div>
                </div>
                <div class="device" data-ip="192.168.1.30" data-mac="00:1C:2D:3E:4F:60">
                    <div class="device-icon">C</div>
                    <div class="device-label">Host C</div>
                    <div class="device-ip">192.168.1.30</div>
                    <div class="device-mac">00:1C:2D:3E:4F:60</div>
                </div>
                <div class="device" data-ip="192.168.1.40" data-mac="00:1D:2E:3F:40:61">
                    <div class="device-icon">D</div>
                    <div class="device-label">Host D (Target)</div>
                    <div class="device-ip">192.168.1.40</div>
                    <div class="device-mac">00:1D:2E:3F:40:61</div>
                </div>
            </div>
        </div>
        <!-- Ethernet Cables -->
        <svg id="cableSvg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
            <defs></defs>
        </svg>
    </div>
    <!-- ARP Cache -->
    <div class="arp-cache">
        <h2 style="margin-top: 0.25em;">ARP Cache (Host A)</h2>
        <table class="cache-table">
            <thead>
                <tr>
                    <th>IP Address</th>
                    <th>MAC Address</th>
                    <th>TTL (seconds)</th>
                </tr>
            </thead>
            <tbody id="arpCache">
                <tr>
                    <td>192.168.1.1</td>
                    <td>00:11:22:33:44:55</td>
                    <td>120</td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- ARP Packet Templates -->
    <div id="arpPacketTemplate" style="display: none;">
        <div class="arp-packet">
            <h3>ARP Packet</h3>
            <div class="field">
                <span class="field-label">Type:</span>
                <span class="field-value" data-field="type">Request</span>
            </div>
            <div class="field">
                <span class="field-label">Sender IP:</span>
                <span class="field-value" data-field="senderIp">192.168.1.10</span>
            </div>
            <div class="field">
                <span class="field-label">Sender MAC:</span>
                <span class="field-value" data-field="senderMac">00:1A:2B:3C:4D:5E</span>
            </div>
            <div class="field">
                <span class="field-label">Target IP:</span>
                <span class="field-value" data-field="targetIp">192.168.1.40</span>
            </div>
            <div class="field">
                <span class="field-label">Target MAC:</span>
                <span class="field-value" data-field="targetMac">00:00:00:00:00:00</span>
            </div>
        </div>
    </div>
</div>
<div class="device-dialog-backdrop" id="deviceDialog" hidden>
    <section class="device-dialog" role="dialog" aria-modal="true" aria-labelledby="deviceDialogTitle" tabindex="-1">
        <div class="device-dialog-header">
            <h2 id="deviceDialogTitle">Device Information</h2>
            <button class="dialog-close" id="closeDeviceDialog" type="button">Close</button>
        </div>
        <dl class="device-dialog-details">
            <dt>IP Address</dt>
            <dd id="deviceDialogIp"></dd>
            <dt>MAC Address</dt>
            <dd id="deviceDialogMac"></dd>
        </dl>
    </section>
</div>
</div>
<script>
(() => {
    // Configuration
    const config = {
        steps: [
            {
                title: "Initial State",
                description: "Host A wants to send data to Host D (192.168.1.40) but doesn't know its MAC address.\nThe ARP cache contains some existing entries, but not Host D's MAC address.",
                devices: {
                    '192.168.1.10': 'active',
                    '192.168.1.40': 'normal'
                },
                cache: [
                    { ip: '192.168.1.1', mac: '00:11:22:33:44:55', ttl: 120 }
                ]
            },
            {
                title: "ARP Request Creation",
                description: "Host A creates an ARP request packet:\n- Type: Request\n- Sender IP: 192.168.1.10\n- Sender MAC: 00:1A:2B:3C:4D:5E\n- Target IP: 192.168.1.40\n- Target MAC: 00:00:00:00:00:00 (unknown)",
                devices: {
                    '192.168.1.10': 'sending',
                    '192.168.1.40': 'normal'
                },
                packet: {
                    type: 'Request',
                    senderIp: '192.168.1.10',
                    senderMac: '00:1A:2B:3C:4D:5E',
                    targetIp: '192.168.1.40',
                    targetMac: '00:00:00:00:00:00'
                },
                showPacket: true,
                packetPosition: 'hostA'
            },
            {
                title: "Broadcast ARP Request",
                description: "Host A broadcasts the ARP request to ALL devices on the local network segment.\nEvery device receives it because the Target MAC is FF:FF:FF:FF:FF:FF (broadcast).\n\nAll hosts check if the Target IP (192.168.1.40) matches their IP.",
                devices: {
                    '192.168.1.10': 'sending',
                    '192.168.1.20': 'receiving',
                    '192.168.1.30': 'receiving',
                    '192.168.1.40': 'receiving'
                },
                packet: {
                    type: 'Request',
                    senderIp: '192.168.1.10',
                    senderMac: '00:1A:2B:3C:4D:5E',
                    targetIp: '192.168.1.40',
                    targetMac: 'FF:FF:FF:FF:FF:FF'
                },
                showPacket: true,
                packetPosition: 'broadcast'
            },
            {
                title: "Target Host Responds",
                description: "Host D recognizes that the Target IP (192.168.1.40) matches its own IP address.\n\nHost D creates an ARP reply packet with:\n- Type: Reply\n- Sender IP: 192.168.1.40\n- Sender MAC: 00:1D:2E:3F:40:61\n- Target IP: 192.168.1.10\n- Target MAC: 00:1A:2B:3C:4D:5E\n\nHost D sends this reply directly to Host A (unicast).",
                devices: {
                    '192.168.1.10': 'receiving',
                    '192.168.1.20': 'normal',
                    '192.168.1.30': 'normal',
                    '192.168.1.40': 'sending'
                },
                packet: {
                    type: 'Reply',
                    senderIp: '192.168.1.40',
                    senderMac: '00:1D:2E:3F:40:61',
                    targetIp: '192.168.1.10',
                    targetMac: '00:1A:2B:3C:4D:5E'
                },
                showPacket: true,
                packetPosition: 'hostD'
            },
            {
                title: "Cache Update",
                description: "Host A receives the ARP reply and learns that:\n- IP 192.168.1.40 → MAC 00:1D:2E:3F:40:61\n\nHost A updates its ARP cache with this new mapping.\nThe entry will be stored for a limited time (typically 2-20 minutes).\n\nARP process complete! Host A can now send data directly to Host D.",
                devices: {
                    '192.168.1.10': 'success',
                    '192.168.1.40': 'success'
                },
                cache: [
                    { ip: '192.168.1.1', mac: '00:11:22:33:44:55', ttl: 120 },
                    { ip: '192.168.1.40', mac: '00:1D:2E:3F:40:61', ttl: 300, newEntry: true }
                ],
                showPacket: false
            }
        ],
        playInterval: 2000, // 2 seconds per step
        currentStep: 0,
        isPlaying: false
    };

    // State
    let state = {
        currentStep: 0,
        isPlaying: false,
        playInterval: null,
        packetElement: null,
        packetAnimations: []
    };

    // DOM Elements
    const elements = {
        networkGrid: document.getElementById('networkGrid'),
        arpCache: document.getElementById('arpCache'),
        statusContent: document.getElementById('statusContent'),
        steps: document.querySelectorAll('.step'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        playBtn: document.getElementById('playBtn'),
        pauseBtn: document.getElementById('pauseBtn'),
        resetBtn: document.getElementById('resetBtn'),
        cableSvg: document.getElementById('cableSvg'),
        arpPacketTemplate: document.getElementById('arpPacketTemplate'),
        appContainer: document.querySelector('.container'),
        deviceDialog: document.getElementById('deviceDialog'),
        deviceDialogIp: document.getElementById('deviceDialogIp'),
        deviceDialogMac: document.getElementById('deviceDialogMac'),
        closeDeviceDialog: document.getElementById('closeDeviceDialog')
    };

    let previouslyFocusedDevice = null;

    // Initialize
    function init() {
        // Draw Ethernet cables
        drawCables();
        
        // Setup event listeners
        elements.prevBtn.addEventListener('click', prevStep);
        elements.nextBtn.addEventListener('click', nextStep);
        elements.playBtn.addEventListener('click', startPlayback);
        elements.pauseBtn.addEventListener('click', pausePlayback);
        elements.resetBtn.addEventListener('click', resetSimulation);
        
        // Add click handlers to devices
        document.querySelectorAll('.device').forEach(device => {
            device.setAttribute('role', 'button');
            device.setAttribute('tabindex', '0');
            device.addEventListener('click', () => {
                const ip = device.dataset.ip;
                showDeviceInfo(ip);
            });
            device.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    showDeviceInfo(device.dataset.ip);
                }
            });
        });

        elements.closeDeviceDialog.addEventListener('click', closeDeviceInfo);
        elements.deviceDialog.addEventListener('click', event => {
            if (event.target === elements.deviceDialog) closeDeviceInfo();
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !elements.deviceDialog.hidden) closeDeviceInfo();
        });
        
        // Initialize
        updateStep();
    }

    // Draw Ethernet cables - Cisco network diagram style
    function drawCables() {
        // Clear existing cables
        elements.cableSvg.innerHTML = '<defs></defs>';
        
        const grid = elements.networkGrid;
        const router = grid.querySelector('.router');
        const switchEl = grid.querySelector('.switch');
        const devicesRow = grid.querySelector('.devices-row');
        
        if (!router || !switchEl || !devicesRow) return;
        
        const devices = devicesRow.querySelectorAll('.device');
        if (devices.length === 0) return;
        
        // Get positions relative to grid
        const cableRect = elements.cableSvg.getBoundingClientRect();
        
        // Router connection point (bottom center of router icon)
        const routerIcon = router.querySelector('.router-icon');
        const routerIconRect = routerIcon.getBoundingClientRect();
        const routerX = (routerIconRect.left + routerIconRect.right) / 2 - cableRect.left;
        const routerY = routerIconRect.bottom - cableRect.top;
        
        // Switch connection points
        const switchIcon = switchEl.querySelector('.switch-icon');
        const switchIconRect = switchIcon.getBoundingClientRect();
        const switchCenterX = (switchIconRect.left + switchIconRect.right) / 2 - cableRect.left;
        const switchTopY = switchIconRect.top - cableRect.top;
        const switchBottomY = switchIconRect.bottom - cableRect.top;
        
        // Draw vertical cable from router to switch
        const routerToSwitch = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        routerToSwitch.setAttribute('x1', routerX);
        routerToSwitch.setAttribute('y1', routerY);
        routerToSwitch.setAttribute('x2', switchCenterX);
        routerToSwitch.setAttribute('y2', switchTopY);
        routerToSwitch.setAttribute('stroke', '#00afba');
        routerToSwitch.setAttribute('stroke-width', '2.5');
        routerToSwitch.setAttribute('stroke-linecap', 'round');
        elements.cableSvg.appendChild(routerToSwitch);
        
        // Draw connections from switch to each device
        // Get switch icon width for port distribution
        const switchWidth = switchIconRect.width;
        const switchLeftX = switchIconRect.left - cableRect.left;
        const switchRightX = switchIconRect.right - cableRect.left;
        const numDevices = devices.length;
        const portSpacing = switchWidth / (numDevices - 1);
        
        devices.forEach((device, index) => {
            const deviceIcon = device.querySelector('.device-icon');
            const deviceIconRect = deviceIcon.getBoundingClientRect();
            const deviceX = (deviceIconRect.left + deviceIconRect.right) / 2 - cableRect.left;
            const deviceY = deviceIconRect.top - cableRect.top;
            
            // Calculate switch port position for this device
            const portX = switchLeftX + portSpacing * index;
            const portY = switchBottomY;
            
            // Create clean Cisco-style connection
            // Vertical line from switch port down, then horizontal to device
            const switchToDevice = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            
            // Go down from switch port, then right/left to device, then down to device
            const verticalLength = 30;
            switchToDevice.setAttribute('d', `M ${portX} ${portY} L ${portX} ${portY + verticalLength} L ${deviceX} ${portY + verticalLength} L ${deviceX} ${deviceY}`);
            switchToDevice.setAttribute('stroke', '#64d0df');
            switchToDevice.setAttribute('stroke-width', '2');
            switchToDevice.setAttribute('fill', 'none');
            switchToDevice.setAttribute('stroke-linecap', 'round');
            switchToDevice.setAttribute('stroke-linejoin', 'round');
            elements.cableSvg.appendChild(switchToDevice);
        });
    }

    // Update current step
    function updateStep() {
        const step = config.steps[state.currentStep];
        
        // Update step indicators
        elements.steps.forEach((stepEl, index) => {
            stepEl.classList.remove('active', 'completed');
            if (index === state.currentStep) {
                stepEl.classList.add('active');
            } else if (index < state.currentStep) {
                stepEl.classList.add('completed');
            }
        });
        
        // Update status
        elements.statusContent.textContent = step.description;
        
        // Update device states
        document.querySelectorAll('.device').forEach(device => {
            device.classList.remove('active', 'sending', 'receiving', 'success');
            const ip = device.dataset.ip;
            const deviceState = step.devices?.[ip] || 'normal';
            
            if (deviceState !== 'normal') {
                device.classList.add(deviceState);
            }
        });
        
        // Update ARP cache
        if (step.cache) {
            elements.arpCache.innerHTML = step.cache.map(entry => {
                const rowClass = entry.newEntry ? 'new-entry' : '';
                return `
                    <tr class="${rowClass}">
                        <td>${entry.ip}</td>
                        <td>${entry.mac}</td>
                        <td>${entry.ttl}</td>
                    </tr>
                `;
            }).join('');
        }
        
        // Update packet display
        updatePacket(step);
        
        // Update button states
        elements.prevBtn.disabled = state.currentStep === 0;
        elements.nextBtn.disabled = state.currentStep === config.steps.length - 1;
        elements.playBtn.disabled = state.currentStep === config.steps.length - 1;
    }

    // Update packet display
    function updatePacket(step) {
        clearPacketAnimations();

        // Remove existing packet
        if (state.packetElement) {
            state.packetElement.remove();
            state.packetElement = null;
        }
        
        if (step.showPacket) {
            const packetData = step.packet;
            const packetTemplate = elements.arpPacketTemplate.querySelector('.arp-packet').cloneNode(true);
            
            // Update packet fields
            packetTemplate.querySelector('[data-field="type"]').textContent = packetData.type;
            packetTemplate.querySelector('[data-field="senderIp"]').textContent = packetData.senderIp;
            packetTemplate.querySelector('[data-field="senderMac"]').textContent = packetData.senderMac;
            packetTemplate.querySelector('[data-field="targetIp"]').textContent = packetData.targetIp;
            packetTemplate.querySelector('[data-field="targetMac"]').textContent = packetData.targetMac;
            const position = step.packetPosition;
            const isReply = packetData.type === 'Reply';
            const packetColor = isReply ? '#eb6852' : '#64d0df';
            packetTemplate.classList.add(isReply ? 'reply' : 'request');
            packetTemplate.querySelector('h3').textContent = `ARP ${packetData.type} Packet`;

            elements.networkGrid.parentNode.insertBefore(packetTemplate, elements.networkGrid.nextSibling);
            state.packetElement = packetTemplate;
            
            setTimeout(() => {
                packetTemplate.classList.add('visible');
            }, 10);

            if (position === 'broadcast' || position === 'hostD') {
                const devices = [...elements.networkGrid.querySelectorAll('.device')];
                const source = devices.find(device => device.dataset.ip === packetData.senderIp);
                const recipients = position === 'broadcast'
                    ? devices.filter(device => device.dataset.ip !== packetData.senderIp)
                    : [devices.find(device => device.dataset.ip === packetData.targetIp)].filter(Boolean);

                recipients.forEach((recipient, index) => {
                    animatePacket(source, recipient, packetColor, index * 216);
                });
            }
        }
    }

    function clearPacketAnimations() {
        state.packetAnimations.forEach(animation => {
            if (animation.frame !== null) cancelAnimationFrame(animation.frame);
            animation.elements.forEach(element => element.remove());
        });
        state.packetAnimations = [];
    }

    function animatePacket(source, destination, color, delay) {
        if (!source || !destination) return;

        const svg = elements.cableSvg;
        const svgRect = svg.getBoundingClientRect();
        const switchIconRect = elements.networkGrid.querySelector('.switch-icon').getBoundingClientRect();
        const devices = [...elements.networkGrid.querySelectorAll('.device')];
        const sourceIndex = devices.indexOf(source);
        const destinationIndex = devices.indexOf(destination);
        const switchLeft = switchIconRect.left - svgRect.left;
        const switchBottom = switchIconRect.bottom - svgRect.top;
        const portSpacing = switchIconRect.width / (devices.length - 1);
        const sourcePort = switchLeft + portSpacing * sourceIndex;
        const destinationPort = switchLeft + portSpacing * destinationIndex;
        const sourceIconRect = source.querySelector('.device-icon').getBoundingClientRect();
        const destinationIconRect = destination.querySelector('.device-icon').getBoundingClientRect();
        const sourceX = (sourceIconRect.left + sourceIconRect.right) / 2 - svgRect.left;
        const sourceY = sourceIconRect.top - svgRect.top;
        const destinationX = (destinationIconRect.left + destinationIconRect.right) / 2 - svgRect.left;
        const destinationY = destinationIconRect.top - svgRect.top;
        const fanoutY = switchBottom + 30;

        const route = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        route.setAttribute('d', `M ${sourceX} ${sourceY} L ${sourceX} ${fanoutY} L ${sourcePort} ${fanoutY} L ${sourcePort} ${switchBottom} L ${destinationPort} ${switchBottom} L ${destinationPort} ${fanoutY} L ${destinationX} ${fanoutY} L ${destinationX} ${destinationY}`);
        route.setAttribute('fill', 'none');
        route.setAttribute('stroke', 'none');
        svg.appendChild(route);

        const halo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        halo.setAttribute('r', '10');
        halo.setAttribute('fill', color);
        halo.setAttribute('class', 'packet-dot-halo');

        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', '6');
        dot.setAttribute('fill', color);
        dot.setAttribute('class', 'packet-dot');

        const elementsToAnimate = [halo, dot];
        elementsToAnimate.forEach(element => svg.appendChild(element));

        const animation = { frame: null, elements: [route, ...elementsToAnimate] };
        state.packetAnimations.push(animation);

        const routeLength = route.getTotalLength();
        const duration = 1380;
        let startTime = null;

        function moveDot(timestamp) {
            if (startTime === null) startTime = timestamp + delay;
            const progress = Math.max(0, Math.min(1, (timestamp - startTime) / duration));
            const point = route.getPointAtLength(routeLength * progress);

            elementsToAnimate.forEach(element => {
                element.setAttribute('cx', point.x);
                element.setAttribute('cy', point.y);
            });

            if (progress < 1) {
                animation.frame = requestAnimationFrame(moveDot);
            } else {
                animation.elements.forEach(element => element.remove());
                animation.frame = null;
            }
        }

        animation.frame = requestAnimationFrame(moveDot);
    }

    // Go to next step
    function nextStep() {
        if (state.currentStep < config.steps.length - 1) {
            state.currentStep++;
            updateStep();
        }
    }

    // Go to previous step
    function prevStep() {
        if (state.currentStep > 0) {
            state.currentStep--;
            updateStep();
        }
    }

    // Start automatic playback
    function startPlayback() {
        if (state.isPlaying || state.currentStep >= config.steps.length - 1) return;
        
        state.isPlaying = true;
        elements.playBtn.disabled = true;
        elements.pauseBtn.disabled = false;
        elements.nextBtn.disabled = true;
        elements.prevBtn.disabled = true;
        
        state.playInterval = setInterval(() => {
            nextStep();
            if (state.currentStep >= config.steps.length - 1) {
                pausePlayback();
            }
        }, config.playInterval);
    }

    // Pause playback
    function pausePlayback() {
        if (!state.isPlaying) return;
        
        clearInterval(state.playInterval);
        state.isPlaying = false;
        state.playInterval = null;
        
        elements.playBtn.disabled = false;
        elements.pauseBtn.disabled = true;
        elements.nextBtn.disabled = state.currentStep >= config.steps.length - 1;
        elements.prevBtn.disabled = state.currentStep === 0;
    }

    // Reset simulation
    function resetSimulation() {
        pausePlayback();
        state.currentStep = 0;
        updateStep();
    }

    // Show device info
    function showDeviceInfo(ip) {
        const device = document.querySelector(`.device[data-ip="${ip}"]`);
        if (!device) return;

        previouslyFocusedDevice = device;
        elements.deviceDialogIp.textContent = device.dataset.ip;
        elements.deviceDialogMac.textContent = device.dataset.mac;
        elements.deviceDialog.hidden = false;
        elements.appContainer.inert = true;
        elements.closeDeviceDialog.focus();
    }

    function closeDeviceInfo() {
        elements.deviceDialog.hidden = true;
        elements.appContainer.inert = false;
        previouslyFocusedDevice?.focus();
    }

    // Initialize on page load
    window.addEventListener('DOMContentLoaded', () => {
        // Small delay to ensure everything is loaded
        setTimeout(init, 100);
    });

    // Responsive handling
    window.addEventListener('resize', () => {
        if (state.packetElement) {
            const step = config.steps[state.currentStep];
            updatePacket(step);
        }
        drawCables();
    });
})();
</script>

<style>
@scope (.arp-demo) {
    :scope {
        --hvl-main: #00afba;
        --hvl-second: #004357;
        --hvl-bluegreen: #00afba;
        --hvl-green: #97df9a;
        --hvl-lightblue: #64d0df;
        --hvl-red: #eb6852;
        --hvl-yellow: #f9de45;
        --hvl-blue: #008a4b;
        --hvl-darkgreen: #009482;
        --hvl-darkbluegreen: #004357;
        --hvl-darkred: #6d2439;
        --hvl-grey: #8f8a83;
        --hvl-sand: #b0aca5;
        --hvl-lightgrey: #c9d5da;
        --hvl-white: #ffffff;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :scope {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        color: #e0e0e0;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    h1 {
        text-align: center;
        margin-bottom: 10px;
        color: #00d4ff;
        font-size: 2.5em;
    }

    .subtitle {
        text-align: center;
        color: #888;
        margin-bottom: 30px;
        font-size: 1.1em;
    }

    /* Network Diagram */
    .network-diagram {
        background: #0a0a1a;
        border: 2px solid #333;
        border-radius: 15px;
        padding: 30px;
        margin-bottom: 30px;
        position: relative;
        overflow: hidden;
    }

    .network-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
        position: relative;
        z-index: 1;
        min-height: 400px;
        align-items: center;
        justify-items: center;
    }

    .devices-row {
        display: flex;
        gap: 40px;
        justify-content: center;
        width: 100%;
    }

    .router {
        grid-column: 1 / -1;
        text-align: center;
        margin-bottom: 30px;
    }

    .router-icon {
        width: 70px;
        height: 70px;
        background: #e74c3c;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #c0392b;
        position: relative;
        font-weight: bold;
        color: white;
        font-size: 1.6em;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }

    .router-icon::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 4px;
        background: #c0392b;
        border-radius: 2px;
    }

    .router-label {
        margin-top: 10px;
        color: #ff8c42;
        font-weight: bold;
        font-size: 1.1em;
    }

    .device {
        text-align: center;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .device:hover {
        transform: scale(1.05);
    }

    .device-icon {
        width: 60px;
        height: 60px;
        background: #2ecc71;
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #27ae60;
        margin-bottom: 10px;
        position: relative;
        overflow: hidden;
        font-weight: bold;
        color: white;
        font-size: 1.5em;
    }

    .device-icon::after {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 4px;
        background: #27ae60;
        border-radius: 2px;
    }

    .device-icon::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
        border-radius: 20px;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .device.active .device-icon::before {
        opacity: 1;
    }

    .device-icon i {
        font-size: 2em;
        color: white;
    }

    .device-label {
        font-weight: bold;
        color: #5d9cec;
        font-size: 0.9em;
    }

    .device-ip {
        font-size: 0.9em;
        font-weight: 600;
        color: #004357;
        margin-top: 5px;
    }

    .device-mac {
        font-size: 0.9em;
        font-weight: 600;
        color: #004357;
        margin-top: 3px;
    }

    .switch {
        grid-column: 1 / -1;
        text-align: center;
        margin: 20px 0;
    }

    .switch-icon {
        width: 80px;
        height: 50px;
        background: #3498db;
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #2980b9;
        position: relative;
        font-size: 1.5em;
        font-weight: bold;
        color: white;
    }

    .switch-icon::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 4px;
        background: #2980b9;
        border-radius: 2px;
    }

    .switch-label {
        margin-top: 8px;
        color: #a569bd;
        font-weight: bold;
    }

    .router {
        position: relative;
        padding-top: 58px;
    }

    .router-label,
    .router > .device-ip {
        position: absolute;
        left: 50%;
        width: max-content;
        margin-top: 0;
        transform: translateX(-50%);
        white-space: nowrap;
    }

    .router-label {
        top: 0;
    }

    .router > .device-ip {
        top: 22px;
    }

    .router > .device-mac {
        position: absolute;
        top: 39px;
        left: 50%;
        width: max-content;
        margin-top: 0;
        transform: translateX(-50%);
        white-space: nowrap;
    }

    .switch {
        position: relative;
    }

    .switch-label {
        position: absolute;
        top: 50%;
        left: calc(100% + 12px);
        margin-top: 0;
        transform: translateY(-50%);
        white-space: nowrap;
    }

    @media (max-width: 400px) {
        .switch-label {
            max-width: 82px;
            font-size: 0.78em;
            text-align: left;
            white-space: normal;
        }
    }

    .network-diagram > .status {
        position: absolute;
        top: 16px;
        left: 16px;
        z-index: 2;
        width: min(340px, calc(100% - 32px));
        max-height: min(220px, calc(100% - 32px));
        margin: 0;
        overflow: auto;
    }

    .network-diagram > .status .status-content {
        max-height: 130px;
        overflow: auto;
    }

    @media (max-width: 768px) {
        .network-grid {
            padding-top: 210px;
        }

        .network-diagram > .status {
            top: 12px;
            left: 12px;
            width: calc(100% - 24px);
            max-height: 190px;
            padding: 14px;
        }

        .network-diagram > .status .status-content {
            max-height: 100px;
        }
    }

    /* Ethernet cables - Cisco style */
    .ethernet-cable {
        position: absolute;
        height: 2px;
        background: #4a90e2;
        z-index: 0;
    }

    .cable-connector {
        position: absolute;
        width: 8px;
        height: 8px;
        background: #4a90e2;
        border-radius: 50%;
        border: 2px solid #6da8f5;
    }

    /* ARP Packet */
    .arp-packet {
        position: absolute;
        top: 16px;
        left: 16px;
        z-index: 100;
        width: min(340px, calc(100% - 32px));
        padding: 14px 16px;
        color: #23313d;
        background: var(--packet-surface);
        border: 1px solid var(--packet-color);
        border-left: 5px solid var(--packet-color);
        border-radius: 8px;
        font-size: 0.9em;
        box-shadow: 0 8px 22px rgba(31, 55, 68, 0.15);
        transform: none;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
    }

    .arp-packet.visible {
        opacity: 1;
    }

    .arp-packet.request {
        --packet-color: #287bba;
        --packet-surface: #eef7fc;
    }

    .arp-packet.reply {
        --packet-color: #d97822;
        --packet-surface: #fff5e9;
    }

    .arp-packet h3 {
        margin-bottom: 8px;
        color: var(--packet-color);
        border-bottom: 1px solid color-mix(in srgb, var(--packet-color) 35%, white);
        padding-bottom: 8px;
    }

    .arp-packet .field {
        margin: 5px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .arp-packet .field-label {
        color: var(--packet-color);
        min-width: 100px;
    }

    .arp-packet .field-value {
        color: #23313d;
        overflow-wrap: anywhere;
    }

    .packet-dot-halo {
        opacity: 0.24;
    }

    .packet-dot {
        stroke: #ffffff;
        stroke-width: 2;
        filter: drop-shadow(0 1px 3px rgba(22, 43, 54, 0.4));
    }

    @media (max-width: 768px) {
        .arp-packet {
            top: 12px;
            left: 12px;
            width: calc(100% - 24px);
            padding: 12px 14px;
            font-size: 0.82em;
        }

        .arp-packet .field {
            gap: 4px 8px;
        }
    }

    /* ARP Cache */
    .arp-cache {
        background: #0a0a1a;
        border: 2px solid #333;
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 30px;
    }

    .arp-cache h2 {
        color: #00d4ff;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .cache-table {
        width: 100%;
        border-collapse: collapse;
    }

    .cache-table th,
    .cache-table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #222;
    }

    .cache-table th {
        color: #888;
        font-weight: normal;
        text-transform: uppercase;
        font-size: 0.85em;
    }

    .cache-table tr {
        transition: background 0.2s;
    }

    .cache-table tr:hover {
        background: rgba(0, 212, 255, 0.05);
    }

    .cache-table tr.new-entry {
        animation: highlight 1s ease;
    }

    @keyframes highlight {
        0%, 100% { background: rgba(0, 212, 255, 0.1); }
        50% { background: rgba(0, 212, 255, 0.3); }
    }

    /* Controls */
    .controls {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-bottom: 30px;
        flex-wrap: wrap;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 1em;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s;
        color: white;
        min-width: 120px;
    }

    .btn-icon {
        width: 18px;
        height: 18px;
        flex: none;
    }

    .btn-primary {
        background: linear-gradient(135deg, #00d4ff, #0099cc);
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4);
    }

    .btn-secondary {
        background: linear-gradient(135deg, #666, #444);
    }

    .btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(100, 100, 100, 0.4);
    }

    .btn-danger {
        background: linear-gradient(135deg, #ff4757, #ff3838);
    }

    .btn-danger:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);
    }

    .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }

    /* Step Indicator */
    .step-indicator {
        background: #0a0a1a;
        border: 2px solid #333;
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 30px;
    }

    .step-indicator h2 {
        color: #00d4ff;
        margin-bottom: 15px;
        text-align: center;
    }

    .steps {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }

    .step {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        min-width: 120px;
    }

    .step-number {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #333;
        color: #888;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        transition: all 0.2s;
    }

    .step.active .step-number {
        background: linear-gradient(135deg, #00d4ff, #0099cc);
        color: white;
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    }

    .step.completed .step-number {
        background: #28a745;
        color: white;
    }

    .step-label {
        color: #888;
        font-size: 0.9em;
    }

    .step.active .step-label {
        color: #00d4ff;
    }

    .step.completed .step-label {
        color: #28a745;
    }

    /* Status */
    .status {
        background: #0a0a1a;
        border: 2px solid #333;
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 30px;
    }

    .status h2 {
        color: #00d4ff;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .status-content {
        background: #111;
        border-radius: 8px;
        padding: 15px;
        font-family: 'Courier New', monospace;
        white-space: pre-wrap;
        line-height: 1.6;
    }

    /* Legend */
    .legend {
        background: #0a0a1a;
        border: 2px solid #333;
        border-radius: 15px;
        padding: 15px;
        margin-bottom: 30px;
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .legend-color {
        width: 20px;
        height: 20px;
        border-radius: 4px;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .devices-row {
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }

        .controls {
            flex-direction: column;
            align-items: center;
        }

        .btn {
            width: 100%;
            max-width: 200px;
        }

        h1 {
            font-size: 1.8em;
        }

        .steps {
            flex-direction: column;
            align-items: flex-start;
        }

        .step {
            min-width: 100%;
        }
    }

    /* Animations */
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }

    .pulse {
        animation: pulse 2s infinite;
    }

    .success-check {
        color: #28a745;
        font-weight: bold;
    }

    .error-x {
        color: #ff4757;
        font-weight: bold;
    }

    /* Light, neutral presentation */
    :scope {
        color: #23313d;
    }

    h1 {
        color: #1c5264;
    }

    .subtitle,
    .device-ip,
    .device-mac,
    .step-label {
        color: #647480;
    }

    .network-diagram,
    .arp-cache,
    .step-indicator,
    .status,
    .legend {
        background: #ffffff;
        border: 1px solid #d7e0e5;
        border-radius: 10px;
        box-shadow: 0 8px 24px rgba(31, 55, 68, 0.06);
    }

    .network-diagram {
        background-color: #fbfcfd;
        background-image: linear-gradient(#eaf0f3 1px, transparent 1px),
            linear-gradient(90deg, #eaf0f3 1px, transparent 1px);
        background-size: 24px 24px;
    }

    .router-icon {
        background: #d97736;
        border-color: #b85e25;
    }

    .router-icon::after {
        background: #b85e25;
    }

    .router-label {
        color: #9b572c;
    }

    .device-icon {
        background: #2e8b70;
        border-color: #24745d;
    }

    .device-icon::after {
        background: #24745d;
    }

    .device-label {
        color: #315f72;
    }

    .switch-icon {
        background: #397c9d;
        border-color: #2d657f;
    }

    .switch-icon::after {
        background: #2d657f;
    }

    .switch-label {
        color: #315f72;
    }

    .arp-cache h2,
    .step-indicator h2,
    .status h2 {
        color: #1c5264;
    }

    .cache-table th,
    .cache-table td {
        border-bottom-color: #e3eaee;
        overflow-wrap: anywhere;
    }

    .cache-table {
        table-layout: fixed;
    }

    .cache-table th {
        color: #647480;
    }

    .cache-table tr:hover {
        background: #f0f7f8;
    }

    .btn {
        border-radius: 6px;
    }

    .btn-primary {
        background: #287b91;
    }

    .btn-primary:hover {
        background: #21677a;
        box-shadow: 0 4px 12px rgba(40, 123, 145, 0.2);
    }

    .btn-secondary {
        background: #647480;
    }

    .btn-secondary:hover {
        background: #52616b;
        box-shadow: 0 4px 12px rgba(82, 97, 107, 0.18);
    }

    .btn-danger {
        background: #b64a4a;
    }

    .btn-danger:hover {
        background: #9b3d3d;
        box-shadow: 0 4px 12px rgba(182, 74, 74, 0.2);
    }

    .step-number {
        background: #e8eef1;
        color: #647480;
    }

    .step.active .step-number {
        background: #287b91;
        box-shadow: none;
    }

    .step.active .step-label {
        color: #1c7188;
    }

    .status-content {
        background: #f3f6f7;
        color: #344651;
    }

    .arp-packet {
        background: var(--packet-surface);
        border-radius: 8px;
        box-shadow: 0 8px 22px rgba(31, 55, 68, 0.15);
    }

    .arp-packet .field-label {
        color: var(--packet-color);
    }

    .arp-packet .field-value {
        color: #23313d;
    }

    .legend-color {
        border-radius: 3px;
    }

    .device-dialog-backdrop[hidden] {
        display: none;
    }

    .device-dialog-backdrop {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: grid;
        place-items: center;
        padding: 20px;
        background: rgba(25, 43, 54, 0.34);
    }

    .device-dialog {
        width: min(100%, 420px);
        padding: 24px;
        background: #ffffff;
        border: 1px solid #d7e0e5;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(22, 43, 54, 0.22);
    }

    .device-dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 20px;
    }

    .device-dialog h2 {
        color: #1c5264;
        font-size: 1.25em;
    }

    .dialog-close {
        padding: 7px 11px;
        color: #315f72;
        background: #f2f5f7;
        border: 1px solid #d7e0e5;
        border-radius: 6px;
        cursor: pointer;
    }

    .dialog-close:hover {
        background: #e8eef1;
    }

    .device-dialog-details {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px 18px;
        margin: 0;
    }

    .device-dialog-details dt {
        color: #647480;
    }

    .device-dialog-details dd {
        margin: 0;
        color: #23313d;
        font-family: 'Courier New', monospace;
        overflow-wrap: anywhere;
    }

    :scope {
        color: var(--hvl-second);
    }

    h1,
    .arp-cache h2,
    .step-indicator h2,
    .status h2 {
        color: var(--hvl-second);
    }

    .subtitle,
    .device-ip,
    .device-mac,
    .step-label,
    .cache-table th,
    .device-dialog-details dt {
        color: var(--hvl-grey);
    }

    .network-diagram,
    .arp-cache,
    .step-indicator,
    .status,
    .legend,
    .device-dialog {
        color: var(--hvl-second);
        background: var(--hvl-white);
        border-color: var(--hvl-lightgrey);
        box-shadow: 0 8px 24px rgba(143, 138, 131, 0.15);
    }

    .network-diagram {
        background-color: var(--hvl-white);
        background-image: linear-gradient(rgba(143, 138, 131, 0.15), 1px, transparent 1px),
            linear-gradient(90deg, rgba(143, 138, 131, 0.15), 1px, transparent 1px);
        background-size: 24px 24px;
    }

    .router-icon {
        background: var(--hvl-red);
        border-color: var(--hvl-darkred);
    }

    .router-icon::after {
        background: var(--hvl-darkred);
    }

    .router-label {
        color: var(--hvl-red);
    }

    .device-icon {
        color: var(--hvl-white);
        background: var(--hvl-green);
        border-color: var(--hvl-darkgreen);
    }

    .device-icon::after {
        background: var(--hvl-darkgreen);
    }

    .device-label,
    .switch-label {
        color: var(--hvl-second);
    }

    .switch-icon {
        background: var(--hvl-bluegreen);
        border-color: var(--hvl-second);
    }

    .switch-icon::after {
        background: var(--hvl-second);
    }

    .ethernet-cable,
    .cable-connector {
        background: var(--hvl-lightblue);
    }

    .cable-connector {
        border-color: var(--hvl-bluegreen);
    }

    .arp-packet.request {
        --packet-color: var(--hvl-lightblue);
        --packet-surface: var(--hvl-white);
    }

    .arp-packet.reply {
        --packet-color: var(--hvl-red);
        --packet-surface: var(--hvl-white);
    }

    .arp-packet {
        color: var(--hvl-second);
        border-color: var(--packet-color);
        border-left-color: var(--packet-color);
        background: var(--packet-surface);
        box-shadow: 0 8px 22px rgba(143, 138, 131, 0.15);
    }

    .arp-packet h3 {
        color: var(--packet-color);
        border-bottom-color: var(--hvl-lightgrey);
    }

    .arp-packet .field-label {
        color: var(--packet-color);
    }

    .arp-packet .field-value {
        color: var(--hvl-second);
    }

    .packet-dot {
        stroke: var(--hvl-white);
        filter: drop-shadow(0 1px 3px rgba(143, 138, 131, 0.4));
    }

    .cache-table th,
    .cache-table td {
        color: var(--hvl-second);
        border-bottom-color: var(--hvl-lightgrey);
    }

    .cache-table tr:hover {
        background: rgba(0, 175, 186, 0.1);
    }

    @keyframes highlight {
        0%, 100% { background: rgba(0, 175, 186, 0.12); }
        50% { background: rgba(0, 175, 186, 0.28); }
    }

    .btn-primary,
    .step.active .step-number {
        background: var(--hvl-second);
    }

    .btn-primary:hover {
        background: var(--hvl-main);
        box-shadow: 0 4px 12px rgba(0, 67, 87, 0.2);
    }

    .btn-secondary {
        background: var(--hvl-grey);
    }

    .btn-secondary:hover {
        background: var(--hvl-main);
        box-shadow: 0 4px 12px rgba(0, 67, 87, 0.18);
    }

    .btn-danger {
        background: var(--hvl-red);
    }

    .btn-danger:hover {
        background: var(--hvl-darkred);
        box-shadow: 0 4px 12px rgba(109, 36, 57, 0.2);
    }

    .step-number {
        color: var(--hvl-grey);
        background: var(--hvl-lightgrey);
    }

    .step.completed .step-number,
    .step.completed .step-label,
    .success-check {
        color: var(--hvl-white);
        background: var(--hvl-darkgreen);
    }

    .step.active .step-label {
        color: var(--hvl-second);
    }

    .step.completed .step-label {
        color: var(--hvl-darkgreen);
        background: transparent;
    }

    .error-x {
        color: var(--hvl-red);
    }

    .status-content {
        color: var(--hvl-second);
        background: var(--hvl-white);
        border: 1px solid var(--hvl-lightgrey);
    }

    .device-dialog-backdrop {
        background: rgba(0, 67, 87, 0.34);
    }

    .device-dialog {
        border-color: var(--hvl-lightgrey);
    }

    .device-dialog h2 {
        color: var(--hvl-second);
    }

    .dialog-close {
        color: var(--hvl-second);
        background: var(--hvl-white);
        border-color: var(--hvl-lightgrey);
    }

    .dialog-close:hover {
        background: var(--hvl-lightgrey);
    }

    .device-dialog-details dd {
        color: var(--hvl-second);
    }
}
</style>