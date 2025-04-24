$(document).ready(function() {
    $.getJSON("/index.json", function(data) {
        let resultsContainer = $("#search-results");
        data.forEach(function(item) {
            resultsContainer.append('<li><a href="' + item.url + '">' + item.title + '</a></li>');
        })

        function search(query) {
            let result = [];
            for (i = 0; i < data.length; i++) {
                if (data[i].body.match(new RegExp(query, 'i'))) {
                    result.push(data[i]);
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
                    resultsContainer.append('<li><a href="' + item.url + '">' + item.title + '</a></li>');
                })
            } else if (query.length > 0) {
                resultsContainer.append('<li>検索結果はありません</li>');
            }
        });
    });
});
