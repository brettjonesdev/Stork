define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/BabyModel', 'collections/CommentsCollection', 'views/CommentView'],
    function (App, Marionette, _, Handlebars, BabyModel, CommentsCollection, CommentView) {
        return Marionette.CollectionView.extend({
            collection:CommentsCollection,
            itemView: CommentView
        });
    });