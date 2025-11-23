// =====================
// SCHEDULE.JS
// =====================

// Pobieranie danych
function loadScheduleFromServer() {
    fetch("schedule.json")
        .then(res => res.json())
        .then(data => renderScheduleTrials(data))
        .catch(() => renderScheduleTrials([]));
}

loadScheduleFromServer();


// Zapisywanie
function saveScheduleTrials(trials) {
    localStorage.setItem('doj_schedule', JSON.stringify(trials));
}

// Tworzenie karty rozprawy (harmonogram)
function createScheduleTrialCard(trial) {
    const date = new Date(trial.date);
    const formattedDate = date.toLocaleDateString('pl-PL', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return `
        <div class="trial-card fade-in">
            <span class="trial-badge status-scheduled">
                <i class="fas fa-calendar"></i> Zaplanowana
            </span>
            <h3 class="trial-title">${trial.name}</h3>
            <div class="trial-info">
                <div class="trial-info-row">
                    <i class="fas fa-calendar-alt"></i>
                    <div>
                        <div class="trial-info-label">Data:</div>
                        <div class="trial-info-value">${formattedDate} ${trial.time}</div>
                    </div>
                </div>
                <div class="trial-info-row">
                    <i class="fas fa-gavel"></i>
                    <div>
                        <div class="trial-info-label">Sędzia:</div>
                        <div class="trial-info-value">${trial.judge}</div>
                    </div>
                </div>
                <div class="trial-info-row">
                    <i class="fas fa-users"></i>
                    <div>
                        <div class="trial-info-label">Strony:</div>
                        <div class="trial-info-value">${trial.parties}</div>
                    </div>
                </div>
            </div>
            <div class="trial-description">${trial.description}</div>
        </div>
    `;
}

// Renderowanie harmonogramu
function renderScheduleTrials(trials = null) {
    const grid = document.getElementById('scheduleGrid');
    if (!grid) return;

    const list = trials || getScheduleTrials();

    if (!list.length) {
        grid.innerHTML = `
            <div class="empty-state fade-in">
                <i class="fas fa-calendar-times"></i>
                <h3>Brak zaplanowanych rozpraw</h3>
                <p>Rozprawy będą dodawane przez bota.</p>
            </div>`;
        return;
    }

    grid.innerHTML = list.map(createScheduleTrialCard).join('');
}

// Filtrowanie harmonogramu
document.getElementById('scheduleFilter')?.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    const trials = getScheduleTrials().filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.judge.toLowerCase().includes(query) ||
        t.parties.toLowerCase().includes(query)
    );
    renderScheduleTrials(trials);
});

// Sortowanie harmonogramu
document.getElementById('scheduleSort')?.addEventListener('change', e => {
    const val = e.target.value;
    let trials = getScheduleTrials();

    if (val === 'date-asc') trials.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (val === 'date-desc') trials.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (val === 'judge') trials.sort((a, b) => a.judge.localeCompare(b.judge));

    renderScheduleTrials(trials);
});

// Autostart
renderScheduleTrials();
