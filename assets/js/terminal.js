const terminal = document.getElementById('terminal-text');

const commands = [
    'echo "Bem-vindo ao meu portfólio!"',
    'echo "Estudante, aprendiz, atleta... e ainda durmo às vezes."',
    'echo "Scroll down e me conheça melhor."',
    'clear'
];

const prompt = 'D:\\portfolio\\terminal>';
let commandIndex = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addCursor() {
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    terminal.appendChild(cursor);
    terminal.scrollTop = terminal.scrollHeight;
}

function removeCursor() {
    const existingCursor = terminal.querySelector('.cursor');
    if (existingCursor) existingCursor.remove();
}

async function typeCommandLine(cmd, delay = 60) {

    // Agora digita o comando caractere por caractere
    for (let char of cmd) {
        removeCursor();
        terminal.innerHTML += char;
        addCursor();
        await sleep(delay);
    }

    // Depois da linha completa, pula para a próxima linha
    removeCursor();
    terminal.innerHTML += '\n';
}

async function typeCommandSequence() {
    terminal.innerHTML = '';
    removeCursor();

    while (true) {
        const cmd = commands[commandIndex];

        terminal.innerHTML += prompt + ' ';
        terminal.scrollTop = terminal.scrollHeight;
        addCursor();
        await sleep(1700)

        await typeCommandLine(cmd);

        if (cmd === 'clear') {
            await sleep(200);
            terminal.innerHTML = '';
            removeCursor();
        }

        commandIndex = (commandIndex + 1) % commands.length;
    }
}

typeCommandSequence();
