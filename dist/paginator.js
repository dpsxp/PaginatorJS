function Paginator(t){this.total=t&&t.total||0,this.perPage=t&&t.perPage||10,this.page=t&&t.page||1,this.template=t&&t.template||_.template(),this._calcPages(),this._calculateCurrentPage()}var _=require("lodash");Paginator.prototype={changePage:function(t){this.page=t},changePerPage:function(t){this.perPage=t,this._calculateCurrentPage()},updateTotal:function(t){this.total=t},render:function(){return this._calculateCurrentPage(),this._calcPages(),this.template({total:this.total,perPage:this.perPage,page:this.page,pages:this.pages})},firstPages:function(){return this.pages.slice(1,4)},lastPages:function(){var t=this.pages.slice(this.pages.length-3),e=_.difference(this.nextPages(),this.firstPages());return this.page===this.pages.length-1?[]:_.difference(t,e)},nextPages:function(){var t=this.pages.slice(this.page+1,this.page+3);return _.difference(t,this.firstPages())},prevPages:function(){var t=this.pages.slice(this.page-2,this.page),e=this.firstPages();return e.unshift(0),_.difference(t,e)},isNextDisabled:function(){return this.page>=this.pages.length-1},isPrevDisabled:function(){return 1===this.page},shouldShowBeforeGap:function(){return this.page<=this.firstPages().length?!1:this.prevPages().length>0&&!_.contains(this.firstPages(),this.prevPages()[0]-2)},shouldShowAfterGap:function(){return _.contains(this.lastPages(),this.page)?!1:this.nextPages().length>0&&!_.contains(this.lastPages(),this.nextPages().pop()+2)},_calculateCurrentPage:function(){var t=this._roundUp(this.total,this.perPage);t<this.page&&(this.page=t>1?t:1)},_calcPages:function(){var t=(Math.round(this.total/this.perPage),0);this.total<this.perPage?this.pages=[0,1]:(t=this._roundUp(this.total,this.perPage),this.pages=_.range(0,t+1))},_roundUp:function(t,e){var a=t/e,s=parseInt(a.toFixed(1).split(".")[1],10),i=0;return i=s>0&&5>s?Math.round(a)+1:Math.round(a)}},module.exports=Paginator;