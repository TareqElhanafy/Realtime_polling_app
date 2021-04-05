'use district'
const form = document.getElementById('os-form');
form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=os]:checked').value
    const data = {
        os: choice
    }
    fetch('http://localhost:2222/poll', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    e.preventDefault()
})
//setting the Canvas Chart
var dataPoints = [
    { label: "windows", y: 0 },
    { label: "linux", y: 0 },
    { label: "macos", y: 0 },
    { label: "other", y: 0 },
]
var chart = new CanvasJS.Chart("chartContainer", {
    theme: "light1",
    animationEnabled: true,
    title: {
        text: "OS total votes"
    },
    data: [
        {
            // Change type to "bar", "area", "spline", "pie",etc.
            type: "column",
            dataPoints: dataPoints
        }
    ]
});
chart.render();
//

// Enable pusher logging 
Pusher.logToConsole = true;

var pusher = new Pusher('54690409b68318b46005', {
    cluster: 'eu'
});

var channel = pusher.subscribe('os-poll');
channel.bind('os-vote', function (data) {
    dataPoints = dataPoints.map(x => {
        if (x.label === data.os) {
            x.y = data.points
            return x
        } else {
            return x
        }
    })
    chart.render()
});