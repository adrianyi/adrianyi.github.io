---
layout: portfolio_entry
title: D3 Visualization
image: /img/portfolio-movie-visualization.jpg
---

# Movie data visualization using Dimple (D3 library)

<div id='svg'></div>

<script type="text/javascript">
    window.onload = function(){
        $.ajax({
            type: "GET",
            url: "https://apps.adrianyi.com/movie_stats/query/grossings/?cat=distributor&gr=worldwide_box_office&agg=avg",
            success: function(data){
                var svg = dimple.newSvg('#svg', 800, 600);
                var chart = new dimple.chart(svg, data);
                var x = chart.addCategoryAxis("x", 0);
                x.title = "Distributor";
                var y = chart.addMeasureAxis("y", 1);
                y.title = "Total grossings (1997-2017)";
                chart.addSeries(null, dimple.plot.bar);
                chart.draw();
            },
            error: function(jqxhr, textStatus, error){
                $("#result").text('Oh no! Error occurred :[ Try again in a minute or see console for error.');
                console.log(jqxhr.responseJSON);
            }
        });
    }
</script>