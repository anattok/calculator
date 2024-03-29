document.addEventListener('DOMContentLoaded', function () {
    const calculationOption = document.querySelector(".calculation-option");
    const calculationOptionList = document.querySelector(".calculation-option__list");
    const calculationOptionText = document.querySelector(".calculation-option__text");

    const sumCredit = document.querySelector(".sum-credit");
    const sumCreditInput = document.querySelector(".sum-credit__input");

    const monthlyPayment = document.querySelector(".monthly-payment");
    const monthlyPaymentInput = document.querySelector(".monthly-payment__input");

    const creditTerm = document.querySelector(".credit-term");
    const creditTermInput = document.querySelector(".credit-term__input");
    const monthOrYear = document.querySelector(".month-or-year");
    const monthOrYearList = document.querySelector(".month-or-year__list");
    const monthOrYearListText = document.querySelector(".month-or-year__text");
    const countProcent = document.querySelector(".count-procent");
    const countProcentInput = document.querySelector(".count-procent__input");
    const startDateInput = document.querySelector(".start-date__input");
    const bottomBox = document.querySelector(".wrapper__bottom");
    const buttonTotal = document.querySelector(".calculation__button");
    const typeCredit = document.querySelectorAll('input[name="typeCredit"]');
    const startPaymentDate = document.querySelector(".start-data");
    const startPaymentDateInput = document.querySelector(".start-date__input");
    const paymentSchedule = document.querySelector('.payment-schedule');
    const paymentScheduleList = document.querySelector('.payment-schedule__list');

    const calculation = document.querySelector('.calculation');
    const calculationContent = document.querySelector('.calculation__content');
    const calculationTotal = document.querySelector('.calculation__total');

    const wrapper = document.querySelector('.wrapper__top');


    const resetValuesInput = () => {

        creditTermInput.value = 12;
        countProcentInput.value = 10;

        if (monthlyPaymentInput) {
            monthlyPaymentInput.value = 20000;
        }

        if (sumCreditInput) {
            sumCreditInput.value = 1000000;
        }
    }

    resetValuesInput();

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
        calculationOption.classList.remove('active');
        calculationOptionList.classList.remove('visible');
        calculationOption.classList.remove('transparent');
        sumCredit.classList.remove('active');
        sumCredit.classList.remove('transparent');
        monthlyPayment.classList.remove('active');
        monthlyPayment.classList.remove('transparent');
        creditTerm.classList.remove('active');
        creditTerm.classList.remove('transparent');
        monthOrYear.classList.remove('active');
        monthOrYearList.classList.remove('visible');
        monthOrYear.classList.remove('transparent');
        countProcent.classList.remove('active');
        countProcent.classList.remove('transparent');
    }


    //ОПИСАНИЕ ФУНКЦИИ calculatePayment  Расчет ежемесячного платежа
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

        let principalAmount = principal;

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

            console.log('annuity')
            // Преобразование годовой процентной ставки в месячную и вычисление месячной ставки
            const monthlyInterestRate = (annualInterestRate / 100) / 12;

            // Вычисление аннуитетного коэффициента
            const annuityFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, monthCount)) /
                (Math.pow(1 + monthlyInterestRate, monthCount) - 1);

            // Рассчитываем аннуитетный платеж
            const annuityPayment = principal * annuityFactor;

            let interestCharges = 0;
            let totalPayout = 0;


            // Итерируемся через каждый месяц и рассчитываем платежи
            let balance = principal;
            for (let i = 1; i <= monthCount; i++) {
                //Выплата процентов
                const interestPayment = balance * monthlyInterestRate;
                //основной платеж
                const principalPayment = annuityPayment - interestPayment;
                balance = balance - principalPayment;

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

                interestCharges += Number(interestPayment.toFixed(2));
                totalPayout += Number(annuityPayment);
            }

            calculationContent.classList.add("hidden");
            calculationTotal.classList.remove("hidden");

            calculationTotal.innerHTML = `
            <div class="calculation__payment-count">
                <span>Ежемесячный платеж:</span>
                <span>${annuityPayment.toFixed(2)}</span>
            </div>
            <div class="calculation__procent-count">
                <span>Начисленные проценты:</span>
                <span>${interestCharges.toFixed(2)}</span>
            </div>
            <div class="calculation__total-count">
                <span>Общая выплата:</span>
                <span>${totalPayout.toFixed(2)}</span>
            </div>
            
            `;

            console.log("Ежемесячный платеж", annuityPayment.toFixed(2))
            console.log("Начисленные проценты", interestCharges.toFixed(2))
            console.log("Общая выплата", totalPayout.toFixed(2))



        } else if (paymentType === 'differentiated') {

            console.log('differentiated')
            // платеж по основному долгу
            const principalPayment = parseFloat(Number((principal / monthCount)).toFixed(2));

            let interestCharges = 0;
            let totalPayout = 0;
            let firstPayloat = 0;
            let lastPayloat = 0;

            for (let i = 1; i <= monthCount; i++) {
                const currentDate = new Date(date);
                currentDate.setMonth(currentDate.getMonth() + i);
                const month = currentDate.getMonth();
                const year = currentDate.getFullYear();

                //получаем количество дней в месяце
                const lastDay = new Date(year, month, 0).getDate();

                //начисленные проценты в этом месяце, зависит от каоличества дней в месяце
                const countProcent = parseFloat(Number(((principalAmount * annualInterestRate * lastDay) / 365) / 100).toFixed(2));

                //сколько составит платеж в текущем месяце
                const totalMonthPayment = parseFloat(Number(principalPayment + countProcent).toFixed(2));

                if (i === 1) {
                    firstPayloat = totalMonthPayment;
                }

                if (i === +monthCount) {
                    lastPayloat = totalMonthPayment;
                }

                // "ДАТА ПЛАТЕЖА": normalTypeDate,
                // "СУММА ПЛАТЕЖА": totalMonthPayment,
                // "ПОГАШЕНИЕ ДОЛГА": principalPayment,
                // "ПОГАШЕНИЕ ПРОЦЕНТОВ": countProcent,
                // "ОСТАТОК ДОЛГА": principalAmount,

                if (totalMonthPayment > principalAmount) {
                    principalAmount = 0;
                } else {
                    //сколько оталось тела кредита
                    principalAmount = parseFloat(Number(principalAmount - principalPayment).toFixed(2));
                }

                result.push({
                    id: i,
                    "date": currentDate.toISOString().slice(0, 10),
                    "summ": totalMonthPayment,
                    "debt": principalPayment,
                    "procent": countProcent,
                    "balance": principalAmount,

                })

                interestCharges += Number(countProcent.toFixed(2));
                totalPayout += Number(totalMonthPayment);

            }



            calculationContent.classList.add("hidden");
            calculationTotal.classList.remove("hidden");

            calculationTotal.innerHTML = `
            <div class="calculation__payment-count">
                <span>Ежемесячный платеж:</span>
                <span>${firstPayloat.toFixed(2)} → ${lastPayloat.toFixed(2)}</span>
            </div>
            <div class="calculation__procent-count">
                <span>Начисленные проценты:</span>
                <span>${interestCharges.toFixed(2)}</span>
            </div>
            <div class="calculation__total-count">
                <span>Общая выплата:</span>
                <span>${totalPayout.toFixed(2)}</span>
            </div>
            
            `;

            console.log("Ежемесячный платеж первый", firstPayloat.toFixed(2))
            console.log("Ежемесячный платеж последний", lastPayloat.toFixed(2))
            console.log("Начисленные проценты", interestCharges.toFixed(2))
            console.log("Общая выплата", totalPayout.toFixed(2))

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


        const title = document.createElement("li");
        title.classList.add("payment-schedule_top-title")
        title.innerHTML = `
            <span>№</span>
            <span>ДАТА ПЛАТЕЖА</span>
            <span>СУММА ПЛАТЕЖА</span>
            <span>ПОГАШЕНИЕ ДОЛГА</span>
            <span>ПОГАШЕНИЕ ПРОЦЕНТОВ</span>
            <span>ОСТАТОК ДОЛГА</span>
    `
        paymentScheduleList.prepend(title);

    }

    //ОПИСАНИЕ ФУНКЦИИ calculateLoanPayments  Расчет максимальной суммы кредита
    // interestRate => ставка
    // monthlyPayment => месячный платёж
    // monthOrYear => МЕСЯЦЕВ ИЛИ ЛЕТ
    // numberOfPayments => КОЛИЧЕСТВО (МЕСЯЦЕВ ИЛИ ЛЕТ)
    // date => ДАТА
    const calculateLoanPayments = (interestRate, monthlyPayment, numberOfPayments, monthOrYear, date) => {

        // Точное количество месяцев
        let monthCount;

        if (monthOrYear === "year") {
            monthCount = numberOfPayments * 12;
        } else if (monthOrYear === "month") {
            monthCount = numberOfPayments;
        } else {
            throw new Error("Некорректное значение для monthOrYear. Используйте 'year' или 'month'.");
        }

        const monthlyInterestRate = (interestRate / 100) / 12;
        let currentBalance = monthlyPayment / (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, monthCount) / (Math.pow(1 + monthlyInterestRate, monthCount) - 1));

        const result = [];

        let maxSum = 0;
        let interestCharges = 0;
        let totalPayout = 0;

        for (let i = 1; i <= monthCount; i++) {
            const interestPayment = currentBalance * monthlyInterestRate;
            const principalPayment = monthlyPayment - interestPayment;
            currentBalance -= principalPayment;

            const paymentDate = new Date(date);
            paymentDate.setMonth(paymentDate.getMonth() + i);

            const payment = {
                id: i,
                date: paymentDate.toISOString().slice(0, 10),
                summ: monthlyPayment,
                debt: principalPayment.toFixed(2),
                procent: interestPayment.toFixed(2),
                balance: currentBalance.toFixed(2),
            };

            result.push(payment);


            interestCharges += Number(interestPayment.toFixed(2));
            totalPayout += Number(monthlyPayment);
            maxSum += Number(principalPayment.toFixed(2));
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


        const title = document.createElement("li");
        title.classList.add("payment-schedule_top-title")
        title.innerHTML = `
                <span>№</span>
                <span>ДАТА ПЛАТЕЖА</span>
                <span>СУММА ПЛАТЕЖА</span>
                <span>ПОГАШЕНИЕ ДОЛГА</span>
                <span>ПОГАШЕНИЕ ПРОЦЕНТОВ</span>
                <span>ОСТАТОК ДОЛГА</span>
        `
        paymentScheduleList.prepend(title);


        calculationContent.classList.add("hidden");
        calculationTotal.classList.remove("hidden");

        calculationTotal.innerHTML = `
            <div class="calculation__payment-count">
                <span>Максимальная сумма кредита:</span>
                <span>${maxSum.toFixed(2)}</span>
            </div>
            <div class="calculation__procent-count">
                <span>Начисленные проценты:</span>
                <span>${interestCharges.toFixed(2)}</span>
            </div>
            <div class="calculation__total-count">
                <span>Общая выплата:</span>
                <span>${totalPayout.toFixed(2)}</span>
            </div>
            
            `;

        console.log("Максимальная сумма кредита", maxSum.toFixed(2))
        console.log("Начисленные проценты", interestCharges.toFixed(2))
        console.log("Общая выплата", totalPayout.toFixed(2))
    }

    //ОПИСАНИЕ ФУНКЦИИ calculateLoanTerm  Расчет срока кредита
    //   loanAmount => Сумма кредита
    //   monthlyPayment => Ежемесячный платеж
    //   interestRate => Процентная ставка (годовая)
    //   startDate => Начальная дата выплат (год, месяц, день)
    const calculateLoanTerm = (loanAmount, monthlyPayment, interestRate, startDate) => {
        // Преобразуем процентную ставку в месячную долю
        const monthlyInterestRate = (interestRate / 100) / 12;

        // Вычисляем количество месяцев, необходимых для погашения кредита
        const numberOfMonths = Math.log(monthlyPayment / (monthlyPayment - (loanAmount * monthlyInterestRate))) /
            Math.log(1 + monthlyInterestRate);

        // Рассчитываем полные годы и остаток месяцев
        const years = Math.floor(numberOfMonths / 12);
        const months = Math.round(numberOfMonths % 12);


        const result = [];


        let currentBalance = loanAmount;


        for (let i = 1; i <= numberOfMonths + 1; i++) {
            // Рассчитываем проценты и сумму гашения долга для текущего платежа
            const interestPayment = currentBalance * monthlyInterestRate;
            let principalPayment = monthlyPayment - interestPayment;

            // Проверяем, чтобы остаток долга не стал отрицательным
            if (currentBalance < principalPayment) {
                principalPayment = currentBalance;
                currentBalance = 0;
            } else {
                currentBalance = currentBalance - principalPayment;
            }

            const paymentDate = new Date(startDate);
            paymentDate.setMonth(paymentDate.getMonth() + i);
            // Создаем объект для хранения данных о платеже
            const payment = {
                id: i,
                date: paymentDate.toISOString().slice(0, 10),
                summ: monthlyPayment,
                debt: principalPayment.toFixed(2),
                procent: interestPayment.toFixed(2),
                balance: currentBalance.toFixed(2),
            };


            result.push(payment);

        }

        // Рассчитываем начисленные проценты и общую выплату
        const totalInterest = (monthlyPayment * numberOfMonths) - loanAmount;
        const totalPayment = monthlyPayment * numberOfMonths;

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


        const title = document.createElement("li");
        title.classList.add("payment-schedule_top-title")
        title.innerHTML = `
                <span>№</span>
                <span>ДАТА ПЛАТЕЖА</span>
                <span>СУММА ПЛАТЕЖА</span>
                <span>ПОГАШЕНИЕ ДОЛГА</span>
                <span>ПОГАШЕНИЕ ПРОЦЕНТОВ</span>
                <span>ОСТАТОК ДОЛГА</span>
        `
        paymentScheduleList.prepend(title);


        calculationContent.classList.add("hidden");
        calculationTotal.classList.remove("hidden");

        calculationTotal.innerHTML = `
            <div class="calculation__payment-count">
                <span>Срок кредита:</span>
                <span>${years} год(а) и ${months} месяц(ев)</span>
            </div>
            <div class="calculation__procent-count">
                <span>Начисленные проценты:</span>
                <span>${totalInterest.toFixed(2)}</span>
            </div>
            <div class="calculation__total-count">
                <span>Общая выплата:</span>
                <span>${totalPayment.toFixed(2)}</span>
            </div>
            
            `;

        console.log("Срок кредита", `${years} год(а) и ${months} месяц(ев)`)
        console.log("Начисленные проценты", totalInterest.toFixed(2))
        console.log("Общая выплата", totalPayment.toFixed(2))
    }

    document.addEventListener('click', (e) => {
        //блок"Вариант расчета"
        if (e.target === calculationOption) {

            resetActive();

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
                        resetValuesInput();
                        maskInput();

                        paymentSchedule.classList.remove('visible');
                        calculationContent.classList.remove("hidden");
                        calculationTotal.classList.add("hidden");

                        wrapper.classList.remove("option-term");
                        wrapper.classList.add("option-maximum");
                        wrapper.classList.remove("option-monthly");



                    }
                    //условие для "Рассчет срока кредита"
                    else if (e.target.getAttribute('data-variant') === 'credit-term') {
                        bottomBox.classList.add("hidden");
                        resetValuesInput();
                        maskInput();

                        paymentSchedule.classList.remove('visible');
                        calculationContent.classList.remove("hidden");
                        calculationTotal.classList.add("hidden");

                        wrapper.classList.add("option-term");
                        wrapper.classList.remove("option-maximum");
                        wrapper.classList.remove("option-monthly");


                    }
                    //условие для "Расчет ежемесячного платежа"
                    else if (e.target.getAttribute('data-variant') === 'monthly-payment') {
                        bottomBox.classList.remove("hidden");
                        resetValuesInput();
                        maskInput();

                        paymentSchedule.classList.remove('visible');
                        calculationContent.classList.remove("hidden");
                        calculationTotal.classList.add("hidden");

                        wrapper.classList.remove("option-term");
                        wrapper.classList.remove("option-maximum");
                        wrapper.classList.add("option-monthly");


                    }
                })

            } else if (calculationOption.classList.contains('active')) {

                resetActive();
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
        } else if (e.target === monthlyPayment) {

            resetActive();

            if (!monthlyPayment.classList.contains('active')) {
                monthlyPayment.classList.add('active')
                monthlyPayment.classList.add('transparent')
                monthlyPaymentInput.focus();
            }


        }
        else if (e.target === creditTerm || e.target === creditTermInput) {

            resetActive();

            if (!creditTerm.classList.contains('active')) {
                creditTerm.classList.add('active')
                creditTerm.classList.add('transparent');
                creditTermInput.active();
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
            } else if (monthOrYear.classList.contains('active')) {
                resetActive();
            }
            //блок"Ставка"
        } else if (e.target === countProcent || e.target === countProcentInput) {
            resetActive();

            if (!countProcent.classList.contains('active')) {
                countProcent.classList.add('active');
                countProcent.classList.add('transparent');
                countProcentInput.focus();
            }

        } else if (e.target === startPaymentDate) {
            startPaymentDateInput.focus();
        }
        //действия кнпки 'Рассчет'"
        else if (e.target === buttonTotal) {
            e.preventDefault();

            paymentSchedule.classList.add("visible")
            paymentScheduleList.classList.add("visible")

            const option = calculationOptionText.getAttribute('data-variant');
            const summ = sumCreditInput.value.split(" ").slice(0, -1).join("");
            const monthlyPaymentSumm = monthlyPaymentInput.value.split(" ").slice(0, -1).join("");
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
                monthlyPaymentValue: monthlyPaymentSumm,
                termValue: term,
                monthOrYearOptionValue: monthOrYearOption,
                bidValue: bid,
                dateValue: dateValue,
                paymentTypeValue: paymentType
            }

            if (calculationOptionText.getAttribute('data-variant') === 'monthly-payment') {

                calculatePayment(data.summValue, data.bidValue, data.monthOrYearOptionValue, data.termValue, data.dateValue)

            } else if (calculationOptionText.getAttribute('data-variant') === 'maximum-loan-amount') {
                // (interestRate, monthlyPayment, numberOfPayments, monthOrYear, date)

                calculateLoanPayments(data.bidValue, data.monthlyPaymentValue, data.termValue, data.monthOrYearOptionValue, data.dateValue)

            } else if (calculationOptionText.getAttribute('data-variant') === 'credit-term') {

                calculateLoanTerm(data.summValue, data.monthlyPaymentValue, data.bidValue, data.dateValue)

            }

            paymentSchedule.scrollIntoView({ behavior: 'smooth' });


        } else {

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

        const maskMontlyPayment = {
            lazy: false,
            mask: 'num ₽',
            blocks: {
                num: {
                    mask: Number,
                    thousandsSeparator: ' '
                }
            }
        }

        IMask(sumCreditInput, maskOptions);
        IMask(creditTermInput, maskOptionsCount);
        IMask(countProcentInput, maskOptionsProcent);
        IMask(monthlyPaymentInput, maskMontlyPayment);

        flatpickr(startPaymentDateInput, {
            defaultDate: 'today', // Устанавливаем сегодняшнюю дату по умолчанию
            dateFormat: 'Y-m-d', // Формат даты
            disableMobile: true, // Отключаем мобильную версию datepicker
            locale: "ru"
        });

    }

    maskInput();

});