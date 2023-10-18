'user strict'

window.addEventListener('DOMContentLoaded', () => {

    //TABS
    const parentTabs = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabscontent = document.querySelectorAll('.tabcontent');

    function hideTabContect() {
        tabscontent.forEach(item => {
            item.style.display = 'none';

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        });
    }

    function showTabContent(i = 0) {
        tabscontent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContect()
    showTabContent()

    parentTabs.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContect();
                    showTabContent(i);
                }
            })
        }
    })

    //TIMER

    const deadline = "2023-10-19";

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()), // Результат в миллисекундах
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function makeNum(num) {   //проверка числа на 2 цифры, подставление "0"
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else return num;
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock(); 
        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.innerHTML = makeNum(t.days);
            hours.innerHTML = makeNum(t.hours);
            minutes.innerHTML = makeNum(t.minutes);
            seconds.innerHTML = makeNum(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
})