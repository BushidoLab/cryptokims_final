var init = function() {
  $.getJSON('../kims.json', function(data) {
    console.log(data);
    var kimsRow = $('#kimsRow');
    var kimTemplate = $('#kimTemplate');

    for (i = 0; i < data.length; i ++) {
      kimTemplate.find('.panel-title').text(data[i].name);
      kimTemplate.find('img').attr('src', data[i].picture);
      kimTemplate.find('.btn-adopt').attr('data-id', data[i].id);

      kimsRow.append(kimTemplate.html());
    }
  });

}
