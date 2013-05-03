define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/status",
        idAttribute: "_id",
        defaults: {
            message: undefined,
            time: undefined,
            milestone: undefined
        }
    });
});