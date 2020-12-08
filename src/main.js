async function loadJson() {
    const data = await fetch('labyrinthes.json')
        .then(response => response.json());

    for (let i = 0; i < data[3]['ex-0'].length; i++){
        let element = document.createElement('div');
        let currentDiv = document.getElementById('mainDiv');
        currentDiv.setAttribute('style', 'background-color: orange');
        currentDiv.appendChild(element)
    }
    console.log(data[3]['ex-0'])
}

console.log(loadJson());
