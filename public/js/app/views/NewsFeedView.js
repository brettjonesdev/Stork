define([ 'App', 'marionette', 'underscore', 'handlebars', 'collections/NewsItemCollection', 'views/NewsItemView', 'hbs!template/newsFeed'],
    function (App, Marionette, _, Handlebars, NewsItemCollection, NewsItemView, template) {
        return Marionette.CompositeView.extend({
            template: template,
            collection: new NewsItemCollection(),
            itemViewContainer:'.items',
            itemView:NewsItemView
        });
    });