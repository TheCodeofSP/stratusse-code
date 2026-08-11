const readHiddenValue = (prompt) =>
  new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || !process.stdout.isTTY) {
      reject(new Error("Cette commande doit être lancée dans un terminal interactif."));
      return;
    }

    let value = "";
    const wasRaw = process.stdin.isRaw;

    const cleanup = () => {
      process.stdin.off("data", onData);
      process.stdin.setRawMode(Boolean(wasRaw));
      process.stdin.pause();
    };

    const onData = (chunk) => {
      const key = String(chunk);

      if (key === "\u0003") {
        cleanup();
        process.stdout.write("\n");
        reject(new Error("Commande annulée."));
        return;
      }

      if (key === "\r" || key === "\n") {
        cleanup();
        process.stdout.write("\n");
        resolve(value);
        return;
      }

      if (key === "\u007f" || key === "\b") {
        value = value.slice(0, -1);
        return;
      }

      if (!key.startsWith("\u001b")) value += key;
    };

    process.stdout.write(prompt);
    process.stdin.setEncoding("utf8");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", onData);
  });

module.exports = { readHiddenValue };
