export function setCookie(cname, cvalue, extime) {
  const d = new Date();
  d.setTime(d.getTime() + extime);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function removeCookie() {
  document.cookie = 'accessToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
}
