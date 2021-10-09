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

const size = [1920, 1080];
const ratio = size[0] / size[1];

const app = new PIXI.Application(size[0], size[1], {
    transparent: true,
    autoResize: true,
    antialias: true,
    resolution: 1,
});

document.body.appendChild(app.view);


class Resources {
    constructor(balance, level, win) {
        this.balance = 100035;
        this.level = 1;
        this.coin = 0.03;
        this.win = 0;
        this.bet = 10;
        this.lines = 5;
        this.playing = false;
        this.addLevel = function () {
            //Add stake with one point till it equals to three
            if (playerResources.level >= 1 && playerResources.level <= 2) {
                playerResources.level ++;
            }
        };
        this.minusLevel = function minusLevel() {
            //Reduce stake one point till it equals to 1
            if (playerResources.level > 1) {
                playerResources.level --;
            }
        };
        this.addCoin = function () {
            //Add stake with one point till it equals to three
            if (playerResources.coin) {
                playerResources.coin++;
                playerResources.coin = playerResources.coin.toFixed(2);
            }
        };
        this.minusCoin = function () {
            //Reduce stake one point till it equals to 1
            if (playerResources.coin > 1) {
                playerResources.coin--;
                playerResources.coin = playerResources.coin.toFixed(2);
            }
        };
        this.reduceBalance = function (){
            //Reduce Balance when player prss on spin button
            this.balance = this.balance - this.level;
        }
        this.addBalance = function (){
            //Reduce Balance when player prss on spin button
            this.balance = this.balance - this.coin;
        }
    }
}
let playerResources = new Resources();

let img_src = [
    "./assets/images/AK 47/AK 47_000",
    "./assets/images/A Bombsite Logo/A Bombsite Logo_000",
    "./assets/images/AWP sniper/AWP sniper_000",
    "./assets/images/C4Bomb/C4Bomb_000",
    "./assets/images/Defuse kit/Defuse kit_000",
    "./assets/images/Desert eagle/Desert eagle_000",
    "./assets/images/Flashbang/Flashbang_000",
    "./assets/images/Hand granade/Hand granade_000",
    "./assets/images/Knife/Knife_000",
    "./assets/images/M4 carbine/M4 carbine_000",
    "./assets/images/WILD/WILD_000",
    "./assets/images/SWAT Police/SWAT Police_000",
    "./assets/images/Terrorist/Terrorist_000",
];

const res_imgs = [];


let reels = [];
let anotherSlot = [];
let slotTextures = [];
let slotAnimations = [];
let anotherSlotTextures = [];
let reelContainer;
let reel;
let running = false;

for (var i = 0 ; i < img_src.length ; i++) {
    slotTextures.push(PIXI.Texture.fromImage(img_src[i] + "00.png"));
    var _frames = [];
    for (let j = 0; j <= 89; j++) {
        if (j < 10) {
            res_imgs.push(img_src[i] + "0" + j + ".png");
           let texture = PIXI.Texture.fromImage(img_src[i] + "0" + j + ".png");
            _frames.push(texture);
        } else {
            res_imgs.push(img_src[i] + j + ".png");
           let texture = PIXI.Texture.fromImage(img_src[i] + j + ".png");
            _frames.push(texture);
        }
    }
    let _animat = new PIXI.extras.AnimatedSprite(_frames);
    _animat.play();
    slotAnimations.push(_animat);
}

PIXI.loader
    .add("background", "./assets/images/background.png")
    .add("autoplay", "./assets/images/autoplay.png")
    .add("maxbet", "./assets/images/maxbet.png")
    .add("minus", "./assets/images/minus.png")
    .add("help", "./assets/images/help.png")
    .add("setting", "./assets/images/setting.png")
    .add("logo", "./assets/images/logo.png")
    .add("footer", "./assets/images/footer-background.png")
    .add("reelborder", "./assets/images/reel-background1.png")
    .add("reel", "./assets/images/reel-background2.png")
    .add("spin", "./assets/images/spin.png")
    .add(res_imgs)
    .load(onAssetsLoaded);

let ak47 = PIXI.Texture.fromImage("./assets/images/AK 47/AK 47_00000.png");
let bormsite_logo = PIXI.Texture.fromImage("./assets/images/A Bombsite Logo/A Bombsite Logo_00000.png");
let awp_sniper = PIXI.Texture.fromImage("./assets/images/AWP sniper/AWP sniper_00000.png");
let c4bomb = PIXI.Texture.fromImage("./assets/images/C4Bomb/C4Bomb_00000.png");
let defuse_kit = PIXI.Texture.fromImage("./assets/images/Defuse kit/Defuse kit_00000.png");
let desert_eagle = PIXI.Texture.fromImage("./assets/images/Desert eagle/Desert eagle_00000.png");
let flashbang = PIXI.Texture.fromImage("./assets/images/Flashbang/Flashbang_00000.png");
let hand_granade = PIXI.Texture.fromImage("./assets/images/Hand granade/Hand granade_00000.png");
let knife = PIXI.Texture.fromImage("./assets/images/Knife/Knife_00000.png");
let m4_carbine = PIXI.Texture.fromImage("./assets/images/M4 carbine/M4 carbine_00000.png");
let wild = PIXI.Texture.fromImage("./assets/images/WILD/WILD_00000.png");
let swat_police = PIXI.Texture.fromImage("./assets/images/SWAT Police/SWAT Police_00000.png");
let terrorist = PIXI.Texture.fromImage("./assets/images/Terrorist/Terrorist_00000.png");

//onAssetsLoaded handler builds the example.
function onAssetsLoaded() {
    let topSize = getRealSize(PIXI.loader.resources.logo.texture);
    let bottomSize = getRealSize(PIXI.loader.resources.footer.texture);
    let reelSize = getRealSize(PIXI.loader.resources.reel.texture);
    let reelBorderSize = getRealSize(PIXI.loader.resources.reelborder.texture);
    var _realSize = [];
/*----------------------------Background------------------------------------*/
    var frames = []
    for (let i = 0; i <= 89; i++) {
        if (i < 10) {
           let texture = PIXI.Texture.fromImage("./assets/images/Background/Background_0000" + i + ".png");
            frames.push(texture);
        } else {
           let texture = PIXI.Texture.fromImage("./assets/images/Background/Background_000" + i + ".png");
            frames.push(texture);
        }
    }
    let animatedSpriteBackground = new PIXI.extras.AnimatedSprite(frames);
    animatedSpriteBackground.play();
    app.stage.addChild(animatedSpriteBackground)
/*-------------------------------------------------------------------------*/

/*----------------------------Logo------------------------------------*/
    let topContainer = new PIXI.Container();
    frames = []
    realSize = getRealSize(PIXI.loader.resources.logo.texture);
    for (let i = 0; i <= 89; i++) {
        if (i < 10) {
           let texture = PIXI.Texture.fromImage("./assets/images/DE-FUSE_Logo/DE-FUSE_Logo_0000" + i + ".png");
            frames.push(texture);
        } else {
           let texture = PIXI.Texture.fromImage("./assets/images/DE-FUSE_Logo/DE-FUSE_Logo_000" + i + ".png");
            frames.push(texture);
        }
    }
    let animatedSpriteLogo = new PIXI.extras.AnimatedSprite(frames);
    animatedSpriteLogo.play();
    topContainer.addChild(animatedSpriteLogo);
    topContainer.pivot.x = topSize.w/2;
    topContainer.pivot.y = 0;
    topContainer.x = app.screen.width/2;
    topContainer.y = -10;
    app.stage.addChild(topContainer);
/*-------------------------------------------------------------------------*/

/*----------------------------ReelContainer------------------------------------*/
    let reelBorderContainer = new PIXI.Container();
    let reelBorderBackground = new PIXI.Sprite.fromImage('./assets/images/reel-background1.png');
    reelBorderContainer.addChild(reelBorderBackground);

    reelBorderContainer.pivot.x = reelBorderSize.w/2;
    reelBorderContainer.pivot.y = 0;
    reelBorderContainer.x = app.screen.width/2;
    reelBorderContainer.y = topSize.h - 84.5;
    reelBorderContainer.scale.y = 0.97;

    app.stage.addChild(reelBorderContainer);

    reelContainer = new PIXI.Container();

    let reelBackground = new PIXI.Sprite.fromImage("./assets/images/reel-background2.png");
    reelContainer.addChild(reelBackground);

    let REEL_OFFSET_X = 15;
    let REEL_OFFSET_Y = 5;
    let SYMBOL_SIZE = 250;
    let SPACE_OFFSET_REEL = 20;

    slotTextures = [
        ak47,
        bormsite_logo,
        awp_sniper,
        c4bomb,
        defuse_kit,
        desert_eagle,
        flashbang,
        hand_granade,
        knife,
        m4_carbine,
        wild,
        swat_police,
        terrorist,
    ];

     for (let i = 0; i < 5; i++) {
        const rc = new PIXI.Container();
        rc.x = REEL_OFFSET_X + i * SYMBOL_SIZE + i * SPACE_OFFSET_REEL;
        rc.y = REEL_OFFSET_Y;
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

        var selected_large_slot = false;

        //Build the symbols
        for (let j = 0; j < 3; j++) {
            // if (selected_large_slot) {
            //     selected_large_slot = false;
            //     continue;
            // }
            let selected_slot = Math.floor(Math.random() * slotTextures.length);
            if (j > 1 && selected_slot > 10) {
                console.log("again", i, j, selected_slot);
                selected_slot = Math.floor(Math.random() * (slotTextures.length - 2));
            }
            console.log(i, j, selected_slot);
            const symbol = new PIXI.Sprite(slotTextures[selected_slot]);
            // Scale the symbol to fit symbol area.
            symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 9);
            reel.symbols.push(symbol);
            rc.addChild(symbol);

            // slotAnimations[selected_slot].y = j * SYMBOL_SIZE;
            // slotAnimations[selected_slot].scale.x = slotAnimations[selected_slot].scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            // slotAnimations[selected_slot].x = Math.round((SYMBOL_SIZE - symbol.width) / 9);
            // reel.symbols.push(slotAnimations[selected_slot]);
            // rc.addChild(slotAnimations[selected_slot]);
            // if (selected_slot > 10) {
            //     selected_large_slot = true
            // } else {
            //     selected_large_slot = false;
            // }
        }
        reels.push(reel);
    }

    //Function to start playing.
    function startPlay() {
        if (running) return;
        running = true;

        // Add sound when reels running is set to true
        if (running){
            const sound = new Howl({
                src: './assets/sounds/mp3/arcade-game-fruit-machine-jackpot-002-long.mp3'
            });
            sound.play();
        };

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = Math.floor(Math.random() * slotTextures.length);
            tweenTo(
                r, 
                "position", 
                r.position + 10 + i * 5 + extra, 
                2500 + i * 600 + extra * 600, 
                backout(0.6), 
                null, 
                i == reels.length - 1 ? reelsComplete : null
            );
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
                s.y = (r.position + j) % r.symbols.length * SYMBOL_SIZE;
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

    reelContainer.pivot.x = reelSize.w / 2;
    reelContainer.pivot.y = reelSize.h / 2;
    reelContainer.x = reelBorderContainer.x;
    reelContainer.y = reelBorderContainer.y + reelBorderSize.h / 2 - 28;
    reelContainer.scale.set(0.973, 0.938);

    const reel_mask = new PIXI.Graphics();
    reel_mask.beginFill(0xFF3300);
    reel_mask.drawRect(
        reelContainer.x - reelSize.w / 2, 
        reelContainer.y - reelSize.h / 2, 
        reelContainer.x + reelSize.w / 2, 
        reelContainer.y + reelSize.h / 2 - 175, 
    );
    reel_mask.endFill();
    reelContainer.mask = reel_mask;

    app.stage.addChild(reelContainer);
/*-------------------------------------------------------------------------*/

/*----------------------------Footer------------------------------------*/

    //container for footer items
    const footerContainer = new PIXI.Container();
    footerContainer.x = 0;
    footerContainer.y = app.screen.height - bottomSize.h;

    const offset_footer_text_top = 80;

    const numStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        fill: '#ffffff',
    });

    const txtStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 30,
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

    const makeImageButton = (image, audioMP3, audioOGG, x, y, px, py, scale, parent) => {
        const button = PIXI.Sprite.fromImage(image);
        const sound = new Howl({
            src: [audioMP3, audioOGG]
        });
        button.sound = sound;
        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerdown', event => sound.play());
        parent.addChild(button);
        button.x = x;
        button.y = y;
        button.pivot.x = px;
        button.pivot.y = py;
        button.scale.set(scale);
        return button;
    };

    const btnCenterHold = new PIXI.Container();
    btnCenterHold.x = bottomSize.w / 2;
    btnCenterHold.y = bottomSize.h / 2;
    btnCenterHold.pivot.x = bottomSize.w / 2;
    btnCenterHold.pivot.y = bottomSize.h / 2;

    _realSize = getRealSize(PIXI.loader.resources.autoplay.texture);
    const autoplay = makeImageButton(
        './assets/images/autoplay.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        bottomSize.w / 2 - 5 - 50,
        bottomSize.h / 2 + 8,
        _realSize.w,
        _realSize.h / 2,
        1,
        btnCenterHold
    );

    _realSize = getRealSize(PIXI.loader.resources.maxbet.texture);
    const maxbet = makeImageButton(
        './assets/images/maxbet.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        bottomSize.w / 2 - 5 + 50,
        bottomSize.h / 2 + 8,
        0,
        _realSize.h / 2,
        1,
        btnCenterHold
    );

    _realSize = getRealSize(PIXI.loader.resources.spin.texture);
    const spinActive = makeImageButton(
        './assets/images/spin.png',
        './assets/sounds/mp3/zapsplat_foley_money_pouch_fabric_coins_down_on_surface_006_15052.mp3',
        './assets/sounds/ogg/zapsplat_foley_money_pouch_fabric_coins_down_on_surface_006_15052.mp3',
        bottomSize.w / 2 - 5,
        bottomSize.h / 2 + 8,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnCenterHold
    );

    spinActive.addListener('pointerdown', () => {
        if (running) return;
        startPlay();
        playerResources.reduceBalance();
        balanceValue.text = playerResources.balance;
        console.log(`button clicked`);
    });

    const btnSettingHold = new PIXI.Container();

    _realSize = getRealSize(PIXI.loader.resources.setting.texture);
    const setButton = makeImageButton(
        './assets/images/setting.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        40,
        bottomSize.h / 2 + 30,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnSettingHold
    );

    _realSize = getRealSize(PIXI.loader.resources.help.texture);
    const helpButton = makeImageButton(
        './assets/images/help.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        110,
        bottomSize.h / 2 + 30,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnSettingHold
    );

    const btnLevelHold = new PIXI.Container();
    btnLevelHold.x = 0;
    btnLevelHold.y = 0;

    //lines
    let lineText = new PIXI.Text('LINES', txtStyle);
    lineText.x = 220;
    lineText.y = offset_footer_text_top;
    lineText.pivot.x = lineText.width / 2;
    lineText.pivot.y = lineText.height / 2;

    let lineValue = new PIXI.Text(`${playerResources.lines}`, numStyle);
    lineValue.x = 220;
    lineValue.y = offset_footer_text_top + 50;
    lineValue.pivot.x = lineValue.width / 2;
    lineValue.pivot.y = lineValue.height / 2;

    //bet
    let betText = new PIXI.Text('BET', txtStyle);
    betText.x = 350;
    betText.y = offset_footer_text_top;
    betText.pivot.x = betText.width / 2;
    betText.pivot.y = betText.height / 2;

    let betValue = new PIXI.Text(`${playerResources.bet}`, numStyle);
    betValue.x = 350;
    betValue.y = offset_footer_text_top + 50;
    betValue.pivot.x = betValue.width / 2;
    betValue.pivot.y = betValue.height / 2;

    //level
    let levelText = new PIXI.Text('LEVEL', txtStyle);
    levelText.x = 520;
    levelText.y = offset_footer_text_top;
    levelText.pivot.x = levelText.width / 2;
    levelText.pivot.y = levelText.height / 2;

    let levelValue = new PIXI.Text(`${playerResources.level}`, numStyle);
    levelValue.x = 520;
    levelValue.y = offset_footer_text_top + 50;
    levelValue.pivot.x = levelValue.width / 2;
    levelValue.pivot.y = levelValue.height / 2;

    //coin button
    _realSize = getRealSize(PIXI.loader.resources.minus.texture);
    const levelDown = makeImageButton(
        './assets/images/minus.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        460,
        offset_footer_text_top + 50,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnLevelHold
    );

    const levelUp = makeImageButton(
        './assets/images/plus.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        580,
        offset_footer_text_top + 50,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnLevelHold
    );

    levelUp.addListener("pointerdown", () => {
        playerResources.addLevel();
        levelValue.text = playerResources.level;
    });

    levelDown.addListener("pointerdown", () => {
        playerResources.minusLevel();
        levelValue.text = playerResources.level;
    });

    const btnCoinHold = new PIXI.Container();
    btnCoinHold.x = 0;
    btnCoinHold.y = 0;

    let coinText = new PIXI.Text('COIN VALUE', txtStyle);
    coinText.x = 1450;
    coinText.y = offset_footer_text_top;
    coinText.pivot.x = coinText.width / 2;
    coinText.pivot.y = coinText.height / 2;

    let coinValue = new PIXI.Text(`${playerResources.coin}`, numStyle);
    coinValue.x = 1450;
    coinValue.y = offset_footer_text_top + 50;
    coinValue.pivot.x = coinValue.width / 2;
    coinValue.pivot.y = coinValue.height / 2;

    const coinDown = makeImageButton(
        './assets/images/minus.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        1350,
        offset_footer_text_top + 50,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnCoinHold
    );

    const coinUp = makeImageButton(
        './assets/images/plus.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        1550,
        offset_footer_text_top + 50,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnCoinHold
    );

    coinUp.addListener("pointerdown", () => {
        playerResources.addCoin();
        coinValue.text = playerResources.coin;
    });

    coinDown.addListener("pointerdown", () => {
        playerResources.minusCoin();
        coinValue.text = playerResources.coin;
    });

    let balanceText = new PIXI.Text('COINS', txtStyle);
    balanceText.x = 1750;
    balanceText.y = offset_footer_text_top;
    balanceText.pivot.x = balanceText.width / 2;
    balanceText.pivot.y = balanceText.height / 2;

    let balanceValue = new PIXI.Text(`${playerResources.balance}`, numStyle);
    balanceValue.x = 1750;
    balanceValue.y = offset_footer_text_top + 50;
    balanceValue.pivot.x = balanceValue.width / 2;
    balanceValue.pivot.y = balanceValue.height / 2;

    const bottom = PIXI.Sprite.fromImage("./assets/images/footer-background.png");

   
    footerContainer.addChild(
        bottom,
        btnSettingHold,
        lineText,
        lineValue,
        betText,
        betValue,
        levelText,
        btnLevelHold,
        levelValue,
        btnCenterHold,
        coinText,
        btnCoinHold,
        coinValue,
        balanceText,
        balanceValue,
    );

    app.stage.addChild(footerContainer);

/*-------------------------------------------------------------------------*/

    function getRealSize(_texture) {
        const _sprite = new PIXI.Sprite(_texture);
        let _result = {w:_sprite.width, h:_sprite.height};
        return _result;
    }
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

resize();

function resize() {
    if (window.innerWidth / window.innerHeight >= ratio) {
        var w = window.innerHeight * ratio;
        var h = window.innerHeight;
    } else {
        var w = window.innerWidth;
        var h = window.innerWidth / ratio;
    }
    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';
}
window.onresize = resize;