const container = document.getElementById('container');
const buttons = document.getElementById('frequency').querySelectorAll('button');

// Fetch JSON data and populate DOM

const determineHrsUnit = (item) => {
    let units = new Array(0);

    for (const timeframe in item.timeframes) {
        const frequency = item.timeframes[timeframe];
        for (const hours in frequency) {
            const hour = frequency[hours];
            units.push(
                (hour === 1) ? 'hr' : 'hrs')
            ;
        }
    }
    return units;
}

const appendCard = (item) => {
    const units = determineHrsUnit(item);

    const card = document.createElement('DIV');
    card.classList.add('card');
    card.setAttribute('id', item.title.toLowerCase().replace(/ /g, "-"))
    card.innerHTML = `
    <div class="card__banner"></div>
    <div class="card__text">
        <div class="card__text__title">
            <h2>${item.title}</h2>
            <button>•••</button>
        </div>
        <div>
            <div class="card__text__hours daily hidden">
                <p class="current">${item.timeframes.daily.current}${units[0]}</p>
                <p class="previous">Yesterday - ${item.timeframes.daily.previous}${units[1]}</p>
            </div>
            <div class="card__text__hours weekly">
                <p class="current">${item.timeframes.weekly.current}${units[2]}</p>
                <p class="previous">Last Week - ${item.timeframes.weekly.previous}${units[3]}</p>
            </div>
            <div class="card__text__hours monthly hidden">
                <p class="current">${item.timeframes.monthly.current}${units[4]}</p>
                <p class="previous">Last Month - ${item.timeframes.monthly.previous}${units[5]}</p>
            </div>
        </div>
    </div>
    `
    container.appendChild(card);
};

const populateDOM = (data) => {
    data.forEach((item) => {
      appendCard(item);
    });
};

fetch('./data.json').then((response) => {  
    if(!response.ok) return console.log('Failed to fetch data.json.');
    return response.json();
  }).then((data) => {
    populateDOM(data);
});


// Handle "Daily", "Weekly", and "Monthly" buttons

const toggleVisibility = (frequencies) => { // parameters: show, hide, hide
    const show = document.querySelectorAll(`.${frequencies[0]}`);
    const hide1 = document.querySelectorAll(`.${frequencies[1]}`);
    const hide2 = document.querySelectorAll(`.${frequencies[2]}`);

    show.forEach(el => el.classList.remove('hidden'));
    hide1.forEach(el => el.classList.add('hidden'));
    hide2.forEach(el => el.classList.add('hidden'));
}

const setActiveButton = (frequencies) => { // parameters: active, inactive, inactive
    const active = document.getElementById(`${frequencies[0]}`);
    const inactive1 = document.getElementById(`${frequencies[1]}`);
    const inactive2 = document.getElementById(`${frequencies[2]}`);

    active.classList.add('active');
    inactive1.classList.remove('active');
    inactive2.classList.remove('active');
}

const handleClick = (e) => {
    let frequencies = new Array(0);
    const frequency = e.target.id;

    if (frequency === 'daily') {
        frequencies = ['daily', 'weekly', 'monthly'];
    } else if (frequency === 'weekly') {
        frequencies = ['weekly', 'daily', 'monthly'];
    } else if (frequency === 'monthly') {
        frequencies = ['monthly', 'daily', 'weekly'];
    }

    toggleVisibility(frequencies);
    setActiveButton(frequencies);
}

buttons.forEach((button) => {
    button.addEventListener('click', handleClick);
  });