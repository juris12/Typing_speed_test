import StoredProfiles from './helper.js'

const storedProfileInfo = new StoredProfiles('profilData')

const profilPagStatsTable = document.querySelector('#profil_page_stats_table tbody')
const graph = document.querySelector('#test_stats')
const logOutBtn = document.querySelector('#log_out_btn')
const newTestBtn = document.querySelector('#new_test_btn')
const prodilInfo = document.querySelector('#profil_page_main_info')
const selectStats = document.querySelector('#select_stats')

logOutBtn.addEventListener('click', () => {
    storedProfileInfo.logOut()
    window.location.href = '/profil.html'
})
newTestBtn.addEventListener('click', () => {
    window.location.href = 'test.html'
})

const data = storedProfileInfo.curentProfile
prodilInfo.querySelector('h1').innerHTML = `Hi!, ${data.name}`
prodilInfo.querySelector('h3').innerHTML = `Your curent score is ${data.score.toFixed(2)} words per minute!`

if (data.tests.length == 0) {
    graph.parentElement.innerHTML += '<h5>No tests have been taken!</h5>' 
    profilPagStatsTable.parentElement.parentElement.innerHTML += '<h5>No tests have been taken!</h5>' 
} else {
    data.tests.forEach((val, i) => {
        const row = `
            <tr>
                <td>${i + 1}</td>
                <td>${val.signs}</td>
                <td>${val.speed}</td>
                <td>${val.errors}</td>
                <td>${val.errorRate}</td>
                <td>${val.date}</td>
            </tr>    
        `
        profilPagStatsTable.innerHTML += row 
    })
    const graphParent = graph.parentElement
    graph.width = graphParent.width
    graph.hight = graphParent.hight


    let myChart = null; // Use let to allow reassignment and initialize as null
    const ctx = graph.getContext('2d'); // Get the canvas context
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.tests.map((val, i) => i + 1),
            datasets: [{
                label: 'Scores',
                data: data.tests.map((val) => val[selectStats.value]),
                backgroundColor: 'rgba(1, 125, 1)',
                borderColor: 'rgba(1, 125, 1)',
                borderWidth: 0,
                barPercentage: 0.6,
                categoryPercentage: 0.8
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    selectStats.addEventListener('change', () => {
        if (myChart) {
            myChart.destroy();
            myChart = null;
        }
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.tests.map((val, i) => i + 1),
                datasets: [{
                    label: 'Scores',
                    data: data.tests.map((val) => val[selectStats.value]),
                    backgroundColor: 'rgba(1, 125, 1)',
                    borderColor: 'rgba(1, 125, 1)',
                    borderWidth: 0,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}
