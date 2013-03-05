define(["jquery", "backbone", "models/CommentModel"],
    function ($, Backbone, CommentModel) {
        return Backbone.Collection.extend({
            model:CommentModel,
            url: '/comments'
        });
    });