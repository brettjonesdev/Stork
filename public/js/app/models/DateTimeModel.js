define(["backbone", "underscore", "moment", "backbone-validation" ],
    function (Backbone, _,moment) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
            initialize: function() {
                _.bindAll(this);
            },

            defaults:{
                date: "",
                from: "",
                to: ""
            },

            validation:{
                date:{
                    required:true,
                    pattern: /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/,
                    msg:"Date, please!"
                },

                from:{
                    required:true,
                    pattern: /^\d{1,2}[:]\d{2}\s(PM|AM)$/,
                    msg:'From please'
                },
                to: "validateTo"
            },

            validateTo: function(value, attr, computedState) {
                var arbitraryDate = "01/01/2013 ";
                var fromValue = this.get("from");
                var fromDate = moment(arbitraryDate + fromValue);

                if ( !value ) {
                    return "Please Enter a To Date";
                }
                else {
                    var toDate = moment(arbitraryDate + value);
                    if(toDate < fromDate) {
                        return 'Please enter a valid time range';
                    }
                }
            }

        });

        return Model;
    }
);