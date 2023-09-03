const searchForm = document.getElementById("search-form");
const resultsContainer = document.getElementById("results-container");
const resetButton = document.getElementById("reset-button");

function displayResult(query, result) {
    const resultElement = document.createElement("div");
    resultElement.classList.add("result");

    const data = JSON.parse(result.message);

    resultElement.innerHTML = `
        <p><strong>Query:</strong> ${query}</p>
        <p><strong>Output:</strong> ${data.output.replace(/\\n/g, '<br>')}</p>
    `;

    resultsContainer.appendChild(resultElement);
    resultsContainer.scrollTop = resultsContainer.scrollHeight;
}

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("search-input");
    const query = searchInput.value.trim();

    if (query) {
        const response = await fetch("/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        });

        if (response.ok) {
            const result = await response.json();
            displayResult(query, result);
            searchInput.value = "";
        } else {
            console.error("Error: ", response.statusText);
        }
    }
});

resetButton.addEventListener("click", () => {
    resultsContainer.innerHTML = "";
});
