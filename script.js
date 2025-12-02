
let coin = document.querySelector('.coins');
let parsedcoin = parseFloat(coin.innerHTML);
let warning = document.getElementById("warning");

let cpctext = document.querySelector('#cpc-text');
let cpstext = document.querySelector('#cps-text');
let rebirthstext = document.querySelector('#rebirths-text');

let cpc = 1;

let cpsVars = {
    clickerCPS: 0,
    creditcardCPS: 0,
    moneyprinterCPS: 0,
    bankCPS: 0,
    multinational_companyCPS: 0,
    world_companyCPS: 0,
    MercuryCPS: 0,
    MarsCPS: 0,
    VenusCPS: 0,
    NeptuneCPS: 0,
    UranusCPS: 0,
    SaturnCPS: 0,
    JupiterCPS: 0,
    SunCPS: 0,
    BlackholeCPS: 0,
};

function formatNumber(num) {
    if (num >= 1e18) return (num / 1e18).toFixed(1) + ' Quintillion';
    if (num >= 1e15) return (num / 1e15).toFixed(1) + ' Quadrillion';
    if (num >= 1e12) return (num / 1e12).toFixed(1) + ' Trillion';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + ' Billion';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + ' million';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + ' thousand';
    return Math.round(num);
}

window.incrementCoin = function (event) {
    parsedcoin += cpc;
    coin.innerHTML = formatNumber(parsedcoin);

    const div = document.createElement('div');
    div.innerHTML = `+${formatNumber(cpc)}`;
    const x = event.clientX;
    const y = event.clientY;
    div.style.cssText = `
        color: white; 
        position: absolute; 
        top: ${y}px; 
        left: ${x}px; 
        font-size: 18px; 
        font-weight: bold;
        pointer-events: none;
        transform: translate(-50%, -50%);
        text-shadow: 1px 1px 3px black;
    `;
    document.body.appendChild(div);
    div.classList.add('fade-up');
    setTimeout(() => div.remove(), 800);
};

document.querySelector('.coin-img').addEventListener('click', incrementCoin);

const upgrades = [
    {
        elem: document.querySelector('.upgrade:nth-child(1)'),
        costElem: document.querySelector('.clicker-cost'),
        levelElem: document.querySelector('.clicker-level'),
        increaseElem: document.querySelector('.clicker-increase'),
        cost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        level: 0,
        type: 'click',
        baseIncreaseDivisor: 100
    },
    {
        elem: document.querySelector('.upgrade:nth-child(2)'),
        costElem: document.querySelector('.creditcard-cost'),
        levelElem: document.querySelector('.creditcard-level'),
        increaseElem: document.querySelector('.creditcard-increase'),
        cost: parseFloat(document.querySelector('.creditcard-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.creditcard-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'creditcardCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(3)'),
        costElem: document.querySelector('.moneyprinter-cost'),
        levelElem: document.querySelector('.moneyprinter-level'),
        increaseElem: document.querySelector('.moneyprinter-increase'),
        cost: parseFloat(document.querySelector('.moneyprinter-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.moneyprinter-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'moneyprinterCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(4)'),
        costElem: document.querySelector('.bank-cost'),
        levelElem: document.querySelector('.bank-level'),
        increaseElem: document.querySelector('.bank-increase'),
        cost: parseFloat(document.querySelector('.bank-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.bank-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'bankCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(5)'),
        costElem: document.querySelector('.multinational_company-cost'),
        levelElem: document.querySelector('.multinational_company-level'),
        increaseElem: document.querySelector('.multinational_company-increase'),
        cost: parseFloat(document.querySelector('.multinational_company-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.multinational_company-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'multinational_companyCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(6)'),
        costElem: document.querySelector('.world_company-cost'),
        levelElem: document.querySelector('.world_company-level'),
        increaseElem: document.querySelector('.world_company-increase'),
        cost: parseFloat(document.querySelector('.world_company-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.world_company-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'world_companyCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(7)'),
        costElem: document.querySelector('.Mercury-cost'),
        levelElem: document.querySelector('.Mercury-level'),
        increaseElem: document.querySelector('.Mercury-increase'),
        cost: parseFloat(document.querySelector('.Mercury-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.Mercury-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'MercuryCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(8)'),
        costElem: document.querySelector('.Mars-cost'),
        levelElem: document.querySelector('.Mars-level'),
        increaseElem: document.querySelector('.Mars-increase'),
        cost: parseFloat(document.querySelector('.Mars-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.Mars-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'MarsCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(9)'),
        costElem: document.querySelector('.Venus-cost'),
        levelElem: document.querySelector('.Venus-level'),
        increaseElem: document.querySelector('.Venus-increase'),
        cost: parseFloat(document.querySelector('.Venus-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.Venus-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'VenusCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(10)'),
        costElem: document.querySelector('.Neptune-cost'),
        levelElem: document.querySelector('.Neptune-level'),
        increaseElem: document.querySelector('.Neptune-increase'),
        cost: parseFloat(document.querySelector('.Neptune-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.Neptune-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'NeptuneCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(11)'),
        costElem: document.querySelector('.Uranus-cost'),
        levelElem: document.querySelector('.Uranus-level'),
        increaseElem: document.querySelector('.Uranus-increase'),
        cost: parseFloat(document.querySelector('.Uranus-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.Uranus-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'UranusCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(12)'),
        costElem: document.querySelector('.Saturn-cost'),
        levelElem: document.querySelector('.Saturn-level'),
        increaseElem: document.querySelector('.Saturn-increase'),
        cost: parseFloat(document.querySelector('.Saturn-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.Saturn-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'SaturnCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(13)'),
        costElem: document.querySelector('.Jupiter-cost'),
        levelElem: document.querySelector('.Jupiter-level'),
        increaseElem: document.querySelector('.Jupiter-increase'),
        cost: parseFloat(document.querySelector('.Jupiter-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.Jupiter-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'JupiterCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(14)'),
        costElem: document.querySelector('.Sun-cost'),
        levelElem: document.querySelector('.Sun-level'),
        increaseElem: document.querySelector('.Sun-increase'),
        cost: parseFloat(document.querySelector('.Sun-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.Sun-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'SunCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(15)'),
        costElem: document.querySelector('.Blackhole-cost'),
        levelElem: document.querySelector('.Blackhole-level'),
        increaseElem: document.querySelector('.Blackhole-increase'),
        cost: parseFloat(document.querySelector('.Blackhole-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.Blackhole-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'BlackholeCPS',
        baseIncreaseDivisor: 20
    },
];

upgrades.forEach(upg => {
    upg.costElem.innerHTML = formatNumber(upg.cost);
});


let infoBox = document.createElement('div');
infoBox.className = 'next-level-info';
infoBox.style.position = 'absolute';
infoBox.style.display = 'none';
infoBox.style.pointerEvents = 'none';
document.body.appendChild(infoBox);

let rebirthCount = 0;
let rebirthBonus = 0;

function resetGame() {
    rebirthCount++;
    rebirthBonus = 0.1 * rebirthCount;

    parsedcoin = 0;
    cpc = 1;

    for (let key in cpsVars) {
        cpsVars[key] = 0;
    }

    document.body.style.backgroundImage = "url('./assets/background.jpg')";
    document.body.style.backgroundSize = "cover";

    upgrades.forEach(upg => {
        upg.level = 0;
        upg.cost = upg.baseCost;
        upg.levelElem.innerHTML = 0;
        upg.costElem.innerHTML = formatNumber(upg.cost);
        upg.increaseElem.innerHTML = 0;
    });

    coin.innerHTML = formatNumber(parsedcoin);
    cpctext.innerHTML = formatNumber(cpc);

    let totalCPS = Object.values(cpsVars).reduce((a, b) => a + b, 0);
    totalCPS *= (1 + rebirthBonus);
    cpstext.innerHTML = formatNumber(totalCPS);

    rebirthstext.innerHTML = rebirthCount;

    const btn = document.getElementById("upgradeButton");
    if (btn) btn.remove();

    alert(`Rebirth voltooid! Je krijgt een bonus van +${rebirthBonus * 100}% CPS.`);
}



function showButton() {
    if (!document.getElementById("upgradeButton")) {
        const button = document.createElement("button");
        button.id = "upgradeButton";
        button.textContent = "rebirth";
        button.onclick = resetGame;
        document.body.appendChild(button);
    }
}
// CLICK & HOVER LOGICA
upgrades.forEach(upg => {
    upg.elem.addEventListener('click', () => {
        if (parsedcoin >= upg.cost) {
            let increase = Math.round(upg.cost / upg.baseIncreaseDivisor);
            if (increase < 1) increase = 1;

            parsedcoin -= upg.cost;
            upg.level++;
            upg.levelElem.innerHTML = upg.level;

            // Background changes
            if (upg.cpsVar === 'bankCPS' && upg.level === 1) {
                document.body.style.backgroundImage = "url('./assets/city-background.png')";
                document.body.style.backgroundSize = "cover";
            } else if (upg.cpsVar === 'MercuryCPS' && upg.level === 1) {
                document.body.style.backgroundImage = "url('./assets/planets.png')";
                document.body.style.backgroundSize = "cover";
            } else if (upg.cpsVar === 'BlackholeCPS' && upg.level === 1) {
                document.body.style.backgroundImage = "url('./assets/blackhole-background.jpeg')";
                document.body.style.backgroundSize = "cover";
                showButton();
            }

            // Update values
            if (upg.type === 'click') {
                cpc += increase;
                upg.increaseElem.innerHTML = formatNumber(cpc);
            } else {
                cpsVars[upg.cpsVar] += increase;
                upg.increaseElem.innerHTML = formatNumber(cpsVars[upg.cpsVar] + rebirthBonus);
            }

            // Increase cost
            upg.cost *= 1.2;
            upg.costElem.innerHTML = formatNumber(upg.cost);

        } else {
            warning.style.display = "block";
            setTimeout(() => warning.style.display = "none", 2000);
        }
    });


    // Hover tooltip
    upg.elem.addEventListener('mouseenter', () => {
        infoBox.style.display = 'block';

        function updateInfo() {
            const rect = upg.elem.getBoundingClientRect();
            infoBox.style.top = `${rect.top}px`;
            infoBox.style.left = `${rect.right + 10}px`;

            let nextIncrease = Math.round(upg.cost / upg.baseIncreaseDivisor);
            if (nextIncrease < 1) nextIncrease = 1;

            infoBox.innerHTML = `Volgende: +${formatNumber(nextIncrease)} coins`;

            requestAnimationFrame(updateInfo);
        }

        requestAnimationFrame(updateInfo);

        upg.elem.addEventListener('mouseleave', () => {
            infoBox.style.display = 'none';
        }, { once: true });
    });
});


// ----- AUTO-UPDATE COINS PER SECOND -----
let lastTime = performance.now();
function update(time) {
    let delta = (time - lastTime) / 1000;
    lastTime = time;

    let totalCPS = Object.values(cpsVars).reduce((a, b) => a + b, 0);
    totalCPS *= (1 + rebirthBonus);
    parsedcoin += totalCPS * delta;

    coin.innerHTML = formatNumber(parsedcoin);
    cpctext.innerHTML = formatNumber(cpc);
    cpstext.innerHTML = formatNumber(totalCPS);

    upgrades.forEach(upg => {
        if (upg.type === 'cps') {
            upg.increaseElem.innerHTML = formatNumber(cpsVars[upg.cpsVar] * (1 + rebirthBonus));
        } else {
            upg.increaseElem.innerHTML = formatNumber(cpc);
        }
    });

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
