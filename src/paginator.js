// Lodash depedency
(function (_) {
  'use strict';

  /**
   * @constructor
   * @type {Object}
   * @property {Number} [ total ]      - total number
   * @property {Number} [ page ]       - intital page
   * @property {Number} [ perPage ]    - how much data per page
   * @property {Function} [ template ] - that returns a html string
   */
  window.PaginatorJS = function PaginatorJS(opts) {
    this.changeTotal(opts && opts.total || 0);
    this.changePage(opts && opts.page || 1);
    this.changePerPage(opts && opts.perPage || 10);
    this.template = opts && opts.template || _.template({});
  };

  PaginatorJS.prototype = {
    /**
     * Set the current page
     * @param {Number} page - new page value
     */
    changePage: function(page) {
      this.page = parseInt(page, 10);
    },

    /**
     * Set the perPage param
     * @param {Number} perPage - new perPage value
     */
    changePerPage: function(perPage) {
      this.perPage = parseInt(perPage, 10);
      this._calculateCurrentPage();
      this._calcPages();
    },

    /**
     * Set total param
     * @param {Number} total - new total value
     */
    changeTotal: function(total) {
      this.total = parseInt(total, 10);
    },

    /**
     * @returns {String} html string based on this.template compiled
     */
    render: function() {
      this._calculateCurrentPage();
      this._calcPages();

      return this.template({
        total: this.total,
        perPage: this.perPage,
        page: this.page,
        pages: this.pages
      });
    },

    /**
     * if current page is less or equal to 10
     * returns the first 9 pages
     * otherwise returns the first 3 pages
     * @returns {Array}
     */
    firstPages: function() {
      if (this.page <= 10) {
        return this.pages.slice(1, 10);
      } else {
        return this.pages.slice(1, 4);
      }
    },

    /**
     * return the last 3 pages when the current page is not between the last 6 pages
     * otherwise returns the last 6 pages
     * @returns {Array}
     */
    lastPages: function() {
      if (this.page >= this.pages.length - 6) {
        return _.difference(this.pages.slice(this.pages.length - 6), this.firstPages());
      } else {
        return _.difference(this.pages.slice(this.pages.length - 3), this.firstPages());
      }
    },

    /**
     * return a array with the next 2 pages
     * without the #firstPages and #lastPages
     * @returns {Array}
     */
    nextPages: function() {
      var pages = this.pages.slice(this.page + 1, this.page + 3);
      return _.difference(pages, this.firstPages(), this.lastPages());
    },

    /**
     * the previous 2 pages based on current page
     * without the #firstPages and #lastPages
     * @returns {Array}
     */
    prevPages: function() {
      var pages = this.pages.slice(this.page - 2, this.page);
      var firstPages = this.firstPages();
      firstPages.unshift(0);
      return _.difference(pages, firstPages, this.lastPages());
    },

    /**
     * check if the current page is the last page
     * @returns {Boolean}
     */
    isNextDisabled: function() {
      return this.page >= this.pages.length - 1;
    },

    /**
     * check if the current page is the first page
     * @returns {Boolean}
     */
    isPrevDisabled: function() {
      return this.page === 1;
    },

    /**
     * check if the distance between the first pages and previous pages is more than 3
     * @returns {Boolean}
     */
    shouldShowBeforeGap: function () {
      return !_.contains(this.firstPages(), this.page) && !_.contains(this.firstPages(), this.page - 1, this.page - 2);
    },

    /**
     * check if the distance between the next pages and last pages is more than 3
     * @returns {Boolean}
     */
    shouldShowAfterGap: function () {
      return !_.contains(this.lastPages(), this.page) && !_.contains(this.lastPages(), this.page + 1, this.page + 2);
    },

    /**
     * calculates the current page when we change the perPage param
     * @private
     */
    _calculateCurrentPage: function() {
      var round = this._roundUp(this.total, this.perPage);

      if (round < this.page) {
        this.page = round > 1 ? round : 1;
      }
    },

    /**
     * creates a array of pages based on total and perPage
     * @private
     */
    _calcPages: function() {
      var pages = Math.round(this.total / this.perPage),
      round = 0;

      if (this.total < this.perPage) {
        this.pages = [0, 1];
      } else {
        round = this._roundUp(this.total, this.perPage);
        this.pages = _.range(0, round + 1);
      }
    },

    /**
     * alway round a float number up
     * so in cases like 1.30 we still have a second page
     * so a little hack to round it to 2
     * @private
     * @returns {Number}
     */
    _roundUp: function(num, divisor) {
      var result = num / divisor,
      decimal = parseInt(result.toFixed(1).split('.')[1], 10),
      round = 0;

      if (decimal > 0 && decimal < 5) {
        round = Math.round(result) + 1;
      } else {
        round = Math.round(result);
      }

      return round;
    }
  };

}(window._));
