define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/babyInfo",
        idAttribute: "_id"
    });
});