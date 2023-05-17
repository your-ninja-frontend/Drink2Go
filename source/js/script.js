window.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.header');
  const nav = document.querySelector('.navigation');
  const buttonMenu = nav.querySelector('.button-menu');
  const navMain = nav.querySelector('.navigation-main');
  const navUser = nav.querySelector('.navigation-user');
  const mapStatic = document.querySelector('.map-static')
  const sorting = document.querySelector('.sorting');
  const sortingButton = sorting.querySelector('.sorting__button');
  const sortingList = sorting.querySelector('.sorting__list');

  // NO_JS

  header.classList.remove('header--no-js');
  buttonMenu.classList.remove('button-menu--no-js');
  navMain.classList.remove('navigation-main--no-js');
  navUser.classList.remove('navigation-user--no-js');
  mapStatic.classList.remove('map-static--no-js');

  // UTILS

  const ecsEvt = e => {
    return e.key === 'Escape' || e.key === 'Esc';
  };

  const escKeydown = (e, fn) => {
    if (ecsEvt(e)) {
      e.preventDefault();
      fn();
    };
  }

  // BURGER

  const onMenuEscKeydown = (e) => escKeydown(e, closeMenu);

  const isMenuInActive = () => buttonMenu.classList.contains('navigation-main--inactive');

  const toggleMenu = () => {
    buttonMenu.classList.toggle('button-menu--close');
    navMain.classList.toggle('navigation-main--inactive');
  };

  const showMenu = () => {
    toggleMenu();
    document.addEventListener('keydown', onMenuEscKeydown);
  };

  const closeMenu = () => {
    toggleMenu();
    document.removeEventListener('keydown', onMenuEscKeydown);
  };

  buttonMenu.addEventListener('click', (e) => {
    e.preventDefault();

    if (!isMenuInActive()) {
      showMenu();
    } else {
      closeMenu();
    };
  });

  // SLIDER

  const swiper = new Swiper('.swiper', {
    loop: true,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1440: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      }
    },
  });

  // MAP

  const map = L.map('map')
    .setView({
      lat: 59.968322,
      lng: 30.317359,
    }, 20);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const icon = L.icon({
    iconUrl: '/img/icon-place-map.svg',
    iconSize: [38, 50],
    iconAnchor: [0, 50]
  });

  const mapMarker = L.marker(
    {
      lat: 59.968255,
      lng: 30.317335,
    },
    {
      icon: icon,
    }
  );

  mapMarker.addTo(map);

  // SORTING JUST SHOW FOR TEST

  const onSortingEscKeydown = (e) => escKeydown(e, closeSortingList);

  const showSortingList = () => {
    sortingList.classList.add('sorting__list--active');
    sortingButton.removeEventListener('click', showSortingList);
    sortingButton.addEventListener('click', closeSortingList);
    document.addEventListener('keydown', onSortingEscKeydown);
  };

  const closeSortingList = () => {
    sortingList.classList.remove('sorting__list--active');
    sortingButton.removeEventListener('click', closeSortingList);
    document.removeEventListener('keydown', onSortingEscKeydown);
    sortingButton.addEventListener('click', showSortingList);
  };

  sortingButton.addEventListener('click', (e) => {
    sortingButton.addEventListener('click', closeSortingList);
    showSortingList();
  });

});
