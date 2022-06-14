ctx.canvas.width = $(window).width() * 0.95;
ctx.canvas.height = $(window).height() * 0.8;

window.addEventListener('resize', () => {
    let imageData = canvas.toDataURL();
    
    ctx.canvas.width = $(window).width() * 0.95;
    ctx.canvas.height = $(window).height() * 0.8;

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    let img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
    img.src = imageData;
});