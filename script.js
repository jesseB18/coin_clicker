// ===================================
// GAME VARIABELEN
// ===================================

// DOM elementen
let coin = document.querySelector('.coins');
let warning = document.getElementById("warning");
let cpctext = document.querySelector('#cpc-text');
let cpstext = document.querySelector('#cps-text');
let rebirthstext = document.querySelector('#rebirths-text');
let rebirthBoostText = document.querySelector('#rebirth-boost');

// Game stats
let parsedcoin = parseFloat(coin.innerHTML);
let cpc = 1; // Coins per click
let rebirthCount = 0;
let rebirthBonus = 0;
let purchasedUpgrades = []; // Array om gekochte shop upgrades op te slaan
let cpcMultiplier = 1; // Extra CPC multiplier van shop upgrades
let cpsMultiplier = 1; // Extra CPS multiplier van shop upgrades
window.phoenixMultiplier = 1; // Phoenix multiplier voor rebirth bonus

// Background settings
let initialBackground = "url('./assets/background.jpg')";

// CPS (Coins per second) voor elke upgrade
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

// ===================================
// UTILITY FUNCTIES
// ===================================

// Zet grote getallen om naar leesbare tekst (bijv. 1000000 -> "1.0 million")
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

// Normaliseert background URL voor opslaan/laden
function normalizeBackgroundString(bg) {
    if (!bg || typeof bg !== 'string') return initialBackground;
    
    const match = bg.match(/url\(['"]?(.+?)['"]?\)/);
    if (!match) return initialBackground;
    
    let path = match[1];
    
    // Zet absolute URL om naar relatieve URL
    if (path.includes('/assets/')) {
        path = path.substring(path.indexOf('/assets/'));
        path = '.' + path;
    }
    
    // Normaliseer extensie
    path = path.replace(/\.jpeg$/i, '.jpg');
    
    return `url('${path}')`;
}

// ===================================
// COIN CLICK FUNCTIE
// ===================================

window.incrementCoin = function (event) {
    // Voeg coins toe met CPC multiplier
    const totalCPC = cpc * cpcMultiplier;
    parsedcoin += totalCPC;
    coin.innerHTML = formatNumber(parsedcoin);

    // Maak +coins animatie tekst
    const div = document.createElement('div');
    div.innerHTML = `+${formatNumber(totalCPC)}`;
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
    
    // Maak coin afbeelding animatie
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
    
    // Voeg elementen toe en verwijder ze na animatie
    document.body.appendChild(coin_img);
    coin_img.classList.add('fade-down-arc');
    setTimeout(() => coin_img.remove(), 800);
    
    document.body.appendChild(div);
    div.classList.add('fade-up');
    setTimeout(() => div.remove(), 800);
};

// Koppel click event aan coin afbeelding
document.querySelector('.coin-img').addEventListener('click', incrementCoin);

// ===================================
// UPGRADE CONFIGURATIE
// ===================================

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

// Maak upgrade objecten met HTML elementen
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

// Zet initiële kosten in HTML
upgrades.forEach(upg => {
    if (upg.costElem) upg.costElem.innerHTML = formatNumber(upg.cost);
});

// ===================================
// INFO BOX (hover over upgrade)
// ===================================

let infoBox = document.createElement('div');
infoBox.className = 'next-level-info';
infoBox.style.position = 'absolute';
infoBox.style.display = 'none';
infoBox.style.pointerEvents = 'none';
document.body.appendChild(infoBox);

// ===================================
// REBIRTH FUNCTIES
// ===================================

function resetGame() {
    // Haal Blackhole level op voor bonus berekening
    const blackholeUpg = upgrades.find(u => u.cpsVar === "BlackholeCPS");
    const blackholeLevel = blackholeUpg ? blackholeUpg.level : 0;

    // Bereken rebirth bonus (Phoenix multiplier beïnvloedt dit NIET)
    const bonusIncrease = blackholeLevel * 0.01;
    rebirthBonus += bonusIncrease;
    
    // Phoenix upgrade: verdubbelt hoeveel rebirths je KRIJGT per rebirth
    const rebirthsGained = window.phoenixMultiplier || 1;
    rebirthCount += rebirthsGained;
    
    // Reset game stats
    parsedcoin = 0;
    cpc = 1;
    for (let key in cpsVars) cpsVars[key] = 0;

    // Reset achtergrond
    document.body.style.backgroundImage = initialBackground;
    document.body.style.backgroundSize = "cover";

    // Reset alle upgrades
    upgrades.forEach(upg => {
        upg.level = 0;
        upg.cost = upg.baseCost;
        if (upg.levelElem) upg.levelElem.innerHTML = 0;
        if (upg.costElem) upg.costElem.innerHTML = formatNumber(upg.baseCost);
        if (upg.increaseElem) upg.increaseElem.innerHTML = "0";
    });

    // Update UI
    coin.innerHTML = formatNumber(parsedcoin);
    cpctext.innerHTML = formatNumber(cpc * cpcMultiplier);
    cpstext.innerHTML = formatNumber(0);
    rebirthstext.innerHTML = rebirthCount;
    updateRebirthBoostDisplay();

    // Verwijder rebirth knop
    const btn = document.getElementById("upgradeButton");
    if (btn) btn.remove();

    const phoenixText = window.phoenixMultiplier > 1 ? ` Je kreeg ${rebirthsGained} rebirths (Phoenix bonus!)` : '';
    alert(`Rebirth voltooid! Je Blackhole level gaf een bonus van +${Math.round(bonusIncrease * 100)}%.${phoenixText}`);
    saveGame();
}

function showButton() {
    const popup = document.querySelector('.popup');
    
    // Maak rebirth knop aan (als die nog niet bestaat)
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

    // Koppel popup knoppen
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

function updateRebirthBoostDisplay() {
    const pct = Math.round(rebirthBonus * 100);
    const text = `+${pct}%`;
    const blackholeEl = document.getElementById("blackhole-bonus");
    if (blackholeEl) blackholeEl.textContent = text;
    if (rebirthBoostText) rebirthBoostText.textContent = text;
}

// ===================================
// UPGRADE CLICK EVENTS
// ===================================

upgrades.forEach(upg => {
    if (!upg.elem) return;
    
    upg.elem.addEventListener('click', () => {
        // Check of upgrade max level heeft bereikt
        if (upg.maxLevel && upg.level >= upg.maxLevel) {
            warning.innerHTML = "Deze upgrade is maximaal!";
            warning.style.display = "block";
            setTimeout(() => warning.style.display = "none", 2000);
            return;
        }
        
        // Check of speler genoeg coins heeft
        if (parsedcoin < upg.cost) {
            warning.innerHTML = "Niet genoeg coins!";
            warning.style.display = "block";
            setTimeout(() => warning.style.display = "none", 2000);
            return;
        }

        // Bereken hoeveel CPC/CPS deze upgrade geeft
        let increase = upg.cost / upg.baseIncreaseDivisor;
        if (upg.diminishing) increase /= (1 + upg.level * 0.05);
        increase = Math.max(1, Math.round(increase));

        // Trek kosten af en verhoog level
        parsedcoin -= upg.cost;
        upg.level++;
        upg.levelElem.innerHTML = upg.level;

        // Update CPC of CPS
        if (upg.type === 'click') {
            cpc += increase;
            if (upg.increaseElem) upg.increaseElem.innerHTML = formatNumber(cpc * cpcMultiplier);
        } else {
            cpsVars[upg.cpsVar] += increase;
            if (upg.increaseElem) upg.increaseElem.innerHTML = formatNumber(cpsVars[upg.cpsVar] * (1 + rebirthBonus) * cpsMultiplier);
        }

        // Verhoog kosten voor volgende level
        upg.cost *= 1.2;
        upg.costElem.innerHTML = formatNumber(upg.cost);
        
        // Speciale acties voor bepaalde upgrades
        if (upg.name === 'bank' && upg.level === 1) {
            document.body.style.backgroundImage = "url('./assets/city-background.png')";
            document.body.style.backgroundSize = "cover";
        } else if (upg.name === 'Mercury' && upg.level === 1) {
            document.body.style.backgroundImage = "url('./assets/planets.png')";
            document.body.style.backgroundSize = "cover";
        } else if (upg.name === 'Blackhole' && upg.level === 1) {
            document.body.style.backgroundImage = "url('./assets/blackhole-background.jpeg')";
            document.body.style.backgroundSize = "cover";
            showButton();
        }
    });
});

// ===================================
// UPGRADE HOVER EVENTS (info box)
// ===================================

upgrades.forEach(upg => {
    if (!upg.elem) return;
    let rafId;
    
    upg.elem.addEventListener('mouseenter', () => {
        infoBox.style.display = 'block';
        
        function updateInfo() {
            const rect = upg.elem.getBoundingClientRect();
            infoBox.style.top = `${rect.top}px`;
            infoBox.style.left = `${rect.right + 10}px`;
            
            // Bereken wat volgende level geeft (base)
            let nextIncrease = upg.cost / upg.baseIncreaseDivisor;
            if (upg.diminishing) nextIncrease /= (1 + upg.level * 0.05);
            nextIncrease = Math.max(1, Math.round(nextIncrease));
            
            if (upg.type === 'click') {
                // Voor CPC upgrades
                let baseCPC = cpc;
                let boostedCPC = cpc * cpcMultiplier;
                infoBox.innerHTML = `
                    Volgende: +${formatNumber(nextIncrease)} cpc<br>
                    Base CPC: ${formatNumber(baseCPC)}<br>
                    Totaal CPC: ${formatNumber(boostedCPC)}
                `;
            } else {
                // Voor CPS upgrades - pas ALLE boosts toe
                let nextIncreaseBoosted = Math.round(nextIncrease * (1 + rebirthBonus) * cpsMultiplier);
                let baseCPS = cpsVars[upg.cpsVar];
                let boostedCPS = baseCPS * (1 + rebirthBonus) * cpsMultiplier;
                infoBox.innerHTML = `
                    Volgende: +${formatNumber(nextIncreaseBoosted)} cps<br>
                    Base CPS: ${formatNumber(baseCPS)}<br>
                    Met boost: ${formatNumber(boostedCPS)}
                `;
            }
            
            rafId = requestAnimationFrame(updateInfo);
        }
        rafId = requestAnimationFrame(updateInfo);
    });
    
    upg.elem.addEventListener('mouseleave', () => {
        infoBox.style.display = 'none';
        cancelAnimationFrame(rafId);
    });
});

// ===================================
// REBIRTH SHOP POPUP
// ===================================

const rebirthShopBtn = document.getElementById('rebirthShopBtn');
const shopPopup = document.getElementById('shopPopup');
const shopCloseBtn = document.getElementById('shopCloseBtn');
const shopBuyBtn = document.getElementById('shopbuyBtn');

// Info box elementen
const infoBoxElement = document.getElementById('info-box');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');

let selectedUpgrade = null;

// Open shop popup
if (rebirthShopBtn && shopPopup) {
    rebirthShopBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        shopPopup.style.display = 'flex';
        infoBoxElement.style.display = 'block'; // Toon info box
        setTimeout(() => shopPopup.classList.add('active'), 10);
    });
} else {
    console.error('Shop elements not found!');
}

// Sluit shop popup
if (shopCloseBtn && shopPopup) {
    shopCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        shopPopup.classList.remove('active');
        setTimeout(() => shopPopup.style.display = 'none', 10);
        infoBoxElement.style.display = 'none'; // Verberg info box
        selectedUpgrade = null;
        // Reset info box
        infoTitle.textContent = 'Selecteer een upgrade';
        infoDesc.innerHTML = 'Klik op een item om info te zien.';
    });
}

// Buy knop in shop
if (shopBuyBtn && shopPopup) {
    shopBuyBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!selectedUpgrade) {
            showGameNotification('Selecteer eerst een upgrade!', 'error');
            return;
        }
        
        const upgradeId = selectedUpgrade.id;
        const price = parseInt(selectedUpgrade.dataset.price);
        const upgradeName = selectedUpgrade.dataset.title;
        const effect = selectedUpgrade.dataset.effect;
        
        // Check of upgrade al is gekocht
        if (purchasedUpgrades.includes(upgradeId)) {
            showGameNotification('Je hebt deze upgrade al gekocht!', 'error');
            return;
        }
        
        // Check of speler genoeg rebirths heeft
        if (rebirthCount < price) {
            showGameNotification(`Je hebt ${price} rebirths nodig! Je hebt er ${rebirthCount}.`, 'error');
            return;
        }
        
        // Trek rebirths af
        rebirthCount -= price;
        rebirthstext.innerHTML = rebirthCount;
        
        // Voeg upgrade toe aan gekochte lijst
        purchasedUpgrades.push(upgradeId);
        
        // Pas upgrade effect toe
        applyUpgradeEffect(effect);
        
        // Markeer upgrade als gekocht in UI
        selectedUpgrade.style.opacity = '0.5';
        selectedUpgrade.style.pointerEvents = 'none';
        selectedUpgrade.innerHTML += '<br><span style="color: lime;">✓ GEKOCHT</span>';
        
        // Toon succes melding
        showGameNotification(`${upgradeName} gekocht!`, 'success');
        
        // Sla game op
        saveGame();
        
        // Sluit shop
        shopPopup.classList.remove('active');
        setTimeout(() => shopPopup.style.display = 'none', 10);
        infoBoxElement.style.display = 'none';
        selectedUpgrade = null;
    });
}

// Functie om upgrade effecten toe te passen
function applyUpgradeEffect(effect) {
    switch(effect) {
        case 'doubleUpgrade':
            // Power of the Phoenix: Verdubbelt de BONUS die je krijgt bij rebirth
            // Dit betekent dat je blackhole bonus 2x zoveel waard is
            window.phoenixMultiplier = 2;
            break;
            
        case 'cpcBoost':
            // +100% CPC
            cpcMultiplier += 1.0;
            break;
            
        case 'cpsBoost':
            // +50% CPS
            cpsMultiplier += 0.5;
            break;
    }
}

// Functie om mooie game notificaties te tonen (zoals je oude code)
function showGameNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'game-notification';
    
    if (type === 'success') {
        notification.style.backgroundColor = 'rgba(76, 175, 80, 0.95)';
        notification.innerHTML = `✓ ${message}`;
    } else if (type === 'error') {
        notification.style.backgroundColor = 'rgba(244, 67, 54, 0.95)';
        notification.innerHTML = `✗ ${message}`;
    }
    
    document.body.appendChild(notification);
    
    // Animatie
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Verwijder na 2.5 seconden
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Maak shop menu items klikbaar
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach((item) => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Verwijder 'selected' class van alle items
        menuItems.forEach(i => i.classList.remove('selected'));
        
        // Voeg 'selected' class toe aan geklikte item
        item.classList.add('selected');
        selectedUpgrade = item;
        
        // Update info box met data van het item
        const title = item.dataset.title;
        const desc = item.dataset.desc;
        const price = item.dataset.price;
        
        infoTitle.textContent = title;
        infoDesc.innerHTML = `${desc}<br><br><strong>Prijs: ${price} rebirths</strong>`;
        
        console.log('Upgrade geselecteerd:', title);
    });
});

// Sluit popup bij klikken buiten content
if (shopPopup) {
    shopPopup.addEventListener('click', function(e) {
        if (e.target === shopPopup) {
            shopPopup.classList.remove('active');
            setTimeout(() => shopPopup.style.display = 'none', 10);
            infoBoxElement.style.display = 'none'; // Verberg info box
            selectedUpgrade = null;
            // Reset info box
            infoTitle.textContent = 'Selecteer een upgrade';
            infoDesc.innerHTML = 'Klik op een item om info te zien.';
        }
    });
}

// ===================================
// GAME LOOP (Update functie)
// ===================================

let lastTime = performance.now();

function update(time) {
    // Bereken tijd sinds laatste frame
    let delta = (time - lastTime) / 1000;
    lastTime = time;
    
    // Bereken totale CPS met multipliers en voeg coins toe
    let baseTotalCPS = Object.values(cpsVars).reduce((a, b) => a + b, 0);
    let totalCPS = baseTotalCPS * (1 + rebirthBonus) * cpsMultiplier;
    parsedcoin += totalCPS * delta;
    
    // Update UI
    coin.innerHTML = formatNumber(parsedcoin);
    cpctext.innerHTML = formatNumber(cpc * cpcMultiplier);
    cpstext.innerHTML = formatNumber(totalCPS);
    
    // Update alle upgrade CPS displays
    upgrades.forEach(upg => {
        if (upg.increaseElem) {
            if (upg.type === 'cps') {
                upg.increaseElem.innerHTML = formatNumber(cpsVars[upg.cpsVar] * (1 + rebirthBonus) * cpsMultiplier);
            } else {
                upg.increaseElem.innerHTML = formatNumber(cpc * cpcMultiplier);
            }
        }
    });
    
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

// ===================================
// SAVE & LOAD FUNCTIES
// ===================================

function saveGame() {
    const saveData = {
        parsedcoin,
        cpc,
        cpsVars,
        rebirthCount,
        rebirthBonus,
        purchasedUpgrades,
        cpcMultiplier,
        cpsMultiplier,
        phoenixMultiplier: window.phoenixMultiplier || 1,
        background: normalizeBackgroundString(document.body.style.backgroundImage),
        upgrades: upgrades.map(u => ({ level: u.level, cost: u.cost }))
    };
    localStorage.setItem("clickerSave", JSON.stringify(saveData));
}

// Automatisch opslaan elke 100ms
setInterval(saveGame, 100);

function loadGame() {
    const data = localStorage.getItem("clickerSave");
    if (!data) return;
    
    const save = JSON.parse(data);
    
    // Laad game stats
    parsedcoin = save.parsedcoin;
    cpc = save.cpc;
    Object.assign(cpsVars, save.cpsVars);
    rebirthCount = save.rebirthCount;
    rebirthBonus = save.rebirthBonus;
    purchasedUpgrades = save.purchasedUpgrades || [];
    cpcMultiplier = save.cpcMultiplier || 1;
    cpsMultiplier = save.cpsMultiplier || 1;
    window.phoenixMultiplier = save.phoenixMultiplier || 1;
    
    // Laad achtergrond
    if (save.background) {
        document.body.style.backgroundImage = normalizeBackgroundString(save.background);
        document.body.style.backgroundSize = "cover";
    }
    
    // Laad alle upgrade levels en kosten
    save.upgrades.forEach((s, i) => {
        const upg = upgrades[i];
        if (!upg) return;
        
        upg.level = s.level;
        upg.cost = s.cost;
        
        if (upg.levelElem) upg.levelElem.innerHTML = s.level;
        if (upg.costElem) upg.costElem.innerHTML = formatNumber(s.cost);
        if (upg.increaseElem) {
            if (upg.type === "click") {
                upg.increaseElem.innerHTML = formatNumber(cpc * cpcMultiplier);
            } else {
                upg.increaseElem.innerHTML = formatNumber(cpsVars[upg.cpsVar] * (1 + rebirthBonus) * cpsMultiplier);
            }
        }
    });
    
    // Laat rebirth knop zien als Blackhole is gekocht
    if (upgrades[14] && upgrades[14].level >= 1) showButton();
    
    // Markeer gekochte shop upgrades
    purchasedUpgrades.forEach(upgradeId => {
        const upgradeElement = document.getElementById(upgradeId);
        if (upgradeElement) {
            upgradeElement.style.opacity = '0.5';
            upgradeElement.style.pointerEvents = 'none';
            if (!upgradeElement.innerHTML.includes('✓ GEKOCHT')) {
                upgradeElement.innerHTML += '<br><span style="color: lime;">✓ GEKOCHT</span>';
            }
        }
    });
    
    // Update UI
    coin.innerHTML = formatNumber(parsedcoin);
    cpctext.innerHTML = formatNumber(cpc * cpcMultiplier);
    cpstext.innerHTML = formatNumber(Object.values(cpsVars).reduce((a, b) => a + b, 0) * (1 + rebirthBonus) * cpsMultiplier);
    rebirthstext.innerHTML = rebirthCount;
    updateRebirthBoostDisplay();
}

// ===================================
// START GAME
// ===================================

updateRebirthBoostDisplay();
loadGame();