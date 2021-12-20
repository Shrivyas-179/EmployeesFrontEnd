/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['../accUtils','ojs/ojcore','knockout','jquery','ojs/ojknockout','ojs/ojnavigationlist','ojs/ojswitch'],
 function(accUtils,oj, ko, $) {
    function LoginViewModel() {
      var self=this
      this.selectedItem = ko.observable("home");
      this.display = ko.observable("all");
      this.edge = ko.observable("top");
      this.isContrastBackground = ko.observable(false);
      this.isContrastBackground.subscribe(function(newValue){
            if(newValue){
              
             $("#tabbarcontainer").addClass("demo-panel-contrast1 oj-contrast-marker");
            }else{
                $("#tabbarcontainer").removeClass("demo-panel-contrast1 oj-contrast-marker");
            }
        });
      self.loginbutfunc=function loginbutfunc(){
        var email=document.getElementById('email'),password = document.getElementById('password');
        data = {
          "employee": {
            "email": email.value,
            "password": password.value
          }
        };

        fetch("http://127.0.0.1:7000/listdetail/", {
          method: 'POST',
          mode:'cors',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            window.location.href = 'http://localhost:8000/?ojr=login';
            $('.try').append('<iframe src="list.html"></iframe>');
          })
          .catch((error) => {
               console.error('Error:', error);
              alert('NO');
             });
      }
     
  
      $(function() {
        var createAllErrors = function () {
           var form = $(".myform");
           var errorList = $('ul.errorMessages', form);
      
           var showAllErrorMessages = function () {
           errorList.empty();
      
           form.find(':invalid').each(function () {
                var label = $(this).attr('name');
                    var message = $(this).validationMessage || $(this).attr('title');
                    errorList
                        .show()
                        .append('<li><span>' + label + ': ' + '</span>' + message + '</li>');
               
                });
           };
           $('input[type=submit], button', form).on('click', showAllErrorMessages);
        };
        $('form').each(createAllErrors);
      });
      
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return LoginViewModel;
  }
);
