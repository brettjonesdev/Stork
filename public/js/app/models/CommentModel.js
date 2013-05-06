//See Comment.js Schema in mongoose
define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/comment",
        idAttribute: "_id",
        validation: {
            from: {
                required: true,
                msg: "Please tell us your name"
            },
            fromEmail: {
                required: true,
                msg: "Please enter your email address (Don't worry - we won't share it)"
            },
            message: {
                required: true,
                msg: "Please enter a message!"
            }
        }
    });
});