Template.Chat.helpers({
	userPicHelper: function(id) {
        var img = 'http://graph.facebook.com/' 
        + id 
        + '/picture?type=square&height=50&width=50';
        return img;	
    },
    isUserSayingThis: function (owner) {
    	if (owner === Meteor.userId()) {
    		return true;
    	}
    	else return false;
    }
});
Template.Chat.events({
	"change .chatInputBox": function (event, tmpl) {
		var input = event.target;
		var facebook = Meteor.user().services.facebook;
		var message = {
			text: input.value,
			owner: Meteor.userId(),
			facebookId: facebook.id,
			facebookName: facebook.name,
			facebookLink: facebook.link,
			createdAt: new Date()
		};
		var offerID = tmpl.data._id;
		var i = Offers.update({_id: offerID}, {$push: {Messages: message}});
		input.value = "";
	}
});
