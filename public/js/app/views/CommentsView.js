define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/BabyModel', 'collections/CommentsCollection', 'views/CommentView', "text!templates/comments.html"],
    function (App, Marionette, _, Handlebars, BabyModel, CommentsCollection, CommentView, template) {
        return Marionette.CompositeView.extend({
            template: Handlebars.compile(template),
            collection:CommentsCollection,
            itemViewContainer: "ul.wall-posts",
            itemView: CommentView
        });
    });