Session.setDefault("midpointsCounter", 0);
Template.NewOffer.events({
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
	},
	"click #registerThisCar": function (event, tmpl) {
		var model = tmpl.find("#carModelInput").value;
		var year = tmpl.find("#carYearInput").value;
		var colorName = tmpl.find("#carColorInput").value;
		var car = {
			model: model,
			year: year,
			colorName: colorName
		};
		Meteor.call("registerCar", car);
	},
	"click button[type=submit]": function (event, tmpl) {
	     Router.go("/");
	}
});
Template.NewOffer.helpers({
	midpoints: function () {
		return Session.get("midpointsCounter");
	},
	twomidpoints: function () {
		var m = Session.get("midpointsCounter");
		if (m > 1) return true;
		else return false;
	}
});