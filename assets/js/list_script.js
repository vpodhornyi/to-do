function getListsParams() {
  const title = $('.lists__title-content').text();
  const color = $('.lists').css('background-color');
  const description = [].map.call($('.lists__field'), (item) => {
    return {
      name: $(item).children()[2].innerText,
      isDone: $(item).children()[0].checked
    }
  });
  return { title: title, color: color, description: description }
}

const notDoneTasksList = $('.lists__content');
const doneTasksList = $('.lists__content-done');

$('.btn').on('click', function () {
  const btn = $(this);
  const data = getListsParams();
  const item = 'lists';

  switch (true) {

    case btn.hasClass('btn_save') && btn.hasClass('btn_edit'):
      if (checkParamsBeforeSave(data, item)) {
        $('.btn_edit > .spinner-border').css('display', 'inline-block');
        ajaxPostPut('PUT', item, data, ((window.location.pathname).split('/')).pop());
      }
      break;

    case btn.hasClass('btn_edit'):
      $(this).removeClass('btn-info').addClass('btn-success btn_save').text('Save').append('<span class="spinner-border spinner-border-sm"></span>');
      $('.lists__title-content').attr('contenteditable', true);
      const inputField = `<input type="text" class="form-control add-todo" placeholder="Add item"/>`;

      const closeBtn = `<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>`;
      notDoneTasksList.prepend(inputField);
      $(".custom-control-input").removeAttr("onclick").on('change', moveDoneTask);
      $(".add-todo").on('keypress', null, null, inputEventHandler);
      $(".lists__field").append(closeBtn);
      $('.close').on('click', function (ev) {
        $(ev.target).closest('.lists__field').remove();
      });
      $(".lists__checkbox-text").on('click', function (ev) {
        $(ev.target).attr("contenteditable", "true");
        $(ev.target).keydown(function (event) {
          if (event.keyCode === 13) return false;
        });
      });

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
  $('.lists').css('background-color', bgColor);
});

let recordId = 0;

$(".add-todo").on('keypress', null, null, inputEventHandler);

function inputEventHandler(event) {
  if (event.keyCode === 13) {
    const inputObject = $(".add-todo")[0];
    const inputText = inputObject.value;
    inputObject.value = '';

    const taskDiv = `<div class="custom-control custom-checkbox lists__field">\n
                    <input type="checkbox" class="custom-control-input" id="defaultUnchecked${recordId}"/>\n
                    <label class="custom-control-label label" for="defaultUnchecked${recordId++}"></label>\n
                    <span class="lists__checkbox-text">${inputText}</span>\n
                    <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n
                    </div>`;
    notDoneTasksList.append(taskDiv);
    $(".lists__checkbox-text").on('click', function (ev) {
      $(ev.target).attr("contenteditable", "true");
      $(ev.target).keydown(function (event) {
        if (event.keyCode === 13) return false;
      });
    });
    $(".custom-control-input").on('change', moveDoneTask);
    $('.close').on('click', function (ev) {
      $(ev.target).closest('.lists__field').remove();
    })
  }
}

function moveDoneTask(event) {
  const recordElement = $(event.target.parentNode);
  recordElement.detach();
  if (event.target.checked) {
    doneTasksList.prepend(recordElement);
  } else {
    notDoneTasksList.append(recordElement)
  }
}