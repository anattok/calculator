document.addEventListener('DOMContentLoaded', function () {

    //начало блока "вариант рассчета"
    const calculationOption = document.querySelector(".calculation-option")
    const calculationOptionList = document.querySelector(".calculation-option__list")
    const calculationOptionText = document.querySelector(".calculation-option__text")
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

    renderCalculationOptionList(variansOptions);


    calculationOption.addEventListener('click', () => {
        if (!calculationOption.classList.contains('active')) {
            calculationOption.classList.add('active')
            calculationOptionList.classList.add('visible')
        } else {
            calculationOption.classList.remove('active')
            calculationOptionList.classList.remove('visible')
        }
    })

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

    //конец блока "Вариант рассчета"

    //Начало блока "Сумма кредита"
    const sumCredit = document.querySelector(".sum-credit")
    const sumCreditInput = document.querySelector(".sum-credit__input")

    sumCredit.addEventListener("click", () => {
        if (!sumCredit.classList.contains('active')) {
            sumCredit.classList.add('active')
        } else {
            sumCredit.classList.remove('active')
        }
    })

    sumCreditInput.value = 1000000

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

    IMask(sumCreditInput, maskOptions);

});