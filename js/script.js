'use strict'

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

    // MODAL

    const modalOpenBtn = document.querySelectorAll('[data-modalOpen]'),
        modalCloseBtn = document.querySelector('[data-modalClose]'),
        modal = document.querySelector('[data-modal]');

    function openModal(selector) {
        selector.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    function closeModal(selector) {
        selector.style.display = 'none';
        document.body.style.overflow = '';
    };



    modalOpenBtn.forEach(item => {
        item.addEventListener('click', () => {
            openModal(modal);
        });
    });

    modalCloseBtn.addEventListener('click', () => {
        closeModal(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display === 'block') {
            closeModal(modal);
        }
    });

    function openModalByScroll() {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modal);
            window.removeEventListener('scroll', openModalByScroll);
        }
    };

    window.addEventListener('scroll', openModalByScroll);

    // //
    // // function User(name, id) {
    // //     this.name = name;
    // //     this.id = id;
    // //     this.admin = false;
    // // }

    // // const alex = new User('alex', 23);
    // // const ivan = new User('Ivan', 1);
    // // console.log(alex);
    // // console.log(ivan);

    // // function showThis(a, b) {
    // //     console.log(this);

    // //     function sum() {
    // //         console.log(this);
    // //         return a + b;
    // //     }
    // //     console.log(sum());
    // // }
    // // showThis(4, 5);

    // const obj = {
    //     a: 20,
    //     b: 15,
    //     sum: function () {

    //         function shout() {
    //             console.log(this);
    //         }
    //         shout();
    //     }
    // };
    // obj.sum();

    // // function User(name, id) {
    // //     this.name = name;
    // //     this.id = id;
    // //     this.admin = false;
    // // }

    // // const alex = new User('alex', 23);

    // function sayName(surname) {
    //     console.log(this);
    //     console.log(this.name + surname);
    // }

    // const user = {
    //     name: 'Nadya',
    // };

    // sayName.call(user, 'MATULYAK');
    // sayName.apply(user, ['MATULYAK']);

    // function count(num) {
    //     return this * num
    // }
    // const double = count.bind(2)
    // console.log(double(2));
    // console.log(double(12));
    // // 1) Обычная функция: this - window, но если 'use strict' - undefined
    // // 2) Контекст(this) у методов объекта - сам объект
    // // 3) this в конструкторах и классах - это новый экземпляр объекта
    // // 4) a. .bind() создаёт новую функцию и подвязывает контекст(this). В примере мы забиндили цифру 2 в контекст(this)
    // //   b. call() и apply() вручную присваивают контекст

    // const obj2 = {
    //     num: 5,
    //     sayNumber: function () {
    //         const say = () => {
    //             console.log(this); //Контекст(this) - это родитель стрелочной! функции. Контекст sayNumber = obj2
    //         }

    //         say(); 
    //     }
    // };
})