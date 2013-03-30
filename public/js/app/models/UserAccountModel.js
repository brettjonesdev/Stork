define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/userAccount",
        idAttribute: "_id"
    });
});