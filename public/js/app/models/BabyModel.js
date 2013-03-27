define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/babyInfo",
        idAttribute: "_id",
        validation: {
            babyFirst: "validateBaby",
            babyMiddle: "validateBaby",
            babyLast: "validateBaby"
        },
        validateBaby: function(val,attr,computedState) {
            if ( !computedState.babyFirst || !computedState.babyLast ) {
                return "Please enter a first and last name";
            }
        }
    });
});