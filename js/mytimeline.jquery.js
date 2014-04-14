/*
 *  Timeline.js
 *  A simple jQuery plugin to add a Personal timeline to your blog, website, etc.
    Select where you would like your timeline to display (ex. $('div.my-timeline')...) and just pass in an array of objects
    containing your story as the first parameter. Three options exist: order, theme, and ajax. Set order to either "latest" or "earliest" to display your
    story in a particular order. Set theme to either "dark" or "light" (IMPORTANT: requires a css file), otherwise just
    specify your own styles and ignore the theme option. The ajax option is just as string literal specifying a path to some json
    file containing your story. Note, if you use the ajax option the first parameter is unnecessary. The timeline will just be in a <div/> container, each year specified will be a <ul/>, and each
    event in a year will be a <li/>.
    Default option values:
        order: latest,
        theme: dark,
        ajax: null
*/
;(function($) { // pass jQuery($) to avoid clashing

    var Timeline = {

        // initializer
        create: function( data, options, el ) {

            // check if any data was supplied, log an error and just create some defaults
            if ( data === undefined ) {
                console.error("No data was found to build your timeline, using some defaults");
                data = [
                    {
                        year: 'The year is 2054',
                        events: [
                            "Over half of Earth's population has settled on Mars"
                        ]
                    }
                ];
            }

            this.data = data || null;

            this.el = el;
            this.$el = $( el );

            this.options = $.extend( {}, $.fn.myTimeline.options, options );
            this.theme = this.options.theme;

            // create the timeline and inject in the dom, with all supplied options
            this.buildTimeline();
        },
        buildTimeline: function() {
            // checks options to output the timeline
            if ( this.options.ajax !== null ) this.ajaxTimeline();
            else this.loadTimeline();
        },
        ajaxTimeline: function() {
            var self = this,
                html = "";

            // ajax the json specified by option.ajax
            $.getJSON( self.options.ajax, function ( ajaxData ) {
                // checking order option, if "earliest" reverse array
                if ( self.options.order == "earliest" ) ajaxData.reverse();
                // iterate each object containing the year and its events
                $.each( ajaxData, function( key, value ) {
                    html += "<h4>" + ajaxData[key].year + "</h4>";
                    html += "<ul class='Timeline-yearEvents'>";
                    // check if events are contained in an array, so we can iterate each one
                    if ( "object" == typeof ajaxData[key].events ) {
                        // iterate over each event
                        $.each( ajaxData[key].events, function( item ) {
                            html += "<li>" +ajaxData[key].events[item]+ "</li>";
                        });
                    // check if the event is just a string, and just add it
                    } else if ( "string" == typeof ajaxData[key].events ) {
                        html += "<li>" +ajaxData[key].events+ "</li>";
                    }
                    html += "</ul>";
                });
                // add the timeline to the page
                self.renderTimelime( html );
            });
        },
        loadTimeline: function() {
            var self = this,
                theData = self.data,
                html = "";

                // checking order option, if "earliest" reverse array
                if ( self.options.order == "earliest" ) theData.reverse();
                // iterate over the data supplied as first parameter (if an ajax option isn't specified)
                $.each(theData, function(key, value) {
                    // each year value, ex.  2014, 2013, or could be latest
                    html += "<h4>" + theData[key].year + "</h4>";
                    html += "<ul class='Timeline-yearEvents'>";
                    // check if events are contained in an array, so we can iterate each one
                    if ( "object" == typeof theData[key].events ) {
                        $.each( theData[key].events, function( item ) {
                            html += "<li>" + theData[key].events[item] + "</li>";
                        });
                    // check if the event is just a string, and just add it
                    } else if ( "string" == typeof theData[key].events ) {
                        html += "<li>" + theData[key].events + "</li>";
                    }
                    html += "</ul>";
                });
                // add the timeline to the page
                self.renderTimelime( html );
        },
        renderTimelime: function(dom) {
            // create element for the timeline and add to the selected element (i.e. this.$el)
            $('<div/>', {
                class: "Timeline Timeline--"+this.theme+"",
                html: dom
            }).appendTo( this.$el ); //add the html to the jquery element
        }
    };

    $.fn.myTimeline = function( data, options ) {
        return this.each(function() {
            var timeline = Object.create( Timeline );
            timeline.create( data, options, this );
            $.data( this, 'myTimeline', timeline );
        });
    };

    //prevent immutable options, allow overrides
    $.fn.myTimeline.options = {
        order       : "latest",
        theme       : 'dark',
        ajax        : null
    };

})( jQuery );
