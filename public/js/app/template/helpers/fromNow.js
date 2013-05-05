define(['handlebars'], function ( Handlebars ){

    Handlebars.registerHelper('fromNow', function (date) {
        var mmt = moment(date);
        return mmt.fromNow();
    });

});
