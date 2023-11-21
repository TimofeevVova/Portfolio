// добавление регистрации пользователя
/*
$('#registerMainUser').click(function () {

    var url = '../Progects/MainDBProgram';
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {            
            // показать данные на странице
            $('#mainDBData').html(data);

            // скрыть кнопку регистрации
            $('#openRegisterMainUser').hide();            

            // закрыть форму регистрации
            $('#closeModalForm').click();
        },
        error: function () {
            console.log('Ошибка при загрузке');
        }
    });
});

*/