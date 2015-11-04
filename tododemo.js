Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

  Template.body.helpers({
    tasks: function () {
      if (Session.get("hideCompleted")) {
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      v = Session.get("hideCompleted");
      return v;
    },
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      event.preventDefault();
      var text = event.target.tasktext.value;
      var user = Meteor.user();
      console.log( JSON.stringify( user ) );
      Tasks.insert({
        text: text,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        meteorId: Meteor.user()._id
      });
      event.target.tasktext.value = "";
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.task.events({
    "click .toggle-checked": function () {
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    },
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
  });

}
