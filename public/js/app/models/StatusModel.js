//See Status.js Schema in mongoose
define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/status",
        idAttribute: "_id",

        validation: {
            message: {
                required: true,
                msg: "Please enter a message!"
            }
        }
    });
});