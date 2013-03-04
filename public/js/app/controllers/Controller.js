define(['App', 'backbone', 'marionette', 'views/MakeRequestView', 'views/HeaderView', 'views/ThankYouForRequestView', 'views/WelcomeView'],
    function (App, Backbone, Marionette, MakeRequestView, HeaderView, ThankYouForRequestView, WelcomeView) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.headerRegion.show(new HeaderView());
        },

        welcome: function() {
            App.mainRegion.show(new WelcomeView());
        },

        makeRequest:function (id) {
            App.mainRegion.show(new MakeRequestView({babyId:id}));
        },

        thankYouForRequest:function() {
            App.mainRegion.show(new ThankYouForRequestView());
        }
    });
});