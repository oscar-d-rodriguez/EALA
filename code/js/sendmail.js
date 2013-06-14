        function validateEmail(email) { 
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);

        } 
        function showMessage(errorObj, message){
            
             errorObj.html(message).slideDown(200);
             setTimeout(function (e) {
                 errorObj.slideUp(200);
            }, 3000);
        }
        $(document).ready(function (e) {
            $('form input[type=submit]').click(function (e) {

                var form = $(this).parents('form'),
                        errorObj = form.find('.cform-response-output'),
                        name = form.find('#name').val(),
                        email = form.find('#email').val(),
                        company = form.find('#company').val(),
                        message = form.find('#message').val(),
                        mailTo = form.attr('mail-to');

                if (validateEmail(email) && name && message) {
                    $.ajax({
                        url: 'mailform.php',
                        type: 'POST',
                        data: { name: name, email: email, company: company, message: message, mailTo: mailTo },
                        success: function (data, textStatus, xhr) {
                            form.find('input[type=text], textarea').val('');
                            showMessage(errorObj, 'Your message has been sent successfuly!');
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            alert('something bad ocurred' + textStatus + 'error' + errorThrown);
                            form.find('input[type=text], textarea').val('');
                            showMessage(errorObj, 'There was an error processing your request');
                        }
                    });
                } else {
                    showMessage(errorObj, 'Please review the form, there seems to be an error with your details');
                }




                return false;

            });
        });