define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/newsItem",
        idAttribute: "_id",
        defaults: {
            status: undefined,
            comment: undefined,
            message: undefined,
            time: undefined,
            from: undefined,
            fromEmail: undefined,
            milestone: undefined
        }
    });
});