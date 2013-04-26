define([ 'App', 'marionette', 'underscore', 'handlebars', 'collections/StatusCollection', 'views/StatusView', 'text!templates/statusFeed.html'],
    function (App, Marionette, _, Handlebars, StatusCollection, StatusView, template) {
        return Marionette.CompositeView.extend({
            template: Handlebars.compile(template),
            collection: new StatusCollection(),
            itemViewContainer:'ul.status-feed',
            itemView:StatusView
        });
    });