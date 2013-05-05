define(["backbone", "models/NewsItemModel"],
    function (Backbone, NewsItemModel) {
        return Backbone.Collection.extend({
            model:NewsItemModel,
            url: '/newsItems'
        });
    });