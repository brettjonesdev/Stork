define(['handlebars'], function ( Handlebars ){

    Handlebars.registerHelper('date', function (date) {
        var mmt = moment(date);
        return mmt.format("MM/DD/YYYY");
    });

});
