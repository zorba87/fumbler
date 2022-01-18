//재정의 ?
Date.prototype.toString = function () {
    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var date = this.getDate();
    date = date < 10 ? '0' + date : date;
    return year + '-' + month + '-' + date;
};

Date.prototype.toDateTime = function () {
    var hour = this.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    var minute = this.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    var second = this.getSeconds();
    second = second < 10 ? '0' + second : second;
    return this.toString() + ' ' + hour + ':' + minute + ':' + second;
};

//TODO 기능 오류 있음 나중에 수정 하자...
function parseTime(time) {
    var now = new Date();
    var created = new Date(time);
    
    var dateDiff = now.getDate() - created.getDate();
    var hourDiff = now.getHours() - created.getHours();
    var minuteDiff = now.getMinutes() - created.getMinutes();

    var year = created.getFullYear() < now.getFullYear();
    var month  = created.getMonth() + 1 < now.getMonth() + 1;
    var date = created.getDate() > 28;
    var hour = now.getMinutes() >= created.getMinutes() ? hourDiff : hourDiff - 1;
    var minute = now.getMinutes() >= created.getMinutes() ? minuteDiff : minuteDiff - 1;
    var second = now.getSeconds() - created.getSeconds();

    if(year || month || date) {
        return created.toString();
    } else if(dateDiff > 0) {
        return dateDiff + "일 전";
    } else if(hourDiff > 0) {
        return hour + "시간 전";
    } else if(minuteDiff > 0){
        return minute + "분 전";
    } else {
        return second+1 + "초 전";
    }
}


//TODO 기능 오류 있음
function newBadge(time) {
    var now = new Date();
    var created = new Date(time);
    if(now.getFullYear() === created.getFullYear() &&
        now.getMonth() + 1 === created.getMonth() + 1 &&
        now.getDate() === created.getDate()){
        return '<span class="badge pink">new</span>';
    } else {
        return '';
    }
}

