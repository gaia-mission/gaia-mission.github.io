class Client {
    constructor() {

    }

    // public
    getCookie(key) {
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split('; ');
        let cookieValue = this.getCookieValueFromArray(key, cookieArray);
        return cookieValue;
    }

    setCookie(key, value, days) {
        let date = this.getDateFromNowStepping(days)
        let expireDate = date.toUTCString();
        document.cookie = `${key}=${value}; expires=${expireDate}; path=/; secure=False; SameSite=None;`;
    }

    // private
    getCookieValueFromArray(key, cookieArray) {
        for (var index = 0; index < cookieArray.length; index++) {
            let cookieKey   = cookieArray[index].split('=')[0];
            let cookieValue = cookieArray[index].split('=')[1];
            if (key === cookieKey) {
                return cookieValue;
            }
        }
        return "";
    }

    getDateFromNowStepping(days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        return date;
    }
}