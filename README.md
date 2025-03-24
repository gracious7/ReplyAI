# LinkedIn AI Chat Reply Extension

## 📌 Overview

LinkedIn AI Chat Reply is a Chrome extension that enhances LinkedIn messaging by generating AI-powered responses. It provides two key features:

- **Reply AI**: Generates context-aware replies based on previous chat messages.
- **Fix**: Improves the grammar of the written response before sending.

## 🚀 Features

- Extracts LinkedIn chat messages automatically.
- Provides AI-generated replies instantly.
- Allows users to refine messages with a grammar-fixing tool.
- Seamlessly integrates into the LinkedIn messaging interface.

## 🛠 Installation

1. **Download the project**
   ```sh
   git clone https://github.com/yourusername/LinkedIn-AI-Chat-Reply.git
   cd LinkedIn-AI-Chat-Reply
   ```
2. **Load the extension in Chrome**:
   - Open `chrome://extensions/` in your browser.
   - Enable **Developer mode** (top-right toggle).
   - Click **Load unpacked** and select the project folder.

## 📄 File Structure

```
LinkedIn-AI-Chat-Reply/
│── manifest.json         # Chrome extension manifest file
│── background.js         # Background script handling AI requests
│── content.js            # Injects AI buttons and manages UI interactions
│── popup.html            # UI for extension settings
│── popup.js              # Handles popup functionality
│── styles.css            # Popup styling
│── README.md/            # Readme file for info
```

## 🔑 Permissions Explanation

The extension requests the following permissions:

- **"scripting"**: Injects scripts into LinkedIn to modify the UI.
- **"storage"**: Saves user settings locally in Chrome's storage.
- **"activeTab"**: Allows interaction with the currently active LinkedIn tab.
- **"host_permissions"**: Grants access to LinkedIn messaging pages (`https://www.linkedin.com/messaging/*`).

## 🛠 How It Works

1. The extension injects AI-powered buttons into LinkedIn messaging.
2. Clicking **Reply AI** extracts the latest messages and requests an AI-generated response.
3. Clicking **Fix** refines the user’s typed message.
4. The AI-generated response is inserted directly into the message box.

## ⚡ Troubleshooting

- If the buttons do not appear, refresh the LinkedIn messaging page.
- Ensure the extension is enabled in `chrome://extensions/`.
- Check the Chrome Developer Console (`F12 > Console`) for errors.

## 📜 License

This project is licensed under the MIT License.

## 🤝 Contributing

Feel free to fork the repository and submit a pull request with improvements.

---

🚀 Developed with ❤️ by Krisha Arya
# ReplyAI
