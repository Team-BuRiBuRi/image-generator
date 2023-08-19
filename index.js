const express = require('express')
const app = express()
const port = 3000


const { createCanvas, Image } = require('canvas');
const QRCode = require('./qr.js');
const fs = require('fs');

const { qrcanvas, setCanvasModule } = require('qrcanvas');

// Enable node-canvas
setCanvasModule(require('canvas'));



app.get('/', (req, res) => {




    const FONT_SIZE_TITLE = 30;
    const FONT_SIZE_TIMESTAMP = 12;
    const FONT_SIZE_ARS = 24;
    const FONT_SIZE_USD = 14;

    const CANVAS_WIDTH = 250;
    const CANVAS_HEIGHT = 122;

    const PADDING = 10;

    const RED = '#bd2217';

    const drawCanvas = (
        productName,
        productPriceARS,
        productPriceUSD,
        productPriceBTC,
        timeStamp,
        qrCode
    ) => {
        const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        // const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Title
        ctx.fillStyle = 'black';
        ctx.font = `bold ${FONT_SIZE_TITLE}px Impact`;
        ctx.fillText(
            productName,
            FONT_SIZE_TITLE / 2 + PADDING,
            FONT_SIZE_TITLE + PADDING / 2
        );

        // Line
        // draw a line under the title
        ctx.beginPath();
        ctx.moveTo(10, FONT_SIZE_TITLE + PADDING);
        ctx.lineTo(CANVAS_WIDTH - 10, FONT_SIZE_TITLE + PADDING);
        ctx.stroke();

        ctx.font = `${FONT_SIZE_TIMESTAMP}px Impact`;

        // ctx.fillText(
        //   `Last update ${productPriceARS}`,
        //   CANVAS_WIDTH - productPriceText.width - PADDING,
        //   80
        // );

        const timeStampText = ctx.measureText(`Last update ${timeStamp}`);

        ctx.fillText(
            `Last update ${timeStamp}`,
            CANVAS_WIDTH - timeStampText.width - PADDING,
            55
        );

        ctx.fillStyle = RED;
        ctx.font = `bold ${FONT_SIZE_ARS}px Impact`;

        const productPriceText = ctx.measureText(`${productPriceARS} ARS`);
        // ctx.fillText(
        //   `${productPriceARS} ARS`,
        //   CANVAS_WIDTH - productPriceText.width - PADDING,
        //   CANVAS_HEIGHT - FONT_SIZE_TITLE
        // );

        ctx.fillText(
            `${productPriceARS} ARS`,
            CANVAS_WIDTH - productPriceText.width - PADDING,
            80
        );

        ctx.font = ` ${FONT_SIZE_USD}px Impact`;

        ctx.fillText(
            `${productPriceUSD} USD`,
            CANVAS_WIDTH - productPriceText.width - PADDING,
            100
        );

        ctx.fillText(
            `${productPriceBTC} BTC`,
            CANVAS_WIDTH - productPriceText.width - PADDING,
            120
        );

        ctx.fillRect(CANVAS_WIDTH - 52, 0, 52, 17);

        ctx.fillStyle = 'white';

        ctx.fillText(`SOLUM`, CANVAS_WIDTH - 45, 14);


        // setTimeout(() => {


        // }, 1000);


        const canvas2 = qrcanvas({
            data: 'hello, world'
        });

        ctx.drawImage(canvas2, 10, 40, 60, 60)

        return canvas;
    };


    const ToBase64 = (canvas) => {
        const base64 = canvas.toDataURL();

        const base64Data = base64.replace(/^data:image\/png;base64,/, "");
        console.log(base64Data);

        return base64Data;
    };

    const result = ToBase64(drawCanvas(
        'Tomato',
        261,
        0.75,
        0.000029,
        '00:00:00',
        'qrcode'
    ));

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