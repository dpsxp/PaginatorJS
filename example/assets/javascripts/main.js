(function (PaginatorJS) {
  'use strict';
  var paginator, pages, bindSelect, page, params;

  params = window.location.search.match(/page=(\w+)/);
  page = 1;

  if (params) {
    page = params[1];
  }

  paginator = new PaginatorJS({
    total: 200,
    perPage: 10,
    page: page,
    template: _.template(document.querySelector('#page-template').text)
  });

  pages = document.querySelector('#pages');
  pages.innerHTML = paginator.render();

  bindSelect = function bindSelect () {
    pages.querySelector('.per-page-control-js').addEventListener('change', function () {
      paginator.changePerPage(this.value);
      pages.innerHTML = paginator.render();
      bindSelect();
    });
  };

  bindSelect();

}(PaginatorJS));
