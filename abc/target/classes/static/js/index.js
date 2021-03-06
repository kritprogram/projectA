/*
Когда кликаем по кнопке log in выполняется функция авторизации
создается get запрос со значением логина введенным пользователем на адрес API сервера ГрГУ
При успешном выполнении запроса в скрытое поле помещается ID пользователя; на месте поля для идентификации помещается приветсвие пользователя и кнопка logout
ПО полученному ID пользователя создается get запрос на адрес сервера расписания студентов ГрГУ
По полученным данным отресовываем таблицу с расписание авторизованного пользователя в блоке html-страницы расписание занятий
Если пользователь не авторизован - в блоке расписане занятий отображается сообщение о необходимости идентификации
*/
$(function () {
    $('#do').on('click', function () {
        //var params = encodeURI("?login="+ $('#login').val());
        var params = encodeURI("?login=jraga_mv_12");
        $
            .get('https://api.grsu.by/1.x/app1/getStudent' + params)
            .done(function (data) {
                authorization (data);
            })
            .fail(function () {
                $('.contentSchedule p').removeClass('hidden');
            });
    });
    /*
    Обработчик на нажатие кнопки rfid. Вызываем собственный API который возвращает значение id rfid метки.
    Создается get запрос со значением id RFID метки на адрес API сервера ГрГУ
    При успешном выполнении запроса в скрытое поле помещается ID пользователя; на месте поля для идентификации помещается приветсвие пользователя и кнопка logout
    ПО полученному ID пользователя создается get запрос на адрес сервера расписания студентов ГрГУ
    По полученным данным отресовываем таблицу с расписание авторизованного пользователя в блоке html-страницы расписание занятий
    Если пользователь не авторизован - в блоке расписане занятий отображается сообщение о необходимости идентификации
    */
    $('#rfid').on('click', function () {
        $.getJSON("/rfid", null, function (item) {
            $.getJSON('https://api.grsu.by/1.x/app3/getStudentAllByCard?cardid=' + item)
                .done(function (data) {
                    authorization (data);
                })
                .fail(function () {
                    $('.contentSchedule p').removeClass('hidden');
                });
        });
    });

    var authorization = function (data) {
        if (data.id !== 0) {
            $('#tn').val(data.id);
            $('#hello').html('<div class="greetings">Hello, ' + data.fullname + '</div>');
            $('#logout').removeClass('hidden');
            $
                .get('https://api.grsu.by/1.x/app1/getGroupSchedule?studentId=' + $('#tn').val())
                .done(function (data) {
                    $('.message').addClass('hidden');
                    var $table = $('<table>').addClass('table')
                        .append($('<tbody>'));
                    data.days.forEach(function (element) {
                        $table
                            .append(
                                $('<tr>')
                                    .addClass('success')
                                    .append($('<td>').html(element.date))
                            );
                        element.lessons.forEach(function (lesson) {
                            $table
                                .append(
                                    $('<tr>')
                                        .append($('<td>').html(lesson.timeStart + ' - ' + lesson.timeEnd))
                                        .append($('<td>').html(lesson.type + ' ' + lesson.title))
                                        .append($('<td>').html(lesson.address + ': ' + lesson.room))
                                        .append($('<td>').html(lesson.teacher.fullname))
                                );
                        })
                    }, this);
                    $('.contentSchedule').append($table);
                });
        }
        else {
            alert("Проверьте корректность вводимых данных")
        }
    }

    /*
    Функция увеличения размера блока по которому произведен клик
    */
    $('#firstBlock').on('click', function () {
        $('.col-md-6').addClass('hidden');
        $('#firstBlockFull').removeClass('hidden');
    });
    $('#secondBlock').on('click', function () {
        $('.col-md-6').addClass('hidden');
        $('#secondBlockFull').removeClass('hidden');
    });
    $('#thirdBlock').on('click', function () {
        $('.col-md-6').addClass('hidden');
        $('#thirdBlockFull').removeClass('hidden');
    });
    $('#fourthBlock').on('click', function () {
        $('.col-md-6').addClass('hidden');
        $('#fourthBlockFull').removeClass('hidden');
    });
    /*
    Функция уменьшения размеров увеличенного блока по нажатию на кнопку закрытия блока
    */
    $('.close').on('click', function () {
        $('.col-md-6').removeClass('hidden');
        $('.fullScreen').addClass('hidden');
    });
    /*
    Функция перезагрузки страницы по нажатию на кнопку logout
    */
    $('#logout').on('click', function () {
        location.reload();
    });
});
