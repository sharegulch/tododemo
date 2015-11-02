Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      //console.log(event);
      event.preventDefault();
      var text = event.target.tasktext.value;
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });
      event.target.tasktext.value = "";
    },
    "click .toggle-checked": function () {
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });

}
