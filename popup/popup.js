let editPage = document.getElementById("editpage");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message) {
    case 0:
      editPage.setAttribute("title", "Edit page.");
    case 1:
      editPage.setAttribute("title", "Cancel.");
      break;
    default:
      break;
  }
})

editPage.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  back = chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    function: pageEdit
  });
});

editPage.addEventListener("mouseover", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  back = chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    function: pageEditRefresh
  });
});

function pageEdit() {
  if (document.body.getAttribute("contenteditable") == "true") {
    document.body.setAttribute("contenteditable", "false");
    console.log("Cancelled editing page.");
  } else {
    document.body.setAttribute("contenteditable", "true");
    console.log("Editing page.");
  }
}

function pageEditRefresh() {
  if (document.body.getAttribute("contenteditable") == "true") {
    chrome.runtime.sendMessage(0);
  } else {
    chrome.runtime.sendMessage(1);
  }
  console.log("refreshed")
}