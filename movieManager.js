/**
 * These are the pre-entered movies for the schedule
 */
const movies = [
    {
        title: "The Matrix",
        year: 1999,
        rating: "R",
        length: 136
    },
    {
        title: "Mean Girls",
        year: 2004,
        rating: "PG-13",
        length: 97
    },
    {
        title: "The Notebook",
        year: 2004,
        rating: "PG-13",
        length: 123
    },
    {
        title: "The Shining",
        year: 1980,
        rating: "R",
        length: 146
    }];
/**
 * These variables represent the time (in minutes from 00:00) for theatre opening and closing. Also for the times required in between show times.
 */
const firstShow = 15;
const previews = 15;
const clean = 20;
const wkdyHrs = 720;
const wkndHrs = 810;
const wkdyOpen = 660;
const wkndOpen = 630;

$(document).ready(function () {
    /**
     * This function maps through the movies array and adds porperties to each movie showing the number of times it will show on weekdays and weekends
     * 
     */
    var showsPerMovie = movies.map(movie => ({ ...movie, wkdyshows: Math.floor((wkdyHrs - firstShow) / (movie.length + previews + clean)), wkndshows: Math.floor((wkndHrs - firstShow) / (movie.length + previews + clean)) }));
    /**
     * This onclick function adds a new movie to the movie array which can be added to the schedule maker.
     */
    $("#add").on("click", function () {
        $(".selectMovie").append("<option value='" + movies.length + "'>" + $(newTitle).val() + "</option>");
        movies.push({ title: $(newTitle).val(), year: $(newYear).val(), rating: $(newRating).val(), length: (parseInt($(newLength).val())) })
        showsPerMovie = movies.map(movie => ({ ...movie, wkdyshows: Math.floor((wkdyHrs - firstShow) / (movie.length + previews + clean)), wkndshows: Math.floor((wkndHrs - firstShow) / (movie.length + previews + clean)) }));
    $(newTitle).val("");
    $(newYear).val("");
    $(newRating).val("");
    $(newLength).val("");
    });

    /**
     * This on click function takes in the selected movie and day type and appends movie info and schedule to the page
     */
    $("#submit").on("click", function () {
        $("#sched").text("");
        $("#schedEnd").text("");
        $("#movieInfo").text("");
        $("#movieInfo").append("<h2>" + movies[$(".selectMovie").val()].title + "</h2> <p> Release year: " + movies[$(".selectMovie").val()].year + ". Rating: " + movies[$(".selectMovie").val()].rating + ". Run time: " + movies[$(".selectMovie").val()].length + " minutes")

        /**
         * These arrays reprsent the beginning and ending times of the movies
         */
        var wkdyshowtimes = [690];
        for (let i = 1; i < showsPerMovie[$(".selectMovie").val()].wkdyshows; i++) {
            if((showsPerMovie[$(".selectMovie").val()].length % 5) !== 0){
            wkdyshowtimes.push(wkdyshowtimes[i - 1] + (showsPerMovie[$(".selectMovie").val()].length + previews + clean + (5 - (showsPerMovie[$(".selectMovie").val()].length % 5))))}
            else{
                wkdyshowtimes.push(wkdyshowtimes[i - 1] + (showsPerMovie[$(".selectMovie").val()].length + previews + clean))}
        }
        var wkdyendtimes = [];
        for (let i = 0; i < wkdyshowtimes.length; i++) {
            wkdyendtimes.push(wkdyshowtimes[i] + showsPerMovie[$(".selectMovie").val()].length)
        }
        var wkndshowtimes = [660];
        for (let i = 1; i < showsPerMovie[$(".selectMovie").val()].wkndshows; i++) {
            if((showsPerMovie[$(".selectMovie").val()].length % 5) !== 0){
                wkndshowtimes.push(wkndshowtimes[i - 1] + (showsPerMovie[$(".selectMovie").val()].length + previews + clean + (5 - (showsPerMovie[$(".selectMovie").val()].length % 5))))}
            else{
                wkndshowtimes.push(wkndshowtimes[i - 1] + (showsPerMovie[$(".selectMovie").val()].length + previews + clean))}
        }
        var wkndendtimes = [];
        for (let i = 0; i < wkndshowtimes.length; i++) {
            wkndendtimes.push(wkndshowtimes[i] + showsPerMovie[$(".selectMovie").val()].length)
        }

        /**
         * The begTimeFun and endTimeFun functions take in an array of times (in minutes after 00:00) and give back a time in 12hr formatting appended to the page
         * @param {array} - this function will be passed the array of either weekday or weekend show times and end times
         */
        const begTimeFun = function (arr) {
            var begH;
            var begM;
            var begap
            for (var i = 0; i < arr.length; i++) {
                if (12 < (arr[i] / 60) && (arr[i] / 60) < 13) {
                    begH = 12;
                    begM = parseInt(arr[i] % 60);
                    if (begM.toString().length < 2)
                    begM = "0" + begM;
                    begap = "pm";
                }
                else if ((arr[i] / 60) > 12) {
                    begH = parseInt((arr[i] / 60) - 12);
                    begM = parseInt(arr[i] % 60);
                    if (begM.toString().length < 2)
                    begM = "0" + begM;
                    begap = "pm";
                }
                else {
                    begH = parseInt((arr[i] / 60));
                    begM = parseInt(arr[i] % 60);
                    if (begM.toString().length < 2)
                    begM = "0" + begM;
                    begap = "am";
                }
                $("#sched").append("<p>" + begH + ":" + begM + " " + begap)
            }
        };
        if ($(".selectDay").val() === "wkdy") {
            begTimeFun(wkdyshowtimes);
        }
        else {
            begTimeFun(wkndshowtimes);
        }
        const endTimeFun = function (arr2) {
            var endH;
            var endM;
            var endap;
            for (var i = 0; i < arr2.length; i++) {
                if (12 < (arr2[i] / 60) && (arr2[i] / 60) < 13) {
                    endH = 12;
                    endM = parseInt(arr2[i] % 60);
                    if (endM.toString().length < 2)
                        endM = "0" + endM;
                    endap = "pm";
                }
                else if ((arr2[i] / 60) > 12) {
                    endH = parseInt((arr2[i] / 60) - 12);
                    endM = parseInt(arr2[i] % 60);
                    if (endM.toString().length < 2)
                        endM = "0" + endM;
                    endap = "pm";
                }
                else {
                    endH = parseInt((arr2[i] / 60));
                    endM = parseInt(arr2[i] % 60);
                    if (endM.toString().length < 2)
                        endM = "0" + endM;
                    endap = "am";
                }
                $("#schedEnd").append("<p>" + endH + ":" + endM + " " + endap)
            }
        };
        if ($(".selectDay").val() === "wkdy") {
            endTimeFun(wkdyendtimes);
        }
        else {
            endTimeFun(wkndendtimes);
        }
    });
});