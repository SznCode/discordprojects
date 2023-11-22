//META { "name": "CustomUsernameColor", "website": "https://github.com/SznCode/CustomUsernameColor", "source": "https://github.com/SznCode/CustomUsernameColor" } *//


class CustomUsernameColor {
    getName() {
        return 'Custom Username Color';
    }

    getDescription() {
        return 'Change the color of your username in Discord.';
    }

    getVersion() {
        return '1.1.0';
    }

    getAuthor() {
        return 'Your Name';
    }

    start() {
        this.loadSettings();
        this.injectCSS();
    }

    loadSettings() {
        this.settings = {
            color: '#FF5733', // Default color is orange
        };
        try {
            const storedSettings = JSON.parse(localStorage.getItem('CustomUsernameColorSettings'));
            if (storedSettings) {
                this.settings = { ...this.settings, ...storedSettings };
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('CustomUsernameColorSettings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    injectCSS() {
        const style = document.createElement('style');
        style.setAttribute('id', 'custom-username-color');
        style.textContent = `
            .username-1HTP3C {
                color: ${this.settings.color} !important;
            }
        `;
        document.head.appendChild(style);
    }

    stop() {
        const style = document.getElementById('custom-username-color');
        if (style) style.remove();
    }

    getSettingsPanel() {
        const panel = document.createElement('div');
        panel.innerHTML = `
            <label>Custom Username Color:</label>
            <input type="color" id="custom-color-input" value="${this.settings.color}">
        `;
        const colorInput = panel.querySelector('#custom-color-input');
        colorInput.addEventListener('input', () => {
            this.settings.color = colorInput.value;
            this.saveSettings();
            this.injectCSS();
        });
        return panel;
    }
}

module.exports = CustomUsernameColor;
