define(['marionette', 'jquery', 'handlebars', 'text!templates/loading.html'],
    function (Marionette, $, Handlebars, template) {
        return Marionette.ItemView.extend({
            template:template,
            loadTime:1000,
            stepCount:10,
            initialize:function (options) {
                if (options && options.loadTime) {
                    this.loadTime = options.loadTime;
                }
                if (options && options.stepCount) {
                    this.stepCount = options.stepCount;
                }

            },
            onRender:function () {
                var view = this;
                var stepCount = 1;
                setInterval(function () {
                    if (view && view.$el && view.$el.is(":visible")) {
                        view.$(".bar").css("width", stepCount * (100 / view.stepCount) + "%");
                    }
                    stepCount++;
                }, this.loadTime / this.stepCount)
            }
        });
    });