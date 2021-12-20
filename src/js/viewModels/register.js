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

define(['../accUtils', 'ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojrouter'],
  function (accUtils, oj, ko, $) {
    function RegisterViewModel() {
      // jQuery.support.cors = true;
      self.butfunc = function butfunc(event) {

        var ssn = document.getElementById('ssn'), name = document.getElementById('name'), password = document.getElementById('password'), cpassword = document.getElementById('cpassword'), dob = document.getElementById('dob'), city = document.getElementById('city');
        data = {
          "employee": {
            "ssn": ssn.value,
            "name": name.value,
            "email": email.value,
            "password": password.value,
            "dob": dob.value,
            "city": city.value
          }
        };
        // alert(name.value);
        // alert(data["employee"]);

        fetch("http://127.0.0.1:7000/listapi/", {
          method: 'POST',
          mode:'cors',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            //alert('hi success');
            window.location.href = 'http://localhost:8000/';
          })
          // .catch((error) => {
          //   console.error('Error:', error);
            
          // });
      }

      $(function () {
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
    return RegisterViewModel;
  }
);
