---
layout: single
title: "Interactive Explanation: Dynamic Host Configuration Protocol (DHCP)"
permalink: /network-practice/dhcp-demo
toc: false
breadcrumbs: true
sidebar:
  - title: "Interactive DHCP Explanation"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: network-practice
taxonomy: markup
---

This page is an interactive explanation of the **Dynamic Host Configuration Protocol (DHCP)**. Follow a client as it discovers a DHCP server, receives an address offer, requests the lease, and applies the server's acknowledgement.

Use the controls to step through **Discover, Offer, Request, and Acknowledgement (DORA)**. The packet panel shows the message contents and destination, while the client configuration panel tracks the address lease.

<br>

<div id="dhcpDemo" class="dhcp-demo">
    <div class="container">
        <section class="step-indicator" aria-labelledby="dhcpProcessStepsTitle">
            <h2 id="dhcpProcessStepsTitle">Process Steps</h2>
            <div class="steps">
                <div class="step active" data-step="0"><div class="step-number">1</div><span class="step-label">No Address</span></div>
                <div class="step" data-step="1"><div class="step-number">2</div><span class="step-label">Discover</span></div>
                <div class="step" data-step="2"><div class="step-number">3</div><span class="step-label">Offer</span></div>
                <div class="step" data-step="3"><div class="step-number">4</div><span class="step-label">Request</span></div>
                <div class="step" data-step="4"><div class="step-number">5</div><span class="step-label">Acknowledgement</span></div>
            </div>
        </section>
        <nav class="controls" aria-label="DHCP simulation controls">
            <button class="btn btn-primary" id="dhcpPrevious" type="button" disabled>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m15 18-6-6 6-6" /></svg>Previous
            </button>
            <button class="btn btn-primary" id="dhcpNext" type="button">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m9 18 6-6-6-6" /></svg>Next
            </button>
            <button class="btn btn-secondary" id="dhcpPlay" type="button">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m8 5 12 7-12 7z" /></svg>Play All
            </button>
            <button class="btn btn-secondary" id="dhcpPause" type="button" disabled>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 5h3v14H8zM15 5h3v14h-3z" /></svg>Pause
            </button>
            <button class="btn btn-danger" id="dhcpReset" type="button">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" /><path d="M3 3v5h5" /></svg>Reset
            </button>
        </nav>
        <section class="status" aria-live="polite" aria-labelledby="dhcpStatusTitle">
            <h2 id="dhcpStatusTitle">Current Status</h2>
            <div class="status-content" id="dhcpStatus">Host A has joined the network but does not yet have an IPv4 address. It will use DHCP to request its configuration.</div>
        </section>
        <section class="network-diagram" aria-label="DHCP network diagram">
            <div class="network-grid" id="dhcpNetworkGrid">
                <div class="router">
                    <div class="router-icon" aria-hidden="true">G</div>
                    <div class="router-label">Default Gateway</div>
                    <div class="device-ip">192.168.1.1</div>
                    <div class="device-mac">00:11:22:33:44:55</div>
                </div>
                <div class="switch">
                    <div class="switch-icon" aria-hidden="true">S</div>
                    <div class="switch-label">Ethernet Switch</div>
                </div>
                <div class="devices-row">
                    <div class="device" data-role="client">
                        <div class="device-icon" aria-hidden="true">A</div>
                        <div class="device-label">Host A (Client)</div>
                        <div class="device-ip" data-current-ip>0.0.0.0</div>
                        <div class="device-mac">00:1A:2B:3C:4D:5E</div>
                    </div>
                    <div class="device" data-role="hostB">
                        <div class="device-icon" aria-hidden="true">B</div>
                        <div class="device-label">Host B</div>
                        <div class="device-ip">192.168.1.20</div>
                        <div class="device-mac">00:1B:2C:3D:4E:5F</div>
                    </div>
                    <div class="device server" data-role="server">
                        <div class="device-icon" aria-hidden="true">D</div>
                        <div class="device-label">DHCP Server</div>
                        <div class="device-ip">192.168.1.2</div>
                        <div class="device-mac">00:1B:2C:3D:4E:60</div>
                    </div>
                    <div class="device" data-role="hostC">
                        <div class="device-icon" aria-hidden="true">C</div>
                        <div class="device-label">Host C</div>
                        <div class="device-ip">192.168.1.30</div>
                        <div class="device-mac">00:1C:2D:3E:4F:60</div>
                    </div>
                </div>
            </div>
            <svg class="cable-svg" id="dhcpCableSvg" aria-hidden="true"><defs></defs></svg>
            <section class="packet-panel" id="dhcpPacketPanel" aria-live="polite" hidden>
                <h2 id="dhcpPacketTitle"></h2>
                <dl class="packet-fields" id="dhcpPacketFields"></dl>
            </section>
        </section>
        <section class="lease-panel" aria-live="polite" aria-labelledby="dhcpLeaseTitle">
            <h2 id="dhcpLeaseTitle">Client Configuration</h2>
            <dl class="lease-details">
                <div><dt>Lease State</dt><dd id="dhcpLeaseState">No lease</dd></div>
                <div><dt>IPv4 Address</dt><dd id="dhcpLeaseIp">Not assigned</dd></div>
                <div><dt>Subnet Mask</dt><dd id="dhcpLeaseMask">Not assigned</dd></div>
                <div><dt>Default Gateway</dt><dd id="dhcpLeaseRouter">Not assigned</dd></div>
                <div><dt>DNS Server</dt><dd id="dhcpLeaseDns">Not assigned</dd></div>
                <div><dt>Lease Duration</dt><dd id="dhcpLeaseDuration">Not assigned</dd></div>
            </dl>
        </section>
    </div>
</div>
<script>
(() => {
    const root = document.getElementById('dhcpDemo');
    if (!root) return;

    const colors = { teal: '#00afba', lightBlue: '#64d0df', red: '#eb6852', white: '#ffffff' };
    const clientMac = '00:1A:2B:3C:4D:5E';
    const offeredIp = '192.168.1.50';
    const transactionId = '0x6F21A3B8';
    const stepData = [
        {
            title: 'No Address',
            description: 'Host A has joined the local network but has no IPv4 address yet. It can still communicate on the local link using its MAC address and DHCP.',
            devices: { client: 'active' }
        },
        {
            title: 'DHCP Discover',
            description: 'Host A broadcasts DHCPDISCOVER because it does not know the DHCP server address. The switch floods the frame across the local network, so the DHCP server and other hosts receive it.',
            devices: { client: 'sending', hostB: 'receiving', server: 'receiving', hostC: 'receiving' },
            packet: {
                type: 'DHCPDISCOVER', direction: 'request', source: 'client', delivery: 'broadcast',
                fields: [
                    ['Transaction ID', transactionId], ['Client IPv4', '0.0.0.0'],
                    ['Destination IPv4', '255.255.255.255'], ['Client MAC', clientMac],
                    ['UDP ports', '68 to 67'], ['DHCP options', 'Discover; parameter request list']
                ]
            }
        },
        {
            title: 'DHCP Offer',
            description: 'The DHCP server selects an available address and offers it to Host A. The offer includes network settings and a proposed lease; the address is not active on the client yet.',
            devices: { client: 'receiving', server: 'sending' },
            packet: {
                type: 'DHCPOFFER', direction: 'reply', source: 'server', delivery: 'unicast',
                fields: [
                    ['Transaction ID', transactionId], ['Offered address', offeredIp],
                    ['Server identifier', '192.168.1.2'], ['Subnet mask', '255.255.255.0'],
                    ['Default gateway', '192.168.1.1'], ['DNS server', '192.168.1.2'],
                    ['Lease duration', '3600 seconds']
                ]
            }
        },
        {
            title: 'DHCP Request',
            description: 'Host A broadcasts DHCPREQUEST to accept the offer and identify the selected server. Broadcasting also tells any other DHCP servers that made offers that they were not selected.',
            devices: { client: 'sending', hostB: 'receiving', server: 'receiving', hostC: 'receiving' },
            packet: {
                type: 'DHCPREQUEST', direction: 'request', source: 'client', delivery: 'broadcast',
                fields: [
                    ['Transaction ID', transactionId], ['Client IPv4', '0.0.0.0'],
                    ['Requested address', offeredIp], ['Selected server', '192.168.1.2'],
                    ['Client MAC', clientMac], ['UDP ports', '68 to 67'],
                    ['Destination IPv4', '255.255.255.255']
                ]
            }
        },
        {
            title: 'DHCP Acknowledgement',
            description: 'The server sends DHCPACK to confirm the lease. Host A can now configure its interface with the offered address, subnet mask, default gateway, DNS server, and lease duration.',
            devices: { client: 'success', server: 'sending' },
            packet: {
                type: 'DHCPACK', direction: 'reply', source: 'server', delivery: 'unicast',
                fields: [
                    ['Transaction ID', transactionId], ['Assigned address', offeredIp],
                    ['Subnet mask', '255.255.255.0'], ['Default gateway', '192.168.1.1'],
                    ['DNS server', '192.168.1.2'], ['Lease duration', '3600 seconds'],
                    ['UDP ports', '67 to 68']
                ]
            }
        }
    ];

    const elements = {
        network: root.querySelector('#dhcpNetworkGrid'),
        svg: root.querySelector('#dhcpCableSvg'),
        status: root.querySelector('#dhcpStatus'),
        steps: [...root.querySelectorAll('.step')],
        previous: root.querySelector('#dhcpPrevious'),
        next: root.querySelector('#dhcpNext'),
        play: root.querySelector('#dhcpPlay'),
        pause: root.querySelector('#dhcpPause'),
        reset: root.querySelector('#dhcpReset'),
        packetPanel: root.querySelector('#dhcpPacketPanel'),
        packetTitle: root.querySelector('#dhcpPacketTitle'),
        packetFields: root.querySelector('#dhcpPacketFields'),
        clientIp: root.querySelector('[data-role="client"] [data-current-ip]'),
        leaseState: root.querySelector('#dhcpLeaseState'),
        leaseIp: root.querySelector('#dhcpLeaseIp'),
        leaseMask: root.querySelector('#dhcpLeaseMask'),
        leaseRouter: root.querySelector('#dhcpLeaseRouter'),
        leaseDns: root.querySelector('#dhcpLeaseDns'),
        leaseDuration: root.querySelector('#dhcpLeaseDuration')
    };

    const state = { currentStep: 0, isPlaying: false, timer: null, animations: [] };

    function drawCables() {
        elements.svg.replaceChildren();
        const svgRect = elements.svg.getBoundingClientRect();
        const router = elements.network.querySelector('.router-icon').getBoundingClientRect();
        const switchIcon = elements.network.querySelector('.switch-icon').getBoundingClientRect();
        const devices = [...elements.network.querySelectorAll('.device')];
        const addLine = (x1, y1, x2, y2, color, width) => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', color);
            line.setAttribute('stroke-width', width);
            line.setAttribute('stroke-linecap', 'round');
            elements.svg.appendChild(line);
        };

        addLine(
            (router.left + router.right) / 2 - svgRect.left,
            router.bottom - svgRect.top,
            (switchIcon.left + switchIcon.right) / 2 - svgRect.left,
            switchIcon.top - svgRect.top,
            colors.teal,
            2.5
        );

        const spacing = switchIcon.width / (devices.length - 1);
        devices.forEach((device, index) => {
            const icon = device.querySelector('.device-icon').getBoundingClientRect();
            const portX = switchIcon.left - svgRect.left + spacing * index;
            const deviceX = (icon.left + icon.right) / 2 - svgRect.left;
            const deviceY = icon.top - svgRect.top;
            const switchBottom = switchIcon.bottom - svgRect.top;
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${portX} ${switchBottom} L ${portX} ${switchBottom + 30} L ${deviceX} ${switchBottom + 30} L ${deviceX} ${deviceY}`);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', colors.lightBlue);
            path.setAttribute('stroke-width', '2');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            elements.svg.appendChild(path);
        });
    }

    function clearAnimations() {
        state.animations.forEach(animation => {
            if (animation.frame !== null) cancelAnimationFrame(animation.frame);
            animation.elements.forEach(element => element.remove());
        });
        state.animations = [];
    }

    function animatePacket(source, destination, color, delay = 0) {
        const devices = [...elements.network.querySelectorAll('.device')];
        const sourceIndex = devices.indexOf(source);
        const destinationIndex = devices.indexOf(destination);
        if (sourceIndex < 0 || destinationIndex < 0) return;

        const svgRect = elements.svg.getBoundingClientRect();
        const switchRect = elements.network.querySelector('.switch-icon').getBoundingClientRect();
        const sourceRect = source.querySelector('.device-icon').getBoundingClientRect();
        const destinationRect = destination.querySelector('.device-icon').getBoundingClientRect();
        const spacing = switchRect.width / (devices.length - 1);
        const portX = index => switchRect.left - svgRect.left + spacing * index;
        const switchBottom = switchRect.bottom - svgRect.top;
        const fanoutY = switchBottom + 30;
        const sourceX = (sourceRect.left + sourceRect.right) / 2 - svgRect.left;
        const sourceY = sourceRect.top - svgRect.top;
        const destinationX = (destinationRect.left + destinationRect.right) / 2 - svgRect.left;
        const destinationY = destinationRect.top - svgRect.top;

        const route = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        route.setAttribute('d', `M ${sourceX} ${sourceY} L ${sourceX} ${fanoutY} L ${portX(sourceIndex)} ${fanoutY} L ${portX(sourceIndex)} ${switchBottom} L ${portX(destinationIndex)} ${switchBottom} L ${portX(destinationIndex)} ${fanoutY} L ${destinationX} ${fanoutY} L ${destinationX} ${destinationY}`);
        route.setAttribute('fill', 'none');
        route.setAttribute('stroke', 'none');
        elements.svg.appendChild(route);

        const halo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        halo.setAttribute('r', '10');
        halo.setAttribute('fill', color);
        halo.setAttribute('class', 'packet-dot-halo');
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', '6');
        dot.setAttribute('fill', color);
        dot.setAttribute('class', 'packet-dot');
        [halo, dot].forEach(element => elements.svg.appendChild(element));

        const animation = { frame: null, elements: [route, halo, dot] };
        state.animations.push(animation);
        const routeLength = route.getTotalLength();
        const duration = 1380;
        let startTime;

        function move(timestamp) {
            if (startTime === undefined) startTime = timestamp + delay;
            const progress = Math.max(0, Math.min(1, (timestamp - startTime) / duration));
            const point = route.getPointAtLength(routeLength * progress);
            [halo, dot].forEach(element => {
                element.setAttribute('cx', point.x);
                element.setAttribute('cy', point.y);
            });
            if (progress < 1) {
                animation.frame = requestAnimationFrame(move);
            } else {
                animation.elements.forEach(element => element.remove());
                animation.frame = null;
            }
        }

        animation.frame = requestAnimationFrame(move);
    }

    function renderPacket(step) {
        clearAnimations();
        elements.packetPanel.hidden = true;
        elements.packetPanel.classList.remove('request', 'reply');
        if (!step.packet) return;

        const packet = step.packet;
        const isRequest = packet.direction === 'request';
        const packetColor = isRequest ? colors.lightBlue : colors.red;
        elements.packetPanel.classList.add(isRequest ? 'request' : 'reply');
        elements.packetTitle.textContent = packet.type;
        elements.packetFields.replaceChildren();
        packet.fields.forEach(([label, value]) => {
            const row = document.createElement('div');
            const term = document.createElement('dt');
            term.textContent = label;
            const detail = document.createElement('dd');
            detail.textContent = value;
            row.append(term, detail);
            elements.packetFields.append(row);
        });
        elements.packetPanel.hidden = false;

        const devices = [...elements.network.querySelectorAll('.device')];
        const source = devices.find(device => device.dataset.role === packet.source);
        const destinations = packet.delivery === 'broadcast'
            ? devices.filter(device => device !== source)
            : [devices.find(device => device.dataset.role === 'client')].filter(Boolean);
        destinations.forEach((destination, index) => {
            animatePacket(source, destination, packetColor, index * 216);
        });
    }

    function renderLease() {
        const offered = state.currentStep >= 2;
        const bound = state.currentStep === stepData.length - 1;
        const address = bound ? offeredIp : offered ? `${offeredIp} (pending)` : 'Not assigned';
        const setting = value => offered ? value : 'Not assigned';
        elements.leaseState.textContent = bound ? 'Bound' : offered ? 'Offer pending' : 'No lease';
        elements.leaseIp.textContent = address;
        elements.leaseMask.textContent = setting('255.255.255.0');
        elements.leaseRouter.textContent = setting('192.168.1.1');
        elements.leaseDns.textContent = setting('192.168.1.2');
        elements.leaseDuration.textContent = setting('3600 seconds');
        elements.clientIp.textContent = bound ? offeredIp : '0.0.0.0';
    }

    function updateButtons() {
        elements.previous.disabled = state.isPlaying || state.currentStep === 0;
        elements.next.disabled = state.isPlaying || state.currentStep === stepData.length - 1;
        elements.play.disabled = state.isPlaying || state.currentStep === stepData.length - 1;
        elements.pause.disabled = !state.isPlaying;
    }

    function updateStep() {
        const step = stepData[state.currentStep];
        elements.steps.forEach((element, index) => {
            element.classList.toggle('active', index === state.currentStep);
            element.classList.toggle('completed', index < state.currentStep);
        });
        elements.status.textContent = step.description;
        root.querySelectorAll('.device').forEach(device => {
            device.classList.remove('active', 'sending', 'receiving', 'success');
            const deviceState = step.devices?.[device.dataset.role];
            if (deviceState) device.classList.add(deviceState);
        });
        renderLease();
        renderPacket(step);
        updateButtons();
    }

    function nextStep() {
        if (state.currentStep < stepData.length - 1) {
            state.currentStep += 1;
            updateStep();
        }
    }

    function previousStep() {
        if (state.currentStep > 0) {
            state.currentStep -= 1;
            updateStep();
        }
    }

    function pausePlayback() {
        if (!state.isPlaying) return;
        clearInterval(state.timer);
        state.timer = null;
        state.isPlaying = false;
        updateButtons();
    }

    function startPlayback() {
        if (state.isPlaying || state.currentStep >= stepData.length - 1) return;
        state.isPlaying = true;
        updateButtons();
        state.timer = setInterval(() => {
            if (state.currentStep >= stepData.length - 1) {
                pausePlayback();
            } else {
                nextStep();
                if (state.currentStep >= stepData.length - 1) pausePlayback();
            }
        }, 2600);
    }

    function resetSimulation() {
        pausePlayback();
        state.currentStep = 0;
        updateStep();
    }

    elements.previous.addEventListener('click', previousStep);
    elements.next.addEventListener('click', nextStep);
    elements.play.addEventListener('click', startPlayback);
    elements.pause.addEventListener('click', pausePlayback);
    elements.reset.addEventListener('click', resetSimulation);
    updateStep();

    // Styles load after this script runs, so cables must be drawn once layout is final.
    const redraw = () => {
        drawCables();
        if (stepData[state.currentStep].packet) renderPacket(stepData[state.currentStep]);
    };
    requestAnimationFrame(redraw);
    window.addEventListener('load', redraw);
    window.addEventListener('resize', redraw);
})();
</script>

<style>
@scope (.dhcp-demo) {
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
        color: var(--hvl-second);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    }

    * { box-sizing: border-box; }
    .container { width: min(100%, 1200px); margin: 0 auto; }

    h1 { margin: 0 0 8px; color: var(--hvl-second); font-size: 2.2em; text-align: center; }
    .subtitle { margin: 0 0 26px; color: var(--hvl-grey); text-align: center; }

    .step-indicator, .status, .network-diagram, .lease-panel {
        margin: 0 0 22px;
        padding: 20px;
        border: 1px solid var(--hvl-lightgrey);
        border-radius: 10px;
        background: var(--hvl-white);
        box-shadow: 0 8px 24px rgba(143, 138, 131, 0.12);
    }

    h2 { margin: 0 0 14px; color: var(--hvl-second); font-size: 1.2em; }
    .step-indicator h2, .status h2, .lease-panel h2 { color: var(--hvl-main); }
    .steps { display: flex; align-items: center; gap: 12px; }
    .step { display: flex; flex: 1; align-items: center; gap: 8px; min-width: 0; }

    .step-number {
        display: grid;
        width: 30px;
        height: 30px;
        flex: none;
        place-items: center;
        border-radius: 50%;
        color: var(--hvl-grey);
        background: var(--hvl-lightgrey);
        font-weight: 700;
    }

    .step-label { color: var(--hvl-grey); font-size: 0.9em; }
    .step.active .step-number { color: var(--hvl-white); background: var(--hvl-main); }
    .step.active .step-label { color: var(--hvl-second); font-weight: 700; }
    .step.completed .step-number { color: var(--hvl-white); background: var(--hvl-darkgreen); }
    .step.completed .step-label { color: var(--hvl-darkgreen); }

    .controls { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 22px; }
    .btn {
        display: inline-flex;
        min-width: 120px;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 11px 18px;
        border: 0;
        border-radius: 6px;
        color: var(--hvl-white);
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.18s ease, background-color 0.18s ease;
    }

    .btn:hover:not(:disabled) { transform: translateY(-2px); }
    .btn-primary { background: var(--hvl-second); }
    .btn-primary:hover:not(:disabled), .btn-secondary:hover:not(:disabled) { background: var(--hvl-main); }
    .btn-secondary { background: var(--hvl-grey); }
    .btn-danger { background: var(--hvl-red); }
    .btn-danger:hover:not(:disabled) { background: var(--hvl-darkred); }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-icon { width: 18px; height: 18px; flex: none; }

    .status-content {
        padding: 14px;
        border: 1px solid var(--hvl-lightgrey);
        border-radius: 6px;
        color: var(--hvl-second);
        background: var(--hvl-white);
        font-family: 'Courier New', monospace;
        white-space: pre-wrap;
        line-height: 1.6;
    }

    .network-diagram {
        position: relative;
        overflow: hidden;
        padding: 26px;
        background-color: var(--hvl-white);
        background-image: linear-gradient(to right, var(--hvl-lightgrey) 1px, transparent 1px),
            linear-gradient(to bottom, var(--hvl-lightgrey) 1px, transparent 1px);
        background-size: 24px 24px;
    }

    .network-grid {
        position: relative;
        z-index: 1;
        display: grid;
        min-height: 410px;
        grid-template-columns: 1fr;
        align-items: center;
        justify-items: center;
        gap: 28px;
    }

    .router { position: relative; padding-top: 58px; text-align: center; }
    .router-icon {
        display: inline-grid;
        width: 70px;
        height: 70px;
        place-items: center;
        clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
        color: var(--hvl-white);
        background: var(--hvl-red);
        font-size: 1.5em;
        font-weight: 700;
    }

    .router-label, .router > .device-ip, .router > .device-mac {
        position: absolute;
        left: 50%;
        width: max-content;
        margin: 0;
        transform: translateX(-50%);
        white-space: nowrap;
    }

    .router-label { top: 0; color: var(--hvl-red); font-weight: 700; }
    .router > .device-ip { top: 22px; }
    .router > .device-mac { top: 39px; }
    .switch { position: relative; text-align: center; }

    .switch-icon {
        display: inline-grid;
        width: 80px;
        height: 50px;
        place-items: center;
        border: 2px solid var(--hvl-second);
        border-radius: 4px;
        color: var(--hvl-white);
        background: var(--hvl-main);
        font-size: 1.4em;
        font-weight: 700;
    }

    .switch-label {
        position: absolute;
        top: 50%;
        left: calc(100% + 12px);
        width: max-content;
        transform: translateY(-50%);
        color: var(--hvl-second);
        font-weight: 700;
        white-space: nowrap;
    }

    .devices-row { display: flex; width: 100%; justify-content: center; gap: 38px; }
    .device { min-width: 110px; text-align: center; transition: transform 0.2s ease; }

    .device-icon {
        display: inline-grid;
        width: 60px;
        height: 60px;
        place-items: center;
        margin-bottom: 8px;
        border: 2px solid var(--hvl-darkgreen);
        border-radius: 4px;
        color: var(--hvl-white);
        background: var(--hvl-green);
        font-size: 1.4em;
        font-weight: 700;
    }

    .device.server .device-icon { border-color: var(--hvl-second); background: var(--hvl-main); }
    .device-label { color: var(--hvl-second); font-weight: 700; }
    .device-ip, .device-mac { margin-top: 4px; color: var(--hvl-grey); font-size: 0.8em; }
    .device.sending .device-icon { box-shadow: 0 0 0 4px rgba(100, 208, 223, 0.42); }
    .device.receiving .device-icon { box-shadow: 0 0 0 4px rgba(235, 104, 82, 0.28); }
    .device.success .device-icon { background: var(--hvl-darkgreen); }

    .cable-svg { position: absolute; z-index: 0; inset: 0; width: 100%; height: 100%; pointer-events: none; }
    .packet-dot-halo { opacity: 0.24; }
    .packet-dot { stroke: var(--hvl-white); stroke-width: 2; filter: drop-shadow(0 1px 3px rgba(143, 138, 131, 0.4)); }
    .packet-panel[hidden] { display: none; }

    .packet-panel {
        position: relative;
        z-index: 3;
        margin-top: 22px;
        padding: 14px 16px;
        border: 1px solid var(--packet-color);
        border-left: 5px solid var(--packet-color);
        border-radius: 8px;
        color: var(--hvl-second);
        background: var(--hvl-white);
        box-shadow: 0 8px 22px rgba(143, 138, 131, 0.18);
    }

    .packet-panel.request { --packet-color: var(--hvl-lightblue); }
    .packet-panel.reply { --packet-color: var(--hvl-red); }
    .packet-panel h2 { margin-bottom: 10px; color: var(--packet-color); font-size: 1em; }
    .packet-fields { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 8px 24px; margin: 0; font-size: 0.82em; }
    .packet-fields > div { display: grid; grid-template-columns: 110px minmax(0, 1fr); align-items: baseline; gap: 12px; }
    .packet-fields dt { margin: 0; color: var(--packet-color); font-size: 0.9em; font-weight: 700; }
    .packet-fields dd { margin: 0; padding: 0; color: var(--hvl-second); overflow-wrap: anywhere; }

    .lease-details { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 0; }
    .lease-details dt { color: var(--hvl-grey); font-size: 0.85em; }
    .lease-details dd { margin: 4px 0 0; color: var(--hvl-second); font-weight: 700; overflow-wrap: anywhere; }

    @media (max-width: 768px) {
        h1 { font-size: 1.8em; }
        .steps { align-items: flex-start; flex-direction: column; }
        .step { min-width: 100%; }
        .controls { align-items: center; flex-direction: column; }
        .btn { width: 100%; max-width: 220px; }
        .devices-row { flex-wrap: wrap; gap: 22px; }
        .network-grid { padding-top: 0; }
        .lease-details { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }

    @media (max-width: 420px) {
        .network-diagram { padding: 16px; }
        .switch-label { max-width: 78px; white-space: normal; }
    }
}
</style>
