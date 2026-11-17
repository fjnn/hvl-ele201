---
layout: single
title: "Recap - Quiz"
permalink: /network-lectures/recap-quiz
toc: true
breadcrumbs: true
sidebar:
  - title: "Lectures"
    image: /assets/images/logo.png
    image_alt: "image"
    nav: network-lectures
taxonomy: markup
---




<div id="recap-quiz">
  <form id="quiz-form">
    <div id="quiz-questions"></div>
    <button class="btn btn--primary" type="submit">Check score</button>
  </form>
  <section id="quiz-results" hidden aria-live="polite">
    <h2 tabindex="-1">Results</h2>
    <div class="quiz-summary">
      <div>
        <p class="quiz-summary-label">Quiz score</p>
        <p id="quiz-score"></p>
      </div>
      <p id="quiz-percentage"></p>
    </div>
    <h3>Score by category</h3>
    <ul id="quiz-category-scores"></ul>
    <h3>Solutions</h3>
    <ol id="quiz-solutions"></ol>
    <button class="btn btn--primary" id="quiz-restart" type="button">New round</button>
  </section>
</div>

<script>
  const questions = [
    { category: "Network basics", question: "Which device forwards traffic between different IP networks?", options: ["Router", "Switch", "Repeater", "Access point"], answer: 0 },
    { category: "Network basics", question: "Which topology connects devices to a central switch?", options: ["Ring", "Star", "Bus", "Mesh"], answer: 1 },
    { category: "Data link", question: "Which address does an Ethernet switch use to forward frames?", options: ["IP address", "Port number", "MAC address", "Domain name"], answer: 2 },
    { category: "Data link", question: "What is the purpose of ARP in an IPv4 network?", options: ["Find a MAC address for an IP address", "Assign IP addresses", "Encrypt frames", "Resolve domain names"], answer: 0 },
    { category: "Network Layer", question: "How many bits are in an IPv4 address?", options: ["16", "32", "64", "128"], answer: 1 },
    { category: "Network Layer", question: "Which prefix length corresponds to the subnet mask 255.255.255.0?", options: ["/8", "/16", "/24", "/32"], answer: 2 },
    { category: "Network Layer", question: "Which prefix length corresponds to the subnet mask 255.255.255.128?", options: ["/27", "/11", "/12", "/25"], answer: 3 },
    { category: "Transport", question: "Which transport protocol provides reliable, ordered delivery?", options: ["IP", "UDP", "Ethernet", "TCP"], answer: 3 },
    { category: "Transport", question: "What identifies an application endpoint on a host?", options: ["Subnet mask", "Port number", "MAC address", "Default gateway"], answer: 1 },
    { category: "Applications", question: "Which service translates domain names into IP addresses?", options: ["DHCP", "DNS", "ARP", "ICMP"], answer: 1 },
    { category: "Applications", question: "Which service can automatically assign IP configuration to a host?", options: ["DHCP", "DNS", "HTTP", "SSH"], answer: 0 },
    { category: "Network basics", question: "What is the main purpose of a default gateway?", options: ["Connect a host to other networks", "Assign a MAC address", "Store web pages", "Convert domain names"], answer: 0 },
    { category: "Network basics", question: "Which OSI layer is responsible for routing packets between networks?", options: ["Physical", "Data link", "Network", "Application"], answer: 2 },
    { category: "Network basics", question: "What is encapsulation in networking?", options: ["Adding protocol information as data moves down the stack", "Removing all addresses from a packet", "Compressing a network cable", "Assigning a hostname"], answer: 0 },
    { category: "Physical layer", question: "Which medium carries data using light?", options: ["Twisted-pair copper", "Fiber-optic cable", "Coaxial copper", "Radio"], answer: 1 },
    { category: "Physical layer", question: "What does full-duplex communication allow?", options: ["Transmission in both directions at the same time", "Transmission in only one direction", "Transmission in both directions but never simultaneously", "Only wireless transmission"], answer: 0 },
    { category: "Physical layer", question: "What is bandwidth commonly measured in for a digital network link?", options: ["Volts", "Bits per second", "Meters", "Packets per address"], answer: 1 },
    { category: "Data link", question: "What does a switch do when the destination MAC address is unknown?", options: ["Floods the frame out other ports in the same VLAN", "Sends the frame only to the default gateway", "Changes the destination MAC address", "Drops the frame in every case"], answer: 0 },
    { category: "Data link", question: "What is the purpose of a VLAN?", options: ["Divide a switched network into separate broadcast domains", "Increase the length of an IPv6 address", "Translate domain names", "Encrypt every Ethernet frame"], answer: 0 },
    { category: "Data link", question: "Which address is the Ethernet broadcast address?", options: ["FF:FF:FF:FF:FF:FF", "00:00:00:00:00:00", "127.0.0.1", "255.255.255.0"], answer: 0 },
    { category: "Network Layer", question: "Which IPv4 address is in a private address range?", options: ["192.168.1.10", "8.8.8.8", "1.1.1.1", "203.0.113.10"], answer: 0 },
    { category: "Network Layer", question: "How many usable host addresses are in a conventional IPv4 /24 subnet?", options: ["128", "254", "255", "256"], answer: 1 },
    { category: "Network Layer", question: "What is the network address of 192.168.10.42/24?", options: ["192.168.10.0", "192.168.10.1", "192.168.10.42", "192.168.10.255"], answer: 0 },
    { category: "Network Layer", question: "Which IPv4 address is commonly used to test the local TCP/IP stack (localhost)?", options: ["127.0.0.1", "192.168.0.1", "255.255.255.255", "8.8.8.8"], answer: 0 },
    { category: "Network Layer", question: "How many bits are in an IPv6 address?", options: ["32", "48", "64", "128"], answer: 3 },
    { category: "Network Layer", question: "Which IPv6 address refers to the local host?", options: ["::1", "::", "ff02::1", "fe80::"], answer: 0 },
    { category: "Transport Layer", question: "Which transport protocol is connectionless?", options: ["TCP", "UDP", "HTTP", "Ethernet"], answer: 1 },
    { category: "Transport Layer", question: "What is the first message in a TCP three-way handshake?", options: ["ACK", "FIN", "SYN", "RST"], answer: 2 },
    { category: "Transport Layer", question: "Which protocol uses port numbers to identify communicating applications?", options: ["TCP", "ARP", "Ethernet", "IP alone"], answer: 0 },
    { category: "Application Layer", question: "Which protocol is typically used to access websites securely?", options: ["HTTPS", "FTP", "ARP", "DHCP"], answer: 0 },
    { category: "Application Layer", question: "Which command is commonly used to test reachability using ICMP echo messages?", options: ["ping", "mkdir", "copy", "dig"], answer: 0 },
    { category: "Application Layer", question: "What is the default TCP port for HTTPS?", options: ["22", "53", "80", "443"], answer: 3 },
    { category: "Network security", question: "What is a firewall primarily used for?", options: ["Filtering network traffic according to rules", "Assigning IP addresses", "Connecting fiber cables", "Converting IP addresses to MAC addresses"], answer: 0 },
    { category: "Network security", question: "Which protocol provides encrypted remote terminal access?", options: ["Telnet", "SSH", "HTTP", "ARP"], answer: 1 },

    { category: "Network security", question: "What is a Denial of Service (DoS) attack?", options: ["An attack that prevents legitimate users from accessing a service by overloading it", "An attack that changes routing tables", "An attack that physically damages cables", "An attack that targets DNS records"], answer: 0 },
    { category: "Network security", question: "Which characteristic is typical of a DoS attack?", options: ["High volume of malicious traffic to a target", "Use of encryption to hide data", "Physical destruction of hardware", "Only targeting wireless networks"], answer: 0 },
    { category: "Network security", question: "What distinguishes a Distributed DoS (DDoS) attack from a simple DoS attack?", options: ["It uses many compromised hosts to attack the target", "It only affects local networks", "It requires physical access to the router", "It can only be done over IPv6"], answer: 0 },
    { category: "Network security", question: "Which mechanism can help mitigate DoS/DDoS attacks?", options: ["Rate limiting and traffic filtering", "Using only static IP addresses", "Disabling encryption", "Increasing cable length"], answer: 0 },

    { category: "Transport Layer", question: "Which statement is true about UDP?", options: ["It is connection-oriented and reliable", "It is connectionless and does not guarantee delivery", "It always encrypts data", "It requires a three-way handshake"], answer: 1 },
    { category: "Transport Layer", question: "Which applications commonly use UDP?", options: ["Video streaming and DNS", "Email (SMTP)", "HTTP and HTTPS", "File Transfer"], answer: 0 },
    { category: "Transport Layer", question: "What does UDP lack compared to TCP?", options: ["Port numbers", "Checksum", "Flow control and congestion control", "Ability to run over IP"], answer: 2 },
    { category: "Transport Layer", question: "Which field is present in both TCP and UDP headers?", options: ["Sequence number", "Port numbers", "Window size", "Flags for connection control"], answer: 1 },

    { category: "Industrial networking", question: "What is PROFINET primarily used for?", options: ["Industrial Ethernet communication for automation", "Long-distance telephone signaling", "Home Wi-Fi networking", "Satellite communication"], answer: 0 },
    { category: "Industrial networking", question: "PROFIBUS is mainly based on which type of physical medium?", options: ["Serial fieldbus communication", "Optical-only links", "Pure wireless communication", "Coaxial TV cable"], answer: 0 },
    { category: "Industrial networking", question: "Which advantage does PROFINET have over traditional PROFIBUS?", options: ["Uses Ethernet for higher bandwidth and integration with IT networks", "Removes all need for switches", "Does not require any cabling", "Only works with analog signals"], answer: 0 },

    { category: "Industrial networking", question: "What does determinism in industrial networks refer to?", options: ["Predictable and bounded response times", "Highest possible data rate", "Randomized access to the medium", "Use of wireless communication only"], answer: 0 },

    { category: "Network Layer", question: "What is a primary factor in a routing decision taken by a router?", options: ["Destination IP address and routing table entries", "Destination MAC address only", "Cable color", "Hostname length"], answer: 0 },
    { category: "Network Layer", question: "Which metric might a router use when selecting a route?", options: ["Hop count or cost", "User password strength", "File size on the server", "Monitor resolution"], answer: 0 },
    { category: "Network Layer", question: "What does a router do if no specific route to a destination network is found?", options: ["Uses the default route if configured", "Always drops the packet", "Sends the packet to every interface", "Converts the packet to a broadcast frame"], answer: 0 },
    { category: "Network Layer", question: "Which table is consulted by a router to decide where to forward an IP packet?", options: ["Routing table", "ARP cache only", "MAC address table only", "DNS zone file"], answer: 0 },

    { category: "Network basics", question: "What is circuit switching?", options: ["Establishing a dedicated communication path for the duration of a session", "Sending packets independently without a fixed path", "Broadcasting frames to all hosts", "Encrypting all data on a network"], answer: 0 },
    { category: "Network basics", question: "What is packet switching?", options: ["Breaking data into packets that are routed individually through the network", "Reserving a fixed bandwidth channel end-to-end", "Using only analog signals", "Connecting two hosts with a permanent physical wire"], answer: 0 },
    { category: "Network basics", question: "Which is a common example of a circuit-switched network?", options: ["Traditional telephone", "Modern IP-based internet", "Ethernet LAN", "Wi-Fi hotspot"], answer: 0 },
    { category: "Network basics", question: "Which is a common example of a packet-switched network?", options: ["The IP-based internet", "Analog telephone lines", "Dedicated E1 circuit only", "A single RS-232 serial cable"], answer: 0 }
  ];
  const roundSize = 10;
  const form = document.getElementById("quiz-form");
  const questionContainer = document.getElementById("quiz-questions");
  const results = document.getElementById("quiz-results");
  const score = document.getElementById("quiz-score");
  const percentage = document.getElementById("quiz-percentage");
  const categoryScores = document.getElementById("quiz-category-scores");
  const solutions = document.getElementById("quiz-solutions");
  let round = [];

  function shuffle(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled;
  }

  function startRound() {
    round = shuffle(questions).slice(0, roundSize);
    questionContainer.replaceChildren();
    round.forEach((item, index) => {
      const fieldset = document.createElement("fieldset");
      const legend = document.createElement("legend");
      legend.textContent = `${index + 1}. ${item.question} (${item.category})`;
      fieldset.appendChild(legend);
      const options = shuffle(item.options.map((text, optionIndex) => ({ text, optionIndex })));
      options.forEach((option) => {
        const label = document.createElement("label");
        label.className = "quiz-option";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question-${index}`;
        input.value = option.optionIndex;
        input.required = true;
        label.append(input, document.createTextNode(` ${option.text}`));
        fieldset.appendChild(label);
      });
      questionContainer.appendChild(fieldset);
    });
    results.hidden = true;
    form.hidden = false;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const answers = new FormData(form);
    const categories = new Map();
    let correct = 0;
    solutions.replaceChildren();
    round.forEach((item, index) => {
      const category = categories.get(item.category) || { correct: 0, total: 0 };
      const selectedAnswer = Number(answers.get(`question-${index}`));
      const isCorrect = selectedAnswer === item.answer;
      category.total++;
      if (isCorrect) {
        category.correct++;
        correct++;
      }
      categories.set(item.category, category);

      const solution = document.createElement("li");
      const question = document.createElement("p");
      const selected = document.createElement("p");
      const correctAnswer = document.createElement("p");
      question.className = "quiz-solution-question";
      question.textContent = `${index + 1}. ${item.question}`;
      selected.className = `quiz-solution-selected ${isCorrect ? "is-correct" : "is-incorrect"}`;
      selected.textContent = `Selected: ${item.options[selectedAnswer]}`;
      correctAnswer.textContent = `Correct: ${item.options[item.answer]}`;
      solution.append(question, selected, correctAnswer);
      solutions.appendChild(solution);
    });
    score.textContent = `${correct} / ${round.length} correct`;
    percentage.textContent = `${Math.round(correct / round.length * 100)}%`;
    categoryScores.replaceChildren();
    categories.forEach((category, name) => {
      const item = document.createElement("li");
      const heading = document.createElement("div");
      const categoryName = document.createElement("span");
      const count = document.createElement("span");
      const progress = document.createElement("progress");
      heading.className = "quiz-category-heading";
      categoryName.textContent = name;
      count.className = "quiz-category-count";
      count.textContent = `${category.correct} / ${category.total} correct`;
      progress.className = "quiz-category-progress";
      progress.max = category.total;
      progress.value = category.correct;
      progress.setAttribute("aria-label", `${name}: ${category.correct} out of ${category.total} correct`);
      heading.append(categoryName, count);
      item.append(heading, progress);
      categoryScores.appendChild(item);
    });
    form.hidden = true;
    results.hidden = false;
    results.querySelector("h2").focus();
  });

  document.getElementById("quiz-restart").addEventListener("click", startRound);
  startRound();
</script>

<style>
  #recap-quiz {
    max-width: 46rem;
  }
  #recap-quiz [hidden] {
    display: none;
  }
  #recap-quiz fieldset {
    min-width: 0;
    margin: 0 0 1.75rem;
    padding: 0 0 1.75rem;
    border: 0;
    border-bottom: 1px solid #d8dfe2;
  }
  #recap-quiz legend {
    width: 100%;
    margin-bottom: 0.75rem;
    padding: 0;
    color: #202b30;
    font-weight: 700;
  }
  #recap-quiz .quiz-option {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin: 0.5rem 0;
    padding: 0.7rem 0.85rem;
    border: 1px solid #d8dfe2;
    border-radius: 6px;
    background: #fff;
    color: #28363b;
    cursor: pointer;
    line-height: 1.4;
  }
  #recap-quiz .quiz-option:hover {
    border-color: #638d87;
    background: #f5faf9;
  }
  #recap-quiz .quiz-option:has(input:checked) {
    border-color: #21756d;
    background: #eaf5f2;
  }
  #recap-quiz .quiz-option:has(input:focus-visible) {
    outline: 2px solid #21756d;
    outline-offset: 2px;
  }
  #recap-quiz .quiz-option input {
    flex: none;
    margin: 0.2rem 0 0;
    accent-color: #21756d;
  }
  #quiz-results h2 {
    margin-bottom: 1rem;
  }
  #recap-quiz .quiz-summary {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 6px;
    background: #203532;
    color: #fff;
  }
  #recap-quiz .quiz-summary-label {
    margin: 0 0 0.25rem;
    color: #c8ded8;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  #quiz-score {
    margin: 0;
    color: #fff;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
  }
  #quiz-percentage {
    margin: 0;
    color: #e7c982;
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.2;
  }
  #quiz-results h3 {
    margin: 2rem 0 0.75rem;
  }
  #quiz-category-scores {
    margin: 0 0 1.75rem;
    padding: 0;
    list-style: none;
  }
  #quiz-category-scores li {
    margin: 0;
    padding: 0.9rem 0;
    border-bottom: 1px solid #d8dfe2;
  }
  #quiz-solutions {
    margin: 0 0 1.75rem;
    padding-left: 1.5rem;
  }
  #quiz-solutions li {
    margin: 0;
    padding: 0.9rem 0;
    border-bottom: 1px solid #d8dfe2;
  }
  #recap-quiz .quiz-solution-question {
    margin-bottom: 0.5rem;
    color: #28363b;
    font-weight: 700;
  }
  #recap-quiz .quiz-solution-selected {
    font-weight: 700;
  }
  #recap-quiz .quiz-solution-selected.is-correct {
    color: #167447;
  }
  #recap-quiz .quiz-solution-selected.is-incorrect {
    color: #b42318;
  }
  #recap-quiz #quiz-solutions li p {
    margin-top: 0;
    margin-bottom: 0.25rem;
  }
  #recap-quiz .quiz-category-heading {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.25rem 1rem;
    margin-bottom: 0.5rem;
    color: #28363b;
    font-weight: 700;
  }
  #recap-quiz .quiz-category-count {
    color: #58716c;
    font-size: 0.85rem;
    font-weight: 600;
  }
  #recap-quiz .quiz-category-progress {
    display: block;
    width: 100%;
    height: 0.5rem;
    overflow: hidden;
    border: 0;
    border-radius: 4px;
    background: #e4ece9;
    color: #21756d;
    appearance: none;
  }
  #recap-quiz .quiz-category-progress::-webkit-progress-bar {
    border-radius: 4px;
    background: #e4ece9;
  }
  #recap-quiz .quiz-category-progress::-webkit-progress-value {
    border-radius: 4px;
    background: #21756d;
  }
  #recap-quiz .quiz-category-progress::-moz-progress-bar {
    border-radius: 4px;
    background: #21756d;
  }
</style>