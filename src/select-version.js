const dropdown = document.getElementById('gpt_version');
const saveButton = document.getElementById('save');

// Load the saved value from storage and set it as the selected value
chrome.storage.sync.get('gpt_version', (data) => {
  if (data.gpt_version) {
    dropdown.value = data.gpt_version;
  }
});

// Save the selected value in storage when the user clicks the "Save" button and close the popup
saveButton.addEventListener('click', () => {
  const selectedValue = dropdown.value;
  chrome.storage.sync.set({ gpt_version: selectedValue }, () => {
    window.close();
  });
});
