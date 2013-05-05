define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/NewsItemModel', 'hbs!template/newsItem'],
    function (App, Marionette, _, Handlebars, NewsItemModel, template) {
        return Marionette.ItemView.extend({
            template:template,
            model:new NewsItemModel()
        });
    });