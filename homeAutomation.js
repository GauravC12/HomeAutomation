if (Meteor.isClient) {
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
}

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

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Rooms = new Meteor.Collection("rooms");
