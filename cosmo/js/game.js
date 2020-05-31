let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let aster = [];
let fire = [];
let timer = 0;
let ship = { x: 300, y: 300 };
let expl = [];

let astering = new Image();
astering.src = 'img/astero.png';

fireimg = new Image();
fireimg.src = 'img/fire.png';

shipimg = new Image();
shipimg.src = 'img/ship01.png';

let explimg = new Image();
explimg.src = 'img/expl222.png';

let fon = new Image();
fon.src = 'img/fon.png';

canvas.addEventListener("mousemove", function (event) {
    ship.x = event.offsetX - 25;
    ship.y = event.offsetY - 13;
});


explimg.onload = function () {
    game();
}
// основной игровой цикл
function game() {
    update();
    render();
    requestAnimationFrame(game); // рекурсия браузера с частотой экрана
}

function update() {
    // таймер
    timer++; 
    // событие
    if (timer % 15 == 0) { // каждые 10 фреймов
        aster.push({
            x: Math.random() * 600,
            y: -50,
            dx: Math.random() * 2 - 1,  // dx скорость изменения координат
            dy: Math.random() * 2 + 2,
            del: 0
        });
    }

// Выстрел
    if (timer % 20 == 0) {
        fire.push({ x: ship.x + 10, y: ship.y, dx: 0, dy: -5.2 });
        fire.push({ x: ship.x + 10, y: ship.y, dx: 0.5, dy: -5 });
        fire.push({ x: ship.x + 10, y: ship.y, dx: -0.5, dy: -5 });
    }
    // двигаем пули
    for (i in fire) {
        fire[i].x = fire[i].x + fire[i].dx;
        fire[i].y = fire[i].y + fire[i].dy;

        if (fire[i].y < -30) fire.splice(i, 1);
    }

    // анимация взрывов
    for (i in expl) { // перебираем спрайт
        expl[i].animx = expl[i].animx + 0.3;
        if (expl[i].animx > 7) { expl[i].animy++; expl[i].animx = 0 }
        if (expl[i].animy > 7)
            expl.splice(i, 1);
    }


    // физика
    for (i in aster) {
        aster[i].x = aster[i].x + aster[i].dx; //  
        aster[i].y = aster[i].y + aster[i].dy;

        // граница
        if (aster[i].x >= 550 || aster[i].x < 0) aster[i].dx = -aster[i].dx;
        if (aster[i].y >= 600) aster.splice(i, 1);

        // проверка столкновения астероида и пули
        for (j in fire) {
            if (Math.abs(aster[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(aster[i].y - fire[j].y) < 25) {
                // произошло столкновение

                // спавн взрыва
                expl.push({ x: aster[i].x - 25, y: aster[i].y - 25, animx: 0, animy: 0 });
                // помечаем астероид на удаление
                aster[i].del = 1;
                fire.splice(j, 1); break;
            }
        }
        // удаляем астероиды
        if (aster[i].del == 1) aster.splice(i, 1);
    }
}

function render() { // отображение
    // рисуем фон, корабль и астеройд
    context.drawImage(fon, 0, 0, 600, 600);
    // рисуем пули
    for (i in fire) context.drawImage(fireimg, fire[i].x, fire[i].y, 30, 30);
    context.drawImage(shipimg, ship.x, ship.y);
    for (i in aster) context.drawImage(astering, aster[i].x, aster[i].y, 50, 50);

    //рисуем взрывы
    for (i in expl) {
        context.drawImage(explimg, 128 * Math.floor(expl[i].animx), 128 * Math.floor(expl[i].animy), 128, 128, expl[i].x, expl[i].y, 100, 100);
    }
}

let requestAnimationFrame = (function () { // функция для работы игры
    return window.requestAnimationFrame || // во всех браузерах 
        window.webkitRequestAnimationFrame ||   // *анимация*
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 20);
        };
})();