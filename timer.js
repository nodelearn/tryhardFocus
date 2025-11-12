let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

const startStopBtn = document.getElementById('startStopBtn');
const timerDisplay = document.getElementById('timer-display');
const timerTime = document.getElementById('timer-time');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimer() {
    if (startTime) {
        const now = Date.now();
        elapsedTime = now - startTime;
        timerTime.textContent = formatTime(elapsedTime);
    }
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
        startStopBtn.textContent = 'Parar contagem';
        startStopBtn.classList.remove('timer-start');
        startStopBtn.classList.add('timer-stop');
        timerDisplay.style.display = 'block';
        updateTimer();
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = 'Iniciar contagem';
        startStopBtn.classList.remove('timer-stop');
        startStopBtn.classList.add('timer-start');
        
        // salvar o registro
        const record = {
            date: new Date().toLocaleString('pt-BR'),
            duration: formatTime(elapsedTime),
            durationMs: elapsedTime
        };
        
        // registros existentes
        let records = JSON.parse(localStorage.getItem('focusRecords') || '[]');
        records.unshift(record); // Adicionar no início
        localStorage.setItem('focusRecords', JSON.stringify(records));
        
        // resetar timer
        elapsedTime = 0;
        startTime = null;
        timerDisplay.style.display = 'none';
        timerTime.textContent = '00:00:00';
    }
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

