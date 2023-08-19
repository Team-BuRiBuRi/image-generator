const express = require('express')
const app = express()
const port = 3000


const { createCanvas } = require('canvas');
const fs = require('fs');

app.get('/', (req, res) => {




    const FONT_SIZE_XXL = 86;
    const FONT_SIZE_XL = 72;
    const FONT_SIZE_LG = 40;
    const FONT_SIZE_SM = 30;

    const CANVAS_WIDTH = 500;
    const CANVAS_HEIGHT = 200;

    const PADDING = 20;

    const drawCanvas = (productName, productPrice, currency) => {
        const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = `bold ${FONT_SIZE_LG}px Impact`;
        ctx.fillText(
            productName,
            FONT_SIZE_LG / 2 + PADDING,
            FONT_SIZE_LG + PADDING / 2
        );

        ctx.fillStyle = '#bd2217';
        ctx.font = `bold ${FONT_SIZE_XL}px Impact`;

        ctx.fillStyle = '#bd2217';
        ctx.font = `bold ${FONT_SIZE_XL}px Impact`;

        const productPriceText = ctx.measureText(`${productPrice}`);
        ctx.fillText(
            productPrice,
            CANVAS_WIDTH - productPriceText.width - PADDING,
            CANVAS_HEIGHT - FONT_SIZE_LG
        );

        ctx.font = `bold ${FONT_SIZE_XXL}px Impact`;
        const currencyText = ctx.measureText(currency);
        ctx.fillText(
            currency,
            CANVAS_WIDTH -
            currencyText.width -
            PADDING -
            productPriceText.width -
            PADDING,
            CANVAS_HEIGHT - FONT_SIZE_LG
        );

        return canvas;
    };





    const ToBase64 = (canvas) => {
        const base64 = canvas.toDataURL();

        const base64Data = base64.replace(/^data:image\/png;base64,/, "");
        console.log(base64Data);

        return base64Data;
    };

    const result = ToBase64(drawCanvas('Orange Jam', 50, '$'));

    res.status(200).json({
        "labelCode": "085C1B03E1DA",
        "page": 1,
        "frontPage": 1,
        "image": result
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})