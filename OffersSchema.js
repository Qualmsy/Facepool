Offers = new Mongo.Collection('offers');
Schemas = {};
timeOptions = {	    
		type: Date,
	    label: "Time",
	    autoform: {
	      afFieldInput: {
	        type: "bootstrap-datetimepicker"
	      }
	    }
	};
locationOptions = {
	    type: Object,
        label: "Map",
        autoform: {
            type: 'map',
            afFieldInput: {
	            geolocation: true,
	            searchBox: true,
	            autolocate: true,
	            zoom: 14,
	            width: "600px",
	            height: "300px"
            }
        }
	};

Schemas.Offers = new SimpleSchema({ 
	driver: {
	    type: String,
	    autoValue:function(){ 
	    	if (this.isInsert) {
	    		return this.userId;
	    	}
	    }
	},
	driverName: {
	    type: String,
	    autoValue:function(){ 
	    	if (this.isInsert) {
		    	var facebook = Meteor.user().services.facebook;
		    	return facebook.name; 
		    }
	    }
	},
	driverLink: {
	    type: String,
	    autoValue:function(){ 
	    	if (this.isInsert) {
		    	var facebook = Meteor.user().services.facebook;
		    	return facebook.link; 
		    }
	    }
	},
	whoIsInterested: {type: Array, optional: true},
	'whoIsInterested.$': {type: Object,  optional: true},
	'whoIsInterested.$.userId': {type: String},
	'whoIsInterested.$.facebookId': {type: String},
	'whoIsInterested.$.facebookName': {type: String},
	'whoIsInterested.$.facebookLink': {type: String},
	'whoIsInterested.$.timestamp': {type: Date},


	carBrand: {
		type: String,
		optional: true
	},
	carModel: {
		type: String,
		optional: true
	},
	carYear: {
		type: Number,
		optional: true,
		allowedValues: [2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996],
	    defaultValue: 2015
	},
	carColor: {
		type: String,
		optional: true
	},
	createdAt: {
	    type: Date,
	    autoValue:function(){
	    	if (this.isInsert) {
	    		return new Date(); 
	    	}
	    }
	},
	price: {
		type: Number,
		optional: true
	},
	Suggestions: {
		type: Schemas.Suggestions,
		optional: true
	},

	Messages: {type: Array, optional: true},
	'Messages.$': {type: Object},
	'Messages.$.text': {type: String},
	'Messages.$.owner': {type: String},
	'Messages.$.facebookId': {type: String},
	'Messages.$.facebookName': {type: String},
	'Messages.$.facebookLink': {type: String},
	'Messages.$.createdAt': {type: Date},

	Departure: {type: Object},
	'Departure.time': timeOptions,
	'Departure.location': locationOptions,
	'Departure.location.lat': {type: String},
	'Departure.location.lng': {type: String},
	'Departure.location.description': {type: String},
	
	Midpoint1: {type: Object,optional: true},
	'Midpoint1.time': timeOptions,
	'Midpoint1.location': locationOptions,
	'Midpoint1.location.lat': {type: String},
	'Midpoint1.location.lng': {type: String},
	'Midpoint1.location.description': {type: String},
	
	Midpoint2: {type: Object,optional: true},
	'Midpoint2.time': timeOptions,
	'Midpoint2.location': locationOptions,
	'Midpoint2.location.lat': {type: String},
	'Midpoint2.location.lng': {type: String},
	'Midpoint2.location.description': {type: String},
	
	Arrival: {type: Object},
	'Arrival.time': {	    
		type: Date,
	    label: "Estimated time (optional)",
	    optional: true,
	    autoform: {
	      afFieldInput: {
	        type: "bootstrap-datetimepicker"
	      }
	    }
	},
	'Arrival.location': locationOptions,
	'Arrival.location.lat': {type: String},
	'Arrival.location.lng': {type: String},
	'Arrival.location.description': {type: String}
});
Offers.attachSchema(Schemas.Offers);