document.getElementById("codeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const code = document.getElementById("codeInput").value;
    fetchData(code);
});

async function fetchData(code) {
    try {
        const apiendpoint='';
        const res = await fetch(`${apiendpoint}/${code}`);
        const record = await res.json();
        console.log("🚀 ~ fetchData ~ record:", record)

        if (record.success && record.data.length > 0) {
            const container = document.getElementById("output");
            container.innerHTML = ""; // Clear previous content

            record.data.forEach(stageData => {
                // Create a section for each stage
                const stageSection = document.createElement("div");
                stageSection.classList.add("stage-section");

                // Display the key (stage)
                const stageTitle = document.createElement("h3");
                stageTitle.textContent = `Stage: ${stageData.key}`;
                stageSection.appendChild(stageTitle);

                // Iterate through the values and display their details
                stageData.values.forEach(details => {
                    const detailsDiv = document.createElement("div");
                    detailsDiv.classList.add("details");

                    detailsDiv.innerHTML = `
                        <p><strong>Application Code:</strong> ${details.applicationCode}</p>
                        <p><strong>Title:</strong> ${details.title}</p>
                        <p><strong>SubTitle:</strong> ${details.subTitle}</p>
                        <p><strong>Application ID:</strong> ${details.applicationId}</p>
                        <p><strong>Created At:</strong> ${new Date(details.createdAt).toLocaleString()}</p>
                    `;
                    stageSection.appendChild(detailsDiv);
                });

                container.appendChild(stageSection);
            });
        } else {
            console.error("No data found or response was unsuccessful");
            document.getElementById("output").innerHTML = "No data available.";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("output").innerHTML = "An error occurred while fetching data.";
    }
}
