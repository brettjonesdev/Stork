define(['handlebars'], function ( Handlebars ){

    Handlebars.registerHelper('prettyDate', function (date) {
        var mmt = moment(date);
        return mmt.format("dddd MMMM Do, YYYY");
    });

});
