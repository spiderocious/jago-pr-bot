# JagoPRBot

A Chrome extension that automatically generates merge request descriptions by analyzing your code changes in real-time.

## What it does

Adds a "Generate Description" button to GitHub/GitLab MR creation pages. Click it to open an intelligent side panel that:
- Shows real-time progress as it analyzes your changes
- Discovers and processes all diff files
- Generates a formatted MR description using AI
- Auto-fills the description textarea

## How it works

1. Install the extension and authenticate with your JagoPRBot API key
2. Navigate to create a new PR/MR on GitHub or GitLab
3. Click "Generate Description" - the side panel opens
4. Watch as it analyzes your changes file-by-file
5. Description is generated and automatically prefilled

## Features

### 🔐 Secure Authentication
- Enter your JagoPRBot API key on first use
- Keys are securely stored across browser sessions
- Easy key management through the extension popup
- Instant validation with our API

### 📊 Real-time Progress Tracking
The side panel shows live updates as it works:
```
✓ Getting your merge template
✓ Checking diffs... (discovered 11 files)
⏳ Analyzing: src/components/Button.tsx (3/11)
⏳ Processing description...
✅ Description ready! Prefilling...
```

### 🎯 Smart Features
- **Template Detection**: Automatically detects pre-filled MR templates
- **File-by-file Analysis**: Shows exactly which files are being processed
- **Usage Tracking**: Always see how many generations you have left (e.g., 850/1000)
- **Regenerate Option**: Not happy with the result? Regenerate with one click
- **Cancel Anytime**: Stop generation mid-process if needed

### 📈 Extension Popup Dashboard
- View current usage: "850/1000 descriptions used"
- Recent activity: "Last generated: 2 hours ago on repo/branch"
- Change/update API key
- Quick settings and toggles
- Links to documentation and support
- Account information display

## Installation

1. Clone this repository
```bash
git clone hhttps://github.com/spiderocious/jago-pr-bot
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer Mode" (toggle in top-right)

4. Click "Load unpacked" and select the extension folder

5. The JagoPRBot icon will appear in your extensions toolbar


## How Generation Works

1. **Template Check**: Reads existing content in the description textarea
2. **Diff Discovery**: Scans the page for all changed files
3. **File Analysis**: Processes each file's changes sequentially
4. **API Processing**: Sends data to our backend for AI generation
5. **Polling**: Checks status until description is ready
6. **Prefill**: Automatically fills the textarea with generated content

## Generation States

### Success
```
Description generated!

Summary:
• 11 files analyzed
• 234 lines changed
• Description prefilled

[Regenerate] [Close]
```

### Error Handling
- **Invalid API Key**: Prompts for re-authentication
- **Limit Reached**: Shows upgrade options
- **Network Error**: Displays retry button with clear error message
- **Generation Failed**: Offers to retry or cancel

## Tech Stack

- **Chrome Extension**: Manifest V3
- **Side Panel API**: For progress tracking and authentication
- **Content Scripts**: DOM interaction with GitHub/GitLab
- **Background Service Worker**: Message coordination
- **API Backend**: AI-powered description generation

## API Endpoints

The extension communicates with:
- `/validate-key` - Validates API keys
- `/generate` - Initiates MR description generation
- `/status` - Polls for generation completion

## Configuration

Access settings through the extension popup:
- Toggle auto-features
- Manage API key
- View usage statistics
- Access help documentation
- Submit feedback

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request


## License

MIT License - see LICENSE file for details

---

**Made with ❤️ to make PR descriptions less painful**