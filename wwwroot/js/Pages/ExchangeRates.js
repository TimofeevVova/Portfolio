// конструктор модального окна курсов валют
function BuilderExchangeRates(data) {

    var currentDate = $(data).find('ValCurs').attr('Date');

    var html = '';

    html += `
    <p>Данные актуальны на дату - '${currentDate}'</p>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">Валюта</th>
                <th scope="col">Название</th>
                <th scope="col">Rub</th>                
            </tr>
        </thead>
        <tbody>
    `;

    $(data).find('Valute').each(function () {
        //var numCode = $(this).find('NumCode').text();
        var charCode = $(this).find('CharCode').text();
        //var nominal = $(this).find('Nominal').text();
        var name = $(this).find('Name').text();
        var value = $(this).find('Value').text();
        //var vunitRate = $(this).find('VunitRate').text();

        html += `        
            <tr>
                <td>${charCode}</td>
                <th scope="row">'${name}'</th>
                <td>${value}</td>                
            </tr>
        `;
    });

    html += '</tbody></table>';

    return html;
}