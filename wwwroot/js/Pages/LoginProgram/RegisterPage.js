//Кнопка регистрации
$(document).on('click', '#RegisterNewUser', function () {

    var login = $('#newLogin').val();
    var name = $('#newName').val();
    var company = $('#newCompany').val(); //может быть пустым
    var password = $('#newPassword').val();
    var password2 = $('#newPassword2').val();

    if (login != '' && name != '' && password != '' && password2 != '') {
        if (password == password2) {
            var url = '/api/Login/registerNewUser';
            $('#errorNewLoginLabel').html('');

            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ Login: login, Name: name, Company: company, Password: password }),
                success: function (data) {
                    console.log(data);
                    alert("Регистрация успешна");
                    window.location.href = '/api/Login/LoginPage'; // отправить на страницу входа
                },
                error: function (xhr, textStatus, errorThrown) {
                    $('#errorNewLoginLabel').html('<span class="text-danger">Логин занят</span>');
                }
            });   
            
        } else {
            $('#errorNewLoginLabel').html('<span class="text-danger">Пароли не совпадают</span>');
        }
    } else {
        $('#errorNewLoginLabel').html('<span class="text-danger">Поля с * должны быть заполнены</span>');
    }
});

//обработчик клавиши enter для входа
$('#newPassword, #newPassword2').keypress(function (e) {
    if (e.which === 13) {
        $('#RegisterNewUser').click();
    }
});