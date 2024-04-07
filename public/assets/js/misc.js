var ajax_data = {
  url: 'https://clinicsarmayeh.com/wp-admin/admin-ajax.php',
};
var request_dyn_data = {
  admin_ajax: 'https://clinicsarmayeh.com/wp-admin/admin-ajax.php',
  request_rules: {
    mobile: {
      required: true,
      custommobile: true,
    },
    full_name: {
      required: true,
    },
  },
  request_messages: {
    mobile: {
      required:
        '\u0644\u0637\u0641\u0627 \u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644 \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u0646\u0645\u0627\u06cc\u06cc\u062f',
      custommobile:
        '\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644 \u0648\u0627\u0631\u062f \u0634\u062f\u0647 \u0645\u0639\u062a\u0628\u0631 \u0646\u0645\u06cc \u0628\u0627\u0634\u062f',
    },
    full_name: {
      required:
        '\u0644\u0637\u0641\u0627 \u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u0646\u0645\u0627\u06cc\u06cc\u062f',
    },
  },
};
jQuery('.auth-btn, .sh-off-canvas-feedback').on('click', function () {
  setTimeout(function () {
    jQuery('#menumobile').removeClass('come-menumobile');
    jQuery('#mask').css('display', 'none');
  }, 500);
});
