var segments = [

    ["Billiards", "SMMidi", "2023-07-08", "start over press", "yellow text appearing", 
        0, 31, 53, "https://www.youtube.com/watch?v=FdJdkMgiNc4", "", false],

    ["", "SMMidi", "2024-04-19", "yellow text appearing", "fadeout", 
        0, 9, 34, "https://youtu.be/lWFarrlcmqE?si=zeGy7sl_KYIRvIlA&t=50", "extra segment for score skip", true],

    ["Tanks!", "SMMidi", "2024-04-20", "fadeout", "mission 3 death", 
        0, 45, 40, "https://youtu.be/obfprFbJdf0?si=3DspuJz2lq8YTl8S&t=55", "", false],

    ["", "SMMidi", "2024-04-20", "mission 3 clear", "fadeout", 
        0, 46, 13, "https://youtu.be/obfprFbJdf0?si=sXtFzil1PWrMB2ny&t=115", "we're just gonna pretend he got it", false],

    ["Find Mii", "SMMidi", "2024-04-19", "fadeout", "A: Start", 
        0, 2, 33, "https://youtu.be/lWFarrlcmqE?si=tU8MP8Y_Wg1Q7TDI&t=177", "transition", true],

    ["", "Murasaki", "2024-04-12", "start over", "mii disappearance", 
        2, 41, 43, "https://www.twitch.tv/videos/2118322140", "9 frames subtracted to nullify the start over difference", false],

    ["", "SMMidi", "2024-04-07", "mii disappearance", "fadeout", 
        0, 49, 21, "https://youtu.be/KcGytUxQOGA?si=WUYLVSNCNA00qowr&t=506", "burning time", true],

    ["Pose Mii", "SMMidi", "2024-04-20", "fadeout", "level 1 text appears", 
        0, 7, 44, "https://youtu.be/obfprFbJdf0?si=ySdsOpRvymYy4M0j&t=458", "transition", true],

    ["", "Aryll", "2024-04-25", "level 1 text appears", "finished text appears", 
        1, 20, 56, "https://twitter.com/Aryl_l_/status/1783584379513516454", "", false],

    ["", "SMMidi", "2024-04-20", "finished text appears", "fadeout", 
        0, 12, 48, "https://youtu.be/obfprFbJdf0?si=VW7bl96vaMcjfwqm&t=558", "transition", true],

    ["Charge!", "Th3on3C", "2024-02-15", "fadeout", "fadeout", 
        1, 22, 0, "https://youtu.be/tMqV6yV7WkU?si=n1Pde7yVhliOG42z&t=780", "", false],

    ["Shooting Range", "SMMidi", "2024-04-20", "fadeout", "fadeout", 
        2, 25, 49, "https://youtu.be/obfprFbJdf0?si=5_c_gDpkr314UPb9&t=790", "", false],

    ["Table Tennis", "SMMidi", "2024-04-07", "fadeout", "fadeout", 
        1, 2, 33, "https://youtu.be/KcGytUxQOGA?si=ucq4cgQhHBFzTDMC&t=555", "", false],

    ["Fishing", "SMMidi", "2024-04-20", "fadeout", "fadeout", 
        2, 14, 46, "https://youtu.be/obfprFbJdf0?si=finXw9lvnmKS9aXh&t=656", "", true],

    ["Laser Hockey", "SMMidi", "2024-04-19", "fadeout", "fadeout", 
        2, 32, 15, "https://youtu.be/lWFarrlcmqE?si=1QXJMwpRWyqujbQQ&t=818", "", true],

    ["", "SMMidi", "2024-04-19", "fadeout", "banner",
        0, 1, 42, "https://youtu.be/lWFarrlcmqE?si=V81oROAGmZV5EqWL&t=1104", "transition", true]

];

var sheet = document.getElementById("sheet");
var finalTime = document.getElementById("finalTime");

var addTimecodes = function(arr) {
    let frames = 0;
    let seconds = 0;
    let minutes = 0;

    for (let i = 0; i < arr.length; i++) {
        frames += arr[i][7];
        seconds += arr[i][6];
        minutes += arr[i][5];
    }

    seconds += Math.floor(frames / 60);
    frames %= 60;
    minutes += Math.floor(seconds / 60);
    seconds %= 60;

    return [minutes, seconds, frames];
}

var timecodeToTime = function(arr) {
    let str = "";
    let zero = "";
    
    if (arr[0] != 0) {
        str += arr[0] + ":";
        zero = "0";
    }

    if (arr[1] >= 10) {
        str += arr[1];
    } else {
        str += zero + arr[1];
    }

    str += "." + (Math.round((arr[2] / 60) * 1000) / 1000).toString().slice(2, 5).padEnd(3, "0");
    
    return str;
}

var findBorder = function(i, j, l, m) {
    let properties = ["border-top-right-radius", "border-bottom-right-radius"];
    let values = [[0, 9], [segments.length - 1, 9]];

    if (!m) {
        properties.unshift("border-bottom-left-radius");
        values.unshift([segments.length - 1, 0]);
    }

    if (!l) {
        properties.unshift("border-top-left-radius");
        values.unshift([0, 0]);
    }

    console.log(properties);
    console.log(values);

    for (let k = 0; k < values.length; k++) {
        if (i == values[k][0] && j == values[k][1]) {
            return properties[k];
        }
    }

    return false;
}

var rgb = [162, 159, 245];
var disableTop = false;
var disableBottom = false;

for (let i = 0; i < segments.length; i++) {

    let newRow = document.createElement("tr");

    if (segments[i][0] != "") {
        rgb[0] += 10;
    }

    let firstCell = document.createElement("td");
    firstCell.innerHTML = timecodeToTime([segments[i][5], segments[i][6], segments[i][7]]);
    firstCell.className = "first";
    if (segments[i][10]) {
        firstCell.style.backgroundColor = "#cccccc";

        if (i == 0 || !(segments[i - 1][10])) {
            firstCell.className += " roundTop";
        }

        if (i == segments.length - 1 || !(segments[i + 1][10])) {
            firstCell.className += " roundBottom";
        }

        if (i == 0) {
            disableTop = true;
        }

        if (i == segments.length - 1) {
            disableBottom = true;
        }
    }
    newRow.appendChild(firstCell);

    for (let j = 0; j < 10; j++) {
        let newCell = document.createElement("td");

        if (j > 4 && j < 8) {
            if (j == 5 && segments[i][j] == 0) {} else if (segments[i][j] < 10) {
                newCell.innerHTML = "0" + segments[i][j];
            } else {
                newCell.innerHTML = segments[i][j];
            }
        } else if (j == 8) {
            newCell.innerHTML = "<a href='" + segments[i][j] + "'>link</a>";
        } else {
            newCell.innerHTML = segments[i][j];
        }

        if (j == 0) {
            newCell.className = "bold";
        }

        let borderResult = findBorder(i, j, disableTop, disableBottom);
        if (borderResult != false) {
            console.log(borderResult);
            newCell.setAttribute("style", borderResult + ": 30px;");
        }
    
        newCell.style.backgroundColor = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
        newRow.appendChild(newCell);
    }

    sheet.appendChild(newRow);

}

finalTime.innerHTML += timecodeToTime(addTimecodes(segments));


