define(["backbone", "backbone-validation"],
    function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/create",
        idAttribute: "_id",
        defaults: {
            "email": undefined,
            "password": undefined,
            "babyCode":undefined,
            "fatherFirst": undefined,
            "fatherLast": undefined,
            "motherFirst": undefined,
            "motherLast": undefined,
            "babyFirst": undefined,
            "babyMiddle": undefined,
            "babyLast": undefined
        },

        validation:{
            password:{
                required:true,
                minLength: 6,
                maxLength: 12,
                msg:"Please enter a valid password between 6 and 15 characters long"
            },
            confirmPassword:{
                required:true,
                equalTo: "password",
                msg:"Please re-enter the same password as above"
            },
            babyCode: {
                required: true,
                msg: "Please enter a valid, unique code to access your page"
            },

            email:{
                required:true,
                pattern:'email',
                msg:'Please enter a valid Email address so we can let you know when you receive a response!'
            },

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