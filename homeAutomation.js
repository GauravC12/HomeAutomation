if (Meteor.isClient) {

         Meteor.setInterval( function () {
        Session.set("time",Date.now());
    }, 1000 );


    Meteor.setInterval( function () {

var nowminute = Math.round(Date.now()/1000);
var nextminute = nowminute+60;
console.log('nowminute is ',nowminute);
console.log('nextminute is',nextminute);

console.log('count is '+ Roomt.find({time:{$gte:nowminute,$lte:nextminute}}).count());

var triggers  = Roomt.find({time:{$gte:nowminute,$lte:nextminute}});

triggers.forEach(function(item) {
        console.log(item.roomId);
        Rooms.update({_id:item.roomId},{$set:{color:item.color}});
        Roomt.remove({_id:item._id});
});


}, 1000 );


  Template.hello.greeting = function () {
    return "Welcome to homeAutomation.";
  };

Template.hello.welcome = function ()
{

return "Welcome Arpith";
};


Template.os.events({
'click #tellMe':function()
{

var msg = $('#msg').val();

if(msg.indexOf("Whatsup")!=-1)
{
        Messages.insert({message:"1010100101001010101010101010 101010101",time:Date.now()});


}

else if(msg.indexOf("is @")!=-1)
        {

        var array = msg.split("is");
        var name = array[0];
        name=name.replace(" ","");

        var time = array[1];
        time = time.replace("@","");
        var hh;
        var mm;

        if(time.indexOf("PM")!=-1)
 {

         time = time.replace("PM","");
        var hhmm = time.split(":");
         hh =  parseInt(hhmm[0]) + 12;
         if(hh==24)
         hh="00";
         mm = hhmm[1];
         console.log("hh is "+hh);

 }
 else
         {
        time = time.replace("AM","");
        var hhmm = time.split(":");
         hh = hhmm[0] ;
         mm = hhmm[1];


         }

var time = Math.round(new Date(2014,06,5,hh,mm,00).getTime()/1000);


 Moments.insert({name:name,time:time});

Messages.insert({message:"Ok , i have noted the time",time:Date.now()});

        }

else if(msg.indexOf("On !")!=-1 || msg.indexOf("on !")!=-1)
        {

                msg = msg.replace("On !","");
                msg=msg.replace("on !","");

        if(msg.indexOf("On")!=-1 )
        {

                array = msg.split("On");

                newarray = array[1].split("#");
                var moment = array[0].substr(0,array[0].length-1) ;

                var moment = Moments.findOne({name:{$regex:moment}});

                Messages.insert({message:"No Issues, I will take care of it",time:Date.now()});


                for(i=0;i<newarray.length;i++)
                {


                if(newarray[i]!=""&&newarray[i]!=" ")
                {
                newarray[i]=newarray[i].substr(0,newarray[i].length-1) ;


                var room = Rooms.findOne({name:{$regex:newarray[i]}});
                console.log(Rooms.findOne({name:{$regex:newarray[i]}}));
                console.log(room);
                if(room)
                        {

                                if(moment)
                                        {


                                        if(room.name.indexOf("Kitchen")!==-1)

                                                {


console.log(Roomt.insert({roomId:room._id,color:'#f1c40f',time:moment.time,triggered:0}));

                                                }
                                        else if(room.name.indexOf("Bedroom")!==-1)
                                                {

console.log(Roomt.insert({roomId:room._id,color:'#e74c37',time:moment.time,triggered:0}));


                                        }
                                        else if(room.name.indexOf("Living Room")!==-1)
                                                {
console.log(Roomt.insert({roomId:room._id,color:'#2ecc71',time:moment.time,triggered:0}));

                                        }
                                        else if(room.name.indexOf("Study Room")!==-1)
                                                {
        console.log(Roomt.insert({roomId:room._id,color:'#3498db',time:moment.time,triggered:0}));


                                        }
                                }


                        }

                }

                }




        }
        else if(msg.indexOf("Off")!=-1 )
        {

                array = msg.split("Off");

Messages.insert({message:"No Issues, I will take care of it",time:Date.now()});

newarray = array[1].split("#");
var moment = array[0].substr(0,array[0].length-1) ;

var moment = Moments.findOne({name:{$regex:moment}});



for(i=0;i<newarray.length;i++)
{


if(newarray[i]!=""&&newarray[i]!=" ")
{
newarray[i]=newarray[i].substr(0,newarray[i].length-1);


var room = Rooms.findOne({name:{$regex:newarray[i]}});
console.log(Rooms.findOne({name:{$regex:newarray[i]}}));
console.log(room);
if(room)
        {

                if(moment)
                        {


                        if(room.name.indexOf("Kitchen")!==-1)

                                {

                                console.log(Roomt.insert({roomId:room._id,color:'#000000',time:moment.time,triggered:0}));



                                }
                        else if(room.name.indexOf("Bedroom")!==-1)
                                {

console.log(Roomt.insert({roomId:room._id,color:'#000000',time:moment.time,triggered:0}));


                        }
                        else if(room.name.indexOf("Living Room")!==-1)
                                {
console.log(Roomt.insert({roomId:room._id,color:'#000000',time:moment.time,triggered:0}));

                        }
                        else if(room.name.indexOf("Study Room")!==-1)
                                {
console.log(Roomt.insert({roomId:room._id,color:'#000000',time:moment.time,triggered:0}));

                        }
                }


        }

}

}




        }


        }

}

});

Template.rooms.rooms = function()
{

return Rooms.find();
};

Template.rooms.messages = function ()

{

return Messages.find({},{sort:{time:-1},limit:1});

}

Template.os.messages = function ()

{

return Messages.find({},{sort:{time:-1},limit:1});

}


Template.os.entities=function()
{

return Entities.find({});

}

Template.os.helpers({
'time':function()
{

        return moment(Session.get("time")).format("hh:mm:ss A");
//        return moment.tz("2013-11-18 11:55", "America/Toronto");
}

});


Template.rooms.helpers({
'time':function()
{

        return moment(Session.get("time")).format("hh:mm:ss A");
//        return moment.tz("2013-11-18 11:55", "America/Toronto");
}

});


Template.os.settings = function() {
  return {
   position: "bottom",
   limit: 5,
   rules: [
   {
           token: '@',
           collection:Times,
           field: "time",
           template: Template.timesPill


   },
     {
       token: ' ',
       collection:Commands,
       field: "command",
       template: Template.commandPill     },
     {
        token:'#',
        collection:Rooms,
        field:"name",
        template:Template.roomPill
},
{
        token:'!',
        collection:Moments,
        field:"name",
        template:Template.momentPill
},
{
        token:'~',
        collection:Entities,
        field:"name",
        template:Template.entitiesPill,
}

   ]
  }
};


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
    Messages.remove({});
Moments.remove({});

    Roomt.remove({});

  });
}

Rooms = new Meteor.Collection("rooms");
Messages = new Meteor.Collection("messages");
Commands = new Meteor.Collection("commands");
Times = new Meteor.Collection("times");
Moments = new Meteor.Collection("moments");
Entities = new Meteor.Collection("entities");
Roomt = new Meteor.Collection("Roomt");
