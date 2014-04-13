/*
 *  Timeline.js
 *  A simple jQuery plugin to add a Personal timeline to your blog, website, etc. 
    Select where you would like your timeline to display (ex. $('div.my-timeline')...) and just pass in an array of objects 
    containing your story. Two options exist: order and theme. Set order to either "latest" or "earliest" to display your 
    timeline in a particular order. Set theme to either "dark" or "light" (IMPORTANT: requires a css file), otherwise just
    specify your own styles. The timeline will just be in a <div/> container, each year specified will be a <ul/>, and each
    event in a year will be a <li/>.
    Default option values: 
        order: latest,
        theme: dark

*/
;(function($) { //pass jQuery($) to avoid clashing

    var Timeline = {
        create: function( data, options, el ) {
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
            var that = this;
            that.data = data;
            that.el = el;
            that.$el = $( el );
            that.options = $.extend( {}, $.fn.myTimeline.options, options );

            that.buildTimeline();
        },
        buildTimeline: function() {
            var that            = this, 
                _theData        = that.data,
                theme           = that.options.theme == "dark" ? "dark" : "light",
                html            = ""; //string to append to the dom

            
            if ( that.options.order == "earliest" ) _theData.reverse(); //checking order option, default = latest
            if ( that.options.ajax.length > 1 ) { //checking ajax option, default = "" (empty string)
                $.getJSON( that.options.ajax, function ( ajaxData ) {
                    $.each( ajaxData, function( index, value ) {
                        html += "<h4>" + ajaxData[index].year +"</h4>";
                        html += "<ul class='Timeline-yearEvents'>";
                        $.each( ajaxData[index].events, function( item ) {
                            html += "<li>" +ajaxData[index].events[item]+ "</li>";
                        });
                        html += "</ul>"
                    });
                    $('<div/>', {
                        class: "Timeline Timeline--"+theme+"",
                        html: html
                    }).appendTo( that.$el );
                });
            } else { //timeline data is not ajaxed, its just in a var
            //iterate the object containing timeline info, _theData (if formatted correctly)
            for ( var i = 0, dataLen = _theData.length; i < dataLen; i++ ) {
                //iterate the keys of _theDate (a single year in the timeline)
                for ( var prop in _theData[i] ) {

                    if ( _theData[i].hasOwnProperty(prop) ) {
                        //prepare the year title (e.g. 2014, 2012, earliest)
                        if ( typeof _theData[i][prop] === "string" || typeof _theData[i][prop] === "number") {

                            html += "<h4>" +_theData[i][prop]+ "</h4>";

                        //prepare the events in a year, an array     
                        } else if ( typeof _theData[i][prop] == "object" ){

                            html += "<ul class='Timeline-yearEvents'>";

                            //iterate the events array
                            for ( var j = 0; j < _theData[i][prop].length; j++ ){

                                html += "<li>" +_theData[i][prop][j]+ "</li>";

                            }

                        }

                        html += "</ul>";
                    }
                }
            }
            //create dom for the timeline and add it to the jquery selector
            $('<div/>', {
                class: "Timeline Timeline--"+theme+"",
                html: html
            }).appendTo( that.$el );
            }
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
        ajax        : ""
    };
})( jQuery );
