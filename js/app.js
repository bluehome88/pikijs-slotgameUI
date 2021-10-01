/* TODO: 
    - Textures:
    - add button choose stake and show current stake - > name stake
    - add showcase Total money  - > name balance
    - add showcase total win - > name win
    - add border to text/restyle
    - Methods:
    - Calculate total and left balance
     - Calculate number of wins
     - Win Logic
     - Stake logic
     - Add tweens pixi, tweens
*/

const app = new PIXI.Application(640, 360, {
    transparent: true,
    autoResize: true,
    antialias: true,
    resolution: 1,
});

document.body.appendChild(app.view);


class Resources {
    constructor(balance, stake, win) {
        this.balance = 500;
        this.stake = 1;
        this.win = 0;
        this.playing = false;
        this.addStake = function () {
            //Add stake with one point till it equals to three
            if (playerResources.stake >= 1 && playerResources.stake <= 2) {
                playerResources.stake ++;
            }
        };
        this.minusStake = function minusStake() {
            //Reduce stake one point till it equals to 1
            if (playerResources.stake > 1) {
                playerResources.stake --;
            }
        };
        this.reduceBalance = function (){
            //Reduce Balance when player prss on spin button
            this.balance = this.balance - this.stake;
        }
    }
}
let playerResources = new Resources();

const new_background = [ 
    "./assets/images/Background/Background_00000.png",
    "./assets/images/Background/Background_00001.png",
    "./assets/images/Background/Background_00002.png",
    "./assets/images/Background/Background_00003.png",
    "./assets/images/Background/Background_00004.png",
    "./assets/images/Background/Background_00005.png",
    "./assets/images/Background/Background_00006.png",
    "./assets/images/Background/Background_00007.png",
    "./assets/images/Background/Background_00008.png",
    "./assets/images/Background/Background_00009.png",
    "./assets/images/Background/Background_00010.png",
    "./assets/images/Background/Background_00011.png",
    "./assets/images/Background/Background_00012.png",
    "./assets/images/Background/Background_00013.png",
    "./assets/images/Background/Background_00014.png",
    "./assets/images/Background/Background_00015.png",
    "./assets/images/Background/Background_00016.png",
    "./assets/images/Background/Background_00017.png",
    "./assets/images/Background/Background_00018.png",
    "./assets/images/Background/Background_00019.png",
    "./assets/images/Background/Background_00020.png",
    "./assets/images/Background/Background_00021.png",
    "./assets/images/Background/Background_00022.png",
    "./assets/images/Background/Background_00023.png",
    "./assets/images/Background/Background_00024.png",
    "./assets/images/Background/Background_00025.png",
    "./assets/images/Background/Background_00026.png",
    "./assets/images/Background/Background_00027.png",
    "./assets/images/Background/Background_00028.png",
    "./assets/images/Background/Background_00029.png",
    "./assets/images/Background/Background_00030.png",
    "./assets/images/Background/Background_00031.png",
    "./assets/images/Background/Background_00032.png",
    "./assets/images/Background/Background_00033.png",
    "./assets/images/Background/Background_00034.png",
    "./assets/images/Background/Background_00035.png",
    "./assets/images/Background/Background_00036.png",
    "./assets/images/Background/Background_00037.png",
    "./assets/images/Background/Background_00038.png",
    "./assets/images/Background/Background_00039.png",
    "./assets/images/Background/Background_00040.png",
    "./assets/images/Background/Background_00041.png",
    "./assets/images/Background/Background_00042.png",
    "./assets/images/Background/Background_00043.png",
    "./assets/images/Background/Background_00044.png",
    "./assets/images/Background/Background_00045.png",
    "./assets/images/Background/Background_00046.png",
    "./assets/images/Background/Background_00047.png",
    "./assets/images/Background/Background_00048.png",
    "./assets/images/Background/Background_00049.png",
    "./assets/images/Background/Background_00050.png",
    "./assets/images/Background/Background_00051.png",
    "./assets/images/Background/Background_00052.png",
    "./assets/images/Background/Background_00053.png",
    "./assets/images/Background/Background_00054.png",
    "./assets/images/Background/Background_00055.png",
    "./assets/images/Background/Background_00056.png",
    "./assets/images/Background/Background_00057.png",
    "./assets/images/Background/Background_00058.png",
    "./assets/images/Background/Background_00059.png",
    "./assets/images/Background/Background_00060.png",
    "./assets/images/Background/Background_00061.png",
    "./assets/images/Background/Background_00062.png",
    "./assets/images/Background/Background_00063.png",
    "./assets/images/Background/Background_00064.png",
    "./assets/images/Background/Background_00065.png",
    "./assets/images/Background/Background_00066.png",
    "./assets/images/Background/Background_00067.png",
    "./assets/images/Background/Background_00068.png",
    "./assets/images/Background/Background_00069.png",
    "./assets/images/Background/Background_00070.png",
    "./assets/images/Background/Background_00071.png",
    "./assets/images/Background/Background_00072.png",
    "./assets/images/Background/Background_00073.png",
    "./assets/images/Background/Background_00074.png",
    "./assets/images/Background/Background_00075.png",
    "./assets/images/Background/Background_00076.png",
    "./assets/images/Background/Background_00077.png",
    "./assets/images/Background/Background_00078.png",
    "./assets/images/Background/Background_00079.png",
    "./assets/images/Background/Background_00080.png",
    "./assets/images/Background/Background_00081.png",
    "./assets/images/Background/Background_00082.png",
    "./assets/images/Background/Background_00083.png",
    "./assets/images/Background/Background_00084.png",
    "./assets/images/Background/Background_00085.png",
    "./assets/images/Background/Background_00086.png",
    "./assets/images/Background/Background_00087.png",
    "./assets/images/Background/Background_00088.png",
    "./assets/images/Background/Background_00089.png",
];

PIXI.loader
    .add("blue", "./assets/images/Gem Blue.png")
    .add("green", "./assets/images/Gem Green.png")
    .add("orange", "./assets/images/Gem Orange.png")
    .add("buttonActive", "./assets/images/spin.png")
    .add("buttonDeactivated", "./assets/images/BTN_Spin_deactivated.png")
    .add("coins", "./assets/images/coin.png")
    .add("yellowBar", "./assets/images/leftArrow.png")
    .add("blueBar", "./assets/images/rightArrow.png")
    .add("background", "./assets/images/background.png")
    .load(onAssetsLoaded);


const REEL_WIDTH = 90;
const SYMBOL_SIZE = 80;
let reels = [];
let anotherSlot = [];
let slotTextures = [];
let anotherSlotTextures = [];
let reelContainer;
let reel;

let ak47 = PIXI.Texture.fromImage("./assets/images/AK 47/AK 47_00000.png");
let bormsite_logo = PIXI.Texture.fromImage("./assets/images/A Bombsite Logo/A Bombsite Logo_00000.png");
let awp_sniper = PIXI.Texture.fromImage("./assets/images/AWP sniper/AWP sniper_00000.png");
let c4bomb = PIXI.Texture.fromImage("./assets/images/C4Bomb/C4Bomb_00000.png");
let defuse_kit = PIXI.Texture.fromImage("./assets/images/Defuse kit/Defuse kit_00000.png");
let desert_eagle = PIXI.Texture.fromImage("./assets/images/Desert eagle/Desert eagle_00000.png");
let flashbang = PIXI.Texture.fromImage("./assets/images/Flashbang/Flashbang_00000.png");
let freespin = PIXI.Texture.fromImage("./assets/images/FreeSpin/Freespin_00000.png");
let hand_granade = PIXI.Texture.fromImage("./assets/images/Hand granade/Hand granade_00000.png");
let knife = PIXI.Texture.fromImage("./assets/images/Knife/Knife_00000.png");
let m4_carbine = PIXI.Texture.fromImage("./assets/images/M4 carbine/M4 carbine_00000.png");
let swat_police = PIXI.Texture.fromImage("./assets/images/SWAT Police/SWAT Police_00000.png");
let terrorist = PIXI.Texture.fromImage("./assets/images/Terrorist/Terrorist_00000.png");
let wild = PIXI.Texture.fromImage("./assets/images/WILD/WILD_00000.png");

//onAssetsLoaded handler builds the example.
function onAssetsLoaded() {

    //Create different slot symbols.
    slotTextures = [
        ak47,
        bormsite_logo,
        awp_sniper,
        c4bomb,
        defuse_kit,
        desert_eagle,
        flashbang,
        freespin,
        hand_granade,
        knife,
        m4_carbine,
        swat_police,
        terrorist,
        wild,
    ];

    //container for footer items
    const footerContainer = new PIXI.Container();

    // draw a rounded rectangle
    let graphicsOne = new PIXI.Graphics();
    graphicsOne.lineStyle(2, 0xFF00FF, 1);
    graphicsOne.beginFill(0xFF00BB, 0.25);
    graphicsOne.drawRoundedRect(50, 296, 120, 35, 15);
    graphicsOne.endFill();

    // draw a rounded rectangle
    let graphicsTwo = new PIXI.Graphics();
    graphicsTwo.lineStyle(2, 0xFF00FF, 1);
    graphicsTwo.beginFill(0xFF00BB, 0.25);
    graphicsTwo.drawRoundedRect(255, 296, 120, 35, 15);
    graphicsTwo.endFill();

    //draw coin image for total balance
    let coins = new PIXI.Sprite.fromImage("./assets/images/coin.png");
    coins.x = app.screen.width - 150;
    coins.y = 2;
    coins.scale.x *= 0.08;
    coins.scale.y *= 0.08;

    //Create PIXI container to hold all app buttons
    const buttonsHolder = new PIXI.Container();
    buttonsHolder.x = 0;
    buttonsHolder.y = 0;
    const makeImageButton = (image, audioMP3, audioOGG, x, y, scale) => {
        const button = PIXI.Sprite.fromImage(image);
        const sound = new Howl({
            src: [audioMP3, audioOGG]
        });
        button.sound = sound;
        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerdown', event => sound.play());
        buttonsHolder.addChild(button);
        button.x = x;
        button.y = y;
        button.scale.set(scale);
        return button;
    };
    //Add image sprite, sound, location and scale leftArrow button
    const leftArrow = makeImageButton(
        './assets/images/leftArrow.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        220,
        296,
        0.05
    );
    //Add image sprite, sound, location and scale rightArrow button
    const rightArrow = makeImageButton(
        './assets/images/rightArrow.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        380,
        296,
        0.05
    );
    //Add image sprite, sound, location and scale the spinButton button
    const buttonActive = makeImageButton(
        './assets/images/spin.png',
        './assets/sounds/mp3/zapsplat_foley_money_pouch_fabric_coins_down_on_surface_006_15052.mp3',
        './assets/sounds/ogg/zapsplat_foley_money_pouch_fabric_coins_down_on_surface_006_15052.mp3',
        450,
        235,
        0.2
    );

        //check for event on click on rightArrow button and call AddStake function
        rightArrow.addListener("pointerdown", () => {
            playerResources.addStake();
            // pdate  PIXI stack text on screen
            stackText.text = playerResources.stake;
        });

        //check for event on click on leftArrow button and call MinusStake function
        leftArrow.addListener("pointerdown", () => {
            playerResources.minusStake();
            footerContainer.addChild(stackText);
            //update  PIXI text on screen
            stackText.text = playerResources.stake;
        });

        //check for event on spin button
        buttonActive.addListener('pointerdown', () => {
            startPlay();
            //Reduce balance on click depending on bet amount
            playerResources.reduceBalance();
            //Add changes on canvas environment
            balanceText.text = playerResources.balance;
            console.log(`button clicked`);
        });

    //Build the reels
    reelContainer = new PIXI.Container();
    for (let i = 0; i < 3; i++) {
        const rc = new PIXI.Container();
        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);

        reel = {
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter()
        };

        //let newposition = reel.reelContainer.getChildIndex;
        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        //Build the symbols
        for (let j = 0; j < 3; j++) {
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            //Scale the symbol to fit symbol area.
            symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 9);
            reel.symbols.push(symbol);
            rc.addChild(symbol);
        }
        reels.push(reel);
    }
    app.stage.addChild(reelContainer);

    /* TODO:
        -change style of top and bottom canvas background
        FIXME:
        - responsive on all devices
    */

    //Build top & bottom covers and position reelContainer
    const margin = 50;
    reelContainer.y = margin * 2.8;
    reelContainer.x = 200;
    const top = new PIXI.Graphics();
    top.beginFill(0xFF3300);
    //.beginFill(0, 1);
    top.drawRect(0, 0, app.screen.width, margin);
    const bottom = new PIXI.Graphics();
    bottom.beginFill(0, 1);
    bottom.drawRect(0, 240 + margin, app.screen.width, margin);

    //Add text Style properties
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 300
    });

    //Add header text
    const headerText = new PIXI.Text('Slot Machine Game', style);
    headerText.x = Math.round((top.width - headerText.width) / 2);
    headerText.y = Math.round((margin - headerText.height) / 2);
    top.addChild(headerText);

    //Stack Selector Text between arrow buttons
    let stackText = new PIXI.Text(`${playerResources.stake}`, style);
    stackText.x = (app.screen.width / 2 - 10);
    stackText.y = 295;
    footerContainer.addChild(stackText);

    //Add win text to the canvas
    let winText = new PIXI.Text(`${playerResources.win}`, style);
    winText.x = 100;
    winText.y = 295;
    footerContainer.addChild(winText);

    //Add balance text to the canvas
    let balanceText = new PIXI.Text(`${playerResources.balance}`, style);
    balanceText.x = 535;
    balanceText.y = 7;
    top.addChild(balanceText);

    app.stage.addChild(top);
    app.stage.addChild(coins);
    app.stage.addChild(footerContainer);
    footerContainer.addChild(
        bottom,
        graphicsOne,
        graphicsTwo,
        buttonsHolder,
        buttonActive,
        stackText,
        winText);
    footerContainer.x = 0;
    footerContainer.y = 20;

    let running = false;

    //Function to start playing.
    function startPlay() {
        if (running) return;
        running = true;

        // Add sound when reels running is set to true
        if (running){
            const sound = new Howl({
                src: ['./assets/sounds/mp3/arcade-game-fruit-machine-jackpot-002-long.mp3', './assets/sounds/mp3/arcade-game-fruit-machine-jackpot-002-long.mp3']
            });
            sound.play();
        };

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = Math.floor(Math.random() * 3);
            tweenTo(r, "position", r.position + 10 + i * 5 + extra, 2500 + i * 600 + extra * 600, backout(0.6), null, i == reels.length - 1 ? reelsComplete : null);
        }
    }

    //Reels done handler.
    function reelsComplete() {
        running = false;
    }

    //function to get symbols index/position
    /*     Response balance = "98.80" stake = "1.20" win = "0.00" >
            <SymbolGrid column_id="0" symbols="2,2,1" />
            <SymbolGrid column_id="1" symbols="1,2,1" />
            <SymbolGrid column_id="2" symbols="1,0,1" />
    </Response > */

    // Listen for animate update.
    app.ticker.add(delta => {
        //Update the slots.
        for (const r of reels) {
            //Update blur filter y amount based on speed.
            //This would be better if calculated with time in mind also. Now blur depends on frame rate.
            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;

            //Update symbol positions on reel.
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevy = s.y;
                s.y = (r.position + j) % r.symbols.length * SYMBOL_SIZE - SYMBOL_SIZE;
                if (s.y < 0 && prevy > SYMBOL_SIZE) {
                    //Detect going over and swap a texture. 
                    //This should in proper product be determined from some logical reel.
                    s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                }
            }
        }
    });
}

//Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
const tweening = [];

function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now()
    };

    tweening.push(tween);
    return tween;
}
// Listen for animate update.
app.ticker.add(delta => {
    const now = Date.now();
    const remove = [];
    for (var i = 0; i < tweening.length; i++) {
        const t = tweening[i];
        const phase = Math.min(1, (now - t.start) / t.time);

        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if (t.change) t.change(t);
        if (phase == 1) {
            t.object[t.property] = t.target;
            if (t.complete)
                t.complete(t);
            remove.push(t);
        }
    }
    for (var i = 0; i < remove.length; i++) {
        tweening.splice(tweening.indexOf(remove[i]), 1);
    }
});

//Basic lerp funtion.
function lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
}

//Backout function from tweenjs.
//https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
backout = amount => t => --t * t * ((amount + 1) * t + amount) + 1;

/* 
import scaleToWindow from 'scale-to-window-pixi';
// in case you need ssr, it's good to wrap your window objects in some method

window.addEventListener("resize", function (event) {
    scaleToWindow(eleDict, getWindow, getDocument, backgroundColor);
}); */