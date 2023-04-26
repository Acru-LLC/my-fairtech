// DATE PROTOTYPES
Date.prototype.ddmmyyyy = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return (dd[1] ? dd : "0" + dd[0]) + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + yyyy; // padding
};

Date.prototype.daym_shortyyyy = function () {

    var yyyy = this.getFullYear().toString();
    var mm = this.toLocaleString('uz-Cyrl', {month: 'short'}); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return (dd[1] ? dd : "0" + dd[0]) + " " + mm + " " + yyyy; // padding
};


//DD-MM-YYYY, HH:mm:ss FORMAT
Date.prototype.ddmmyyyyhhmm = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    var hh = this.getHours().toString()
    var min = this.getMinutes().toString()
    return (dd[1] ? dd : "0" + dd[0]) + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + yyyy + " " + (hh[1] ? hh : "0" + hh) + ":" + (min[1] ? min : "0" + min); // padding
};


//DD-MM-YYYY, HH:mm:ss FORMAT
Date.prototype.ddmmyyyyhhmmss = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    var hh = this.getHours().toString()
    var min = this.getMinutes().toString()
    var ss = this.getSeconds().toString()
    return (dd[1] ? dd : "0" + dd[0]) + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + yyyy + " " + (hh[1] ? hh : "0" + hh) + ":" + (min[1] ? min : "0" + min) + ":" + (ss[1] ? ss : "0" + ss); // padding
};

//DAY SHORT MONTH NAME YEAR, HH:mm FORMAT
Date.prototype.daym_shortyyyy_hm = function () {
    var yyyy = this.getFullYear().toString();
    var mm = this.toLocaleString('uz-Cyrl', {month: 'short'});
    var dd = this.getDate().toString();
    var hh = this.getHours().toString()
    var min = this.getMinutes().toString()
    return (dd[1] ? dd : "0" + dd[0]) + "-" + mm + "-" + yyyy + " " + (hh[1] ? hh : "0" + hh) + ":" + (min[1] ? min : "0" + min); // padding
};


Date.prototype.hhmm = function () {
    var hh = this.getHours().toString()
    var min = this.getMinutes().toString()
    return (hh[1] ? hh : "0" + hh) + ":" + (min[1] ? min : "0" + min); // padding
};


Date.prototype.hhmmss = function () {
    var hh = this.getHours().toString()
    var min = this.getMinutes().toString()
    var ss = this.getSeconds().toString()
    return (hh[1] ? hh : "0" + hh) + ":" + (min[1] ? min : "0" + min) + ":" + (ss[1] ? ss : "0" + ss) // padding
};

Date.prototype.mm = function () {
    var mm = this.toLocaleString('uz-Cyrl', {month: 'short'});
    return mm
};
Date.prototype.dd = function () {
    var dd = this.getDate().toString();
    return (dd[1] ? dd : "0" + dd[0]) // padding
};

Date.prototype.yyyy = function () {
    var yyyy = this.getFullYear().toString();
    return yyyy
};






