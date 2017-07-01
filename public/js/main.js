//dynamically render html pages
$("#submitplayers").on('click', function() {
   $("#load_main").load("submitplayers.html", function() {
      //submit button on submitplayers.html
      //clear all inputs to make it easier for submitting more players
      /*$("#playersubmit").on('click', function() {
         $("input[name='playerName']").val('');
         for (var i = 1; i <= 3; i++){
            $("input[name='game"+ i + "']").val('');
         };
      });*/
   });
});

$("#goHome").on('click', function() {
   $("#load_main").load("home.html");
});

$("#contactUs").on('click', function() {
   $("#load_main").load("contact.html", function() {
      $("#contactInfo").validate({
         debug: false,
         rules: {
            name: "required",
            email: {
               required: true,
               email: true
            },
            comment: "required",
            subject: "required"
         },
         messages: {
            name: "We need to know who you are!",
            email:"Need a valid email to contact you!",
            comment: "Let us hear from you!",
            subject: "What is the message about?"
         },
         submitHandler: function(form) {
            $.get("sendemail", $(form).serialize(), function(data) {
                  if (data==="sent") {
                     $("#message").empty().html("\
                        Email is sent to minho.lee.93@hotmail.com");
                     };
                  });
         }
         //add SubmitHandler to do ajax post call (use serialize to use stuff inside form)
      });
   });
});

$("#getplayers").on('click', function() {
   $('#load_main').load("getplayers.html", function() {
      //this callback is here to ensure that main.js is loaded properly
      //able to recognize all id/classes before contact.html is loaded
      
      /*$("#getInfo").on('click', function() {
         $("#displayInfo").DataTable({
            "paging": false,
            "processing": true,
            "serverSide": true,
            "ajax": {
               type: "POST",
               url: "/getplayer",
               data: { userid: $('#playerName').val() },
               dataSrc: ''
            },
            "columns" : [
               { data: "session" },
               { data: "session[0].game1" },
               { data: "session[0].game2" },
               { data: "session[0].game3" }
            ]
         });
      });*/


      //making an ajax post call to retrieve data from cloudant
      $("#getInfo").click(function() {
         $.ajax({
            type: "POST",
            url: "/getplayer",
            //contentType: "json",
            //dataType: "json",
            data: { userid: $('#playerName').val() },
            success: function(res, status, xhr) {
               console.log("success! Type: "+ xhr.getResponseHeader("content-type"));
               console.log("status: " + status);
               //console.log(typeof(res));
               if (typeof res === "string") {
                  $("#results").html("<div id='playerNotFound'>"+ res + "</div>");
                  $("#showScore").html("");
               } else {
                  //$("#results").append(JSON.stringify(res));
                  console.log(res.player);
                  $("#results").html("");
                  if (counter === 0) {
                     $("#showScore")
                        .append("<tr><th>Session</th><th>Game 1</th>\
                                 <th>Game 2</th><th>Game 3</th></tr>");
                  } else {
                     $("#showScore")
                        .html("<tr><th>Session</th><th>Game 1</th>\
                                 <th>Game 2</th><th>Game 3</th></tr>");
                  };
                  for (var i = 0; i < res.player.session.length; i++) {
                     $("#showScore")
                        .append("\
                           <tr><td>"+(i+1)+"</td><td>"+ res.player.session[i].game1 + "</td>\
                           <td>"+ res.player.session[i].game2 +"</td>\
                           <td>"+ res.player.session[i].game3+"</td></tr>");
                  };
                  counter++;
               };
               //This is for a different table scheme.
               /*if (counter === 0) {
                     $("#showScore")
                        .append("<thead><tr><th scope='col' class='rounded-top-left'>\
                              Session</th><th scope='col'>Game 1</th>\
                              <th scope='col'>Game 2</th>\
                              <th scope='col' class='rounded-top-right'>Game 3</th>\
                              </tr></thead>\
                              <tfoot><tr><td colspan='3' class='rounded-foot-left'>\
                              <em>Table Footer Testing</em></td>\
                              <td class='rounded-foot-right'></td>\
                              </tr></tfoot><tbody id='addScore'></tbody>");
                     for(var i = 0; i<res.player.session.length; i++) {
                        $("#addScore")
                           .append("\
                              <tr><td>"+(i+1)+"</td><td>"+ res.player.session[i].game1 + "</td>\
                              <td>"+ res.player.session[i].game2 +"</td>\
                              <td>"+ res.player.session[i].game3+"</td></tr>");
                     };
                     counter++;
                  } else {
                     $("#showScore")
                        .html("<thead><tr><th scope='col' class='rounded-top-left'>\
                              Session</th><th scope='col'>Game 1</th>\
                              <th scope='col'>Game 2</th>\
                              <th scope='col' class='rounded-top-right'>Game 3</th>\
                              </tr></thead>\
                              <tfoot><tr><td colspan='3' class='rounded-foot-left'>\
                              <em>Table Footer Testing</em></td>\
                              <td class='rounded-foot-right'></td>\
                              </tr></tfoot><tbody id='addScore'></tbody>");
                     for(var i = 0; i<res.player.session.length; i++) {
                        $("#addScore")
                           .append("\
                              <tr><td>"+(i+1)+"</td><td>"+ res.player.session[i].game1 + "</td>\
                              <td>"+ res.player.session[i].game2 +"</td>\
                              <td>"+ res.player.session[i].game3+"</td></tr>");
                     };
                  };*/
               //var res_obj = {};
               //$.extend(res_obj, res);
               //$("#results").append(JSON.stringify(res_obj));
               $("#results").append('<br/>');
            },
            error: function(xhr, textStatus, error){
               console.log(xhr.statusText);
               console.log(textStatus);
               console.log(error);
            }
         });
         console.log("post action completed");
      });
   });
});




//Change active class as the html pages render
$(document).ready(function () {
   $('.nav li a').click(function(e) {

      $('.nav li').removeClass('active');

      var $parent = $(this).parent();
      if (!$parent.hasClass('active')) {
         $parent.addClass('active');
      }
      e.preventDefault();
   });
});

var counter = 0;