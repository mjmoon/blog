// lunr JS
jQuery(function() {
    // Get the generated search_data.json file so lunr.js can search it locally.
    window.data = $.getJSON('https://blog.micbon.com/search_data.json');

    // Wait for the data to load and add it to lunr
    window.data.then(function(data){
        window.idx = lunr(function() {
            this.ref('id');
            this.field('title', { boost: 10 });
            this.field('content', { boost: 5 })
            this.field('author');
            this.field('date');
            this.field('tags', { boost: 20 });

            var parent = this;
            $.each(data, function(index, value) {
                parent.add(
                    $.extend({ "id": index }, value)
                );
            });
        });

        var regex = new RegExp("[\\?&]q=([^&#]*)"),
            results = regex.exec(location.search),
            q = results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

        results = window.idx.search(q);
        display_search_results(results);
    });

    function display_search_results(res) {
        $searchres = $("#search-results");
        // Wait for data to load
        window.data.then(function(loaded_data) {

            // Are there any results?
            if (res.length > 0) {
                $searchres.empty(); // Clear any old results
                // Iterate over the results
                res.forEach(function(result) {
                    var item = loaded_data[result.ref];
                    // Build a snippet of HTML for this result
                    var appendString = '' +
                    '<li class="wow fadeInLeft" data-wow-duration="1.0s">' +
                        '<a class="zoombtn" href="' + item.url + '">' + item.title + '</a>' +
                        '<p>' + item.excerpt + '</p>' +
                        '<a href="' + item.url + '" class="btn zoombtn">Read More</a>' +
                    '</li>'
                    ;
                    // Add the snippet to the collection of results.
                    $searchres.append(appendString);
                });
            } else {
                // If there are no results, let the user know.
                $searchres.html('<li>' +
                    '<div class="box">No results found. <br />'+
                    'Please try a different search.</div>' +
                    '</li>'
                );
            };
            $searchres.show();
        });
    };
});
