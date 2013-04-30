define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/BabyModel', 'collections/CommentsCollection', 'views/CommentView', "hbs!template/comments"],
    function (App, Marionette, _, Handlebars, BabyModel, CommentsCollection, CommentView, template) {
        return Marionette.CompositeView.extend({
            template: template,
            collection:CommentsCollection,
            itemViewContainer: "ul.wall-posts",
            itemView: CommentView
        });
    });