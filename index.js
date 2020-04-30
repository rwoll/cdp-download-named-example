const fs = require("fs");
const CDP = require("chrome-remote-interface");
const http = require("http");

let app = http.createServer((_, res) => {
  res.writeHead(200, {
    "Content-Disposition": "attachment; filename=example.rar",
    "Content-Type": "application/octet-stream",
  });
  res.write("Hello, world!", "binary");
  res.end();
});

async function download(downloadBehavior, url) {
  console.log(`Downloading ${url} with behavior ${downloadBehavior}`);
  let beginEvent, finalEvent;

  const downloadDir = fs.mkdtempSync("example-downloads");

  let client;
  try {
    client = await CDP();
    const { Page, Browser } = client;
    await Browser.setDownloadBehavior({
      behavior: downloadBehavior,
      downloadPath: downloadDir,
    });
    await Page.enable();

    await Promise.all([
      new Promise((res) => {
        Page.downloadWillBegin((evt) => {
          beginEvent = evt;
          res(evt);
        });
      }),
      new Promise((res) => {
        Page.downloadProgress((evt) => {
          const { state } = evt;
          if (state === "canceled" || state === "completed") {
            finalEvent = evt;
            res(evt);
          }
        });
      }),
      Page.navigate({ url }),
    ]);

    console.log("Begin Event:", JSON.stringify(beginEvent));
    console.log("Final Event:", JSON.stringify(finalEvent));
    console.log(
      "Downloaded Files:",
      JSON.stringify(fs.readdirSync(downloadDir))
    );
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
      await client.close();
    }
    fs.rmdirSync(downloadDir, { recursive: true });
  }
}

(async function () {
  app.listen(4747);
  console.log("============ Example 1 ============");
  await download("allow", "http://localhost:4747/download.rar");
  console.log();
  console.log();
  console.log();
  console.log("============ Example 2 ============");
  await download("allowAndName", "http://localhost:4747/download.rar");
  app.close();
})();
