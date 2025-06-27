/**
 * Подсчитывает баланс (Доход − Расход) и выделяет отрицательные значения.
 */
function calculateAndHighlight() {
    const doc = Api.GetDocument();
    // Получаем диапазон активного листа
    const sheet = doc.GetCurrentSheet();
    const usedRange = sheet.GetUsedRange();
    const values = usedRange.GetValue();

    // Определяем индексы столбцов
    const headers = values[0];
    const idxIncome = headers.indexOf("Доход");
    const idxExpense = headers.indexOf("Расход");

    // Добавляем заголовок нового столбца «Баланс»
    headers.push("Баланс");
    sheet.GetRangeByIndexes(0, 0, 1, headers.length).SetValue([headers]);

    // Обрабатываем каждую строку с данными
    for (let i = 1; i < values.length; i++) {
        const row = values[i];
        const income = parseFloat(row[idxIncome]) || 0;
        const expense = parseFloat(row[idxExpense]) || 0;
        const balance = income - expense;

        // Записываем значение в новую ячейку
        sheet.GetCell(i, headers.length - 1).SetValue(balance);

        // Если баланс отрицательный — подсвечиваем строку красным фоном
        if (balance < 0) {
            const rowRange = sheet.GetRangeByIndexes(i, 0, 1, headers.length);
            rowRange.GetFormat().SetFillColor("#FFCCCC");
        }
    }

    // Добавляем итоговую строку с суммами
    const totals = ["Итого"];
    for (let j = 1; j < headers.length; j++) {
        const colRange = sheet.GetRangeByIndexes(1, j, values.length - 1, 1);
        const sum = colRange.Calculate("SUM");
        totals.push(sum);
    }
    sheet.GetRangeByIndexes(values.length, 0, 1, headers.length).SetValue([totals]);
}
