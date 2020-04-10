const select = document.querySelector('select');
const jumbotron = document.querySelector('.jumbotron');



select.onchange = function() {

    let selectTheme = select.value;

    switch (selectTheme) {
        case 'normal':
            theme('black', 'white');
            console.log('normal');
            break;
        case 'claro':
            theme('white', 'black');
            console.log('claro');
            break;
        case 'oscuro':
            theme('black', 'black');
            console.log('oscuro');
            break;

        default:
            break;
    }

}

function theme(BgColor, txtColor) {
    jumbotron.style.backgroundColor = BgColor;
    jumbotron.style.color = txtColor;
}