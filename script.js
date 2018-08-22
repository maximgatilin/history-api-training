const images = {
  'Cat': 'https://imgix.bustle.com/uploads/image/2018/4/18/5f312113-eaa8-4e71-9360-871e51084f4f-fotolia_125402501_subscription_monthly_m.jpg?w=970&h=582&fit=crop&crop=faces&auto=format&q=70&dpr=2',
  'Dog': 'https://pbs.twimg.com/profile_images/948761950363664385/Fpr2Oz35_400x400.jpg',
  'Lada': 'http://www.venturemagazine.me/wp-content/uploads/2018/03/9-1024x499.jpg',
  'Liza': 'https://www.dhresource.com/webp/m/0x0s/f2-albu-g3-M01-BF-21-rBVaHFRiMJuATEDaAACab-kMVgQ391.jpg/lisa-ann-sexy-woman-poster-33.jpg'
};

const changeImage = url => {
  const imageContainer = document.getElementById('target-img');
  const selectHint = document.getElementById('selectHint');

  if (url) {
    imageContainer.style.display = 'block';
    selectHint.style.display = 'none';
    imageContainer.src = url;
  } else {
    imageContainer.style.display = 'none';
    selectHint.style.display = 'block';
  }
};

const markActiveLink = url => {
  const links = document.querySelectorAll('.menu-link');
  links.forEach(link => {
    if (link.href === url) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

const setupMenu = () => {
  const menuList = document.getElementById('menu-list');
  const menuListFragment = document.createDocumentFragment();

  Object.entries(images).forEach(([name, url]) => {
    const li = document.createElement('li');
    li.innerHTML = `<a href=${url} class="menu-link">${name}</a>`;

    menuListFragment.appendChild(li);
  });

  menuList.appendChild(menuListFragment);
};

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();

  document.addEventListener('click', (e) => {
    const isLinkClick = e.target.classList.contains('menu-link');

    if (isLinkClick) {
      e.preventDefault();
      const url = e.target.href;
      changeImage(url);
      markActiveLink(url);

      history.pushState({url}, null, `?img=${url}`);
    }
  });

  const locationQuery = searchToObject(location.search);
  changeImage(locationQuery.img);
  markActiveLink(locationQuery.img);
});

window.addEventListener("popstate", function (e) {
  const {state} = e;
  const url = state === null ? '' : state.url;
  changeImage(url);
  markActiveLink(url);
});

function searchToObject() {
  let pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;

  for (i in pairs) {
    if (pairs[i] === "") continue;

    pair = pairs[i].split("=");
    obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }

  return obj;
}
