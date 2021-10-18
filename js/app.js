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

app = new PIXI.Application(size[0], size[1], {
    transparent: true,
    autoResize: true,
    antialias: true,
    resolution: 1,
});

document.body.appendChild(app.view);

PIXI.loader.load(onAssetsLoaded);

//onAssetsLoaded handler builds the example.
function onAssetsLoaded() {
    renderBackground()
    renderLogo()
    renderFooter()
    renderBoardFrame()
    renderWinner();

    /*----------------------------ReelContainer------------------------------------*/
    reelContainer = new PIXI.Container();

    selected_slot_ids = generateRandomSlots();

    renderSlots( selected_slot_ids, true )
    adjustContainerPosition();

    // Listen for animate update.
    app.ticker.add(delta => {
        //Update the slots.
        for (const r of reels) {
            //Update blur filter y amount based on speed.
            //This would be better if calculated with time in mind also. Now blur depends on frame rate.
            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;

            var selected_large_slot = false;
            //Update symbol positions on reel.
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevy = s.y;
                s.y = (r.position + j) % r.symbols.length * SYMBOL_SIZE - SYMBOL_SIZE;
                if (s.y < 0 && prevy > SYMBOL_SIZE) {
                    //Detect going over and swap a texture. 
                    //This should in proper product be determined from some logical reel.
                    // s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    // s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                    // s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                }
            }
        }
    });

    

    app.stage.addChild(reelContainer);
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

resize();
window.onresize = resize;
