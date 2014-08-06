if(Meteor.isServer){}
if(Meteor.isClient){Template.science.events({
  'click li.player': function(){
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    var selectedPlayer = Session.get('selectedPlayer');
    console.log(selectedPlayer);
  },
  'click #increment': function(){
 	//code	 	
  }
});}

ScienceList = new Meteor.Collection('scientists');

if(Meteor.isClient){
  Template.science.player = function(){
    return ScienceList.find();
  }
  Template.science.selectedClass = function(){
	var selectedPlayer = Session.get('selectedPlayer');
	var playerId = this._id;
	if (selectedPlayer === playerId) {
		return 'selected';
		}
	}
}


