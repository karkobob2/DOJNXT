// =====================
// ARCHIVE.JS
// =====================

function getArchiveTrials() {
    try {
        return JSON.parse(localStorage.getItem('doj_archive')) || [];
    } catch {
        return [];
    }
}

function saveArchiveTrials(trials) {
    localStorage.setItem('doj_archive', JSON.stringify(trials));
}

function createArchiveTrialCard(trial) {
    const date = new Date(trial.date).toLocaleDateString('pl-PL');
    const verdictLabel = {
        innocent: 'Niesłuszny',
        guilty: 'Winny',
        settled: 'Zawarte pojednanie'
    }[trial.verdict] || trial.verdict;

    return `
        <div class="trial-card fade-in">
            <span class="trial-badge status-${trial.verdict}">
                ${verdictLabel}
            </span>

            <h3 class="trial-title">${trial.name}</h3>

            <div class="trial-info">
                <div class="trial-info-row">
                    <i class="fas fa-calendar-check"></i>
                    <div>
                        <div class="trial-info-label">Zamknięta:</div>
                        <div class="trial-info-value">${date}</div>
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

            <div class="trial-description">${trial.summary}</div>

            ${trial.verdictText ? `
                <div class="trial-verdict">
                    <div class="trial-verdict-title"><i class="fas fa-gavel"></i> Wyrok</div>
                    <div class="trial-verdict-text">${trial.verdictText}</div>
                </div>` : ''
            }

            ${trial.justification ? `
                <div class="trial-justification">
                    <div class="trial-justification-title"><i class="fas fa-file-alt"></i> Uzasadnienie</div>
                    <div class="trial-justification-text">${trial.justification}</div>
                </div>` : ''
            }

            ${trial.sentence ? `
                <div class="trial-sentence">
                    <i class="fas fa-exclamation-circle"></i>
                    <strong>Kara:</strong> ${trial.sentence}
                </div>` : ''
            }
        </div>
    `;
}

function renderArchiveTrials(trials = null) {
    const grid = document.getElementById('archiveGrid');
    if (!grid) return;

    const list = trials || getArchiveTrials();

    if (!list.length) {
        grid.innerHTML = `
            <div class="empty-state fade-in">
                <i class="fas fa-archive"></i>
                <h3>Brak zarchiwizowanych rozpraw</h3>
                <p>Ukończone rozprawy pojawią się tutaj.</p>
            </div>`;
        return;
    }

    grid.innerHTML = list.map(createArchiveTrialCard).join('');
}

document.getElementById('archiveFilter')?.addEventListener('input', () => {
    filterArchive();
});

document.getElementById('archiveVerdictFilter')?.addEventListener('change', () => {
    filterArchive();
});

function filterArchive() {
    const query = document.getElementById('archiveFilter')?.value.toLowerCase() || '';
    const verdict = document.getElementById('archiveVerdictFilter')?.value || 'all';

    const filtered = getArchiveTrials().filter(t => {
        const q = t.name.toLowerCase().includes(query)
            || t.judge.toLowerCase().includes(query)
            || t.parties.toLowerCase().includes(query);

        const v = verdict === 'all' || t.verdict === verdict;

        return q && v;
    });

    renderArchiveTrials(filtered);
}

renderArchiveTrials();
