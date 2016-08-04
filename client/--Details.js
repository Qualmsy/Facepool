Template.Details.helpers({
	 isChecked: function (whoIsInterested) {
	    if (whoIsInterested) {
	      var id = Meteor.userId();
	      for (var i = whoIsInterested.length - 1; i >= 0; i--) {
	        if (whoIsInterested[i].userId === id){
	          return true;
	        }
	      };
	      return false
	    }
	    else return false
	 },
	userIsDriver: function (driver) {
		var user = Meteor.userId();
		if (user === driver) {
			return true;
		}
		else return false;
	},
	carDetails: function (driverId) {
		//console.log(driverId);
		return Cars.findOne({driver: driverId});
	}
});