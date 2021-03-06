$( document ).ready(function() {

    var $form = $('#new-card-form');
    $form.submit(changeCreditCard);


    // var submit_form_btn = $('#change-card-button');
    // submit_form_btn.on('click', submit_new_card);

    function submit_new_card(e){ 

      // $('#billing-form').submit();
       // alert("POR AQUI2");
      // $form.submit();
    }

    /* If you're using Stripe for payments */
    function changeCreditCard(e) {
        console.log("submiting");
        e.preventDefault();

        if (!$('.agree-terms').is(':checked')){
          alert("You must accept terms and conditions.");
          return;
        }


        /* Visual feedback */
        $form.find('[type=submit]').html('Validating <i class="fa fa-spinner fa-pulse"></i>');

        var PublishableKey = window.stripeKey;
        Stripe.setPublishableKey(PublishableKey);
        Stripe.card.createToken($form, function stripeResponseHandler(status, response) {
            console.log("response",response);
            if (response.error) {
                /* Visual feedback */
    			 alert("POR AQUI3");
                $form.find('[type=submit]').html('Try again');
                /* Show Stripe errors on the form */
                $form.find('.payment-errors').text(response.error.message);
                $form.find('.payment-errors').closest('.row').show();
            } else {
                /* Visual feedback */
                $form.find('[type=submit]').html('Processing <i class="fa fa-spinner fa-pulse"></i>');
                /* Hide Stripe errors on the form */
                $form.find('.payment-errors').closest('.row').hide();
                $form.find('.payment-errors').text("");
                // response contains id and card, which contains additional card details
                var token = response.id;
                // AJAX

                //set token  on a hidden input
                $('#id_token').val(token);
                $('#change-card-form').submit();
            }
        });
    }


    /* Form validation */
    $.validator.addMethod("month", function(value, element) {
      return this.optional(element) || /^(01|02|03|04|05|06|07|08|09|10|11|12)$/.test(value);
    }, "Please specify a valid 2-digit month.");

    $.validator.addMethod("year", function(value, element) {
      return this.optional(element) || /^[0-9]{2}$/.test(value);
    }, "Please specify a valid 2-digit year.");

    validator = $form.validate({
        rules: {
            cardNumber: {
                required: true,
                creditcard: true,
                digits: true
            },
            expMonth: {
                required: true,
                month: true
            },
            expYear: {
                required: true,
                year: true
            },
            cvCode: {
                required: true,
                digits: true
            }
        },
        highlight: function(element) {
            $(element).closest('.form-control').removeClass('success').addClass('error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-control').removeClass('error').addClass('success');
        },
        errorPlacement: function(error, element) {
            $(element).closest('.form-group').append(error);
        }
    });

    paymentFormReady = function() {
        if ($form.find('[name=cardNumber]').hasClass("success") &&
            $form.find('[name=expMonth]').hasClass("success") &&
            $form.find('[name=expYear]').hasClass("success") &&
            $form.find('[name=cvCode]').val().length > 1) {
            return true;
        } else {
            return false;
        }
    };

    // $form.find('[type=submit]').prop('disabled', true);
    // var readyInterval = setInterval(function() {
    //     if (paymentFormReady()) {
    //         $form.find('[type=submit]').prop('disabled', false);
    //         clearInterval(readyInterval);
    //     }
    // }, 250);

});
