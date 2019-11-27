import '../scss/main.scss';
import * as PIXI from 'pixi.js';
import earrings from '../products/earrings_new';

const canvas = document.getElementById('pixi-canvas');
const yawSlider = document.getElementById('yaw-slider');
const yawOutput = document.getElementById('yaw-output');
const leftDegrees = document.getElementById('left-degrees');
const leftIndex = document.getElementById('left-index');
const rightDegrees = document.getElementById('right-degrees');
const rightIndex = document.getElementById('right-index');

const pixiRenderer = new PIXI.autoDetectRenderer(640, 480, {
    view: canvas,
    anitalias: true,
    transparent: true,
    clearBeforeRender: true,
    resolution: 1,
});

const pixiStage = new PIXI.Container();

const currentProduct = earrings[0].earringsProduct;

const earringFiles = currentProduct.productImages[1].productViews.map(
    productView => productView
);

let earringTextures;
let productViewCount;
let rightSprite;
let leftSprite;


PIXI.loader
    .add(earringFiles)
    .load(setup);

function setup() {
    earringTextures = earringFiles.map(image => PIXI.loader.resources[image].texture);

    productViewCount = earringTextures.length;
    let defaultIndex = 0; //Math.round(earringTextures.length / 2) - 1;

    const leftX = (canvas.width / 2) / 2;
    const leftY = (canvas.height / 2);
    const rightY = (canvas.height / 2);
    const rightX = (canvas.width / 2) + leftX;


    rightSprite = new PIXI.Sprite(earringTextures[defaultIndex]);
    rightSprite.anchor.set(0.5, 0.5);
    rightSprite.x = rightX;
    rightSprite.y = rightY;

    leftSprite = new PIXI.Sprite(earringTextures[defaultIndex]);
    leftSprite.anchor.set(0.5, 0.5);
    // flip left earring
    leftSprite.transform.scale.x = -1;
    leftSprite.x = leftX;
    leftSprite.y = leftY;


    pixiStage.addChild(leftSprite);
    pixiStage.addChild(rightSprite);
    pixiRenderer.render(pixiStage);

    onYawChange({target: { value: 0 }});
}

const adjustment = (90 / 16) + ((90 / 16) / 2);
const yawOffset = 20;

function calculateRightRotation(degrees, productCount, earringSide = 'right') {
    const degreesPerIndex = 90 / productCount;
    let index = Math.round(degrees / degreesPerIndex);
    if (index < 0) {
        rightSprite.transform.scale.x = 1;
        index = Math.abs(index);
    } else if (index >= 0) {
        rightSprite.transform.scale.x = -1;
    }
    rightSprite.texture = earringTextures[index];

    rightDegrees.textContent = degrees;
    rightIndex.textContent = index;
}

function calculateLeftRotation(degrees, productCount, earringSide = 'left') {
    const degreesPerIndex = 90 / productCount;
   
    let index = Math.round(degrees / degreesPerIndex);

     if (index <= 0) {
        leftSprite.transform.scale.x = 1;
        index = Math.abs(index);
     } else if (index > 0) {
        leftSprite.transform.scale.x = -1;
        
    }

    leftSprite.texture = earringTextures[index];

    leftDegrees.textContent = degrees;
    leftIndex.textContent = index;

}

const onYawChange = (e) => {
    
    const yaw = parseFloat(e.target.value);

    
    let leftDegrees = yaw + yawOffset;
    let rightDegrees = yaw - yawOffset;

    if (yaw >= 0) {
        leftDegrees += adjustment;
    } else {
        rightDegrees -= adjustment;
    }

    calculateRightRotation(rightDegrees, 16, 'right');
    calculateLeftRotation(leftDegrees, 16, 'left');

    yawOutput.textContent = yaw;
    
    pixiRenderer.render(pixiStage);

}

yawSlider.addEventListener('input', onYawChange);
