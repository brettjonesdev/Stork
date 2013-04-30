define([ 'App', 'marionette', 'underscore', 'handlebars', 'collections/StatusCollection', 'views/StatusView', 'hbs!template/statusFeed'],
    function (App, Marionette, _, Handlebars, StatusCollection, StatusView, template) {
        return Marionette.CompositeView.extend({
            template: template,
            collection: new StatusCollection(),
            itemViewContainer:'ul.status-feed',
            itemView:StatusView
        });
    });