const modalShow = (res) => {
  $('#myModal').modal('toggle');

  if (res.type === 'error') $('.modal-title').text(res.message).css('color', 'red');
  if (res.type === 'success') $('.modal-title').text(res.message).css('color', 'black');
};

const checkParamsBeforeSave = (data, itemType) => {
  let str = data.title;
  data.description.forEach(item => str += item);

  if (!(str.split('')).find((item) => item !== String.fromCharCode(160) && item !== String.fromCharCode(32))) {
    modalShow({ type: 'error', message: `Can\'t save empty ${itemType}` });
    return false;
  }
  return true;
};

const ajaxCallBack = (res) => {
  $('.btn-modal_close').css('display', 'none');
  $('.modal-header').css('justify-content', 'center');
  $('.spinner-border').css('display', 'none');

  modalShow(res.responseJSON || res);

  setTimeout(() => {
    window.location.href = "/";
  }, 500)
};

const ajaxPostPut = (type, item, data, id) => {
  $.ajax({
    type: type,
    url: id ? `/api/${item}/${id}` : `/api/${item}`,
    data: JSON.stringify(data),
    contentType: 'application/json',
    dataType: 'json',
    success: ajaxCallBack,
    error: ajaxCallBack
  });
};

const ajaxDelete = (id,item) => {
  $.ajax({
    type: 'DELETE',
    url: `/api/${item}/${id}`,
    success: ajaxCallBack,
    error: ajaxCallBack
  });
};