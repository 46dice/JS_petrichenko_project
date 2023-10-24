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

    //Классы

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
            this.courseValute = 10;
            this.changeUAH();
            this.element = 'menu__item';
        }

        changeUAH() {
            this.price = this.price * this.courseValute;
        }

        render() {
            const element = document.createElement('div');
            element.classList.add(this.element, ...this.classes);

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                    `
            this.parentSelector.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        22,
        '.menu .container',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        'elite',
        'Меню “Премиум”',
        'Меню “Премиум” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        21,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        'post',
        'Меню "Постное"',
        'Меню "Постное" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        23,
        '.menu .container'
    ).render();

    //AJAX, Сервер

    const inputRub = document.querySelector('#rub'),
        inputUsd = document.querySelector('#usd');

    inputRub.addEventListener('input', () => {
        const request = new XMLHttpRequest();

        request.open('GET', 'js/current.json'); //собирает настройки которые помогут сделать запрос (method, url, async, login, password)
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.send(); //отправляет запрос

        request.addEventListener('readystatechange', () => { // Отслеживает готовность запроса в данный текущий момент
            if (request.status === 200 && request.readyState === 4) { // Так же обработчик событий 'load' срабатывает когда запрос завершен. Readystate() не нужен
                const data = JSON.parse(request.response);
                inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);

            } else {
                inputUsd.value = 'Что-то пошло не так...';
            }
        });
    });

    const forms = document.querySelectorAll('form');

    const objectMessages = {
        success: 'Выполнено. Мы с вами свяжемся',
        loading: 'Идёт загрузка',
        failure: 'Что-то пошло не так',
    }
    forms.forEach(form => {
        postForm(form);
    })

    function postForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader("Content-Type", "application/json");

            const formData = new FormData(form); // у inputoв должны присутствовать атрибут "name"!!! FormData() позволяет сформировать данные кототрые заполнил пользователь. Ключ: значение. 
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            request.send(JSON.stringify(object)); // отправляем на сервем методом send()

            const statusMessage = document.createElement('div'); //создание окошка, которое показывает статус запроса
            statusMessage.classList.add('messageFormWindow');
            statusMessage.innerHTML = `${objectMessages.loading}`;
            form.append(statusMessage);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.innerHTML = `${objectMessages.success}`;
                    form.reset();

                    setInterval(() => {
                        statusMessage.innerHTML = ""
                    }, 2000);
                } else {
                    statusMessage.innerHTML = `${objectMessages.failure}`;

                    setInterval(() => {
                        statusMessage.innerHTML = ""
                    }, 2000);
                }
            });
        });
    }

})