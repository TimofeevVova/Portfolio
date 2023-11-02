// переменные для таймера
let timer;
let startTime;
let isRunning = false;
let accumulatedTime = 0;
// открыть таймер
$('#OpenStopWatch').click(function () {

    var url = '../Progects/StopWatch';
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            $('#modalForm .modal-title').text('Секундомер');
            $('#modalForm .modal-body').html(data);
            $('#modalForm').modal('show');
            //$('#modalForm').attr("id", 'modalForm' + " timer");
        },
        error: function () {
            console.log('Ошибка при загрузке');
        }
    });
});

// открыть курс валют
$('#OpenExchangeRates').click(function () {

    var url = 'https://www.cbr-xml-daily.ru/daily.xml';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'xml',
        success: function (data) {
            var html = BuilderExchangeRates(data);
            $('#modalForm .modal-title').text('Курсы валют');
            $('#modalForm .modal-body').html(html);
            $('#modalForm').modal('show');
            //$('#modalForm').attr("id", 'modalForm' + " exchangeRates");
        },
        error: function () {
            console.log('Ошибка при загрузке');
        }
    });
});
// Переменные
userNumber = "";
var length = 0;
var attemptNumber = 0;
// открыть игру Угадай число
$('#OpenFindNumber').click(function () {

    var url = '../Progects/FindTheNumber';
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            $('#modalForm .modal-title').text('Игра угадай число!');
            $('#modalForm .modal-body').html(data);
            $('#modalForm').modal('show');
            //$('#modalForm').attr("id", 'modalForm' + " findTheNumber");

            // Показать кнопку
            document.getElementById("startGameButton").classList.remove("d-none");
        },
        error: function () {
            console.log('Ошибка при загрузке');
        }
    });
});
