ScienceList = new Meteor.Collection('scientists');

if(Meteor.isServer){
  Meteor.publish('theScientists', function(){
    var currentUserId = this.userId;
    return ScienceList.find({createdBy: currentUserId});
  });

  Meteor.methods({
    'insertPlayerData': function(playerNameVar){
      var currentUserId = Meteor.userId();
      ScienceList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    },

    'removePlayerData': function(removedPlayer){
      ScienceList.remove(removedPlayer)
    },

    'modifyPlayerScore': function(selectedPlayer, pointDifference){
      ScienceList.update(
        {_id: selectedPlayer},
        {$inc: {score: pointDifference}});
    }
  });
}

if(Meteor.isClient){
  Meteor.subscribe('theScientists');

  Template.science.events({
    'click li.player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      var selectedPlayer = Session.get('selectedPlayer');
      console.log(selectedPlayer);
    },
    'click #increment': function(){
 	    var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 5)	 	
    },
    'click #decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, -5)
    }
  });
  
  Template.addPlayerForm.events({
    'submit form': function(theEvent, theTemplate){
      theEvent.preventDefault();
      var playerNameVar = theTemplate.find('#playerName').value;
      Meteor.call('insertPlayerData', playerNameVar);
    }
  });

  Template.removePlayer.events({
    'click #remove': function(){
      var removedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', removedPlayer);
    }
  });
}

if(Meteor.isClient){
  Template.science.player = function(){
    var currentUserId = Meteor.userId();
    return ScienceList.find(
      {createdBy: currentUserId},
      {sort: {score: -1, name: 1}});
  }
  
  Template.science.selectedClass = function(){
	var selectedPlayer = Session.get('selectedPlayer');
	var playerId = this._id;
	if (selectedPlayer === playerId) {
		return 'selected';
		}
	}

  Template.science.showSelectedPlayer = function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return ScienceList.findOne(selectedPlayer);
  }
}


