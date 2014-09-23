/*
 *  Timeline.js
 *  A simple jQuery plugin to add a Personal timeline to your blog, website, etc.
    Select where you would like your timeline to display (ex. $('div.my-timeline')...) and just pass in an array of objects
    containing your story as the first parameter. Three options exist: order, theme, and ajax. Set order to either "latest" or "earliest" to display your
    story in a particular order. Set theme to either "dark" or "light" (IMPORTANT: requires a css file), otherwise just
    specify your own styles and ignore the theme option. The ajax option is just a string literal specifying a path to some json
    file containing your story. Note, if you use the ajax option the first parameter is unnecessary.
    The timeline will be in a <div/> container, each year specified will be a <ul/>, and each
    event in a year will be a <li/>.
    Default option values:
        order: latest,
        theme: dark
*/
;(function($) { // pass jQuery($) to avoid clashing

    var Timeline = {
        create: function( data, options, el ) { // initializer

            this.data = data || [{
                year: 'The year is 2054',
                events: [
                    "Over half of Earth's population has settled on Mars"
                ]
            }];

            this.$el = $( el );

            this.options = $.extend( {}, $.fn.myTimeline.options, options );

            this.loadTimeline(); // create the timeline and inject in the dom, with all supplied options
        },
        loadTimeline: function () {
            var self = this,
                html = [];

                function build ( data ) {
                    if ( self.options.order == "earliest" ) data.reverse(); // checking order option, if "earliest" reverse array
                   
                    $.each( data, function ( key, value ) { // iterate over the data supplied as first parameter
                        html.push("<h4>" + data[key].year + "</h4><ul class='Timeline-yearEvents'>"); // each year value, ex.  2014, 2013, or could be latest

                        if ( "object" == typeof data[key].events ) { // check if events are contained in an array, so we can iterate each one
                            $.each( data[key].events, function( item ) {
                                html.push("<li>" + data[key].events[item] + "</li>");
                            });
                       
                        } else if ( "string" == typeof data[key].events ) { // check if the event is just a string, and just add it
                            html.push("<li>" + data[key].events + "</li>");
                        }

                        html.push("</ul>");
                    });

                    self.renderTimelime( html.join('') ); // Add the timeline to the page
                }

                if ( self.options.ajax ) $.getJSON( self.options.ajax, function ( ajaxData ) { build( ajaxData ); } );    
                else build( self.data );
        },
        renderTimelime: function ( dom ) {
            $('<div/>', { // create element for the timeline and add to the selected element (i.e. this.$el)
                class: "Timeline Timeline--" + this.options.theme + "",
                html: dom
            }).appendTo( this.$el ); //add the html to the jquery element
        }
    };

    $.fn.myTimeline = function( data, options ) {
        return this.each( function () {
            var timeline = Object.create( Timeline );
            timeline.create( data, options, this );
            $.data( this, 'myTimeline', timeline );
        });
    };

    $.fn.myTimeline.options = { //prevent immutable options, allow overrides
        order       : 'latest',
        theme       : 'dark'
    };

})( jQuery );
