define(["backbone", "backbone-validation"],
    function (Backbone) {
        // Creates a new Backbone Model class object
        return Backbone.Model.extend({
            urlRoot:"/callingRequest",
            idAttribute:'_id',

            defaults:{
                name:"",
                email:"",
                message:""
            },

            validation:{
                name:{
                    required:true,
                    msg:"Please let us know who you are!"
                },

                email:{
                    required:true,
                    pattern:'email',
                    msg:'Please enter a valid Email address so we can let you know when you receive a response!'
                }
            }
        });
    }
);