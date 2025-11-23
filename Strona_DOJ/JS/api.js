// =====================
// API.JS — publiczne API
// =====================

// schedule.js / archive.js muszą być załadowane wcześniej.

window.dojAPI = {

    addScheduleTrial(trial) {
        const trials = JSON.parse(localStorage.getItem('doj_schedule')) || [];
        trial.id = Date.now();
        trials.push(trial);
        localStorage.setItem('doj_schedule', JSON.stringify(trials));
        if (typeof renderScheduleTrials === 'function') renderScheduleTrials();
    },

    addArchiveTrial(trial) {
        const trials = JSON.parse(localStorage.getItem('doj_archive')) || [];
        trial.id = Date.now();
        trials.push(trial);
        localStorage.setItem('doj_archive', JSON.stringify(trials));
        if (typeof renderArchiveTrials === 'function') renderArchiveTrials();
    },

    moveToArchive(scheduleID) {
        let schedule = JSON.parse(localStorage.getItem('doj_schedule')) || [];
        const trial = schedule.find(t => t.id === scheduleID);
        if (!trial) return;

        schedule = schedule.filter(t => t.id !== scheduleID);
        localStorage.setItem('doj_schedule', JSON.stringify(schedule));

        const archive = JSON.parse(localStorage.getItem('doj_archive')) || [];
        archive.push(trial);
        localStorage.setItem('doj_archive', JSON.stringify(archive));

        if (typeof renderScheduleTrials === 'function') renderScheduleTrials();
        if (typeof renderArchiveTrials === 'function') renderArchiveTrials();
    }
};
