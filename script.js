const container = document.getElementById('container');
const dailyBtn = document.getElementById('daily');
const weeklyBtn = document.getElementById('weekly');
const monthlyBtn = document.getElementById('monthly');

// Fetch JSON data and populate DOM

const appendCard = (item) => {
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
                <p class="current">${item.timeframes.daily.current}hrs</p>
                <p class="previous">Yesterday - ${item.timeframes.daily.previous}hrs</p>
            </div>
            <div class="card__text__hours weekly">
                <p class="current">${item.timeframes.weekly.current}hrs</p>
                <p class="previous">Last Week - ${item.timeframes.weekly.previous}hrs</p>
            </div>
            <div class="card__text__hours monthly hidden">
                <p class="current">${item.timeframes.monthly.current}hrs</p>
                <p class="previous">Last Month - ${item.timeframes.monthly.previous}hrs</p>
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

fetch('/data.json').then((response) => {  
    if(!response.ok) return console.log('Oops! Something went wrong.');
    
    return response.json();
  }).then((data) => {
   
    populateDOM(data);
});


// Handle "Daily", "Weekly", and "Monthly" buttons

const toggleVisibility = (show, hide1, hide2) => {
    show.forEach(el => el.classList.remove('hidden'));
    hide1.forEach(el => el.classList.add('hidden'));
    hide2.forEach(el => el.classList.add('hidden'));
}

const setActiveButton = (active, inactive1, inactive2) => {
    active.classList.add('active');
    inactive1.classList.remove('active');
    inactive2.classList.remove('active');
}

const dailyBtnHandler = () => {
    const dailyData = document.querySelectorAll('.daily');
    const weeklyData = document.querySelectorAll('.weekly');
    const monthlyData = document.querySelectorAll('.monthly');

    toggleVisibility(dailyData, weeklyData, monthlyData);
    setActiveButton(dailyBtn, weeklyBtn, monthlyBtn);
};

const weeklyBtnHandler = () => {
    const dailyData = document.querySelectorAll('.daily');
    const weeklyData = document.querySelectorAll('.weekly');
    const monthlyData = document.querySelectorAll('.monthly');

    toggleVisibility(weeklyData, dailyData, monthlyData);
    setActiveButton(weeklyBtn, dailyBtn, monthlyBtn);
};

const monthlyBtnHandler = () => {
    const dailyData = document.querySelectorAll('.daily');
    const weeklyData = document.querySelectorAll('.weekly');
    const monthlyData = document.querySelectorAll('.monthly');

    toggleVisibility(monthlyData, dailyData, weeklyData);
    setActiveButton(monthlyBtn, dailyBtn, weeklyBtn);
};

dailyBtn.addEventListener('click', dailyBtnHandler);
weeklyBtn.addEventListener('click', weeklyBtnHandler);
monthlyBtn.addEventListener('click', monthlyBtnHandler);