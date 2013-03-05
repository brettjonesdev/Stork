define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/status",
        idAttribute: "_id"
    });
});