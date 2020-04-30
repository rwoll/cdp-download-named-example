1. Download Code and Dependencies:
   ```
   $ git clone git@github.com:rwoll/cdp-download-named-example.git
   $ cd cdp-download-named-example
   $ npm i
   ```

2. Start Chrome
   ```
   $ # Assumes you are on macOS and in the cdp-download-named-example directory
   $ ./node_modules/playwright/.local-browsers/chromium/chrome-mac/Chromium.app/Contents/MacOS/Chromium --remote-debugging-port=9222
   ```

Example Output:

```
============ Example 1 ============
Downloading http://localhost:4747/download.rar with behavior allow
Begin Event: {"frameId":"2F10D0290E7498145C0C17E2B88FDE4E","guid":"929aded9-c6ba-460c-b81e-b916ab8b833f","url":"http://localhost:4747/download.rar"}
Final Event: {"guid":"929aded9-c6ba-460c-b81e-b916ab8b833f","totalBytes":13,"receivedBytes":13,"state":"completed"}
Downloaded Files: ["example.rar"]



============ Example 2 ============
Downloading http://localhost:4747/download.rar with behavior allowAndName
Begin Event: {"frameId":"2F10D0290E7498145C0C17E2B88FDE4E","guid":"916c3a6e-d60d-47f6-81cd-ae103af0c2d4","url":"http://localhost:4747/download.rar"}
Final Event: {"guid":"916c3a6e-d60d-47f6-81cd-ae103af0c2d4","totalBytes":13,"receivedBytes":13,"state":"completed"}
Downloaded Files: ["916c3a6e-d60d-47f6-81cd-ae103af0c2d4"]
```
