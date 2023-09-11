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

            console.log(data)

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