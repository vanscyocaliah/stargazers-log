const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${dateString}T00:00:00`));
}

function formatStars(stars) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(stars);
}

function renderRepositories(repositories) {
  repositoryCount.textContent = `${repositories.length} saved`;
  repositoryList.replaceChildren();

  repositories.forEach((repository) => {
    const item = document.createElement("li");
    item.className = "repository-item";
    item.innerHTML = `
      <div>
        <a class="repository-name" href="${repository.url}" target="_blank" rel="noreferrer">${repository.repository}</a>
        <p class="repository-description">${repository.description}</p>
        <p class="repository-meta">
          <span>${repository.language}</span>
          <span>Starred ${formatDate(repository.starredAt)}</span>
        </p>
      </div>
      <span class="star-badge">&#9733; ${formatStars(repository.stars)}</span>
    `;
    repositoryList.append(item);
  });
}

function showError() {
  repositoryCount.textContent = "Unavailable";
  repositoryList.innerHTML = "<li class=\"status-message\">Repositories could not be loaded right now.</li>";
}

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  })
  .then(renderRepositories)
  .catch(showError);