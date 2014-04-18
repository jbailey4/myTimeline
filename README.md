# myTimeline jQuery plugin
A simple jQuery plugin to dynamically add a personal timeline to your blog or website. Just supply your jQuery selector some data (your history) in the correct format, and myTimeline will render all your years events on your page. Also included is an extensible SCSS file (compiled to the css/timeline.css file), giving you the ability to customize the theme of your timeline.   

## Installation 
Just grab the repo and include `mytimeline.jquery.min.js` after jQuery.
``` javascript
...
<script src="mytimeline.jquery.min.js"></script>
</body>
</html>
```

## Usage
After including the plugin select where you would like your timeline to render and supply some data with your story, see format section.
``` javascript
...
<script src="mytimeline.jquery.min.js"></script>
<script>
$(document).ready(function() {

    $( '.my-timeline' ).myTimeline( history );

});
</script>
</body>
</html>
```

## Options
| Name  | Description                                                                                                                                                                                                    | Type   | Default  |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|----------|
| order | The order in which the years you specify are listed. Starting with the most recent year or the earliest. Choose from two values 'latest' or 'earliest'.                                                     | String | 'latest' |
| theme | Specifies a light or dark theme based on the classes built in the timeline.css file, and as mentioned before can be customized from the sass/timeline.scss file. Accepts two values 'light' or 'dark'.         | String | 'dark'   |
| ajax  | If you choose not to store your timeline in a variable in some file within your project, use this option to supply a path to a valid and correctly formatted json file, which overwrites the first parameter.  | String | null     | 
``` javascript
...
<script src="mytimeline.jquery.min.js"></script>
<script>
    $( '.my-timeline' ).myTimeline("", {
    	order: 'earliest',
    	theme: 'light',
    	ajax: 'path/to/some/file.json'
    });
</script>
</body>
</html>
```

## Format
Your timeline information should following the below format to work correctly, its simple, just an array of objects with two properties: 'year' and 'events'.
#### Example 1
``` javascript
// variable containing your timeline info, accessible in your project

var history = [ 
    {
        year: 2014,
        events: "Voluptatibus, amet quos labore id dolor minima! Saepe, inventore vero porro iusto!"
    }, 
    {
        year: 2013,
        events: [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, alias, enim, culpa veniam eum sequi exercitationem labore facilis qui magni nihil quia asperiores voluptatem recusandae quod neque fugit quam possimus!",
            "Saepe, inventore vero porro iusto! Saepe, inventore vero porro iusto!" ]
    }
    ...
```
#### Example 2
json format if you use the ajax option
``` javascript
[ 
    {
        "year": "2014",
        "events": "Loaded via ajax -- Voluptatibus, amet quos labore id dolor minima! Saepe, inventore vero porro iusto!"
    }, 
    {
        "year": "2013",
        "events": [
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, alias, enim, culpa veniam eum sequi exercitationem labore facilis qui magni nihil quia asperiores voluptatem recusandae quod neque fugit quam possimus!",
            "Saepe, inventore vero porro iusto! Saepe, inventore vero porro iusto!" ]
    }
    ...
```

## Additional 
Feel free to use this in any way you would like. As a web designer/developer some good uses could be to list projects, websites, and/or work in an organized, maintainable way. Or just events by year you would like to publish to your blog/website.

###### Note: this is my first jQuery plugin and I'm sure aspects about it can be improved, so feel free to fork it and submit a pull request and let me know of any improvements.




