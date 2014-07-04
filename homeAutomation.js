if (Meteor.isClient) {

         Meteor.setInterval( function () {
        Session.set("time",Date.now());
    }, 1000 );

  Template.hello.greeting = function () {
    return "Welcome to homeAutomation.";
  };

Template.hello.welcome = function ()
{

return "Welcome Arpith";
};


Template.rooms.rooms = function()
{

return Rooms.find();
};

Template.rooms.messages = function ()

{

return Messages.find({},{sort:{time:-1},limit:1});

}

Template.os.helpers({
'time':function()
{

        return moment(Session.get("time")).format("hh:mm:ss A");
//        return moment.tz("2013-11-18 11:55", "America/Toronto");
}

});



  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

Router.map(function () {
  this.route('rooms', {
    path: '/rooms',
    waitOn: function () {

    }
  });
});

Router.map(function () {
  this.route('hello', {
    path: '/hello',
    waitOn: function () {

    }
  });
});

Router.map(function () {
  this.route('mobile', {
    path: '/mobile',
    waitOn: function () {

    }
  });
});

Router.map(function () {
  this.route('os', {
    path: '/os',
    waitOn: function () {

    }
  });
});

/* Messages.insert({message:"hello",time:Date.now()}); */
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Rooms = new Meteor.Collection("rooms");
Messages = new Meteor.Collection("messages");
