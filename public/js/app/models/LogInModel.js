define(["backbone", "backbone-validation"],
    function(Backbone) {
        return Backbone.Model.extend({
            url: "/logIn",
            defaults: {
                "email": undefined,
                "password": undefined
            },

            validation:{
                password:{
                    required:true,
                    minLength: 6,
                    msg:"Please enter your password"
                },

                email:{
                    required:true,
                    pattern:'email',
                    msg:'Please enter your email address'
                }
            }
        });
    });