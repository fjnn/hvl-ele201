---
layout: single
title: "Interactive Explanation: Domain Name System (DNS)"
permalink: /network-practice/dns-demo
toc: false
breadcrumbs: true
sidebar:
  - title: "Interactive DNS Explanation"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: network-practice
taxonomy: markup
---

This page demonstrates how the **Domain Name System (DNS)** resolves a domain name into an IP address. The client asks its recursive resolver for `maps.google.com`; the resolver then iteratively queries DNS servers from the root, to the `.com` top-level domain, to a `google.com` authoritative server.

Use the controls to step through each exchange. The packet panel shows the current query, referral, or answer, while the resolver cache records the returned A record. The example address is reserved for documentation and is not a live Google Maps address.

<div id="dnsDemo" class="dns-demo">
    <main class="container">
        <section class="step-indicator" aria-labelledby="dnsStepsTitle">
            <h2 id="dnsStepsTitle">Resolution Steps</h2>
            <div class="steps">
                <div class="step active" data-step="0"><div class="step-number">1</div><span class="step-label">Ready</span></div>
                <div class="step" data-step="1"><div class="step-number">2</div><span class="step-label">Client Query</span></div>
                <div class="step" data-step="2"><div class="step-number">3</div><span class="step-label">Root Referral</span></div>
                <div class="step" data-step="3"><div class="step-number">4</div><span class="step-label">.com Referral</span></div>
                <div class="step" data-step="4"><div class="step-number">5</div><span class="step-label">Authoritative Answer</span></div>
                <div class="step" data-step="5"><div class="step-number">6</div><span class="step-label">Cache Record</span></div>
                <div class="step" data-step="6"><div class="step-number">7</div><span class="step-label">Client Answer</span></div>
            </div>
        </section>
        <nav class="controls" aria-label="DNS lookup controls">
            <button class="btn btn-primary" id="dnsPrevious" type="button" disabled>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m15 18-6-6 6-6" /></svg>Previous
            </button>
            <button class="btn btn-primary" id="dnsNext" type="button">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m9 18 6-6-6-6" /></svg>Next
            </button>
            <button class="btn btn-secondary" id="dnsPlay" type="button">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m8 5 12 7-12 7z" /></svg>Play All
            </button>
            <button class="btn btn-secondary" id="dnsPause" type="button" disabled>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 5h3v14H8zM15 5h3v14h-3z" /></svg>Pause
            </button>
            <button class="btn btn-danger" id="dnsReset" type="button">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" /><path d="M3 3v5h5" /></svg>Reset
            </button>
        </nav>
        <section class="status" aria-live="polite" aria-labelledby="dnsStatusTitle">
            <h2 id="dnsStatusTitle">Current Status</h2>
            <div class="status-content" id="dnsStatus">The client wants to look up maps.google.com. No query has been sent yet.</div>
        </section>
        <section class="network-diagram" aria-label="DNS hierarchy and query path">
            <div class="step-badge" id="dnsStepBadge" aria-hidden="true"></div>
            <div class="dns-nodes" id="dnsNodes">
                <div class="dns-node client" data-dns-node="client">
                    <div class="node-icon" aria-hidden="true">C</div>
                    <div class="node-copy"><div class="node-title">Client</div><div class="node-detail" id="dnsClientAddress">No DNS answer yet</div></div>
                </div>
                <div class="dns-node resolver" data-dns-node="resolver">
                    <div class="node-icon" aria-hidden="true">R</div>
                    <div class="node-copy"><div class="node-title">Recursive Resolver</div><div class="node-detail">Configured DNS service</div></div>
                </div>
                <div class="dns-node root" data-dns-node="root">
                    <div class="node-icon" aria-hidden="true">.</div>
                    <div class="node-copy"><div class="node-title">Root DNS</div><div class="node-detail">Knows where .com is served</div></div>
                </div>
                <div class="dns-node tld" data-dns-node="tld">
                    <div class="node-icon" aria-hidden="true">TLD</div>
                    <div class="node-copy"><div class="node-title">.com TLD DNS</div><div class="node-detail">Knows google.com authorities</div></div>
                </div>
                <div class="dns-node authority" data-dns-node="authority">
                    <div class="node-icon" aria-hidden="true">NS</div>
                    <div class="node-copy"><div class="node-title">Authoritative DNS</div><div class="node-detail">ns1.google.com</div></div>
                </div>
            </div>
            <svg class="dns-svg" id="dnsSvg" aria-hidden="true"><defs></defs></svg>
            <section class="packet-panel" id="dnsPacketPanel" aria-live="polite" hidden>
                <h2 id="dnsPacketTitle"></h2>
                <dl class="packet-fields" id="dnsPacketFields"></dl>
            </section>
        </section>
        <section class="resolver-cache" aria-live="polite" aria-labelledby="dnsCacheTitle">
            <h2 id="dnsCacheTitle">Resolver Cache <span class="cache-state" id="dnsCacheState">Cache miss</span></h2>
            <table class="cache-table">
                <thead><tr><th>Record</th><th>Answer</th><th>TTL</th></tr></thead>
                <tbody id="dnsCacheBody"><tr><td class="cache-placeholder" colspan="3">No record cached for maps.google.com</td></tr></tbody>
            </table>
            <div class="legend" aria-label="Packet types">
                <span class="legend-item"><span class="legend-dot legend-query"></span>DNS query</span>
                <span class="legend-item"><span class="legend-dot legend-referral"></span>Referral</span>
                <span class="legend-item"><span class="legend-dot legend-answer"></span>Answer</span>
            </div>
        </section>
    </main>
</div>

<script>
(() => {
    const root = document.getElementById('dnsDemo');
    if (!root) return;

    const colors = { query: '#64d0df', referral: '#00afba', answer: '#eb6852' };
    const domain = 'maps.google.com';
    const exampleAddress = '203.0.113.25';
    const transactionId = '0x4C91';

    const steps = [
        {
            title: 'Ready to Resolve',
            description: 'The client wants to look up maps.google.com. No query has been sent yet. Step forward to start the recursive request and follow the resolver through the DNS hierarchy.',
            active: ['client']
        },
        {
            title: 'Client Query',
            description: 'The client asks its configured recursive resolver for the A record of maps.google.com. This is a recursive request: the client expects the resolver to return a final answer, not a referral.',
            active: ['client', 'resolver'],
            packet: {
                kind: 'query', title: 'Client to Resolver: Recursive Query',
                fields: [
                    ['Question name', domain], ['Record type', 'A (IPv4 address)'],
                    ['Recursion desired', 'Yes (RD=1)'], ['Transport', 'UDP port 53'],
                    ['Resolver cache', 'Miss']
                ],
                flows: [{ from: 'client', to: 'resolver', kind: 'query' }]
            }
        },
        {
            title: 'Root Referral',
            description: 'The resolver sends an iterative query to a root server. The root does not know the address for maps.google.com; it replies with a referral to the name servers for the .com top-level domain.',
            active: ['resolver', 'root'],
            responding: ['root'],
            packet: {
                kind: 'referral', title: 'Root Server: Referral to .com',
                fields: [
                    ['Question name', domain], ['Resolver query', 'RD=0 (iterative)'],
                    ['Root response', 'Referral, not a final address'],
                    ['Delegation', '.com name servers'], ['Next destination', '.com TLD DNS']
                ],
                flows: [
                    { from: 'resolver', to: 'root', kind: 'query' },
                    { from: 'root', to: 'resolver', kind: 'referral' }
                ]
            }
        },
        {
            title: '.com Referral',
            description: 'The resolver asks a .com TLD server about maps.google.com. The TLD server identifies the authoritative name servers delegated for google.com and refers the resolver to them.',
            active: ['resolver', 'tld'],
            responding: ['tld'],
            packet: {
                kind: 'referral', title: '.com TLD: Referral to google.com',
                fields: [
                    ['Question name', domain], ['Resolver query', 'RD=0 (iterative)'],
                    ['TLD response', 'Referral, not a final address'],
                    ['Delegated zone', 'google.com'], ['Name server', 'ns1.google.com']
                ],
                flows: [
                    { from: 'resolver', to: 'tld', kind: 'query' },
                    { from: 'tld', to: 'resolver', kind: 'referral' }
                ]
            }
        },
        {
            title: 'Authoritative Answer',
            description: 'The resolver queries an authoritative google.com name server. This server owns the zone data and returns the requested A record for maps.google.com.',
            active: ['resolver', 'authority'],
            responding: ['authority'],
            packet: {
                kind: 'answer', title: 'Authoritative Server: A Record',
                fields: [
                    ['Question name', domain], ['Record type', 'A'],
                    ['Answer (illustrative)', exampleAddress], ['TTL', '300 seconds'],
                    ['Note', 'Example only; real answers can vary by location and time']
                ],
                flows: [
                    { from: 'resolver', to: 'authority', kind: 'query' },
                    { from: 'authority', to: 'resolver', kind: 'answer' }
                ]
            }
        },
        {
            title: 'Cache Record',
            description: 'The recursive resolver stores the answer in its cache for the record TTL. A later client asking for the same name can receive the cached answer without repeating the root, TLD, and authoritative queries.',
            active: ['resolver'],
            complete: ['root', 'tld', 'authority'],
            cache: true
        },
        {
            title: 'Client Answer',
            description: 'The resolver returns the A record to the client, completing its recursive request. The client can now connect to the returned address. The example address shown here is reserved for documentation and is not a live Google Maps address.',
            active: ['client', 'resolver'],
            complete: ['root', 'tld', 'authority'],
            packet: {
                kind: 'answer', title: 'Resolver to Client: DNS Answer',
                fields: [
                    ['Question name', domain], ['Record type', 'A'],
                    ['Answer (illustrative)', exampleAddress], ['TTL', '300 seconds'],
                    ['Resolver action', 'Cached answer returned to client']
                ],
                flows: [{ from: 'resolver', to: 'client', kind: 'answer' }]
            },
            resolved: true,
            cache: true
        }
    ];

    const elements = {
        nodes: root.querySelector('#dnsNodes'),
        svg: root.querySelector('#dnsSvg'),
        status: root.querySelector('#dnsStatus'),
        steps: [...root.querySelectorAll('.step')],
        previous: root.querySelector('#dnsPrevious'),
        next: root.querySelector('#dnsNext'),
        play: root.querySelector('#dnsPlay'),
        pause: root.querySelector('#dnsPause'),
        reset: root.querySelector('#dnsReset'),
        panel: root.querySelector('#dnsPacketPanel'),
        panelTitle: root.querySelector('#dnsPacketTitle'),
        panelFields: root.querySelector('#dnsPacketFields'),
        cacheState: root.querySelector('#dnsCacheState'),
        cacheBody: root.querySelector('#dnsCacheBody'),
        clientAddress: root.querySelector('#dnsClientAddress'),
        badge: root.querySelector('#dnsStepBadge')
    };

    const state = { index: 0, playing: false, timer: null, animations: [] };

    function drawLinks() {
        elements.svg.replaceChildren();
        const svgRect = elements.svg.getBoundingClientRect();
        const node = name => elements.nodes.querySelector(`[data-dns-node="${name}"]`);
        const iconRect = name => node(name).querySelector('.node-icon').getBoundingClientRect();
        const addPath = (d, color, dash = '') => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', d);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', color);
            path.setAttribute('stroke-width', '2');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            if (dash) path.setAttribute('stroke-dasharray', dash);
            elements.svg.appendChild(path);
        };

        const client = iconRect('client');
        const resolver = iconRect('resolver');
        const clientX = (client.left + client.right) / 2 - svgRect.left;
        const resolverX = (resolver.left + resolver.right) / 2 - svgRect.left;
        addPath(`M ${clientX} ${client.bottom - svgRect.top} L ${resolverX} ${resolver.top - svgRect.top}`, colors.referral);

        const serverNames = ['root', 'tld', 'authority'];
        const isMobile = window.matchMedia('(max-width: 600px)').matches;
        const resolverXRight = resolver.right - svgRect.left;
        serverNames.forEach((name, index) => {
            const server = iconRect(name);
            const serverY = (server.top + server.bottom) / 2 - svgRect.top;
            const resolverY = (resolver.top + resolver.bottom) / 2 - svgRect.top;
            const branchX = isMobile ? svgRect.width - 16 - index * 12 : resolverXRight + 20 + index * 22;
            const serverEdge = server.left - svgRect.left;
            addPath(`M ${resolverXRight} ${resolverY} L ${branchX} ${resolverY} L ${branchX} ${serverY} L ${serverEdge} ${serverY}`, colors.referral);
        });

        ['root', 'tld'].forEach((name, index) => {
            const upper = iconRect(name);
            const lower = iconRect(index === 0 ? 'tld' : 'authority');
            const x = (upper.left + upper.right) / 2 - svgRect.left;
            addPath(`M ${x} ${upper.bottom - svgRect.top} L ${x} ${lower.top - svgRect.top}`, colors.referral, '5 5');
        });
    }

    function clearAnimations() {
        state.animations.forEach(animation => {
            if (animation.frame !== null) cancelAnimationFrame(animation.frame);
            animation.elements.forEach(element => element.remove());
        });
        state.animations = [];
    }

    function animateFlow(flow, onArrival = null) {
        const source = elements.nodes.querySelector(`[data-dns-node="${flow.from}"]`);
        const destination = elements.nodes.querySelector(`[data-dns-node="${flow.to}"]`);
        if (!source || !destination) return;

        const svgRect = elements.svg.getBoundingClientRect();
        const sourceRect = source.querySelector('.node-icon').getBoundingClientRect();
        const destinationRect = destination.querySelector('.node-icon').getBoundingClientRect();
        let routeData;
        const resolver = elements.nodes.querySelector('[data-dns-node="resolver"]');
        const client = elements.nodes.querySelector('[data-dns-node="client"]');
        const serverNames = ['root', 'tld', 'authority'];
        const serverName = serverNames.find(name => elements.nodes.querySelector(`[data-dns-node="${name}"]`) === source || elements.nodes.querySelector(`[data-dns-node="${name}"]`) === destination);
        const isMobile = window.matchMedia('(max-width: 600px)').matches;

        if (isMobile && serverName && (source === resolver || destination === resolver)) {
            const server = elements.nodes.querySelector(`[data-dns-node="${serverName}"] .node-icon`).getBoundingClientRect();
            const resolverRect = resolver.querySelector('.node-icon').getBoundingClientRect();
            const serverIndex = serverNames.indexOf(serverName);
            const branchX = svgRect.width - 16 - serverIndex * 12;
            const resolverX = resolverRect.right - svgRect.left;
            const resolverY = (resolverRect.top + resolverRect.bottom) / 2 - svgRect.top;
            const serverX = server.left - svgRect.left;
            const serverY = (server.top + server.bottom) / 2 - svgRect.top;
            routeData = source === resolver
                ? `M ${resolverX} ${resolverY} L ${branchX} ${resolverY} L ${branchX} ${serverY} L ${serverX} ${serverY}`
                : `M ${serverX} ${serverY} L ${branchX} ${serverY} L ${branchX} ${resolverY} L ${resolverX} ${resolverY}`;
        } else if (isMobile && ((source === client && destination === resolver) || (source === resolver && destination === client))) {
            const clientRect = client.querySelector('.node-icon').getBoundingClientRect();
            const resolverRect = resolver.querySelector('.node-icon').getBoundingClientRect();
            const clientX = (clientRect.left + clientRect.right) / 2 - svgRect.left;
            const resolverX = (resolverRect.left + resolverRect.right) / 2 - svgRect.left;
            routeData = source === client
                ? `M ${clientX} ${clientRect.bottom - svgRect.top} L ${resolverX} ${resolverRect.top - svgRect.top}`
                : `M ${resolverX} ${resolverRect.top - svgRect.top} L ${clientX} ${clientRect.bottom - svgRect.top}`;
        } else if (serverName && (source === resolver || destination === resolver)) {
            const server = elements.nodes.querySelector(`[data-dns-node="${serverName}"] .node-icon`).getBoundingClientRect();
            const resolverRect = resolver.querySelector('.node-icon').getBoundingClientRect();
            const serverIndex = serverNames.indexOf(serverName);
            const branchX = resolverRect.right - svgRect.left + 20 + serverIndex * 22;
            const resolverX = resolverRect.right - svgRect.left;
            const resolverY = (resolverRect.top + resolverRect.bottom) / 2 - svgRect.top;
            const serverX = server.left - svgRect.left;
            const serverY = (server.top + server.bottom) / 2 - svgRect.top;
            routeData = source === resolver
                ? `M ${resolverX} ${resolverY} L ${branchX} ${resolverY} L ${branchX} ${serverY} L ${serverX} ${serverY}`
                : `M ${serverX} ${serverY} L ${branchX} ${serverY} L ${branchX} ${resolverY} L ${resolverX} ${resolverY}`;
        } else {
            const sourceX = (sourceRect.left + sourceRect.right) / 2 - svgRect.left;
            const destinationX = (destinationRect.left + destinationRect.right) / 2 - svgRect.left;
            if (source === client && destination === resolver) {
                routeData = `M ${sourceX} ${sourceRect.bottom - svgRect.top} L ${destinationX} ${destinationRect.top - svgRect.top}`;
            } else if (source === resolver && destination === client) {
                routeData = `M ${sourceX} ${sourceRect.top - svgRect.top} L ${destinationX} ${destinationRect.bottom - svgRect.top}`;
            } else {
                routeData = `M ${sourceX} ${(sourceRect.top + sourceRect.bottom) / 2 - svgRect.top} L ${destinationX} ${(destinationRect.top + destinationRect.bottom) / 2 - svgRect.top}`;
            }
        }

        const route = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        route.setAttribute('d', routeData);
        route.setAttribute('fill', 'none');
        route.setAttribute('stroke', 'none');
        elements.svg.appendChild(route);

        const color = colors[flow.kind];
        const halo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        halo.setAttribute('r', '10');
        halo.setAttribute('fill', color);
        halo.setAttribute('class', 'packet-halo');
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', '6');
        dot.setAttribute('fill', color);
        dot.setAttribute('class', 'packet-dot');
        [halo, dot].forEach(element => elements.svg.appendChild(element));

        const animation = { frame: null, elements: [route, halo, dot] };
        state.animations.push(animation);
        const length = route.getTotalLength();
        const duration = 1380;
        let start;

        function move(timestamp) {
            if (start === undefined) start = timestamp;
            const progress = Math.min(1, Math.max(0, (timestamp - start) / duration));
            const location = route.getPointAtLength(length * progress);
            [halo, dot].forEach(element => {
                element.setAttribute('cx', location.x);
                element.setAttribute('cy', location.y);
            });
            if (progress < 1) {
                animation.frame = requestAnimationFrame(move);
            } else {
                animation.elements.forEach(element => element.remove());
                animation.frame = null;
                state.animations = state.animations.filter(item => item !== animation);
                onArrival?.();
            }
        }

        animation.frame = requestAnimationFrame(move);
    }

    function renderPacket(step) {
        clearAnimations();
        elements.panel.hidden = true;
        elements.panel.classList.remove('query', 'referral', 'answer');
        if (!step.packet) return;

        elements.panel.classList.add(step.packet.kind);
        elements.panelTitle.textContent = step.packet.title;
        elements.panelFields.replaceChildren();
        step.packet.fields.forEach(([label, value]) => {
            const row = document.createElement('div');
            const term = document.createElement('dt');
            term.textContent = label;
            const detail = document.createElement('dd');
            detail.textContent = value;
            row.append(term, detail);
            elements.panelFields.append(row);
        });
        elements.panel.hidden = false;
        const flows = step.packet.flows;
        if (flows.length === 2) {
            animateFlow(flows[0], () => animateFlow(flows[1]));
            return;
        }
        flows.forEach(flow => animateFlow(flow));
    }

    function updateCache(step) {
        if (!step.cache) {
            elements.cacheState.textContent = 'Cache miss';
            elements.cacheBody.innerHTML = '<tr><td class="cache-placeholder" colspan="3">No record cached for maps.google.com</td></tr>';
            return;
        }

        elements.cacheState.textContent = step.resolved ? 'Cached answer returned' : 'Record cached';
        elements.cacheBody.innerHTML = `<tr><td>maps.google.com A</td><td>${exampleAddress}</td><td>300 seconds</td></tr>`;
    }

    function updateStep() {
        const step = steps[state.index];
        elements.steps.forEach((element, index) => {
            element.classList.toggle('active', index === state.index);
            element.classList.toggle('completed', index < state.index);
        });
        elements.status.textContent = step.description;
        elements.badge.textContent = `Step ${state.index + 1} / ${steps.length}`;
        root.querySelectorAll('.dns-node').forEach(node => {
            const name = node.dataset.dnsNode;
            node.classList.toggle('active', step.active?.includes(name) ?? false);
            node.classList.toggle('responding', step.responding?.includes(name) ?? false);
            node.classList.toggle('complete', step.complete?.includes(name) ?? false);
        });
        elements.clientAddress.textContent = step.resolved ? `DNS answer: ${exampleAddress}` : 'No DNS answer yet';
        updateCache(step);
        renderPacket(step);
        elements.previous.disabled = state.playing || state.index === 0;
        elements.next.disabled = state.playing || state.index === steps.length - 1;
        elements.play.disabled = state.playing || state.index === steps.length - 1;
        elements.pause.disabled = !state.playing;
    }

    function nextStep() {
        if (state.index < steps.length - 1) {
            state.index += 1;
            updateStep();
        }
    }

    function previousStep() {
        if (state.index > 0) {
            state.index -= 1;
            updateStep();
        }
    }

    function pausePlayback() {
        if (!state.playing) return;
        clearInterval(state.timer);
        state.timer = null;
        state.playing = false;
        updateStep();
    }

    function startPlayback() {
        if (state.playing || state.index >= steps.length - 1) return;
        state.playing = true;
        updateStep();
        state.timer = setInterval(() => {
            if (state.index >= steps.length - 1) {
                pausePlayback();
                return;
            }
            nextStep();
            if (state.index >= steps.length - 1) pausePlayback();
        }, 3200);
    }

    function reset() {
        pausePlayback();
        state.index = 0;
        updateStep();
    }

    elements.previous.addEventListener('click', previousStep);
    elements.next.addEventListener('click', nextStep);
    elements.play.addEventListener('click', startPlayback);
    elements.pause.addEventListener('click', pausePlayback);
    elements.reset.addEventListener('click', reset);
    drawLinks();
    updateStep();
    window.addEventListener('load', drawLinks);
    new ResizeObserver(drawLinks).observe(elements.nodes);

    window.addEventListener('resize', () => {
        drawLinks();
        if (steps[state.index].packet) renderPacket(steps[state.index]);
    });
})();
</script>

<style>
@scope (.dns-demo) {
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

    .step-indicator, .status, .network-diagram, .resolver-cache {
        margin: 0 0 22px;
        padding: 20px;
        border: 1px solid var(--hvl-lightgrey);
        border-radius: 10px;
        background: var(--hvl-white);
        box-shadow: 0 8px 24px rgba(143, 138, 131, 0.12);
    }

    h2 { margin: 0 0 14px; color: var(--hvl-second); font-size: 1.2em; }
    .step-indicator h2, .status h2, .resolver-cache h2 { color: var(--hvl-main); }
    .steps { display: flex; align-items: center; gap: 10px; }
    .step { display: flex; flex: 1; align-items: center; gap: 7px; min-width: 0; }

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

    .step-label { color: var(--hvl-grey); font-size: 0.84em; }
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
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
        line-height: 1.55;
        font-size: 1em;
    }

    .network-diagram {
        position: relative;
        overflow: hidden;
        padding: 24px;
        background-color: var(--hvl-white);
        background-image: linear-gradient(to right, var(--hvl-lightgrey) 1px, transparent 1px),
            linear-gradient(to bottom, var(--hvl-lightgrey) 1px, transparent 1px);
        background-size: 24px 24px;
    }

    .dns-nodes {
        position: relative;
        z-index: 2;
        display: grid;
        min-height: 480px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(3, minmax(132px, 1fr));
        align-items: stretch;
        column-gap: 72px;
        row-gap: 18px;
    }

    .dns-node {
        display: flex;
        min-width: 0;
        min-height: 140px;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: flex-start;
        gap: 14px;
        padding: 14px 10px;
        border: 1px solid transparent;
        background: transparent;
        text-align: right;
    }

    .dns-node { width: min(100%, 330px); }
    .dns-node[data-dns-node="client"], .dns-node[data-dns-node="resolver"] { grid-column: 1; justify-self: end; }
    .dns-node[data-dns-node="client"] { grid-row: 1; }
    .dns-node[data-dns-node="resolver"] { grid-row: 2; }
    .dns-node[data-dns-node="root"], .dns-node[data-dns-node="tld"], .dns-node[data-dns-node="authority"] { grid-column: 2; justify-self: start; margin-left: 12px; }
    .dns-node[data-dns-node="root"] { grid-row: 1; }
    .dns-node[data-dns-node="tld"] { grid-row: 2; }
    .dns-node[data-dns-node="authority"] { grid-row: 3; }
    .dns-node[data-dns-node="root"], .dns-node[data-dns-node="tld"], .dns-node[data-dns-node="authority"] { flex-direction: row; text-align: left; }

    .dns-node.active .node-icon { box-shadow: 0 0 0 4px rgba(0, 175, 186, 0.2); }
    .dns-node.responding .node-icon { box-shadow: 0 0 0 4px rgba(235, 104, 82, 0.22); }
    .dns-node.complete .node-icon { box-shadow: 0 0 0 3px rgba(0, 148, 130, 0.2); }

    .node-icon {
        display: grid;
        width: 42px;
        height: 42px;
        flex: none;
        place-items: center;
        margin: 0;
        border: 1px solid var(--hvl-darkgreen);
        border-radius: 6px;
        color: var(--hvl-white);
        background: var(--hvl-green);
        font-weight: 700;
    }

    .node-copy { min-width: 0; }
    .dns-node.resolver .node-icon { border-color: var(--hvl-second); background: var(--hvl-main); }
    .dns-node.root .node-icon { border-color: var(--hvl-darkred); background: var(--hvl-red); }
    .dns-node.tld .node-icon { border-color: var(--hvl-second); background: var(--hvl-bluegreen); }
    .dns-node.authority .node-icon { border-color: var(--hvl-darkgreen); background: var(--hvl-darkgreen); }
    .node-title { color: var(--hvl-second); font-weight: 700; }
    .node-detail { margin-top: 5px; color: var(--hvl-grey); font-size: 0.8em; overflow-wrap: anywhere; }

    .step-badge {
        position: absolute;
        z-index: 3;
        top: 12px;
        left: 12px;
        padding: 5px 12px;
        border-radius: 999px;
        color: var(--hvl-white);
        background: var(--hvl-second);
        font-size: 0.85em;
        font-weight: 700;
    }

    .dns-svg { position: absolute; z-index: 1; inset: 0; width: 100%; height: 100%; pointer-events: none; }
    .packet-halo { opacity: 0.24; }
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

    .packet-panel.query { --packet-color: var(--hvl-lightblue); }
    .packet-panel.referral { --packet-color: var(--hvl-main); }
    .packet-panel.answer { --packet-color: var(--hvl-red); }
    .packet-panel h2 { margin-bottom: 10px; color: var(--packet-color); font-size: 1em; }
    .packet-fields { display: grid; grid-template-columns: 1fr; gap: 8px 24px; margin: 0; font-size: 0.82em; }
    .packet-fields > div { display: grid; grid-template-columns: 170px minmax(0, 1fr); align-items: baseline; gap: 12px; }
    .packet-fields dt { margin: 0; color: var(--packet-color); font-size: 0.9em; font-weight: 700; }
    .packet-fields dd { margin: 0; padding: 0; color: var(--hvl-second); overflow-wrap: anywhere; }

    .resolver-cache h2 { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .cache-state { color: var(--hvl-grey); font-size: 0.75em; font-weight: 400; }
    .cache-table { width: 100%; border-collapse: collapse; }
    .cache-table th, .cache-table td { padding: 10px 12px; border-bottom: 1px solid var(--hvl-lightgrey); text-align: left; }
    .cache-table th { color: var(--hvl-grey); font-size: 0.8em; font-weight: 600; text-transform: uppercase; }
    .cache-table td { color: var(--hvl-second); }
    .cache-table tr:last-child td { border-bottom: 0; }
    .cache-placeholder { color: var(--hvl-grey) !important; }

    .legend { display: flex; flex-wrap: wrap; gap: 14px 22px; margin-top: 12px; color: var(--hvl-grey); font-size: 0.85em; }
    .legend-item { display: inline-flex; align-items: center; gap: 7px; }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
    .legend-query { background: var(--hvl-lightblue); }
    .legend-referral { background: var(--hvl-main); }
    .legend-answer { background: var(--hvl-red); }

    @media (max-width: 900px) {
        .steps { align-items: flex-start; flex-direction: column; }
        .step { min-width: 100%; }
        .dns-nodes { column-gap: 38px; }
        .dns-node { min-height: 125px; }
    }

    @media (max-width: 600px) {
        body { padding: 16px; }
        h1 { font-size: 1.8em; }
        .controls { align-items: center; flex-direction: column; }
        .btn { width: 100%; max-width: 220px; }
        .network-diagram { padding: 14px; }
        .dns-nodes { min-height: 0; grid-template-columns: 1fr; grid-template-rows: repeat(5, minmax(96px, auto)); gap: 10px; }
        .dns-node { width: min(100%, 250px); min-height: 94px; flex-direction: row-reverse; justify-content: flex-start; justify-self: center; gap: 12px; text-align: right; }
        .dns-node[data-dns-node] { grid-column: 1; justify-self: center; margin-left: 0; flex-direction: row-reverse; text-align: right; }
        .dns-node[data-dns-node="client"] { grid-row: 1; }
        .dns-node[data-dns-node="resolver"] { grid-row: 2; }
        .dns-node[data-dns-node="root"] { grid-row: 3; }
        .dns-node[data-dns-node="tld"] { grid-row: 4; }
        .dns-node[data-dns-node="authority"] { grid-row: 5; }
        .node-icon { width: 38px; height: 38px; flex: none; margin: 0; }
        .node-copy { min-width: 0; }
        .node-detail { margin-top: 3px; }
        .packet-panel { padding: 12px; }
        .packet-fields > div { grid-template-columns: 130px minmax(0, 1fr); }
        .cache-table th, .cache-table td { padding: 8px 5px; font-size: 0.8em; overflow-wrap: anywhere; }
    }
}
</style>
