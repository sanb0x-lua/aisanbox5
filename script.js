function init() {
    // Создаем снежинки на фоне
    function createLines() {
        const linesContainer = document.getElementById('lines');
        if (!linesContainer) return;
        const lineCount = 5;

        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.className = 'line';
            line.style.left = Math.random() * 100 + 'vw';

            const size = Math.floor(Math.random() * 12) + 6;
            line.style.width = size + 'px';
            line.style.height = size + 'px';

            line.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
            const duration = Math.random() * 6 + 6;
            line.style.animationDuration = duration.toFixed(2) + 's';

            line.style.opacity = (Math.random() * 0.5 + 0.4).toFixed(2);
            if (Math.random() > 0.75) line.style.filter = 'blur(0.6px)';

            linesContainer.appendChild(line);

            setTimeout(() => {
                if (line.parentNode) line.remove();
            }, duration * 1000 + 2000);
        }
    }

    setInterval(createLines, 3500);
    createLines();

    // Background subtle movement
    function animateBackground(){
        const bg = document.querySelector('.animated-bg');
        if (!bg) return;
        let position = 0;
        setInterval(()=>{ position = (position + 1) % 10000; bg.style.backgroundPosition = `${position}px ${position}px`; }, 60);
    }
    animateBackground();

    // Обработчик нажатия клавиш
    function pressKey(key) {
        const keyCode = {'w': 87, 'd': 68, 's': 83, 'a': 65, ' ': 32}[key];
        const keyName = {'w': 'KeyW', 'd': 'KeyD', 's': 'KeyS', 'a': 'KeyA', ' ': 'Space'}[key];
        
        const downEvent = new KeyboardEvent('keydown', {
            key: key,
            code: keyName,
            keyCode: keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true
        });
        
        const upEvent = new KeyboardEvent('keyup', {
            key: key,
            code: keyName,
            keyCode: keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true
        });
        
        document.dispatchEvent(downEvent);
        document.body.dispatchEvent(downEvent);
        window.dispatchEvent(downEvent);
        
        setTimeout(() => {
            document.dispatchEvent(upEvent);
            document.body.dispatchEvent(upEvent);
            window.dispatchEvent(upEvent);
        }, 200);
    }

    // Добавляем обработчики к кнопкам
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-key');
            pressKey(key);
        });
    });

    // Footer text
    const footerText = document.getElementById('footerText');
    if (footerText) {
        footerText.textContent = 'By Sanbox';
    }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();