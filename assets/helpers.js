import axios from "axios";

function getCookie (cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setTokenCookie (token) {
    let now = new Date();
    let time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);

    document.cookie =
        'token=' + token +
        '; expires=' + now.toUTCString() +
        '; path=/';
}

function setAxiosHeader (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { getCookie, setTokenCookie, setAxiosHeader }
