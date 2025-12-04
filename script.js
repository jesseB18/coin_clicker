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
    DimensionalPortalCPS: 0,
    AstralForgeCPS: 0,
    CosmicTreasuryCPS: 0,
    CosmicArchiveCPS: 0,
    UniversalCurrencyCPS: 0,
};

let rebirthCount = 0;
let rebirthBonus = 0;
let initialBackground = "url('./assets/background.jpg')";
let rebirthBoostText = document.querySelector('#rebirth-boost');
function normalizeBackgroundString(bg) {
    if (!bg || typeof bg !== 'string') return bg;
    const match = bg.match(/url\((['"]?)(.*)\1\)/);
    if (!match) return bg;
    let inner = match[2];
    inner = inner.replace(/\.jpeg$/i, '.jpg');
    inner = inner.replace(/\.JPEG$/i, '.jpg');
    return `url('${inner}')`;
}

function formatNumber(num) {
    if (num >= 1e39) return (num / 1e39).toFixed(1) + ' tredecillion';
    if (num >= 1e36) return (num / 1e36).toFixed(1) + ' undecillion';
    if (num >= 1e33) return (num / 1e33).toFixed(1) + ' decillion';
    if (num >= 1e30) return (num / 1e30).toFixed(1) + ' nonillion';
    if (num >= 1e27) return (num / 1e27).toFixed(1) + ' octillion';
    if (num >= 1e24) return (num / 1e24).toFixed(1) + ' septillion';
    if (num >= 1e21) return (num / 1e21).toFixed(1) + ' sextillion';
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
    
    const coin_img = document.createElement('img');
    coin_img.src = './assets/coin.png';
    coin_img.style.cssText = `
        position: absolute;
        width: 30px;
        height: 30px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(coin_img);
    coin_img.classList.add('fade-down-arc');
    setTimeout(() => coin_img.remove(), 800);
    document.body.appendChild(div);
        div.classList.add('fade-up');
    setTimeout(() => div.remove(), 800);
};
document.querySelector('.coin-img').addEventListener('click', incrementCoin);
const upgradeConfigs = [
    { name: 'clicker', cost: 10, type: 'click', baseIncreaseDivisor: 50, diminishing: true },
    { name: 'creditcard', cost: 100, type: 'cps', cpsVar: 'creditcardCPS', baseIncreaseDivisor: 10, maxLevel: 100 },
    { name: 'moneyprinter', cost: 1000, type: 'cps', cpsVar: 'moneyprinterCPS', baseIncreaseDivisor: 10, maxLevel: 100 },
    { name: 'bank', cost: 10000, type: 'cps', cpsVar: 'bankCPS', baseIncreaseDivisor: 10, maxLevel: 100 },
    { name: 'multinational_company', cost: 100000, type: 'cps', cpsVar: 'multinational_companyCPS', baseIncreaseDivisor: 10, maxLevel: 100 },
    { name: 'world_company', cost: 1000000, type: 'cps', cpsVar: 'world_companyCPS', baseIncreaseDivisor: 10, maxLevel: 100 },
    { name: 'Mercury', cost: 10000000, type: 'cps', cpsVar: 'MercuryCPS', baseIncreaseDivisor: 9, maxLevel: 100 },
    { name: 'Mars', cost: 100000000, type: 'cps', cpsVar: 'MarsCPS', baseIncreaseDivisor: 8, maxLevel: 100 },
    { name: 'Venus', cost: 1000000000, type: 'cps', cpsVar: 'VenusCPS', baseIncreaseDivisor: 7, maxLevel: 100 },
    { name: 'Neptune', cost: 10000000000, type: 'cps', cpsVar: 'NeptuneCPS', baseIncreaseDivisor: 6, maxLevel: 100 },
    { name: 'Uranus', cost: 100000000000, type: 'cps', cpsVar: 'UranusCPS', baseIncreaseDivisor: 5, maxLevel: 100 },
    { name: 'Saturn', cost: 1000000000000, type: 'cps', cpsVar: 'SaturnCPS', baseIncreaseDivisor: 5, maxLevel: 100 },
    { name: 'Jupiter', cost: 10000000000000, type: 'cps', cpsVar: 'JupiterCPS', baseIncreaseDivisor: 5, maxLevel: 100 },
    { name: 'Sun', cost: 100000000000000, type: 'cps', cpsVar: 'SunCPS', baseIncreaseDivisor: 5, maxLevel: 100 },
    { name: 'Blackhole', cost: 1000000000000000, type: 'cps', cpsVar: 'BlackholeCPS', baseIncreaseDivisor: 5, diminishing: true },
    { name: 'DimensionalPortal', cost: 10000000000000000, type: 'cps', cpsVar: 'DimensionalPortalCPS', baseIncreaseDivisor: 5, maxLevel: 50 },
    { name: 'AstralForge', cost: 100000000000000000, type: 'cps', cpsVar: 'AstralForgeCPS', baseIncreaseDivisor: 5, maxLevel: 50 },
    { name: 'CosmicTreasury', cost: 1000000000000000000, type: 'cps', cpsVar: 'CosmicTreasuryCPS', baseIncreaseDivisor: 5, maxLevel: 50 },
    { name: 'CosmicArchive', cost: 10000000000000000000, type: 'cps', cpsVar: 'CosmicArchiveCPS', baseIncreaseDivisor: 5, maxLevel: 50 },
    { name: 'UniversalCurrency', cost: 100000000000000000000, type: 'cps', cpsVar: 'UniversalCurrencyCPS', baseIncreaseDivisor: 5, maxLevel: 50},
];
const upgrades = upgradeConfigs.map(cfg => {
    const elem = document.querySelector(`.upgrade.${cfg.name}`);
    const costElem = elem ? elem.querySelector(`.${cfg.name}-cost`) : null;
    const levelElem = elem ? elem.querySelector(`.${cfg.name}-level`) : null;
    const increaseElem = elem ? elem.querySelector(`.${cfg.name}-increase`) : null;
    if (!elem) console.warn(`Upgrade element not found for: ${cfg.name}`);
    return {
        ...cfg,
        elem,
        costElem,
        levelElem,
        increaseElem,
        cost: cfg.cost,
        baseCost: cfg.cost,
        level: 0
    };
});
let infoBox = document.createElement('div');
infoBox.className = 'next-level-info';
infoBox.style.position = 'absolute';
infoBox.style.display = 'none';
infoBox.style.pointerEvents = 'none';
document.body.appendChild(infoBox);
function resetGame() {
    const blackholeUpg = upgrades.find(u => u.cpsVar === "BlackholeCPS");
    const blackholeLevel = blackholeUpg ? blackholeUpg.level : 0;

    rebirthBonus += blackholeLevel * 0.01;
    rebirthCount++;
    parsedcoin = 0;
    cpc = 1;
    for (let key in cpsVars) cpsVars[key] = 0;

    document.body.style.backgroundImage = initialBackground;
    document.body.style.backgroundSize = "cover";

    upgrades.forEach(upg => {
        upg.level = 0;
        upg.cost = upg.baseCost;
        if (upg.levelElem) upg.levelElem.innerHTML = 0;
        if (upg.costElem) upg.costElem.innerHTML = formatNumber(upg.baseCost);
        if (upg.increaseElem) upg.increaseElem.innerHTML = "0";
    });

    coin.innerHTML = formatNumber(parsedcoin);
    cpctext.innerHTML = formatNumber(cpc);
    cpstext.innerHTML = formatNumber(0);
    rebirthstext.innerHTML = rebirthCount;
    updateRebirthBoostDisplay();

    const btn = document.getElementById("upgradeButton");
    if (btn) btn.remove();

    alert(`Rebirth voltooid! Je Blackhole level gaf een bonus van +${blackholeLevel}%!`);
    saveGame();
}

function showButton() {
    const popup = document.querySelector('.popup');
    if (!document.getElementById("upgradeButton")) {
        const button = document.createElement("button");
        button.id = "upgradeButton";
        button.textContent = "rebirth";
        button.onclick = () => {
            const blackholeUpg = upgrades.find(u => u.cpsVar === "BlackholeCPS");
            const blackholeLevel = blackholeUpg ? blackholeUpg.level : 0;
            const bonusText = `+${blackholeLevel}%`;
            const blackholeEl = document.getElementById("blackhole-bonus");
            if (blackholeEl) blackholeEl.textContent = bonusText;
            popup.style.display = 'flex';
        };
        document.body.appendChild(button);
    }

    const jaKnop = popup.querySelector('.ja');
    const neeKnop = popup.querySelector('.nee');
    jaKnop.addEventListener('click', () => {
        resetGame();
        popup.style.display = 'none';
    });
    neeKnop.addEventListener('click', () => {
        popup.style.display = 'none';
    });
}

// --- Upgrade clicks ---
upgrades.forEach(upg => {
    if (!upg.elem) return;
    upg.elem.addEventListener('click', () => {
        if (upg.maxLevel && upg.level >= upg.maxLevel) {
            warning.innerHTML = "Deze upgrade is maximaal!";
            warning.style.display = "block";
            setTimeout(() => warning.style.display = "none", 2000);
            return;
        }
        if (parsedcoin < upg.cost) {
            warning.innerHTML = "Niet genoeg coins!";
            warning.style.display = "block";
            setTimeout(() => warning.style.display = "none", 2000);
            return;
        }

        let increase = upg.cost / upg.baseIncreaseDivisor;
        if (upg.diminishing) increase /= (1 + upg.level * 0.05);
        increase = Math.max(1, Math.round(increase));

        parsedcoin -= upg.cost;
        upg.level++;
        upg.levelElem.innerHTML = upg.level;

        if (upg.type === 'click') {
            cpc += increase;
            if (upg.increaseElem) upg.increaseElem.innerHTML = formatNumber(cpc);
        } else {
            cpsVars[upg.cpsVar] += increase;
            if (upg.increaseElem) upg.increaseElem.innerHTML = formatNumber(cpsVars[upg.cpsVar] * (1 + rebirthBonus));
        }

        upg.cost *= 1.2;
        upg.costElem.innerHTML = formatNumber(upg.cost);
        if (upg.cpsVar === 'bankCPS' && upg.level === 1) document.body.style.backgroundImage = "url('./assets/city-background.png')";
        else if (upg.cpsVar === 'MercuryCPS' && upg.level === 1) document.body.style.backgroundImage = "url('./assets/planets.png')";
        else if (upg.cpsVar === 'BlackholeCPS' && upg.level === 1) {
            document.body.style.backgroundImage = "url('./assets/blackhole-background.jpg')";
            showButton();
        }
        document.body.style.backgroundSize = "cover";
    });
});
upgrades.forEach(upg => {
    if (!upg.elem) return;
    let rafId;
    upg.elem.addEventListener('mouseenter', () => {
        infoBox.style.display = 'block';
        function updateInfo() {
            const rect = upg.elem.getBoundingClientRect();
            infoBox.style.top = `${rect.top}px`;
            infoBox.style.left = `${rect.right + 10}px`;
            let nextIncrease = upg.cost / upg.baseIncreaseDivisor;
            if (upg.diminishing) nextIncrease /= (1 + upg.level * 0.05);
            nextIncrease = Math.max(1, Math.round(nextIncrease));
            infoBox.innerHTML = upg.type === 'click' ? `Volgende: +${formatNumber(nextIncrease)} cpc` : `Volgende: +${formatNumber(nextIncrease)} cps`;
            rafId = requestAnimationFrame(updateInfo);
        }
        rafId = requestAnimationFrame(updateInfo);
    });
    upg.elem.addEventListener('mouseleave', () => {
        infoBox.style.display = 'none';
        cancelAnimationFrame(rafId);
    });
});
let lastTime = performance.now();
function update(time) {
    let delta = (time - lastTime) / 1000;
    lastTime = time;
    let totalCPS = Object.values(cpsVars).reduce((a, b) => a + b, 0) * (1 + rebirthBonus);
    parsedcoin += totalCPS * delta;
    coin.innerHTML = formatNumber(parsedcoin);
    cpctext.innerHTML = formatNumber(cpc);
    cpstext.innerHTML = formatNumber(totalCPS);
    upgrades.forEach(upg => {
        if (upg.increaseElem) {
            if (upg.type === 'cps') upg.increaseElem.innerHTML = formatNumber(cpsVars[upg.cpsVar] * (1 + rebirthBonus));
            else upg.increaseElem.innerHTML = formatNumber(cpc);
        }
    });
    requestAnimationFrame(update);
}
requestAnimationFrame(update);
function saveGame() {
    const saveData = {
        parsedcoin,
        cpc,
        cpsVars,
        rebirthCount,
        rebirthBonus,
        background: normalizeBackgroundString(document.body.style.backgroundImage),
        upgrades: upgrades.map(u => ({ level: u.level, cost: u.cost }))
    };
    localStorage.setItem("clickerSave", JSON.stringify(saveData));
}
setInterval(saveGame, 100);

function loadGame() {
    const data = localStorage.getItem("clickerSave");
    if (!data) return;
    const save = JSON.parse(data);
    parsedcoin = save.parsedcoin;
    cpc = save.cpc;
    Object.assign(cpsVars, save.cpsVars);
    rebirthCount = save.rebirthCount;
    rebirthBonus = save.rebirthBonus;
    if (save.background) {
        document.body.style.backgroundImage = normalizeBackgroundString(save.background);
        document.body.style.backgroundSize = "cover";
    }
    save.upgrades.forEach((s, i) => {
        const upg = upgrades[i];
        if (!upg) return;
        upg.level = s.level;
        upg.cost = s.cost;
        if (upg.levelElem) upg.levelElem.innerHTML = s.level;
        if (upg.costElem) upg.costElem.innerHTML = formatNumber(s.cost);
        if (upg.increaseElem) {
            if (upg.type === "click") upg.increaseElem.innerHTML = formatNumber(cpc);
            else upg.increaseElem.innerHTML = formatNumber(cpsVars[upg.cpsVar] * (1 + rebirthBonus));
        }
    });
    if (upgrades[14] && upgrades[14].level >= 1) showButton();
    coin.innerHTML = formatNumber(parsedcoin);
    cpctext.innerHTML = formatNumber(cpc);
    cpstext.innerHTML = formatNumber(Object.values(cpsVars).reduce((a, b) => a + b, 0) * (1 + rebirthBonus));
    rebirthstext.innerHTML = rebirthCount;
    updateRebirthBoostDisplay();
}
function updateRebirthBoostDisplay() {
    const pct = Math.round(rebirthBonus * 100);
    const text = `+${pct}%`;
    const blackholeEl = document.getElementById("blackhole-bonus");
    if (blackholeEl) blackholeEl.textContent = text;
    if (rebirthBoostText) rebirthBoostText.textContent = text;
}
updateRebirthBoostDisplay();
loadGame();
