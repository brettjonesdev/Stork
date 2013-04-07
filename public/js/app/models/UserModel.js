define(["backbone", "backbone-validation"],
    function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/user",
        idAttribute: "_id",
        defaults: {
            "email": undefined,
            "password": undefined,
            "confirmPassword": undefined,
            "babyCode":undefined
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

            email:{
                required:true,
                pattern:'email',
                msg:'Please enter a valid Email address so we can let you know when you receive a response!'
            }
        }
    });
});