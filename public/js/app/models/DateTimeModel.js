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

                from: {
                    required:true,
                    pattern:/^\d{1,2}[:]\d{2}\s(AM|PM)$/,
                    msg: "Please enter a valid time"
                },
                to: "validateTo"
            },

            validateTo: function(toValue, attr, computedState) {
                var error = undefined;
                var arbitraryDate = "01/01/2013 ";
                var fromValue = this.get("from");
                var fromDate = moment(arbitraryDate + fromValue);

                if ( !toValue ) {
                    error = "Please enter a valid time";
                }
                else {
                    var toDate = moment(arbitraryDate + toValue);
                    if ( toDate < fromDate ) {
                        error = "Please enter a valid Time Range";
                    }
                }
                return error;
            }

        });

        return Model;
    }
);