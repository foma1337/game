window.onload = function () {
    for (let i = 0; i < 9; i++) {
        document.getElementById('game').innerHTML += '<div class="block"></div>';
    }

    let hod = 0;

    document.getElementById('game').onclick = function (event) {
        console.log(event);
        if (event.target.className == 'block') {
            if (hod % 2 == 0) {
                event.target.innerHTML = 'X';
            }
            else {
                event.target.innerHTML = '0';
            }
            hod++;
        }
    }

    function checkWinner() {
        let allblock = document.getElementsByClassName('block');
        // console.log(allblock);
        if (allblock[0].innerHTML=='X' && allblock[1].innerHTML=='X' && allblock[2].innerHTML=='X') {
            alert('Победили крестики');
        }
    }

}