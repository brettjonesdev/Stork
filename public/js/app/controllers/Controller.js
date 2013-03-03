define(['App', 'backbone', 'marionette', 'views/MakeRequestView', 'views/HeaderView'],
    function (App, Backbone, Marionette, MakeRequestView, HeaderView) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.headerRegion.show(new HeaderView());
        },

        makeRequest:function () {
            App.mainRegion.show(new MakeRequestView());
        }
    });
});