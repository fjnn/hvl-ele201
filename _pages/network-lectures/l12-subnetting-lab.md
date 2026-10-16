---
layout: single
title: "Subnetting Lab"
permalink: /network-lectures/subnetting-lab
toc: true
breadcrumbs: true
sidebar:
  - title: "Lectures"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: network-lectures
taxonomy: markup
---


This page demonstrates how **Variable Length Subnet Masks (VLSM)** can be used to divide a larger IP network into subnets of different sizes without wasting addresses.

We start from the base network **192.168.10.0/24** and need four subnets:

- Subnet A: **50** hosts (e.g. servers)
- Subnet B: **20** hosts (e.g. staff PCs)
- Subnet C: **10** hosts (e.g. lab PCs)
- Subnet D: **5** hosts (e.g. management network)

The visualization walks through:

1. Sorting requirements from largest to smallest  
2. Choosing the smallest mask that fits each subnet  
3. Assigning address ranges from the remaining pool  
4. Verifying that all subnets fit inside the original **/24**

Use the controls to step through the allocation. The diagram shows the base network and allocated subnets, while the details panel shows the current calculation.

<div id="vlsmDemo" class="vlsm-demo">
    <main class="container">
        <p class="subtitle">How 192.168.10.0/24 is divided into unequal subnets</p>

        <!-- Step indicator -->
        <section class="step-indicator" aria-labelledby="vlsmStepsTitle">
            <h2 id="vlsmStepsTitle">Allocation Steps</h2>
            <div class="steps">
                <div class="step active" data-step="0">
                    <div class="step-number">1</div>
                    <span class="step-label">Overview</span>
                </div>
                <div class="step" data-step="1">
                    <div class="step-number">2</div>
                    <span class="step-label">Sort Requirements</span>
                </div>
                <div class="step" data-step="2">
                    <div class="step-number">3</div>
                    <span class="step-label">Allocate Subnet A</span>
                </div>
                <div class="step" data-step="3">
                    <div class="step-number">4</div>
                    <span class="step-label">Allocate Subnet B</span>
                </div>
                <div class="step" data-step="4">
                    <div class="step-number">5</div>
                    <span class="step-label">Allocate Subnet C</span>
                </div>
                <div class="step" data-step="5">
                    <div class="step-number">6</div>
                    <span class="step-label">Allocate Subnet D</span>
                </div>
                <div class="step" data-step="6">
                    <div class="step-number">7</div>
                    <span class="step-label">Summary</span>
                </div>
            </div>
        </section>

        <!-- Controls -->
        <nav class="controls" aria-label="VLSM allocation controls">
            <button class="btn btn-primary" id="vlsmPrevious" type="button" disabled>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Previous
            </button>
            <button class="btn btn-primary" id="vlsmNext" type="button">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                    <path d="m9 18 6-6-6-6" />
                </svg>
                Next
            </button>
            <button class="btn btn-secondary" id="vlsmPlay" type="button">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                    <path d="m8 5 12 7-12 7z" />
                </svg>
                Play All
            </button>
            <button class="btn btn-secondary" id="vlsmPause" type="button" disabled>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                    <path d="M8 5h3v14H8zM15 5h3v14h-3z" />
                </svg>
                Pause
            </button>
            <button class="btn btn-danger" id="vlsmReset" type="button">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                    <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
                    <path d="M3 3v5h5" />
                </svg>
                Reset
            </button>
        </nav>

        <!-- Status / explanation -->
        <section class="status" aria-live="polite" aria-labelledby="vlsmStatusTitle">
            <h2 id="vlsmStatusTitle">Current Explanation</h2>
            <div class="status-content" id="vlsmStatus">
                We start with base network **192.168.10.0/24** (**256** addresses, **254** usable) and host requirements:
                A: **50**, B: **20**, C: **10**, D: **5**. Step forward to see how VLSM allocates unequal subnets efficiently.
            </div>
        </section>

        <!-- Network diagram -->
        <section class="network-diagram" aria-label="VLSM address space and subnet layout">
            <div class="vlsm-layout">
                <div class="pool-header">
                    <div class="pool-title">Base Network Pool</div>
                    <div class="pool-detail" id="vlsmPoolDetail">192.168.10.0/24 &mdash; 256 addresses</div>
                </div>
                <div class="pool-bar" aria-hidden="true">
                    <div class="pool-segment pool-base" id="vlsmPoolBase"></div>
                </div>
                <div class="legend" aria-label="Legend">
                    <span class="legend-item">
                        <span class="legend-dot legend-largest"></span>
                        Largest requirement allocated first
                    </span>
                    <span class="legend-item">
                        <span class="legend-dot legend-current"></span>
                        Subnet currently being calculated
                    </span>
                    <span class="legend-item">
                        <span class="legend-dot legend-remaining"></span>
                        Remaining address pool
                    </span>
                </div>

                <div class="subnet-grid" aria-label="Allocated subnets">
                    <div class="subnet-card subnet-a" data-subnet="A">
                        <div class="subnet-header">
                            <span class="subnet-label">Subnet A</span>
                            <span class="subnet-role">Servers</span>
                        </div>
                        <div class="subnet-body">
                            <div class="subnet-row">
                                <span>Required hosts</span>
                                <span>50</span>
                            </div>
                            <div class="subnet-row">
                                <span>Mask</span>
                                <span id="subnetAMask">?</span>
                            </div>
                            <div class="subnet-row">
                                <span>Network</span>
                                <span id="subnetANetwork">Not allocated</span>
                            </div>
                            <div class="subnet-row">
                                <span>Host range</span>
                                <span id="subnetAHosts">Not allocated</span>
                            </div>
                            <div class="subnet-row">
                                <span>Broadcast</span>
                                <span id="subnetABroadcast">Not allocated</span>
                            </div>
                        </div>
                    </div>

                    <div class="subnet-card subnet-b" data-subnet="B">
                        <div class="subnet-header">
                            <span class="subnet-label">Subnet B</span>
                            <span class="subnet-role">Staff PCs</span>
                        </div>
                        <div class="subnet-body">
                            <div class="subnet-row">
                                <span>Required hosts</span>
                                <span>20</span>
                            </div>
                            <div class="subnet-row">
                                <span>Mask</span>
                                <span id="subnetBMask">?</span>
                            </div>
                            <div class="subnet-row">
                                <span>Network</span>
                                <span id="subnetBNetwork">Not allocated</span>
                            </div>
                            <div class="subnet-row">
                                <span>Host range</span>
                                <span id="subnetBHosts">Not allocated</span>
                            </div>
                            <div class="subnet-row">
                                <span>Broadcast</span>
                                <span id="subnetBBroadcast">Not allocated</span>
                            </div>
                        </div>
                    </div>

                    <div class="subnet-card subnet-c" data-subnet="C">
                        <div class="subnet-header">
                            <span class="subnet-label">Subnet C</span>
                            <span class="subnet-role">Lab PCs</span>
                        </div>
                        <div class="subnet-body">
                            <div class="subnet-row">
                                <span>Required hosts</span>
                                <span>10</span>
                            </div>
                            <div class="subnet-row">
                                <span>Mask</span>
                                <span id="subnetCMask">?</span>
                            </div>
                            <div class="subnet-row">
                                <span>Network</span>
                                <span id="subnetCNetwork">Not allocated</span>
                            </div>
                            <div class="subnet-row">
                                <span>Host range</span>
                                <span id="subnetCHosts">Not allocated</span>
                            </div>
                            <div class="subnet-row">
                                <span>Broadcast</span>
                                <span id="subnetCBroadcast">Not allocated</span>
                            </div>
                        </div>
                    </div>

                    <div class="subnet-card subnet-d" data-subnet="D">
                        <div class="subnet-header">
                            <span class="subnet-label">Subnet D</span>
                            <span class="subnet-role">Management</span>
                        </div>
                        <div class="subnet-body">
                            <div class="subnet-row">
                                <span>Required hosts</span>
                                <span>5</span>
                            </div>
                            <div class="subnet-row">
                                <span>Mask</span>
                                <span id="subnetDMask">?</span>
                            </div>
                            <div class="subnet-row">
                                <span>Network</span>
                                <span id="subnetDNetwork">Not allocated</span>
                            </div>
                            <div class="subnet-row">
                                <span>Host range</span>
                                <span id="subnetDHosts">Not allocated</span>
                            </div>
                            <div class="subnet-row">
                                <span>Broadcast</span>
                                <span id="subnetDBroadcast">Not allocated</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Details panel (like packet panel) -->
            <section class="calculation-panel" id="vlsmCalcPanel" aria-live="polite" hidden>
                <h2 id="vlsmCalcTitle"></h2>
                <dl class="calc-fields" id="vlsmCalcFields"></dl>
            </section>
        </section>

        <!-- Summary table -->
        <section class="resolver-cache" aria-live="polite" aria-labelledby="vlsmSummaryTitle">
            <h2 id="vlsmSummaryTitle">
                Final Subnet Summary
                <span class="cache-state" id="vlsmSummaryState">Not yet fully allocated</span>
            </h2>
            <table class="cache-table">
                <thead>
                    <tr>
                        <th>Subnet</th>
                        <th>Network / Mask</th>
                        <th>Usable hosts</th>
                        <th>Host range</th>
                        <th>Broadcast</th>
                    </tr>
                </thead>
                <tbody id="vlsmSummaryBody">
                    <tr>
                        <td class="cache-placeholder" colspan="5">
                            Step through the visualization to fill the table.
                        </td>
                    </tr>
                </tbody>
            </table>

        </section>
    </main>
</div>

<script>
(() => {
    const root = document.getElementById('vlsmDemo');
    if (!root) return;

    const baseNetwork = '192.168.10.0';
    const baseMask = 24;
    const totalAddresses = 256;

    // Subnet plan (precomputed to keep JS focused on visualization)
    const subnets = [
        {
            id: 'A',
            role: 'Servers',
            requiredHosts: 50,
            mask: 26,
            addresses: 64,
            usableHosts: 62,
            network: '192.168.10.0',
            firstHost: '192.168.10.1',
            lastHost: '192.168.10.62',
            broadcast: '192.168.10.63'
        },
        {
            id: 'B',
            role: 'Staff PCs',
            requiredHosts: 20,
            mask: 27,
            addresses: 32,
            usableHosts: 30,
            network: '192.168.10.64',
            firstHost: '192.168.10.65',
            lastHost: '192.168.10.94',
            broadcast: '192.168.10.95'
        },
        {
            id: 'C',
            role: 'Lab PCs',
            requiredHosts: 10,
            mask: 28,
            addresses: 16,
            usableHosts: 14,
            network: '192.168.10.96',
            firstHost: '192.168.10.97',
            lastHost: '192.168.10.110',
            broadcast: '192.168.10.111'
        },
        {
            id: 'D',
            role: 'Management',
            requiredHosts: 5,
            mask: 29,
            addresses: 8,
            usableHosts: 6,
            network: '192.168.10.112',
            firstHost: '192.168.10.113',
            lastHost: '192.168.10.118',
            broadcast: '192.168.10.119'
        }
    ];

    const remainingPoolAfterD = {
        network: '192.168.10.120',
        last: '192.168.10.255',
        mask: 25,
        addresses: 136
    };

    const steps = [
        {
            title: 'Base Network Overview',
            description:
                'We begin with base network 192.168.10.0/24. It has 256 addresses (0–255) and 254 usable host addresses. ' +
                'Our goal is to allocate four subnets for A (50 hosts), B (20), C (10), and D (5) without wasting space.',
            calc: {
                title: 'Base Network Properties',
                fields: [
                    ['Network', baseNetwork + '/' + baseMask],
                    ['Address range', '192.168.10.0 – 192.168.10.255'],
                    ['Total addresses', '256 (2^8)'],
                    ['Usable hosts', '254 (excluding network and broadcast)'],
                    ['Subnets needed', 'A: 50, B: 20, C: 10, D: 5']
                ]
            },
            activeSubnet: null,
            allocatedUpToIndex: -1
        },
        {
            title: 'Sort Requirements (Largest First)',
            description:
                'With VLSM, we sort host requirements from largest to smallest. Larger subnets are allocated first ' +
                'so they have space in the address pool. Order: A (50), B (20), C (10), D (5).',
            calc: {
                title: 'Sorting Host Requirements',
                fields: [
                    ['Original list', 'A: 50, B: 20, C: 10, D: 5'],
                    ['Sorted (descending)', 'A: 50 → B: 20 → C: 10 → D: 5'],
                    ['Reason', 'Largest subnets first avoid fragmentation and running out of space']
                ]
            },
            activeSubnet: null,
            allocatedUpToIndex: -1
        },
        {
            title: 'Allocate Subnet A (50 hosts)',
            description:
                'Subnet A needs at least 50 hosts. The smallest block that fits is 64 addresses (2^6), i.e. /26. ' +
                'We place it at the start of the pool: 192.168.10.0/26 with host range 192.168.10.1–62.',
            calc: {
                title: 'Subnet A Mask and Range',
                fields: [
                    ['Required hosts', '50'],
                    ['Smallest power of 2 ≥ (hosts + 2)', '2^6 = 64 (50 + 2 = 52)'],
                    ['Chosen mask', '/26 (256 / 4 = 64 addresses per subnet)'],
                    ['Network', '192.168.10.0/26'],
                    ['Host range', '192.168.10.1 – 192.168.10.62'],
                    ['Broadcast', '192.168.10.63'],
                    ['Remaining pool', '192.168.10.64 – 192.168.10.255']
                ]
            },
            activeSubnet: 'A',
            allocatedUpToIndex: 0
        },
        {
            title: 'Allocate Subnet B (20 hosts)',
            description:
                'Subnet B needs 20 hosts. We need at least 22 addresses (including network and broadcast). ' +
                'The smallest power of 2 ≥ 22 is 32 (2^5), so we choose /27. It fits next: 192.168.10.64/27.',
            calc: {
                title: 'Subnet B Mask and Range',
                fields: [
                    ['Required hosts', '20'],
                    ['Hosts + 2 (network + broadcast)', '22'],
                    ['Smallest power of 2 ≥ 22', '2^5 = 32'],
                    ['Chosen mask', '/27'],
                    ['Network', '192.168.10.64/27'],
                    ['Host range', '192.168.10.65 – 192.168.10.94'],
                    ['Broadcast', '192.168.10.95'],
                    ['Remaining pool', '192.168.10.96 – 192.168.10.255']
                ]
            },
            activeSubnet: 'B',
            allocatedUpToIndex: 1
        },
        {
            title: 'Allocate Subnet C (10 hosts)',
            description:
                'Subnet C needs 10 hosts, so we need at least 12 addresses. The smallest power of 2 ≥ 12 is 16 (2^4), ' +
                'giving mask /28. Network: 192.168.10.96/28 with host range 192.168.10.97–110.',
            calc: {
                title: 'Subnet C Mask and Range',
                fields: [
                    ['Required hosts', '10'],
                    ['Hosts + 2', '12'],
                    ['Smallest power of 2 ≥ 12', '2^4 = 16'],
                    ['Chosen mask', '/28'],
                    ['Network', '192.168.10.96/28'],
                    ['Host range', '192.168.10.97 – 192.168.10.110'],
                    ['Broadcast', '192.168.10.111'],
                    ['Remaining pool', '192.168.10.112 – 192.168.10.255']
                ]
            },
            activeSubnet: 'C',
            allocatedUpToIndex: 2
        },
        {
            title: 'Allocate Subnet D (5 hosts)',
            description:
                'Subnet D needs 5 hosts, so we need at least 7 addresses. The smallest power of 2 ≥ 7 is 8 (2^3), ' +
                'giving mask /29. Network: 192.168.10.112/29 with host range 192.168.10.113–118.',
            calc: {
                title: 'Subnet D Mask and Range',
                fields: [
                    ['Required hosts', '5'],
                    ['Hosts + 2', '7'],
                    ['Smallest power of 2 ≥ 7', '2^3 = 8'],
                    ['Chosen mask', '/29'],
                    ['Network', '192.168.10.112/29'],
                    ['Host range', '192.168.10.113 – 192.168.10.118'],
                    ['Broadcast', '192.168.10.119'],
                    ['Remaining pool (unused)', '192.168.10.120 – 192.168.10.255 (136 addresses)']
                ]
            },
            activeSubnet: 'D',
            allocatedUpToIndex: 3
        },
        {
            title: 'Summary: All Subnets Fit Inside /24',
            description:
                'All four subnets (A–D) fit inside 192.168.10.0/24 without overlapping: /26, /27, /28, and /29 masks. ' +
                'We still have unused space from 192.168.10.120–255 for future networks. This is the benefit of VLSM: ' +
                'flexible allocation with minimal waste.',
            calc: {
                title: 'Final VLSM Layout',
                fields: [
                    ['Subnet A', '192.168.10.0/26 → 62 usable hosts'],
                    ['Subnet B', '192.168.10.64/27 → 30 usable hosts'],
                    ['Subnet C', '192.168.10.96/28 → 14 usable hosts'],
                    ['Subnet D', '192.168.10.112/29 → 6 usable hosts'],
                    ['Unused pool', remainingPoolAfterD.network + ' – ' + remainingPoolAfterD.last +
                        ' (~' + remainingPoolAfterD.addresses + ' addresses)'],
                    ['Key idea', 'Allocate largest subnets first with appropriately sized masks']
                ]
            },
            activeSubnet: null,
            allocatedUpToIndex: 3
        }
    ];

    const elements = {
        steps: [...root.querySelectorAll('.step')],
        status: root.querySelector('#vlsmStatus'),
        previous: root.querySelector('#vlsmPrevious'),
        next: root.querySelector('#vlsmNext'),
        play: root.querySelector('#vlsmPlay'),
        pause: root.querySelector('#vlsmPause'),
        reset: root.querySelector('#vlsmReset'),
        poolBase: root.querySelector('#vlsmPoolBase'),
        poolDetail: root.querySelector('#vlsmPoolDetail'),
        calcPanel: root.querySelector('#vlsmCalcPanel'),
        calcTitle: root.querySelector('#vlsmCalcTitle'),
        calcFields: root.querySelector('#vlsmCalcFields'),
        summaryState: root.querySelector('#vlsmSummaryState'),
        summaryBody: root.querySelector('#vlsmSummaryBody'),
        subnet: {
            A: {
                mask: root.querySelector('#subnetAMask'),
                network: root.querySelector('#subnetANetwork'),
                hosts: root.querySelector('#subnetAHosts'),
                broadcast: root.querySelector('#subnetABroadcast')
            },
            B: {
                mask: root.querySelector('#subnetBMask'),
                network: root.querySelector('#subnetBNetwork'),
                hosts: root.querySelector('#subnetBHosts'),
                broadcast: root.querySelector('#subnetBBroadcast')
            },
            C: {
                mask: root.querySelector('#subnetCMask'),
                network: root.querySelector('#subnetCNetwork'),
                hosts: root.querySelector('#subnetCHosts'),
                broadcast: root.querySelector('#subnetCBroadcast')
            },
            D: {
                mask: root.querySelector('#subnetDMask'),
                network: root.querySelector('#subnetDNetwork'),
                hosts: root.querySelector('#subnetDHosts'),
                broadcast: root.querySelector('#subnetDBroadcast')
            }
        }
    };

    const state = {
        index: 0,
        playing: false,
        timer: null
    };

    function renderCalc(step) {
        const calc = step.calc;
        if (!calc) {
            elements.calcPanel.hidden = true;
            return;
        }
        elements.calcPanel.hidden = false;
        elements.calcTitle.textContent = calc.title;
        elements.calcFields.replaceChildren();

        calc.fields.forEach(([label, value]) => {
            const dt = document.createElement('dt');
            dt.textContent = label;
            const dd = document.createElement('dd');
            dd.textContent = value;
            elements.calcFields.append(dt, dd);
        });
    }

    function resetSubnetCards() {
        ['A', 'B', 'C', 'D'].forEach(id => {
            elements.subnet[id].mask.textContent = '?';
            elements.subnet[id].network.textContent = 'Not allocated';
            elements.subnet[id].hosts.textContent = 'Not allocated';
            elements.subnet[id].broadcast.textContent = 'Not allocated';
        });
    }

    function applyAllocations(upToIndex) {
        resetSubnetCards();
        subnets.slice(0, upToIndex + 1).forEach(subnet => {
            const el = elements.subnet[subnet.id];
            if (!el) return;
            el.mask.textContent = '/' + subnet.mask +
                ' (' + subnet.addresses + ' addresses, ' + subnet.usableHosts + ' usable)';
            el.network.textContent = subnet.network + '/' + subnet.mask;
            el.hosts.textContent = subnet.firstHost + ' – ' + subnet.lastHost;
            el.broadcast.textContent = subnet.broadcast;
        });

        // Update base pool fill representation (very simple: width segments)
        const allocatedAddresses = subnets
            .slice(0, upToIndex + 1)
            .reduce((sum, s) => sum + s.addresses, 0);

        const usedPercent = (allocatedAddresses / totalAddresses) * 100;
        const remainingPercent = 100 - usedPercent;
        elements.poolBase.style.setProperty('--used-percent', usedPercent.toFixed(2) + '%');
        elements.poolBase.style.setProperty('--remaining-percent', remainingPercent.toFixed(2) + '%');

        if (upToIndex >= 0) {
            const lastAllocated = subnets[upToIndex];
            if (upToIndex === subnets.length - 1) {
                elements.poolDetail.textContent =
                    baseNetwork + '/' + baseMask +
                    ' — allocated up to ' +
                    lastAllocated.broadcast +
                    ', remaining ' +
                    remainingPoolAfterD.network + ' – ' +
                    remainingPoolAfterD.last;
            } else {
                elements.poolDetail.textContent =
                    baseNetwork + '/' + baseMask +
                    ' — allocated up to ' +
                    lastAllocated.broadcast;
            }
        } else {
            elements.poolBase.style.setProperty('--used-percent', '0%');
            elements.poolBase.style.setProperty('--remaining-percent', '100%');
            elements.poolDetail.textContent = baseNetwork + '/' + baseMask + ' — 256 addresses';
        }
    }

    function updateSubnetHighlight(activeId) {
        root.querySelectorAll('.subnet-card').forEach(card => {
            const id = card.dataset.subnet;
            card.classList.toggle('active', id === activeId);
        });
    }

    function renderSummary(stepIndex) {
        const lastStep = steps[stepIndex];
        const fullyAllocated = lastStep.allocatedUpToIndex === subnets.length - 1;

        if (!fullyAllocated) {
            elements.summaryState.textContent = 'Not yet fully allocated';
            elements.summaryBody.innerHTML =
                '<tr><td class="cache-placeholder" colspan="5">' +
                'Step through all subnet allocations to see the final summary.' +
                '</td></tr>';
            return;
        }

        elements.summaryState.textContent = 'All subnets allocated within 192.168.10.0/24';

        elements.summaryBody.replaceChildren();
        subnets.forEach(subnet => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${subnet.id}</td>
                <td>${subnet.network}/${subnet.mask}</td>
                <td>${subnet.usableHosts}</td>
                <td>${subnet.firstHost} – ${subnet.lastHost}</td>
                <td>${subnet.broadcast}</td>
            `;
            elements.summaryBody.appendChild(tr);
        });

        const trUnused = document.createElement('tr');
        trUnused.innerHTML = `
            <td>Unused</td>
            <td>${remainingPoolAfterD.network}/${remainingPoolAfterD.mask}</td>
            <td>${remainingPoolAfterD.addresses}</td>
            <td>${remainingPoolAfterD.network} – ${remainingPoolAfterD.last}</td>
            <td>(inside 192.168.10.0/24)</td>
        `;
        elements.summaryBody.appendChild(trUnused);
    }

    function updateStep() {
        const step = steps[state.index];

        // Step indicator UI
        elements.steps.forEach((el, index) => {
            el.classList.toggle('active', index === state.index);
            el.classList.toggle('completed', index < state.index);
        });

        // Status text
        elements.status.textContent = step.description;

        // Calculations panel
        renderCalc(step);

        // Subnet allocations and highlight
        applyAllocations(step.allocatedUpToIndex);
        updateSubnetHighlight(step.activeSubnet);

        // Summary
        renderSummary(state.index);

        // Controls
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

    updateStep();
})();
</script>

<style>
@scope (.vlsm-demo) {
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

    .controls {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
        margin-bottom: 22px;
    }
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
    }

    .network-diagram {
        position: relative;
        overflow: hidden;
        padding: 18px 24px 24px;
        background-color: var(--hvl-white);
        background-image: linear-gradient(to right, var(--hvl-lightgrey) 1px, transparent 1px),
                          linear-gradient(to bottom, var(--hvl-lightgrey) 1px, transparent 1px);
        background-size: 24px 24px;
    }

    .vlsm-layout {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    .pool-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
    }
    .pool-title {
        font-weight: 700;
        color: var(--hvl-second);
    }
    .pool-detail {
        font-size: 0.86em;
        color: var(--hvl-grey);
    }

    .pool-bar {
        position: relative;
        width: 100%;
        height: 26px;
        border-radius: 999px;
        background: linear-gradient(90deg,
            rgba(201,213,218,0.65) 0%,
            rgba(201,213,218,0.9) 100%);
        overflow: hidden;
    }
    .pool-segment.pool-base {
        position: absolute;
        inset: 0;
        background:
            linear-gradient(90deg,
                var(--hvl-bluegreen) 0 var(--used-percent),
                rgba(0,175,186,0.15) var(--used-percent) 100%);
        box-shadow: inset 0 0 0 1px rgba(143,138,131,0.25);
        transition: background 0.4s ease;
    }

    .subnet-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 16px;
    }
    .subnet-card {
        border-radius: 10px;
        border: 1px solid var(--hvl-lightgrey);
        background: var(--hvl-white);
        box-shadow: 0 4px 16px rgba(143,138,131,0.10);
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        transition: box-shadow 0.18s ease, transform 0.18s ease, border-color 0.18s ease;
    }
    .subnet-card.active {
        border-color: var(--hvl-main);
        box-shadow: 0 6px 18px rgba(0,175,186,0.25);
        transform: translateY(-2px);
    }

    .subnet-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
    }
    .subnet-label {
        font-weight: 700;
        color: var(--hvl-second);
    }
    .subnet-role {
        font-size: 0.8em;
        color: var(--hvl-grey);
    }
    .subnet-body {
        font-size: 0.82em;
        color: var(--hvl-second);
    }
    .subnet-row {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 3px;
    }
    .subnet-row span:first-child { color: var(--hvl-grey); }
    .subnet-row span:last-child { font-family: 'SFMono-Regular', Consolas, monospace; }

    .calculation-panel[hidden] { display: none; }
    .calculation-panel {
        position: relative;
        margin-top: 8px;
        padding: 14px 16px;
        border: 1px solid var(--hvl-lightblue);
        border-left: 5px solid var(--hvl-lightblue);
        border-radius: 8px;
        color: var(--hvl-second);
        background: var(--hvl-white);
        box-shadow: 0 8px 22px rgba(143,138,131,0.18);
    }
    .calculation-panel h2 {
        margin-bottom: 8px;
        color: var(--hvl-lightblue);
        font-size: 1em;
    }
    .calc-fields {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: baseline;
        gap: 5px 12px;
        margin: 0;
        font-size: 0.84em;
    }
    .calc-fields dt {
        color: var(--hvl-lightblue);
        font-weight: 700;
    }
    .calc-fields dd {
        margin: 0;
        color: var(--hvl-second);
        overflow-wrap: anywhere;
    }

    .resolver-cache h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }
    .cache-state {
        color: var(--hvl-grey);
        font-size: 0.75em;
        font-weight: 400;
    }
    .cache-table {
        width: 100%;
        border-collapse: collapse;
    }
    .cache-table th,
    .cache-table td {
        padding: 10px 12px;
        border-bottom: 1px solid var(--hvl-lightgrey);
        text-align: left;
    }
    .cache-table th {
        color: var(--hvl-grey);
        font-size: 0.8em;
        font-weight: 600;
        text-transform: uppercase;
    }
    .cache-table td {
        color: var(--hvl-second);
        font-size: 0.86em;
    }
    .cache-table tr:last-child td { border-bottom: 0; }
    .cache-placeholder { color: var(--hvl-grey) !important; }

    .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 14px 22px;
        margin-top: 12px;
        color: var(--hvl-grey);
        font-size: 0.85em;
    }
    .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 7px;
    }
    .legend-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
    .legend-largest { background: var(--hvl-main); }
    .legend-current { background: var(--hvl-lightblue); }
    .legend-remaining { background: var(--hvl-sand); }

    @media (max-width: 900px) {
        .steps { align-items: flex-start; flex-direction: column; }
        .step { min-width: 100%; }
        .subnet-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .pool-bar { height: 24px; }
    }

    @media (max-width: 600px) {
        h1 { font-size: 1.8em; }
        .controls { align-items: center; flex-direction: column; }
        .btn { width: 100%; max-width: 220px; }
        .network-diagram { padding: 14px; }
        .subnet-grid { grid-template-columns: 1fr; }
        .subnet-card { padding: 10px; }
        .calc-fields { grid-template-columns: 1fr; gap: 3px; }
        .calc-fields dd { margin-bottom: 4px; }
        .cache-table th, .cache-table td {
            padding: 8px 5px;
            font-size: 0.8em;
            overflow-wrap: anywhere;
        }
    }
}
</style>