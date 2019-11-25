import '../scss/main.scss';
import * as PIXI from 'pixi.js';
import earrings from '../products/earrings_new';

const canvas = document.getElementById('pixi-canvas')

const pixiRenderer = new PIXI.autoDetectRenderer(640, 480, {
    view: canvas,
    anitalias: true,
    transparent: true,
    clearBeforeRender: true,
    resolution: 1,
});

const pixiStage = new PIXI.Container();

const leftEarringContainer = new PIXI.Container();
const rightEarringContainer = new PIXI.Container();

const currentProduct = earrings[0].earringsProduct;

const earringFiles = currentProduct.productImages[1].productViews.map(
    productView => productView
);

console.log(earringFiles);

PIXI.loader
    .add(earringFiles)
    .load(setup);

function setup() {
    const earringSpriteLeft = new PIXI.Sprite(PIXI.loader.resources[earringFiles[4]].texture);
    //const earringSpriteRight = new PIXI.Sprite(earringTextures[0]);
    pixiStage.addChild(earringSpriteLeft);
    pixiRenderer.render(pixiStage);
}


// pixiStage.addChild(earringSpriteLeft);
// pixiStage.addChild(earringSpriteRight);

// pixiRenderer.render(pixiStage);
