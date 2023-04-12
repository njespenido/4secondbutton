const btn = document.querySelector('.btn');
const time = document.querySelector('.stopwatch')
const table1 = document.getElementById("attemptsTable")
const total = document.getElementById("total")
const min = document.getElementById("min")
const max = document.getElementById("max")
const avg = document.getElementById("avg")
const extra = document.getElementById("extraInfo")
const btn2 = document.getElementById("showButton")
const attemptList = []
const attemptNum=[]
var attempts = 0;
const ctx = document.getElementById('myChart');

const stopwatch = {elapsedTime: 0}

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: attemptNum,
        datasets: [{
            label: 'Time',
            data: attemptList,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


btn.addEventListener('click', () => {
    if (btn.innerHTML =='Start') {
        btn.style.backgroundColor ='red';
        btn.style.color ='white';
        startStopwatch();
        btn.innerHTML = 'Stop';
    }
    else if(btn.innerHTML == 'Stop') {

        stopwatch.elapsedTime += Date.now() - stopwatch.startTime
        clearInterval(stopwatch.intervalId);
        attempts++;

        var start = Date.now();

        btn.innerHTML = 'Clear';
        btn.style.backgroundColor ='yellow';
        btn.style.color ='black';

        total.innerHTML = attempts;
        min.innerHTML = Math.min(...attemptList);
        max.innerHTML = Math.max(...attemptList);
        avg.innerHTML = attemptList.reduce((a, b) => a + b, 0) / attempts;

        let row1 = document.createElement("tr")
        let c1 = document.createElement("td")
        let c2 = document.createElement("td")
        let c3 = document.createElement("td")
        c1.innerText = attempts;
        c2.innerText = "00:00:00:00"
        c3.innerText = time.innerHTML
        row1.appendChild(c1);
        row1.appendChild(c2);
        row1.appendChild(c3);
        table1.appendChild(row1)

        if ((stopwatch.elapsedTime <= 4100) == true && (3990 <= stopwatch.elapsedTime) == true) {
            time.style.color = 'green';
        }
        else if ((stopwatch.elapsedTime <= 4200) == true && (3800 <= stopwatch.elapsedTime) == true) {
            time.style.color = 'blue';
        }
        else if ((stopwatch.elapsedTime <= 4500) == true && (3500 <= stopwatch.elapsedTime) == true) {
            time.style.color = 'yellow';
        }
        else {
            time.style.color='red';
        }

        attemptList.push(stopwatch.elapsedTime);
        attemptNum.push(attempts);


        ctx.data.push(attemptNum);
        ctx.data.push(attemptList);

        return ctx.data;








    }
    else{
        stopwatch.elapsedTime = 0;
        stopwatch.startTime = Date.now();
        btn.style.backgroundColor ='white';
        btn.style.color ='black';
        btn.innerHTML = 'Start'
        time.style.color='white';
        displayTime(0, 0, 0, 0);
    }
});

btn2.addEventListener('click', () => {
    if(btn2.innerHTML === 'Show Summary'){
        extra.style.display = "block";
        btn2.innerHTML = 'Hide'
    }
    else {
        extra.style.display = "none";
        btn2.innerHTML ="Show Summary"

    }
});
function startStopwatch() {
    //reset start time
    stopwatch.startTime = Date.now();
    // run `setInterval()` and save the ID
    stopwatch.intervalId = setInterval(() => {
        //calculate elapsed time
        const elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime
        //calculate different time measurements based on elapsed time
        const milliseconds = parseInt((elapsedTime%1000)/10);
        const seconds = parseInt((elapsedTime/1000)%60);
        const minutes = parseInt((elapsedTime/(1000*60))%60);
        const hour = parseInt((elapsedTime/(1000*60*60))%24);
        displayTime(hour, minutes, seconds, milliseconds);
    }, 100);
}
function displayTime(hour, minutes, seconds, milliseconds) {
    const leadZeroTime = [hour, minutes, seconds, milliseconds].map(time => time < 10 ? `0${time}` : time)
    time.innerHTML = leadZeroTime.join(':')

}


