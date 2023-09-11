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


    sumCreditInput.value = 1000000;
    creditTermInput.value = 12;
    countProcentInput.value = 10;

    const variansOptions = [
        {
            variant: 'credit-term',
            text: 'Расчет срока кредита'
        },
        {
            variant: 'monthly-payment',
            text: 'Расчет ежемесячного платежа'
        },
        {
            variant: 'maximum-loan-amount',
            text: 'Расчет максимальной суммы кредита'
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
            li.dataset.variant = elem.variant
            li.innerHTML = elem.text;
            li.classList.add('calculation-option__item');
            calculationOptionList.append(li);
        })
    }

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

    renderCalculationOptionList(variansOptions);
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


                calculationOptionList.addEventListener('click', (e) => {
                    if (e.target.classList.contains('calculation-option__item')) {

                        const targetHtml = e.target.innerHTML;
                        calculationOptionText.innerHTML = targetHtml;
                        calculationOptionList.classList.remove('visible');
                        //находим index элемента в массиве по которому кликнули
                        //меняем элементы местами в массиве, ставим элемент первым
                        const index = variansOptions.map(el => el.text).indexOf(targetHtml);
                        variansOptions.unshift(...variansOptions.splice(index, 1))

                        renderCalculationOptionList(variansOptions);

                    }
                })
            }
        } else if (e.target === sumCredit) {
            resetActive();

            if (!sumCredit.classList.contains('active')) {
                sumCredit.classList.add('active')
                sumCredit.classList.add('transparent')
                sumCreditInput.focus();
            }

        } else if (e.target === creditTerm || e.target === creditTermInput) {
            resetActive();

            if (!creditTerm.classList.contains('active')) {
                creditTerm.classList.add('active')
                creditTerm.classList.add('transparent');
                creditTermInput.focus();
            }
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

                        const index = monthOrYearOptions.map(el => el.text).indexOf(targetHtml);
                        monthOrYearOptions.unshift(...monthOrYearOptions.splice(index, 1))

                        renderMonthOrYear(monthOrYearOptions);

                    }
                })
            }
        } else if (e.target === countProcent || e.target === countProcentInput) {
            resetActive();

            if (!countProcent.classList.contains('active')) {
                countProcent.classList.add('active');
                countProcent.classList.add('transparent');
                countProcentInput.focus();


            }
        }


        else {

            resetActive()
        }

    })


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

});