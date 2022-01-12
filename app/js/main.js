function smoothScrolling (element) {
  $('body,html').animate({
    scrollTop: $(element).offset().top
  }, 1500);
}

function closeSuccessModal(){
  $('.success-modal').fadeOut();
}

//Валидация формы
$(function () {
  $('.offer__form').validate({
    rules: {
      name: "required",
      phone: {
        number:true,
        required:true
      },
      message: {
        required: true
      }
    },
    messages: {},
    errorElement:'span',
    errorClass:'input-error-message',
    highlight: function(element){
      $(element).addClass('input--error');
    },
    unhighlight: function(element){
      $(element).removeClass('input--error');
    },
    errorPlacement:function (error,element) {
      error.appendTo(element.parent());
    },
    submitHandler: function (form, event) {
      ajaxSubmit(form, event);
    }
  });
});

//Ajax-обработчик формы
function ajaxSubmit(form, event) {
  event.preventDefault();
  var name = $(form.elements["name"]);
  var phone = $(form.elements["phone"]);
  var message = $(form.elements["message"]);
  $('.input-error-message').text(null);
  $('.input').removeClass('input--error');
  $.ajax({
    type: "POST",
    url: "/v1/contacts/zilant",
    data: JSON.stringify({name: name[0].value, phone: phone[0].value, message: message[0].value}),
    dataType: "json",
    contentType: "application/json",
    success: function () {
      name[0].value = '';
      phone[0].value = '';
      message[0].value = '';
      document.getElementsByClassName('success-modal')[0].style.display = 'flex';
    }
  });
}

