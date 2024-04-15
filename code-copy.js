(() => {
  // <stdin>
  (function() {
    const copyIcon = document.getElementById("code-copy").innerHTML;
    const copyIconDone = document.getElementById("code-copy-done").innerHTML;
    function createCopyButton(highlightDiv) {
      const button = document.createElement("button");
      button.className = "right-1 top-1 absolute";
      button.type = "button";
      button.innerHTML = copyIcon;
      button.addEventListener("click", () => copyCodeToClipboard(button, highlightDiv));
      highlightDiv.insertBefore(button, highlightDiv.firstChild);
    }
    document.querySelectorAll(".highlight").forEach((highlightDiv) => createCopyButton(highlightDiv));
    async function copyCodeToClipboard(button, highlightDiv) {
      let codeToCopy = highlightDiv.querySelector("code").textContent;
      if (highlightDiv.querySelector("table")) {
        codeToCopy = highlightDiv.querySelector("td:last-child code").textContent;
      }
      try {
        var result = await navigator.permissions.query({ name: "clipboard-write" });
        if (result.state == "granted" || result.state == "prompt") {
          await navigator.clipboard.writeText(codeToCopy);
        }
      } finally {
        button.blur();
        button.innerHTML = copyIconDone;
        setTimeout(function() {
          button.innerHTML = copyIcon;
        }, 2e3);
      }
    }
  })();
})();
