function searchItems(items, query) {
  const normalizedQuery = query.replace(/^[▽▼]/, '').toLowerCase();
  return items.flatMap(item => {
    const position = item.body.toLowerCase().indexOf(normalizedQuery);
    return position < 0 ? [] : [{ item, position }];
  });
}

function renderResults(container, results) {
  const fragment = document.createDocumentFragment();
  for (const { item, position } of results) {
    const entry = document.createElement('div');
    const link = document.createElement('a');
    link.className = 'font-large';
    link.href = item.url;
    link.textContent = item.title;
    const description = document.createElement('p');
    description.className = 'article-description';
    description.textContent = item.body.slice(position);
    entry.append(link, description);
    fragment.append(entry);
  }
  if (results.length === 0) {
    const message = document.createElement('p');
    message.textContent = '検索結果はありません';
    fragment.append(message);
  }
  container.replaceChildren(fragment);
}

async function initializeSearch() {
  const container = document.querySelector('#search-container');
  if (!container) return;
  const input = container.querySelector('#search-input');
  const results = container.querySelector('#search-results');
  if (!input || !results) return;

  try {
    const response = await fetch(container.dataset.indexUrl);
    if (!response.ok) throw new Error(`Search index: ${response.status}`);
    const items = await response.json();
    const update = () => renderResults(results, searchItems(items, input.value));
    input.addEventListener('input', update);
    update();
  } catch (error) {
    results.textContent = '検索データを読み込めませんでした';
    console.error(error);
  }
}

initializeSearch();
