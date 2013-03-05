define(["jquery", "backbone", "models/StatusModel"],
    function ($, Backbone, StatusModel) {
        return Backbone.Collection.extend({
            model:StatusModel,
            url: "/statusFeed"
        });
    });