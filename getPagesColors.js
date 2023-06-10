function DOMinAction(document_root) {
    return document_root.firstChild;
}

chrome.runtime.sendMessage({
    action: "getSourceColor",
    source: DOMinAction(document)
});