define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/BabyModel', 'collections/NewsItemCollection', 'models/CommentModel', 'hbs!template/babyPage', 'views/BabyInfoView', 'views/NewsFeedView', 'views/LeaveCommentView', 'views/LoadingView'],
    function (App, Marionette, _, Handlebars, BabyModel, NewsItemCollection, CommentModel, template, BabyInfoView, NewsFeedView, LeaveCommentView, LoadingView) {
        return Marionette.Layout.extend({
            template:template,
            model: new BabyModel(),
            regions:{
                babyInfoRegion:"#babyInfoRegion",
                newsFeedRegion:"#newsFeedRegion",
                leaveCommentRegion:"#leaveCommentRegion"
            },

            initialize:function () {
                if (!this.model) {
                    App.error("Must pass BabyPage a model");
                }
            },
            alert:function() {
               alert("Here!");
            },

            onRender:function () {
                this.babyInfoRegion.show(new BabyInfoView({model:this.model}));
                this.newsFeedRegion.show(new LoadingView({loadTime:300}));
                var leaveCommentView = new LeaveCommentView();
                leaveCommentView.on("leave-comment", this.render);
                this.leaveCommentRegion.show(leaveCommentView);

                var that = this;
                var newsItemCollection = new NewsItemCollection();
                newsItemCollection.fetch({
                    data: {
                        babyCode: this.model.get("babyCode")
                    },
                    success: function(collection) {
                        that.newsFeedRegion.show(new NewsFeedView({collection:collection}));
                    },
                    error: App.syncError
                });
            }
        });
    });