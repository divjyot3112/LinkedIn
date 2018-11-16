// var connection = new require("./kafka/Connection");
// var login = require("./services/login");

// var topic_name = "login_topic";
// var consumer = connection.getConsumer(topic_name);
// var producer = connection.getProducer();
// console.log("server is running");
// consumer.on("message", function(message) {
//   console.log("message received");
//   console.log(JSON.stringify(message.value));
//   var data = JSON.parse(message.value);
//   login.handle_request(data.data, function(err, res) {
//     console.log("after handle" + res.code);
//     var payloads = [
//       {
//         topic: data.replyTo,
//         messages: JSON.stringify({
//           correlationId: data.correlationId,
//           data: res
//         }),
//         partition: 0
//       }
//     ];
//     producer.send(payloads, function(err, data) {
//       console.log("Data" + data);
//     });
//     return;
//   });
// });
var connection = new require("./kafka/Connection");
//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
var login = require("./services/login");
// var loginowner = require("./services/loginowner");
var registerapplicant = require("./services/registerapplicant");
var saveJob = require("./services/saveJob");
var jobsearch = require("./services/jobsearch");
// var listproperty = require("./services/listproperty");
// var bookproperty = require("./services/bookproperty");
// var displayproperty = require("./services/displayproperty");
// var converttravel = require("./services/converttravel");
var userdisplay = require("./services/userdisplay");
var viewConnections = require("./services/viewConnections");
var connectionRequest = require("./services/connectionRequest");
var connectionAccept = require("./services/connections");
var userupdate = require("./services/userupdate");

var addRecruiter = require("./services/recruiterKafka/addRecruiter");
var addJob = require("./services/recruiterKafka/addJob");
var getJobs = require("./services/recruiterKafka/getJobs");
var editJob = require("./services/recruiterKafka/editJob");
var loginRecruiter = require("./services/recruiterKafka/loginRecruiter");
var recruiterDisplay = require("./services/recruiterKafka/displayRecruiter");
var modifyRecruiterAccount = require("./services/recruiterKafka/modifyRecruiterAccount");
// var updateEmail = require("./services/emailUpdate");
// var updatePassword = require("./services/updatePassword");
// var questionfromtraveller = require("./services/questionfromtraveller");
// var ownerinbox = require("./services/ownerinbox");
// var replyfromowner = require("./services/replyfromowner");
// var travellerinbox = require("./services/travellerinbox");
function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login_topic", login);
handleTopicRequest("registerapplicant_topic", registerapplicant);
// handleTopicRequest("registerowner_topic", registertowner);
handleTopicRequest("jobsearch_topic", jobsearch);
// handleTopicRequest("listproperty_topic", listproperty);
// handleTopicRequest("bookproperty_topic", bookproperty);
// handleTopicRequest("displayproperty_topic", displayproperty);
// handleTopicRequest("converttravel_topic", converttravel);
handleTopicRequest("userdisplay_topic", userdisplay);
// handleTopicRequest("ownerdashboard_topic", ownerdashboard);
handleTopicRequest("connrequest_topic", connectionRequest);
handleTopicRequest("connectionaccept_topic", connectionAccept);
handleTopicRequest("userupdate_topic", userupdate);
handleTopicRequest("savejob_topic", saveJob);
handleTopicRequest("viewconnections_topic", viewConnections);
handleTopicRequest("addRecruiter_topic", addRecruiter);
handleTopicRequest("addJob_topic", addJob);
handleTopicRequest("getJobs_topic", getJobs);
handleTopicRequest("editJob_topic", editJob);
handleTopicRequest("loginRecruiter_topic", loginRecruiter);
handleTopicRequest("recruiterDisplay_topic", recruiterDisplay);
handleTopicRequest("modifyRecruiterAccount_topic", modifyRecruiterAccount);
// handleTopicRequest("updateEmail_topic", updateEmail);
// handleTopicRequest("updatePassword_topic", updatePassword);
// handleTopicRequest("questionfromtraveller_topic", questionfromtraveller);
// handleTopicRequest("ownerinbox_topic", ownerinbox);
// handleTopicRequest("replyfromowner_topic", replyfromowner);
// handleTopicRequest("travellerinbox_topic", travellerinbox);
