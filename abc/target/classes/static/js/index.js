/*
Когда кликаем по кнопке log in выполняется функция авторизации
создается post запрос со значения логин и пароль введенные пользователем на адрес сервера авторизации ГрГУ
При успешном выполнении запроса в скрытое поле помещается ID пользователя; на месте полей для идентификации помещается приветсвие пользователя и кнопка logout
ПО полученному ID пользователя создается get запрос на адрес сервера расписания студентов ГрГУ
По полученным данным отресовываем таблицу с расписание авторизованного пользователя в блоке html-страницы расписание занятий
Если пользователь не авторизован - в блоке расписане занятий отображается сообщение о необходимости идентификации
*/
$(function () {
    $('#do').on('click', function () {
        //var params = encodeURI("?login="+ $('#login').val());
        var params = encodeURI("?login=jraga_mv_12");
        $
        .get('http://api.grsu.by/1.x/app1/getStudent' + params)
        .done(function (data) {
            $('#tn').val(data.id);
            $('#hello').html('Hello, ' + data.fullname);
            $('#logout').removeClass('hidden');
            $
                    .get('http://api.grsu.by/1.x/app1/getGroupSchedule?studentId=' + $('#tn').val())
                    .done(function (data) {
                        $('.contentSchedule p').addClass('hidden');
                        var $table = $('<table>').addClass('table')
                                .append($('<tbody>'));
                        data.days.forEach(function (element) {
                            printLineWithDate($table, element.date)
                            element.lessons.forEach(function (lesson) {
                                printLine($table, lesson)
                            })
                        }, this);
                        $('.contentSchedule').append($table);
                    });
        })
        .fail(function () {
            $('.contentSchedule p').removeClass('hidden');
        });
    });

    $('#rfid').on('click', function () {
        $.getJSON("/Home/RfidId", null, function (item) {
            $.get('http://api.grsu.by/1.x/app3/getStudentByCard?cardid=' + item)
			.done(function (data) {
			    $('#tn').val(data.id);
			    $.get('http://api.grsu.by/1.x/app1/getStudent' + params)
				.done(function (data) {
				    $('#tn').val(data.id);
				    $('#hello').html('Hello, ' + data.fullname);
				    $('#logout').removeClass('hidden');
				    $.get('http://api.grsu.by/1.x/app1/getGroupSchedule?studentId=' + $('#tn').val())
					.done(function (data) {
					    $('.contentSchedule p').addClass('hidden');
					    var $table = $('<table>').addClass('table')
						.append($('<tbody>'));
					    data.days.forEach(function (element) {
					        printLineWithDate($table, element.date)
					        element.lessons.forEach(function (lesson) {
					            printLine($table, lesson)
					        })
					    }, this);
					    $('.contentSchedule').append($table);
					});
				})
				.fail(function () {
				    $('.contentSchedule p').removeClass('hidden');
				});
			});
        });
    });

    var printLineWithDate = function ($table, tDate) {
        $table
            .append(
                $('<tr>')
                    .addClass('success')
                    .append($('<td>').html(tDate))
            );
    }
    var printLine = function ($table, lesson) {
        $table
        .append(
            $('<tr>')
                .append($('<td>').html(lesson.timeStart + ' - ' + lesson.timeEnd))
                .append($('<td>').html(lesson.type + ' ' + lesson.title))
                .append($('<td>').html(lesson.address + ': ' + lesson.room))
                .append($('<td>').html(lesson.teacher.fullname))
            );
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
