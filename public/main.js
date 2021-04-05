'use district'
const form = document.getElementById('os-form');
form.addEventListener('submit', (e) => {
    e.preventDefault()
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
})
//setting the Canvas Chart dynamically with database data
fetch('http://localhost:2222/poll')
    .then(res => res.json())
    .then(data => {
        let votes = data.votes
        let points = 0
        votes.forEach(vote => {
            points += vote.points
        });
        let voteCounts = {
            windows: 0,
            macOS: 0,
            linux: 0,
            other: 0
        };

        voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.os] = (acc[vote.os] || 0) + vote.points), acc),
            {}
        )
        var dataPoints = [
            { label: "windows", y: voteCounts.windows },
            { label: "linux", y: voteCounts.linux },
            { label: "macos", y: voteCounts.macos },
            { label: "other", y: voteCounts.other },
        ]
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light1",
            animationEnabled: true,
            title: {
                text: `OS total votes ${points}`
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
    })
