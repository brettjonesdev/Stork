define(['backbone', 'backbone-deep-model'], function(Backbone) {
    return Backbone.DeepModel.extend({
        urlRoot: "/baby",
        idAttribute: "_id",
        validation: {
            babyFirst: "validateBaby",
            babyMiddle: "validateBaby",
            babyLast: "validateBaby",
            babyCode: {
                required: true,
                msg: "Please enter a valid, unique code to access your page"
            }
        },
        validateBaby: function(val,attr,computedState) {
            if ( !computedState.babyFirst || !computedState.babyLast ) {
                return "Please enter a first and last name";
            }
        }
    });
});