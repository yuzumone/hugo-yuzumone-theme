$(document).ready(function() {
    $.getJSON("/index.json", function(data) {
        let resultsContainer = $("#search-results");
        data.forEach(function(item) {
            let div = '<div><a class="font-large" href="' + item.url + '">' + item.title + '</a><p class="article-description">' + item.body +'</p></div>';
            resultsContainer.append(div);
        })

        function search(query) {
            let result = [];
            const regex = new RegExp(query.replace(/^([▽▼])/, ''), 'i');
            for (i = 0; i < data.length; i++) {
                let pos = data[i].body.search(regex);
                if (pos != -1) {
                    result.push({data: data[i], pos: pos});
                }
            }
            return result;
        }

        $("#search-input").on('input', function() {
            resultsContainer.empty();
            let query = $(this).val();
            let results = search(query);
            if (results.length > 0) {
                results.forEach(function(item) {
                    let desc = '<p class="article-description">' + item['data'].body.slice(item['pos']) +'</p>';
                    let a = '<a class="font-large" href="' + item['data'].url + '">' + item['data'].title + '</a>';
                    let div = '<div>' + a + desc + '</div>';
                    resultsContainer.append(div);
                })
            } else if (query.length > 0) {
                resultsContainer.append('<li>検索結果はありません</li>');
            }
        });
    });
});
