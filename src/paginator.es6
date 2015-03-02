/* jshint esnext: true */
class PaginatorJS {
  constructor(opts) {
    this.changePage(opts && opts.page || 1);
    this.changePerPage(opts && opts.perPage || 10);
    this.changeTotal(opts && opts.total || 0);
    this.template = opts && opts.template || _.template({});
  }

  changePage(page) {
    this.page = window.parseInt(page, 10);
  }

  changePerPage(perPage) {
    this.perPage = window.parseInt(perPage, 10);

    if (this.total) {
      this._calcPages();
    }
  }

  changeTotal(total) {
    this.total = window.parseInt(total, 10);

    if (this.perPage) {
      this._calcPages();
    }

    if (this.page) {
      this._calculateCurrentPage();
    }
  }

  render() {
    this._calculateCurrentPage();
    this._calcPages();

    return this.template({
      total: this.total,
      perPage: this.perPage,
      page: this.page,
      pages: this.pages
    });
  }

  firstPages() {
    if (this.page <= 10) {
      return this.pages.slice(1, 10);
    } else {
      return this.pages.slice(1, 4);
    }
  }

  lastPages() {
    if (this.page >= this.pages.length - 6) {
      return _.difference(this.pages.slice(this.pages.length - 6), this.firstPages(), [0]);
    } else {
      return _.difference(this.pages.slice(this.pages.length - 3), this.firstPages(), [0]);
    }
  }

  nextPages() {
    let pages = this.pages.slice(this.page + 1, this.page + 3);
    return _.difference(pages, this.firstPages(), this.lastPages());
  }

  prevPages() {
    let pages = this.pages.slice(this.page - 2, this.page);
    let firstPages = this.firstPages();
    firstPages.unshift(0);
    return _.difference(pages, firstPages, this.lastPages());
  }

  isNextDisabled() {
    return this.page >= this.pages.length - 1;
  }

  isPrevDisabled() {
    return this.page === 1;
  }

  shouldShowBeforeGap () {
    return !_.contains(this.firstPages(), this.page) && !_.contains(this.firstPages(), this.page - 1, this.page - 2);
  }

  shouldShowAfterGap () {
    return this.lastPages().length > 0 && !_.contains(this.lastPages(), this.page) && !_.contains(this.lastPages(), this.page + 1, this.page + 2);
  }

  /* private methods */

  _calculateCurrentPage() {
    if (this.total === 0) {
      return;
    }

    let round = this._roundUp(this.total, this.perPage);

    if (round < this.page) {
      this.page = round > 1 ? round : 1;
    }
  }

  _calcPages() {
    let pages = Math.round(this.total / this.perPage || 10),
      round = 0;

    if (this.total < this.perPage) {
      this.pages = [0, 1];
    } else {
      round = this._roundUp(this.total, this.perPage);
      this.pages = _.range(0, round + 1);
    }
  }

  _roundUp(num, divisor) {
    let result  = num / divisor,
      decimal = window.parseInt(result.toFixed(1).split('.')[1], 10),
      round   = 0;

    if (decimal > 0 && decimal < 5) {
      round = Math.round(result) + 1;
    } else {
      round = Math.round(result);
    }

    return round;
  }
}
