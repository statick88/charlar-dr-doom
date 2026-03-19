// CTF FLISOL 2026 — JavaScript
const FLAGS = {
    challenge1: 'FLISOL{w3lc0m3_t0_flisol_2026}',
    challenge2: 'FLISOL{sqli_bypass_1s_all_1s}'
};

// Global Timer
let ctfSeconds = 0;
const timerDisplay = document.getElementById('timer-display');

function updateTimer() {
    ctfSeconds++;
    const hrs = Math.floor(ctfSeconds / 3600);
    const mins = Math.floor((ctfSeconds % 3600) / 60);
    const secs = ctfSeconds % 60;
    
    timerDisplay.textContent = 
        `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

setInterval(updateTimer, 1000);

// Flag Submission
const flagForm = document.getElementById('flag-form');
const flagInput = document.getElementById('flag-input');
const flagResult = document.getElementById('flag-result');

// Load solved challenges from localStorage
let solvedChallenges = JSON.parse(localStorage.getItem('ctf_solved') || '[]');

if (flagForm) {
    flagForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submittedFlag = flagInput.value.trim();
        
        if (!submittedFlag) {
            showResult('error', '🚩 Ingresa una flag primero');
            return;
        }
        
        // Check which challenge was solved
        let challengeName = '';
        let challengeId = '';
        
        if (submittedFlag === FLAGS.challenge1) {
            challengeName = 'Challenge 1: El Mensaje Codificado';
            challengeId = 'challenge1';
        } else if (submittedFlag === FLAGS.challenge2) {
            challengeName = 'Challenge 2: La Fortaleza de Latveria';
            challengeId = 'challenge2';
        } else {
            showResult('error', '❌ Flag incorrecta. Sigue intentando, ñaño.');
            return;
        }
        
        // Check if already solved
        if (solvedChallenges.includes(challengeId)) {
            showResult('already', `⚡ Ya resolviste "${challengeName}". ¡Busca el siguiente!`);
            return;
        }
        
        // Mark as solved
        solvedChallenges.push(challengeId);
        localStorage.setItem('ctf_solved', JSON.stringify(solvedChallenges));
        
        // Show success
        showResult('success', `🎉 ¡CORRECTO! Resolviste: ${challengeName}. ¡Felicidades, hacker!`);
        
        // Update leaderboard
        updateLeaderboard(challengeId);
        
        // Clear input
        flagInput.value = '';
    });
}

function showResult(type, message) {
    flagResult.className = type;
    flagResult.textContent = message;
    flagResult.style.display = 'block';
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        flagResult.style.display = 'none';
    }, 10000);
}

// Leaderboard (simulated — in real CTF would use backend)
function updateLeaderboard(challengeId) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    if (!leaderboardBody) return;
    
    // For demo purposes, we'll show the user's progress
    // In a real CTF, this would be server-side
    const hackerName = localStorage.getItem('ctf_hacker_name') || `Hacker_${Math.floor(Math.random() * 9999)}`;
    localStorage.setItem('ctf_hacker_name', hackerName);
    
    // Simulated leaderboard entries
    const entries = [
        { rank: 1, name: 'Doom_Master', solved: '2/2', time: '00:05:23' },
        { rank: 2, name: 'Latveria_Hunter', solved: '1/2', time: '00:08:45' },
        { rank: 3, name: hackerName, solved: `${solvedChallenges.length}/2`, time: 'NOW', isUser: true },
    ];
    
    leaderboardBody.innerHTML = entries.map(entry => `
        <div class="leaderboard-entry" style="${entry.isUser ? 'background: rgba(255,215,0,0.1);' : ''}">
            <span class="rank">${entry.rank}</span>
            <span class="hacker-name">${entry.name} ${entry.isUser ? '(TÚ)' : ''}</span>
            <span class="solved">${entry.solved}</span>
            <span class="solve-time">${entry.time}</span>
        </div>
    `).join('');
}

// Initialize leaderboard on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLeaderboard();
});

// Challenge Page: Check URL and show appropriate content
function getChallengeFromURL() {
    const path = window.location.pathname;
    if (path.includes('challenge1')) return 'challenge1';
    if (path.includes('challenge2')) return 'challenge2';
    return null;
}

// Hint toggle functionality
function toggleHint(hintId) {
    const hint = document.getElementById(hintId);
    if (hint) {
        hint.classList.toggle('show');
    }
}
