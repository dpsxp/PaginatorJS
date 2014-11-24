describe('PaginatorJS', function () {
  describe('constructor', function () {
    it('should be configurable', function () {
      this.paginator = new PaginatorJS({
        total: 20,
        perPage: 10,
        page: 1
      });
      expect(this.paginator.page).to.equal(1);
      expect(this.paginator.perPage).to.equal(10);
      expect(this.paginator.total).to.equal(20);
    });

    it('should have default config options', function () {
      this.paginator = new PaginatorJS();
      expect(this.paginator.page).to.equal(1);
      expect(this.paginator.perPage).to.equal(10);
      expect(this.paginator.total).to.equal(0);
    });
  });

  describe('helpers methods', function () {
    beforeEach(function() {
      this.paginator = new PaginatorJS({
        total: 200,
        perPage: 10,
        page: 1
      });
    });

    describe('#isNextDisabled', function () {
      it('should return true when the current page is the first page', function () {
        this.paginator.changePage(this.paginator.lastPages().pop());
        expect(this.paginator.isNextDisabled()).to.be.true;
      });

      it('should return false when the current page is not the first page', function () {
        this.paginator.changePage(1);
        expect(this.paginator.isNextDisabled()).to.be.false;
      });
    });

    describe('#isPrevDisabled', function () {
      it('should return true when the current page is the last page', function () {
        this.paginator.changePage(1);
        expect(this.paginator.isPrevDisabled()).to.be.true;
      });

      it('should return false when the current page is not the last page', function () {
        this.paginator.changePage(this.paginator.lastPages().pop());
        expect(this.paginator.isPrevDisabled()).to.be.false;
      });
    });

    describe('#nextPages', function () {
      it('should return a array with the next 2 pages without firstPages and lastPages', function () {
        this.paginator.changePage(3);
        expect(this.paginator.nextPages()).to.eql([]);

        this.paginator.changePage(13);
        expect(this.paginator.nextPages()).to.eql([14, 15]);
      });
    });

    describe('#prevPages', function () {
      it('should return a array with the previous 2 pages based on current page without the firstPages ', function () {
        // First page
        this.paginator.changePage(1);
        expect(this.paginator.prevPages()).to.eql([]);

        // Some random page
        this.paginator.changePage(13);
        expect(this.paginator.prevPages()).to.eql([11, 12]);
      });

      it('should return a empty array when the prev pages is inside the lastPages', function () {
        // Last pages
        this.paginator.changePage(this.paginator.pages.length - 4);
        expect(this.paginator.prevPages()).to.eql([]);

        // Last pages
        this.paginator.changePage(this.paginator.pages.length - 2);
        expect(this.paginator.prevPages()).to.eql([]);
      });

    });

    describe('#lastPages', function () {
      it('should return a array with the last 6 pages when the current page is between the last 6 pages', function () {
        var lastPages = [];

        this.paginator.changePage(this.paginator.pages.length - 6);
        lastPages = this.paginator.lastPages();
        expect(lastPages).to.eql([15, 16, 17, 18, 19, 20]);

        this.paginator.changePage(this.paginator.pages.length - 4);
        lastPages = this.paginator.lastPages();
        expect(lastPages).to.eql([15, 16, 17, 18, 19, 20]);

        this.paginator.changePage(this.paginator.pages.length - 1);
        lastPages = this.paginator.lastPages();
        expect(lastPages).to.eql([15, 16, 17, 18, 19, 20]);
      });

      it('should return a array with the last 3 pages', function () {
        this.paginator.changePage(1);
        var lastPages = this.paginator.lastPages();
        expect(lastPages).to.eql([18, 19, 20]);
      });
    });

    describe('#firstPages', function () {
      it('should return a array with the first 9 pages when current page is minor or equal to 10', function () {
        this.paginator.changePage(10);
        var firstPages = this.paginator.firstPages();
        expect(firstPages).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        this.paginator.changePage(9);
        firstPages = this.paginator.firstPages();
        expect(firstPages).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });

      it('should return a array with the first 3 pages when current pages is bigger than 10', function () {
        this.paginator.changePage(11);
        var firstPages = this.paginator.firstPages();
        expect(firstPages).to.eql([1, 2, 3]);
      });
    });

    describe('#shouldShowBeforeGap', function () {
      it('should return true when the current page is not inside the firstPages', function () {
        var _self = this;
        _.range(this.paginator.pages.length - this.paginator.firstPages().length + 1, this.paginator.pages.length).forEach(function (number) {
          _self.paginator.changePage(number);
          expect(_self.paginator.shouldShowBeforeGap()).to.be.true;
        });
      });


      it('should return false when the current page is inside the #firstPages', function () {
        var _self = this;
        _.range(1, 11).forEach(function (number) {
          _self.paginator.changePage(number);
          expect(_self.paginator.shouldShowBeforeGap()).to.be.false;
        });
      });
    });

    describe('#shouldShowAfterGap', function () {
      it('should return true when the distance between the next pages and last pages is more than 3', function () {
        var lastPage = this.paginator.pages.length - 1;
        var _self = this;
        this.paginator.pages.slice(1, lastPage - 5).forEach(function (number) {
          _self.paginator.changePage(number);
          expect(_self.paginator.shouldShowAfterGap()).to.be.true;
        });
      });

      it('should return false when the distance between the next pages and last pages is less than 3', function () {
        var lastPage = this.paginator.pages.length - 1;
        this.paginator.changePage(lastPage);
        expect(this.paginator.shouldShowAfterGap()).to.be.false;
        this.paginator.changePage(lastPage - 1);
        expect(this.paginator.shouldShowAfterGap()).to.be.false;
        this.paginator.changePage(lastPage - 2);
        expect(this.paginator.shouldShowAfterGap()).to.be.false;
      });
    });

    describe('#render', function () {
      it('should return a html string based on this.template compiled', function () {
        var fakeTemplate = sinon.stub(this.paginator, 'template').returns('fakeTemplate');
        var result = this.paginator.render();

        expect(fakeTemplate.calledWith({
          total: this.paginator.total,
          page: this.paginator.page,
          perPage: this.paginator.perPage,
          pages: this.paginator.pages
        })).to.be.true;

        expect(result).to.eql('fakeTemplate');
      });
    });
  });

  describe('private methods', function () {
    beforeEach(function() {
      this.paginator = new PaginatorJS({
        total: 200,
        perPage: 10,
        page: 1
      });
    });

    describe('_roundUp', function () {
      it('should always round a float number up', function () {
        var round = this.paginator._roundUp(20, 15);
        expect(round).to.equal(2);
      });
    });

    describe('_calcPages', function () {
      it('should create a array of pages based on total and perPage', function () {
        this.paginator.changeTotal(100);
        this.paginator.changePerPage(20);
        this.paginator._calcPages();
        expect(this.paginator.pages).to.eql([0, 1, 2, 3, 4, 5]);

        this.paginator.changePerPage(10);
        this.paginator._calcPages();
        expect(this.paginator.pages).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      });
    });

    describe('_calculateCurrentPage', function () {
      it('should set the current page with a valid number based on total and perPage', function () {
        this.paginator.changePage(10);
        this.paginator.changePerPage(50);
        this.paginator._calculateCurrentPage();
        expect(this.paginator.page).to.equal(4);

        this.paginator.changePerPage(10);
        this.paginator._calculateCurrentPage();
        expect(this.paginator.page).to.equal(4);
      });
    });
  });
});
