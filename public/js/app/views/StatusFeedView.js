define([ 'App', 'marionette', 'underscore', 'handlebars', 'collections/StatusCollection', 'views/StatusView'],
    function (App, Marionette, _, Handlebars, StatusCollection, StatusView) {
        return Marionette.CollectionView.extend({
            collection: new StatusCollection(),
            itemView:StatusView
        });
    });