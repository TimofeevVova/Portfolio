// Старт игры + генерация числа
$('#startGame').click(function () {  
    
    var gameForm = document.getElementById("newGame");
    gameForm.style.display = "block";

    $.ajax({
        url: '/FindTheNumber/GenerateNumber',  
        type: 'POST',
        success: function (data) {
            console.log('Число загадано' + data);
        },
        error: function () {
            console.log('Ошибка при выполнении запроса на сервер');
        }
    });

    // Скрыть кнопку
    document.getElementById("startGameButton").classList.add("d-none");


    length = 0;
    userNumber = "";
    attemptNumber = 0;
});

// выбор числа
$(".choice").on("click", function () {
    // отключаем кнопку которую нажали
    $(this).prop("disabled", true);
    // записываем номер в переменную и выводим на экран
    var clickedNumber = $(this).text();
    $(".number").append(clickedNumber);
    userNumber += clickedNumber;

    // обновляем счетчик
    length++;

    // ограничиваем выбор из 4 цифр
    if (length == 4) {
        $(".choice").prop("disabled", true);
        console.log(userNumber);
    }
});

// сброс выбора
$(".reset").on("click", function () {
    length = 0;
    userNumber = "";
    $(".number").text("Твое число - ");
    $(".choice").prop("disabled", false);
});

// проверка ответа
$('#try').click(function () {
    if (length == 4) {

        $.ajax({
            url: '/FindTheNumber/checkNumbers',
            type: 'GET',
            data: { userNumber: userNumber },
            traditional: true,
            success: function (data) {
                console.log('ответ' + data);

                // запись в таблицу
                SaveResult(data);


                $('.reset').click();
            },
            error: function () {
                console.log('Ошибка при выполнении запроса на сервер');
            }
        });
    }    
});

// запись в таблицу
function SaveResult(data) {
    attemptNumber++;

    var html = `<tr>
                    <td class="text-center align-middle">${attemptNumber}</td>
                    <td class="text-center align-middle">${userNumber}</td>
                    <td class="text-center align-middle">${data[0]}</td>
                    <td class="text-center align-middle">${data[1]}</td>
                </tr>`;

    $('#tableResults').prepend(html);

    if (data[0] == 4 && data[1] == 4) {
        GamerWin();
    }
}

// завершение игры победой
function GamerWin() {
    alert("Поздравляю, ты выиграл!!!");

    $(".choice").prop("disabled", true);
    $("#try").prop("disabled", true);
}