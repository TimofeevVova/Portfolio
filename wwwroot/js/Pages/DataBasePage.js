
// Действия при загрузке страницы
$(document).ready(function () {

    var url = '../Progects/MainDBProgram';
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            // показать данные на странице
            $('#mainDBData').html(data);            

            // показать данные с сервера
            LoadDataBase();
        },
        error: function () {
            console.log('Ошибка при загрузке');
        }
    });
});

// Открыть модвльное окно добавлкения демо юзера
$(document).on('click', '#openAddNewDemoUserForm', function () {

    var url = '../Progects/AddDemoUser';

    $.ajax({
        url: url,
        type: 'Get',
        success: function (data) {            
            $('#modalForm .modal-title').text('Добавить нового пользователя в "демо" таблицу');
            $('#modalForm .modal-body').html(data);
            $('#modalForm').modal('show');
        },
        error: function (error) {
            console.log(error);
        }
    });
});

// Добавить пользователя
$(document).on('click', '#addDemoUser', function () {
    var userData = {
        FirstName: $('#nameDemo').val(),
        LastName: $('#sirnameDemo').val(),
        DateOfBirth: $('#dateOdBirdthDemo').val(),
        Sity: $('#sityDemo').val(),
        PhoneNumber: $('#phoneDemo').val(),
        Email: $('#emailDemo').val(),
        Role: $('#roleDemo').val(),
        Salary: $('#salaryDemo').val(),
        Id: $('#privateIdDemo').val()
    };

    var url = '/api/DataBase/adduser';

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function (data) {
            LoadDataBase();
            $('#closeModalForm').click();
        },
        error: function (error) {
            console.log(error);
        }
    });

});

// Открыть модальное окно удаления пользователя
$(document).on('click', '#deleteUser', function () {

    var url = '../Progects/DeleteDemoUser';

    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            $('#modalForm .modal-title').text('Удалить пользователя из "Демо" таблицы');
            $('#modalForm .modal-body').html(data);
            $('#modalForm').modal('show');
        },
        error: function (error) {
            console.log(error);
        }
    });
});

// Удаление пользоватеяля из кнопки вверху:
$(document).on('click', '#deleteDemoUser', function () {

    // получить Id удаляемого пользователя
    var System_Id = $('#valueDeletedUser').val();

    if (System_Id != '') {
        // проверка id на соответствие
        var url = `/api/DataBase/checkuser`;
        $.ajax({
            url: url,
            type: 'GET',
            data: { System_Id: System_Id },
            success: function (data) {

                if (data) {
                    // удаление
                    DeleteDemoUser(System_Id);

                    // Закрытие формы
                    $('#closeModalForm').click();
                }
                else {
                    $('#errorLabelDeleteUser').html('<strong class="text-danger">Такого пользователя нет</strong>');
                    $('#errorLabelDeleteUser').removeClass('d-none');
                }                  
            },
            error: function (error) {
                console.log(error);
            }
        });        
    }
    else {
        $('#errorLabelDeleteUser').html('<strong class="text-danger">Id введен неверно</strong>');
        $('#errorLabelDeleteUser').removeClass('d-none');        
    }    
});

// Удалить пользователя - основная функция
function DeleteDemoUser(System_Id) {
    $.ajax({
        url: '/api/DataBase/deleteuser',
        type: 'DELETE',
        data: { System_Id: System_Id },
        success: function (data) {

            // Перезагрузка страницы
            LoadDataBase();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// Удаление пользователя по кнопке справа
$(document).on('click', '.deleteDemoUser', function (e) {
    e.preventDefault(); // Предотвратить переход по ссылке

    var System_Id = this.querySelector('a').getAttribute('data-user-id');

    // Показать всплывающее окно для подтверждения удаления
    if (confirm("Уверены, что хотите удалить пользователя с id " + System_Id + "?")) {

        // удаляем пользователя с полученным Id
        DeleteDemoUser(System_Id);
    }
});

// загрузка данных с сервера в таблицу
function LoadDataBase() {

    var url = '/api/DataBase/getallusers';

    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            var html = DataConstruction(data);

            $('#dataBaseMain').html(html);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// Построение таблицы с данными
function DataConstruction(data) {
    var html ='';
    for (var i = 0; i < data.length; i++) {
        
        html += `<tr>
            <td>${data[i].system_Id}</td>
            <td>${data[i].firstName}</td>
            <td>${data[i].lastName}</td>
            <td>${data[i].dateOfBirth}</td>
            <td>${data[i].sity}</td>
            <td>${data[i].phoneNumber}</td>
            <td>${data[i].email}</td>
            <td>${data[i].role}</td>
            <td>${data[i].salary}</td>
            <td>${data[i].id}</td>
            <td class="editDemoUser"><a data-user-id="${data[i].system_Id}">&#9998;</a></td>
            <td class="deleteDemoUser"><a data-user-id="${data[i].system_Id}">&#10060;</a></td>
            </tr>`;
    };
    return html;
}

// открыть модальное окно выбора демо пользователя для редактирования (просто открывает форму)
$(document).on('click', '#openChangeDemoUser', function () {

    var url = '../Progects/ModalFormChangeDemoUser';

    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            $('#modalForm .modal-title').text('Введите id пользователя для редактирования ');
            $('#modalForm .modal-body').html(data);
            $('#modalForm').modal('show');
        },
        error: function (error) {
            console.log(error);
        }
    });
});

// открыть модальное окно выбора демо пользователя для редактирования (проверка id на соответствие и при совпадении открывает форму редактирования)
$(document).on('click', '#changeDemoUser', function () {

    var idForChange = $('#idChangeDemoUser').val();
    
    if (idForChange != "")
    {
        if (!isNaN(idForChange))
        {
            // проверка id на соответствие
            var url = `/api/DataBase/checkuser`;
            $.ajax({
                url: url,
                type: 'GET',
                data: { System_Id: idForChange },
                success: function (data) {
                    if (data)
                    {
                        OpenModalChangeUserById(idForChange);
                    }
                    else
                    {                        
                        $('#errorLabelChangeUser').html('<strong class="text-danger">Такого пользователя нет</strong>');
                        $('#errorLabelChangeUser').removeClass('d-none');
                    }                    
                },
                error: function (error) {
                    console.log(error);                   
                }
            });
        }
        else
        {
            $('#errorLabelChangeUser').html('<strong class="text-danger">Id должен состоять из цифр</strong>');
            $('#errorLabelChangeUser').removeClass('d-none');
        }
    }
    else
    {        
        $('#errorLabelChangeUser').html('<strong class="text-danger">Id не введен</strong>');
        $('#errorLabelChangeUser').removeClass('d-none');
    }  
});

// открыть модальное окно изменение демо юзера по кнопке в таблице
$(document).on('click', '.editDemoUser', function (e) {
    e.preventDefault(); // Предотвратить переход по ссылке

    var System_Id = this.querySelector('a').getAttribute('data-user-id');

    OpenModalChangeUserById(System_Id);
    
});

function OpenModalChangeUserById(System_Id) { // открывает форму изменения данных по id
    var url = '../Progects/ChangeDemoUser';
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            $('#modalForm .modal-title').text('Замените необходимые данные');
            $('#modalForm .modal-body').html(data);
            $('#modalForm').modal('show');


            ShowDataDemoUser(System_Id);

        },
        error: function (error) {
            console.log(error);            
        }
    });
}

// заполнить данными поля изменения демо юзера
function ShowDataDemoUser(System_Id) {

    console.log("Данные по пользователю" + System_Id);
    var url = '/api/DataBase/getuserbyid';

    $.ajax({
        url: url,
        type: 'GET',
        data: { System_Id: System_Id },
        success: function (userData) {

            console.log("Успешный ответ");
            console.log(userData);

            var formattedDate = new Date(userData.dateOfBirth).toISOString().split('T')[0];

            $('#nameDemo').val(userData.firstName);
            $('#sirnameDemo').val(userData.lastName);
            $('#dateOdBirdthDemo').val(formattedDate);
            $('#sityDemo').val(userData.sity);
            $('#phoneDemo').val(userData.phoneNumber);
            $('#emailDemo').val(userData.email);
            $('#roleDemo').val(userData.role);
            $('#salaryDemo').val(userData.salary);
            $('#privateIdDemo').val(userData.id);

            $('#changeDemoUserById').data('system-id', System_Id);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// сохранить измененные данные на сервер
$(document).on('click', '#changeDemoUserById', function () {

    var System_Id = $(this).data('system-id');

    var userData = {
        FirstName: $('#nameDemo').val(),
        LastName: $('#sirnameDemo').val(),
        DateOfBirth: $('#dateOdBirdthDemo').val(),
        Sity: $('#sityDemo').val(),
        PhoneNumber: $('#phoneDemo').val(),
        Email: $('#emailDemo').val(),
        Role: $('#roleDemo').val(),
        Salary: $('#salaryDemo').val(),
        Id: $('#privateIdDemo').val(),
        System_Id: System_Id
    };

    var url = '/api/DataBase/changeuserbyid';

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function (data) {

            console.log("Все ок!");

            LoadDataBase();
            $('#closeModalForm').click();
        },
        error: function (error) {
            console.log(error);
        }
    });
});

// скачать демо табшлицу 
$(document).on('click', '#downloadAllData', function () {
    var url = '/api/DataBase/getallusers';

    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            // Создай HTML-таблицу
            var table = "<table border='1'>";

            // Заголовки
            table += "<tr>";
            for (var header in data[0]) {
                table += "<th>" + header + "</th>";
            }
            table += "</tr>";

            // Данные
            for (var i = 0; i < data.length; i++) {
                table += "<tr>";
                for (var cell in data[i]) {
                    table += "<td>" + data[i][cell] + "</td>";
                }
                table += "</tr>";
            }

            table += "</table>";

            // Преобразуй в Blob
            var blob = new Blob(["\ufeff", table], { type: 'application/vnd.ms-excel;charset=windows-1251' });

            // Создай временный элемент для скачивания
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'yourFileName.xls';
            link.click();
        },
        error: function (error) {
            console.log(error);
        }
    });
});