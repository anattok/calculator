document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector(".form");

    const calculationOption = document.querySelector(".calculation-option");
    const calculationOptionList = document.querySelector(".calculation-option__list");
    const calculationOptionText = document.querySelector(".calculation-option__text");

    const sumCredit = document.querySelector(".sum-credit");
    const sumCreditInput = document.querySelector(".sum-credit__input");

    const creditTerm = document.querySelector(".credit-term");
    const creditTermInput = document.querySelector(".credit-term__input");

    const monthOrYear = document.querySelector(".month-or-year");
    const monthOrYearList = document.querySelector(".month-or-year__list");
    const monthOrYearListText = document.querySelector(".month-or-year__text");

    const countProcent = document.querySelector(".count-procent");
    const countProcentInput = document.querySelector(".count-procent__input");

    const startDateInput = document.querySelector(".start-date__input");


    const bottomBox = document.querySelector(".bottom");

    const buttonTotal = document.querySelector(".calculation__button");

    const typeCredit = document.querySelectorAll('input[name="typeCredit"]')
    const resultImg = document.querySelector(".result__image");

    const paymentScheduleList = document.querySelector('.payment-schedule__list')



    sumCreditInput.value = 1000000;
    creditTermInput.value = 12;
    countProcentInput.value = 10;

    const variansOptions = [
        {
            variant: 'monthly-payment',
            text: 'Расчет ежемесячного платежа'
        },
        {
            variant: 'maximum-loan-amount',
            text: 'Расчет максимальной суммы кредита'
        },
        {
            variant: 'credit-term',
            text: 'Расчет срока кредита'
        },
    ];

    const monthOrYearOptions = [
        {
            monthoryear: 'year',
            text: 'Лет'
        },
        {
            monthoryear: 'month',
            text: 'Месяцев'
        },
    ]

    const renderCalculationOptionList = (arr) => {
        calculationOptionList.innerHTML = "";

        arr.forEach((elem) => {
            const li = document.createElement("li");
            li.innerHTML = elem.text;
            li.classList.add('calculation-option__item');
            li.dataset.variant = elem.variant;
            calculationOptionList.append(li);
        })
    }
    renderCalculationOptionList(variansOptions);

    const renderMonthOrYear = (arr) => {
        monthOrYearList.innerHTML = "";

        arr.forEach((elem) => {
            const li = document.createElement("li");
            li.dataset.monthoryear = elem.monthoryear
            li.innerHTML = elem.text;
            li.classList.add('month-or-year__item');
            monthOrYearList.append(li);
        })
    }
    renderMonthOrYear(monthOrYearOptions);

    const resetActive = () => {
        calculationOption.classList.remove('active')
        calculationOptionList.classList.remove('visible')
        calculationOption.classList.remove('transparent')
        sumCredit.classList.remove('active')
        sumCredit.classList.remove('transparent')
        creditTerm.classList.remove('active')
        creditTerm.classList.remove('transparent');
        monthOrYear.classList.remove('active')
        monthOrYearList.classList.remove('visible');
        monthOrYear.classList.remove('transparent');
        countProcent.classList.remove('active');
        countProcent.classList.remove('transparent');
    }


    //ОПИСАНИЕ ФУНКЦИИ calculatePayment 
    // principal => СУММА КРЕДИТА
    // annualInterestRate => СТАВКА
    // monthOrYear => МЕСЯЦЕВ ИЛИ ЛЕТ
    // numberOfPayments => КОЛИЧЕСТВО (МЕСЯЦЕВ ИЛИ ЛЕТ)
    // date => ДАТА
    // type => ТИП ПЛАТЕЖА (АНУИТЕТНЫЙ ИЛИ ДИФФЕРЕНЦИРОВАННЫЙ)
    const calculatePayment = (principal, annualInterestRate, monthOrYear, numberOfPayments, date) => {
        // Точное количество месяцев
        let monthCount;
        //Тип платежа
        let paymentType;

        if (monthOrYear === "year") {
            monthCount = numberOfPayments * 12;
        } else if (monthOrYear === "month") {
            monthCount = numberOfPayments;
        } else {
            throw new Error("Некорректное значение для monthOrYear. Используйте 'year' или 'month'.");
        }

        // Создаем массив для хранения платежей
        const result = [];


        //Вытаскиваем значение радиокнопки
        for (const button of typeCredit) {
            if (button.checked) {
                paymentType = button.value
            }
        }

        //Определение типа платежа аннуитентный/дифференцированный
        if (paymentType === 'annuity') {

            // Преобразование годовой процентной ставки в месячную и вычисление месячной ставки
            const monthlyInterestRate = (annualInterestRate / 100) / 12;

            // Вычисление аннуитетного коэффициента
            const annuityFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, monthCount)) /
                (Math.pow(1 + monthlyInterestRate, monthCount) - 1);

            // Рассчитываем аннуитетный платеж
            const annuityPayment = principal * annuityFactor;

            // Итерируемся через каждый месяц и рассчитываем платежи
            let balance = principal;
            for (let i = 1; i <= monthCount; i++) {
                const interestPayment = balance * monthlyInterestRate;
                const principalPayment = annuityPayment - interestPayment;
                balance -= principalPayment;

                const paymentDate = new Date(date);
                paymentDate.setMonth(paymentDate.getMonth() + i);

                const payment = {
                    id: i,
                    date: paymentDate.toISOString().slice(0, 10),
                    summ: annuityPayment.toFixed(2),
                    debt: principalPayment.toFixed(2),
                    procent: interestPayment.toFixed(2),
                    balance: balance.toFixed(2),
                };

                result.push(payment);
            }



        } else if (paymentType === 'differentiated') {

        }







        paymentScheduleList.innerHTML = "";

        result.forEach(elem => {
            const paymentScheduleItem = document.createElement("li");
            paymentScheduleItem.classList.add("payment-schedule__item")
            const id = document.createElement("span");
            const data = document.createElement("span");
            const summ = document.createElement("span");
            const debt = document.createElement("span");
            const procent = document.createElement("span");
            const balance = document.createElement("span");
            id.innerHTML = elem.id;
            data.innerHTML = elem.date;
            summ.innerHTML = elem.summ;
            debt.innerHTML = elem.debt;
            procent.innerHTML = elem.procent;
            balance.innerHTML = elem.balance;
            paymentScheduleItem.append(id);
            paymentScheduleItem.append(data);
            paymentScheduleItem.append(summ);
            paymentScheduleItem.append(debt);
            paymentScheduleItem.append(procent);
            paymentScheduleItem.append(balance);
            paymentScheduleList.append(paymentScheduleItem);
        })






    }







    //рассчет ежемесячного платежа (АНУИТЕТНЫЙ)
    const calculateAnnuityPayment = (principal, annualInterestRate, monthOrYear, numberOfPayments, date) => {
        let monthCount;

        if (monthOrYear === "year") {
            monthCount = numberOfPayments * 12;
        } else if (monthOrYear === "month") {
            monthCount = numberOfPayments;
        } else {
            throw new Error("Некорректное значение для monthOrYear. Используйте 'year' или 'month'.");
        }

        // Преобразование годовой процентной ставки в месячную и вычисление месячной ставки
        const monthlyInterestRate = (annualInterestRate / 100) / 12;

        // Вычисление аннуитетного коэффициента
        const annuityFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, monthCount)) /
            (Math.pow(1 + monthlyInterestRate, monthCount) - 1);

        // Рассчитываем аннуитетный платеж
        const annuityPayment = principal * annuityFactor;

        const result = []

        // Итерируемся через каждый месяц и рассчитываем платежи
        let balance = principal;
        for (let i = 1; i <= monthCount; i++) {
            const interestPayment = balance * monthlyInterestRate;
            const principalPayment = annuityPayment - interestPayment;
            balance -= principalPayment;

            const paymentDate = new Date(date);
            paymentDate.setMonth(paymentDate.getMonth() + i);

            const payment = {
                id: i,
                date: paymentDate.toISOString().slice(0, 10),
                summ: annuityPayment.toFixed(2),
                debt: principalPayment.toFixed(2),
                procent: interestPayment.toFixed(2),
                balance: balance.toFixed(2),
            };

            result.push(payment);
        }

        paymentScheduleList.innerHTML = "";

        result.forEach(elem => {
            const paymentScheduleItem = document.createElement("li");
            paymentScheduleItem.classList.add("payment-schedule__item")
            const id = document.createElement("span");
            const data = document.createElement("span");
            const summ = document.createElement("span");
            const debt = document.createElement("span");
            const procent = document.createElement("span");
            const balance = document.createElement("span");
            id.innerHTML = elem.id;
            data.innerHTML = elem.date;
            summ.innerHTML = elem.summ;
            debt.innerHTML = elem.debt;
            procent.innerHTML = elem.procent;
            balance.innerHTML = elem.balance;
            paymentScheduleItem.append(id);
            paymentScheduleItem.append(data);
            paymentScheduleItem.append(summ);
            paymentScheduleItem.append(debt);
            paymentScheduleItem.append(procent);
            paymentScheduleItem.append(balance);
            paymentScheduleList.append(paymentScheduleItem);
        })
    };

    //рассчет ежемесячного платежа (ДИФФЕРЕНЦИРОВАННЫЙ)
    const calculateDifferentiatedPayment = (principal, annualInterestRate, monthOrYear, numberOfPayments, date) => {

        let monthCount;
        let principalAmount = principal;

        if (monthOrYear === "year") {
            monthCount = Number(numberOfPayments) * 12;
        } else if (monthOrYear === "month") {
            monthCount = Number(numberOfPayments);
        } else {
            throw new Error("Некорректное значение для monthOrYear. Используйте 'year' или 'month'.");
        }

        // платеж по основному долгу
        const principalPayment = parseFloat(Number((principal / monthCount)).toFixed(2));

        const result = []
        let countAllProcent = 0


        for (let i = 1; i < monthCount + 1; i++) {
            const currentDate = new Date(date);
            currentDate.setMonth(currentDate.getMonth() + i);
            const month = currentDate.getMonth();
            const year = currentDate.getFullYear();


            //получаем количество дней в месяце
            const lastDay = new Date(year, month, 0).getDate();

            //сколько оталось тела кредита
            principalAmount = parseFloat(Number(principalAmount - principalPayment).toFixed(2));

            //начисленные проценты в этом месяце, зависит от каоличества дней в месяце
            const countProcent = parseFloat(Number(((principalAmount * annualInterestRate * lastDay) / 365) / 100).toFixed(2));

            //сколько составит платеж в текущем месяце
            const totalMonthPayment = parseFloat(Number(principalPayment + countProcent).toFixed(2));

            // "ДАТА ПЛАТЕЖА": normalTypeDate,
            // "СУММА ПЛАТЕЖА": totalMonthPayment,
            // "ПОГАШЕНИЕ ДОЛГА": principalPayment,
            // "ПОГАШЕНИЕ ПРОЦЕНТОВ": countProcent,
            // "ОСТАТОК ДОЛГА": principalAmount,

            result.push({
                id: i,
                "date": currentDate.toISOString().slice(0, 10),
                "summ": totalMonthPayment,
                "debt": principalPayment,
                "procent": countProcent,
                "balance": principalAmount,

            })



            //подсчитаем все проценты переплаты
            countAllProcent = countAllProcent + countProcent;

        }

        paymentScheduleList.innerHTML = "";

        result.forEach(elem => {
            const paymentScheduleItem = document.createElement("li");
            paymentScheduleItem.classList.add("payment-schedule__item")
            const id = document.createElement("span");
            const data = document.createElement("span");
            const summ = document.createElement("span");
            const debt = document.createElement("span");
            const procent = document.createElement("span");
            const balance = document.createElement("span");
            id.innerHTML = elem.id;
            data.innerHTML = elem.date;
            summ.innerHTML = elem.summ;
            debt.innerHTML = elem.debt;
            procent.innerHTML = elem.procent;
            balance.innerHTML = elem.balance;
            paymentScheduleItem.append(id);
            paymentScheduleItem.append(data);
            paymentScheduleItem.append(summ);
            paymentScheduleItem.append(debt);
            paymentScheduleItem.append(procent);
            paymentScheduleItem.append(balance);
            paymentScheduleList.append(paymentScheduleItem);
        })



    }




    //функция вывода рассчитаных данных
    // const paymentRender = (totalPayout, monthlyPayment, interestCharges, maximumLoanAmount) => {
    //     const wrapper = document.querySelector('.result__payment');
    //     // wrapper.innerHTML = "";
    //     resultImg.classList.add("hidden");

    //     const title = document.createElement("span")
    //     title.classList.add('result__payment-title');
    //     const titleCount = document.createElement("span")
    //     titleCount.classList.add('result__payment-count_count');


    //     const procent = document.createElement("span")
    //     procent.classList.add('result__payment-procent');
    //     const total = document.createElement("span")
    //     total.classList.add('result__payment-total');

    //     const procentCount = document.createElement("span")
    //     procentCount.classList.add('result__payment-procent_count');
    //     const totalCount = document.createElement("span")
    //     totalCount.classList.add('result__payment-total_count');

    //     const rowWrap = document.createElement("div").classList.add('row');

    //     title.innerHTML = monthlyPayment
    //     titleCount.innerHTML = monthlyPayment
    //     procent.innerHTML = monthlyPayment
    //     procentCount.innerHTML = monthlyPayment
    //     total.innerHTML = monthlyPayment
    //     totalCount.innerHTML = monthlyPayment

    //     wrapper.append(title);
    //     wrapper.append(titleCount);

    //     rowWrap.append(procent);
    //     // row.append(total);

    //     wrapper.append(rowWrap);

    // }



    document.addEventListener('click', (e) => {

        if (e.target === calculationOption) {

            resetActive()

            if (!calculationOption.classList.contains('active')) {
                calculationOption.classList.add('active');
                calculationOption.classList.add('transparent');
                calculationOptionList.classList.add('visible');

                //блок"Вариант Рассчета"
                calculationOptionList.addEventListener('click', (e) => {
                    if (e.target.classList.contains('calculation-option__item')) {

                        const targetHtml = e.target.innerHTML;
                        calculationOptionText.innerHTML = targetHtml;
                        calculationOptionText.dataset.variant = e.target.dataset.variant;
                        calculationOptionList.classList.remove('visible');
                        //находим index элемента в массиве по которому кликнули
                        //меняем элементы местами в массиве, ставим элемент первым
                        const index = variansOptions.map(el => el.text).indexOf(targetHtml);
                        variansOptions.unshift(...variansOptions.splice(index, 1))

                        renderCalculationOptionList(variansOptions);
                    }
                    //условие для "Рассчет максимальной суммы кредита"
                    if ((e.target.getAttribute('data-variant') === 'maximum-loan-amount')) {
                        bottomBox.classList.add("hidden");
                        sumCreditInput.value = 20000;
                        sumCredit.querySelector('label').innerHTML = 'Ежемесячный платеж';

                        maskInput();
                    }
                    //условие для "Рассчет срока кредита"
                    else if (e.target.getAttribute('data-variant') === 'credit-term') {
                        bottomBox.classList.add("hidden");
                        sumCreditInput.value = 1000000;
                        sumCredit.querySelector('label').innerHTML = 'Сумма кредита';

                        maskInput();
                    }
                    //условие для "Расчет ежемесячного платежа"
                    else if (e.target.getAttribute('data-variant') === 'monthly-payment') {
                        bottomBox.classList.remove("hidden");
                        sumCreditInput.value = 1000000;
                        sumCredit.querySelector('label').innerHTML = 'Сумма кредита';

                        maskInput();
                    }
                })
            } else if (calculationOption.classList.contains('active')) {
                resetActive()
            }
            //блок"Сумма Кредита"
        } else if (e.target === sumCredit) {
            resetActive();

            if (!sumCredit.classList.contains('active')) {
                sumCredit.classList.add('active')
                sumCredit.classList.add('transparent')
                sumCreditInput.focus();
            }
            //блок"Срок Кредита"
        } else if (e.target === creditTerm || e.target === creditTermInput) {
            resetActive();

            if (!creditTerm.classList.contains('active')) {
                creditTerm.classList.add('active')
                creditTerm.classList.add('transparent');
                creditTermInput.focus();
            }
            //блок"Месяцев или лет"
        } else if (e.target === monthOrYear) {
            resetActive();

            if (!monthOrYear.classList.contains('active')) {
                monthOrYear.classList.add('active');
                monthOrYear.classList.add('transparent');
                monthOrYearList.classList.add('visible');

                monthOrYearList.addEventListener('click', (e) => {
                    if (e.target.classList.contains('month-or-year__item')) {

                        const targetHtml = e.target.innerHTML;
                        monthOrYearListText.innerHTML = targetHtml;
                        monthOrYearList.classList.remove('visible');
                        monthOrYearListText.dataset.monthoryear = e.target.dataset.monthoryear;
                        const index = monthOrYearOptions.map(el => el.text).indexOf(targetHtml);
                        monthOrYearOptions.unshift(...monthOrYearOptions.splice(index, 1))

                        renderMonthOrYear(monthOrYearOptions);

                    }
                })
            }
            //блок"Ставка"
        } else if (e.target === countProcent || e.target === countProcentInput) {
            resetActive();

            if (!countProcent.classList.contains('active')) {
                countProcent.classList.add('active');
                countProcent.classList.add('transparent');
                countProcentInput.focus();


            }

            //действия кнпки 'Рассчет'"
        } else if (e.target === buttonTotal) {
            e.preventDefault();

            paymentScheduleList.classList.add("visible")

            const option = calculationOptionText.getAttribute('data-variant');
            const summ = sumCreditInput.value.split(" ").slice(0, -1).join("");
            const term = creditTermInput.value;
            const monthOrYearOption = monthOrYearListText.getAttribute('data-monthoryear');
            const bid = countProcentInput.value.split(" ").slice(0, -1).join("");
            const dateValue = startDateInput.value;
            let paymentType;


            if (bottomBox.classList.contains("hidden")) {
                paymentType = null
            } else {
                for (const button of typeCredit) {
                    if (button.checked) {
                        paymentType = button.value
                    }
                }
            }

            const data = {
                calculationOptionValue: option,
                summValue: summ,
                termValue: term,
                monthOrYearOptionValue: monthOrYearOption,
                bidValue: bid,
                dateValue: dateValue,
                paymentTypeValue: paymentType
            }


            //выбор рассчета типа платежа радиокнопками аннуитентный/дифференцированный
            if (paymentType === 'annuity') {
                console.log(calculateAnnuityPayment(data.summValue, data.bidValue, data.monthOrYearOptionValue, data.termValue, data.dateValue))
                console.log(data.dateValue)
            } else if (paymentType === 'differentiated') {
                console.log("differentiated")
                calculateDifferentiatedPayment(data.summValue, data.bidValue, data.monthOrYearOptionValue, data.termValue, data.dateValue)
            }


        }


        else {

            resetActive()
        }

    })

    function maskInput() {
        const maskOptions = {
            lazy: false,
            mask: 'num ₽',
            blocks: {
                num: {
                    mask: Number,
                    thousandsSeparator: ' '
                }
            }
        }

        const maskOptionsCount = {
            mask: /^[1-9]\d{0,2}$/

        }

        const maskOptionsProcent = {
            lazy: false,
            mask: 'num %',
            blocks: {
                num: {
                    mask: Number,
                }
            }
        }

        IMask(sumCreditInput, maskOptions);
        IMask(creditTermInput, maskOptionsCount);
        IMask(countProcentInput, maskOptionsProcent);



    }

    maskInput();

});