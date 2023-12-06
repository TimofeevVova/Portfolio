//Кнопка входа
$(document).on('click', '#LoginUser', function () {
    var login = $('#login').val();
    var password = $('#password').val();

    var url = '/api/Login/loginUser';
    $('#errorLoginLabel').html('');

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ Login: login, Password: password }),
        success: function (data) {            
            console.log(data);
            window.location.href = '/api/Login/MainPage';
        },
        error: function (xhr, textStatus, errorThrown) {
            
            $('#errorLoginLabel').html('<span class="text-danger">Неверный логин или пароль</span>');
        }
    });

});

//обработчик клавиши enter для входа
$('#password').keypress(function (e) {
    if (e.which === 13) { // Код клавиши Enter
        $('#LoginUser').click(); // Вызываем клик на кнопку LoginUser
    }
});