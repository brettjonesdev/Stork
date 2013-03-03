define(["jquery", "backbone", "backbone-validation"], function ($, Backbone) {
    return {
        bindView:function (view) {
            var ViewValidator = this;
            Backbone.Validation.bind(view, {
                valid:ViewValidator.valid,
                invalid:ViewValidator.invalid
            });
        },

        invalid:function (view, attr, error) {
            var input = view.$("input[name=" + attr + "]");
            var controlGroup = input.closest('.control-group');
            controlGroup.addClass('error');
            controlGroup.find('[data-error]').html(error);
        },

        valid:function (view, attr) {
            var input = view.$("input[name=" + attr + "]");
            var controlGroup = input.closest('.control-group');
            controlGroup.removeClass('error');
            controlGroup.find('[data-error]').html("");
        }
    };
});
