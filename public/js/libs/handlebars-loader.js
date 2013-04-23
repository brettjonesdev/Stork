define(["moment", "../libs/handlebars" ], function (moment) {
    Handlebars.registerHelper('date', function (date) {
        var mmt = moment(date);
        return mmt.format("MM/DD/YYYY");
    });

    Handlebars.registerHelper('prettyDate', function (date) {
        var mmt = moment(date);
        return mmt.format("dddd, MMMM Do YYYY");
    });
    return Handlebars;
});