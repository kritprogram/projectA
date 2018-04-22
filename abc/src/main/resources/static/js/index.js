/*
Когда кликаем по кнопке log in выполняется функция авторизации
создается post запрос со значения логин и пароль введенные пользователем на адрес сервера авторизации ГрГУ
При успешном выполнении запроса в скрытое поле помещается ID пользователя; на месте полей для идентификации помещается приветсвие пользователя и кнопка logout
ПО полученному ID пользователя создается get запрос на адрес сервера расписания студентов ГрГУ
По полученным данным отресовываем таблицу с расписание авторизованного пользователя в блоке html-страницы расписание занятий
Если пользователь не авторизован - в блоке расписане занятий отображается сообщение о необходимости идентификации
*/
$(function(){
    $('#do').on('click', function(){
        var params = encodeURI("?login="+ $('#login').val() +"&password=" + $('#password').val());
        $
        .post('https://schedule.grsu.by/api/users'+ params)
        .done(function(data) {
            $('#tn').val(data.Id);
            $('#hello').html('Hello, ' + data.Name);
            $('#logout').removeClass('hidden');
            $
                    .get('http://schedule.grsu.by/api/timetable/students/' + $('#tn').val())
                    .done(function(data){
                    $('.contentSchedule p').addClass('hidden');
                        var $table = $('<table>').addClass('table')
                                .append($('<tbody>'));
                        var tDate = undefined;
                        data.forEach(function(element) {
                            if(element.Begin.substr(0,10) === tDate){
                                printLine($table, element)
                            } else {
                                tDate = element.Begin.substr(0,10);
                                printLineWithDate($table, tDate)
                                printLine($table, element)
                            }
                        }, this);
                        $('.contentSchedule').append($table);
                    });
        })
        .fail(function() {
                 $('.contentSchedule p').removeClass('hidden');
        });
    });

    var printLineWithDate = function($table, tDate){
        $table
            .append(
                $('<tr>')
                    .addClass('success')
                    .append($('<td>').html(tDate))
            );
    }
    var printLine = function($table, element){
        $table
        .append(
            $('<tr>')
                .append($('<td>').html(element.Begin.substr(11) + ' - ' + element.End.substr(11)))
                .append($('<td>').html(element.Subject.Title))
                .append($('<td>').html(element.Location.Title))
                .append($('<td>').html(element.Speakers.List[0].Name))
            );
    }
/*
Функция увеличения размера блока по которому произведен клик
*/
    $('#firstBlock').on('click', function(){
        $('.col-md-6').addClass('hidden');
        $('#firstBlockFull').removeClass('hidden');
    });
    $('#secondBlock').on('click', function(){
        $('.col-md-6').addClass('hidden');
        $('#secondBlockFull').removeClass('hidden');
    });
    $('#thirdBlock').on('click', function(){
        $('.col-md-6').addClass('hidden');
        $('#thirdBlockFull').removeClass('hidden');
    });
    $('#fourthBlock').on('click', function(){
        $('.col-md-6').addClass('hidden');
        $('#fourthBlockFull').removeClass('hidden');
    });
/*
Функция уменьшения размеров увеличенного блока по нажатию на кнопку закрытия блока
*/
    $('.close').on('click', function(){
        $('.col-md-6').removeClass('hidden');
        $('.fullScreen').addClass('hidden');
    });
/*
Функция перезагрузки страницы по нажатию на кнопку logout
*/
    $('#logout').on('click', function(){
        location.reload();
    });
});
