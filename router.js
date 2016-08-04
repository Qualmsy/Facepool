Router.configure({
  layoutTemplate: 'Layout'
});
Router.route('/', function () {
	this.render('Offers');
});
Router.route('/new', function () {
  this.render('NewOffer');
});
Router.route('/newask', function () {
  this.render('NewAsk');
});
Router.route('/settings', function () {
  this.render('Settings');
});
Router.route('/details/:_id', function () {
  this.render('Details', {
    data: function () {return Offers.findOne({_id: this.params._id})}
  });
});
Router.route('/chat/:_id', function () {
  this.render('Chat', {
    data: function () {return Offers.findOne({_id: this.params._id})}
  });
});
Router.route('/update/:_id', function () {
  var theOffer = Offers.findOne({_id: this.params._id});
  if (Meteor.userId() === theOffer.driver) {
    this.render('Update', {
      data: function () {return theOffer}
    });
  }
  else this.next();
});
Router.route('/suggest/:_id', function () {
  this.render('Suggest', {
    data: function () {return Offers.findOne({_id: this.params._id})}
  });
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('Login');
  } else {
    this.next();
  }
});