const getNotesParams = () => {
  return {
    color: $('.notes').css('background-color'),
    title: $('.notes__title-content').text(),
    description: [].map.call($('.notes__field'), item => $(item).text()).filter(item => item.length > 0)
  }
};

$('.btn').on('click', function () {
  const btn = $(this);
  const data = getNotesParams();
  const item = 'notes';

  switch (true) {

    case btn.hasClass('btn_save') && btn.hasClass('btn_edit'):
      if (checkParamsBeforeSave(data, item)) {
        $('.btn_edit > .spinner-border').css('display', 'inline-block');
        ajaxPostPut('PUT', item, data, ((window.location.pathname).split('/')).pop());
      }
      break;

    case btn.hasClass('btn_edit'):
      $(this).removeClass('btn-info').addClass('btn-success btn_save').text('Save').append('<span class="spinner-border spinner-border-sm"></span>');
      $('.notes__content').attr('contenteditable', true);
      $('.notes__title-content').attr('contenteditable', true);
      $('.dropdown-menu').removeClass('dropdown-menu_edit');
      break;

    case btn.hasClass('btn_save'):
      if (checkParamsBeforeSave(data, item)) {
        $('.btn_save > .spinner-border').css('display', 'inline-block');
        ajaxPostPut('POST', item, data);
      }
      break;

    case btn.hasClass('btn_trash'):
      $('.btn_trash > .spinner-border').css('display', 'inline-block');
      ajaxDelete(((window.location.pathname).split('/')).pop(), item);
  }
});

$('.dropdown-menu').on('click', function (ev) {
  const bgColor = $(ev.target).css('background-color');
  $('.notes').css('background-color', bgColor);
});