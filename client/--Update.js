Template.Update.events({
	"click #addNewMidpoint": function () {
		var m = Session.get("midpointsCounter");
		if (m < 2) {
			m++;
			Session.set("midpointsCounter", m);
		}
	},
	"click #removeMidpoint": function () {
		var m = Session.get("midpointsCounter");
		if (m > 0) {
			m--;
			Session.set("midpointsCounter", m);
		}
	}
});
Template.Update.helpers({
	midpoints: function () {
		return Session.get("midpointsCounter");
	},
	twomidpoints: function () {
		var m = Session.get("midpointsCounter");
		if (m > 1) return true;
		else return false;
	},
	oneDoc: function () {
		return Offers.findOne({"_id" : "kszNTGuvjd49329bn"});
	}
});