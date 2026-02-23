document.addEventListener("DOMContentLoaded", loadArticles);

function showCreateForm() {
    document.getElementById("createSection").classList.toggle("hidden");
}

function saveArticle() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Fyll i både rubrik och innehåll!");
        return;
    }

    const article = {
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toLocaleString()
    };

    let articles = JSON.parse(localStorage.getItem("articles")) || [];
    articles.unshift(article);
    localStorage.setItem("articles", JSON.stringify(articles));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("createSection").classList.add("hidden");

    loadArticles();
}

function loadArticles() {
    const articlesList = document.getElementById("articlesList");
    articlesList.innerHTML = "";

    let articles = JSON.parse(localStorage.getItem("articles")) || [];

    articles.forEach(article => {
        const div = document.createElement("div");
        div.className = "article-card";
        div.innerHTML = `
            <h3>${article.title}</h3>
            <p class="date">${article.date}</p>
        `;
        div.onclick = () => readArticle(article.id);
        articlesList.appendChild(div);
    });
}

function readArticle(id) {
    let articles = JSON.parse(localStorage.getItem("articles")) || [];
    const article = articles.find(a => a.id === id);

    document.getElementById("articlesSection").classList.add("hidden");
    document.getElementById("createSection").classList.add("hidden");
    document.getElementById("readSection").classList.remove("hidden");

    document.getElementById("readTitle").innerText = article.title;
    document.getElementById("readDate").innerText = article.date;
    document.getElementById("readContent").innerText = article.content;
}

function goBack() {
    document.getElementById("readSection").classList.add("hidden");
    document.getElementById("articlesSection").classList.remove("hidden");
}