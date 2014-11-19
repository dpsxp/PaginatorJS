var expect = require('chai').expect;
var Paginator = require('../src/paginator');

describe('Paginator', function () {
  describe('constructor', function () {
    it('should be configurable', function () {
      var paginator = new Paginator({
        total: 20,
        perPage: 10,
        page: 1
      });
      expect(paginator.page).to.equal(1);
      expect(paginator.perPage).to.equal(10);
      expect(paginator.total).to.equal(20);
    });

    it('should have default config options', function () {
      var paginator = new Paginator();
      expect(paginator.page).to.equal(1);
      expect(paginator.perPage).to.equal(10);
      expect(paginator.total).to.equal(0);
    });
  });

  describe('helpers methods', function () {
    describe('#isNextDisabled', function () {
      it('should return true when the current page is the first page');
      it('should return false when the current page is not the first page');
    });

    describe('#isPrevDisabled', function () {
      it('should return true when the current page is the last page');
      it('should return false when the current page is not the last page');
    });

    describe('#nextPages', function () {
      it('should return a array with the next 2 pages based on current page');
    });

    describe('#prevPages', function () {
      it('should return a array with the previous 2 pages based on current page');
    });

    describe('#lastPages', function () {
      it('should return a array with the last 3 pages');
    });

    describe('#firstPages', function () {
      it('should return a array with the first 3 pages');
    });

    describe('#shouldShowBeforeGap', function () {
      it('should return true when the distance between the first pages and previous pages is more than 3');
      it('should return false when the distance between the first pages and previous pages is less than 3');
    });

    describe('#shouldShowAfterGap', function () {
      it('should return true when the distance between the next pages and last pages is more than 3');
      it('should return false when the distance between the next pages and last pages is less than 3');
    });

    describe('#render', function () {
      it('shoudl return a html string based on this.template compiled');
    });
  });

  describe('private methods', function () {
    describe('_roundUp', function () {
      it('should always round a float number up');
    });

    describe('_calcPages', function () {
      it('should create a array of pages based on total and perPage');
    });

    describe('_calculateCurrentPage', function () {
      it('should set the current page with a valid number based on total and perPage');
    });
  });
});
