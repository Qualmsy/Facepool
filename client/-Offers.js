Template.Offers.events({
  "click #filterOffersButton": function (event, tmpl) {
    var datetime = tmpl.$("#datetimeFilterInput")
                    .data("DateTimePicker").date;
    var obj = {
      datetime: datetime._d,
      from: tmpl.$("#fromFilterInput").val(),
      to: tmpl.$("#toFilterInput").val()
    };
    tmpl.datetimeFilter.set(obj);
  },
  "click #resetOffersButton": function (event, tmpl) {
    var now = new Date();
    tmpl.$("#datetimeFilterInput")
      .data("DateTimePicker")
      .setValue(now);
    tmpl.$("#fromFilterInput").val('');
    tmpl.$("#toFilterInput").val('');
    var obj = {
      datetime: now,
      from: '',
      to: ''
    };
    tmpl.datetimeFilter.set(obj);
  },
  "change [name=iaminterested]": function (event, tmpl) {
      var checked = event.target.checked;
      var id = event.target.value;
      if(checked) {
        if (id) {
         var facebook = Meteor.user().services.facebook;
         var interestedUser = {
            userId: Meteor.userId(),
            facebookId: facebook.id,
            facebookName: facebook.name,
            facebookLink: facebook.link,
            timestamp: new Date()
          };
         Offers.update({_id: id}, {$addToSet:{whoIsInterested: interestedUser}});
        }
      }
      else {
        if (id) {
         Offers.update({_id: id}, {$pull:{whoIsInterested: {userId: Meteor.userId()}}});
        }
      }
      //Meteor.call('markAsInterested', el.value);
      
  }
});

Template.Offers.helpers({
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
  offerList: function () {
    var tmpl = Template.instance();
    var d = tmpl.datetimeFilter.get();
    var from = new RegExp(d.from, "i");
    var to = new RegExp(d.to, "i");
    return Offers.find(
      {"Departure.time": {$gt: d.datetime},
      "Departure.location.description": {$regex: from},
      "Arrival.location.description": {$regex: to} });
  },
  driverPicHelper: function (driverId) {
    var driverDoc = Meteor.users.findOne({_id: driverId})
    var driverFacebookId = driverDoc.services.facebook.id;
    return 'http://graph.facebook.com/' 
        + driverFacebookId 
        + '/picture?type=square&height=50&width=50';
  },
  facebookLinkHelper: function (driverId) {
    var driverDoc = Meteor.users.findOne({_id: driverId})
    return driverDoc.services.facebook.link;
  },
  userIsDriver: function (driverId) {
    var userId = Meteor.userId();
    if (userId === driverId) {
      return true;
    }
    else return false;
  },
  carDetails: function (driverId) {
    return Cars.findOne({driver: driverId});
  }
});

Template.Offers.onRendered(function() {
  var now = new Date();
    this.$('.datetimepicker').datetimepicker()
    .data("DateTimePicker").setValue(now);
});

Template.Offers.onCreated(function() {
    var now = new Date();
    var obj = {
      datetime: now,
      from: '',
      to: ''
    };
    this.datetimeFilter = new ReactiveVar(obj);

    //Session.setDefault('datetimeFilter', null);
    Session.setDefault('fromFilter', '');
    Session.setDefault('toFilter', '');
});