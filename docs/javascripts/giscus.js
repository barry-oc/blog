// Giscus comments for blog posts.
// Configured to no-op until the repo/category IDs below are filled in.
// See: https://giscus.app for setup instructions.
(function () {
  var path = window.location.pathname;

  // Only render on individual blog post pages, not the index or category pages.
  var isPost = /^\/blog\/\d{4}\/\d{2}\/\d{2}\//.test(path);
  if (!isPost) return;

  // ---- CONFIGURATION ---------------------------------------------------
  // Replace these two values after enabling GitHub Discussions + giscus.
  var repoId = "REPLACE_WITH_REPO_ID";
  var categoryId = "REPLACE_WITH_CATEGORY_ID";
  // ----------------------------------------------------------------------

  // Not configured yet — bail silently.
  if (repoId.indexOf("REPLACE") === 0 || categoryId.indexOf("REPLACE") === 0) {
    return;
  }

  var article = document.querySelector("article.md-content__inner");
  if (!article) return;

  var container = document.createElement("div");
  container.className = "giscus";
  container.style.marginTop = "3rem";
  container.style.paddingTop = "2rem";
  container.style.borderTop = "1px solid rgba(128,128,128,0.2)";
  article.appendChild(container);

  var script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.setAttribute("data-repo", "barry-oc/blog");
  script.setAttribute("data-repo-id", repoId);
  script.setAttribute("data-category", "General");
  script.setAttribute("data-category-id", categoryId);
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "bottom");
  script.setAttribute("data-theme", "dark");
  script.setAttribute("data-lang", "en");
  script.setAttribute("data-loading", "lazy");
  container.appendChild(script);
})();
