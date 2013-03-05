define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/comment",
        idAttribute: "_id"
    });
});