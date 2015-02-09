<a name="PaginatorJS"></a>
## class: PaginatorJS → <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| total | <code>Number</code> | total number |
| page | <code>Number</code> | intital page |
| perPage | <code>Number</code> | how much data per page |
| template | <code>function</code> | that returns a html string |


* [class: PaginatorJS](#PaginatorJS) → <code>Object</code>
  * _instance_
    * [.changePage(page)](#PaginatorJS#changePage)
    * [.changePerPage(perPage)](#PaginatorJS#changePerPage)
    * [.changeTotal(total)](#PaginatorJS#changeTotal)
    * [.render()](#PaginatorJS#render) ⇒ <code>String</code>
    * [.firstPages()](#PaginatorJS#firstPages) ⇒ <code>Array</code>
    * [.lastPages()](#PaginatorJS#lastPages) ⇒ <code>Array</code>
    * [.nextPages()](#PaginatorJS#nextPages) ⇒ <code>Array</code>
    * [.prevPages()](#PaginatorJS#prevPages) ⇒ <code>Array</code>
    * [.isNextDisabled()](#PaginatorJS#isNextDisabled) ⇒ <code>Boolean</code>
    * [.isPrevDisabled()](#PaginatorJS#isPrevDisabled) ⇒ <code>Boolean</code>
    * [.shouldShowBeforeGap()](#PaginatorJS#shouldShowBeforeGap) ⇒ <code>Boolean</code>
    * [.shouldShowAfterGap()](#PaginatorJS#shouldShowAfterGap) ⇒ <code>Boolean</code>

<a name="PaginatorJS#changePage"></a>
### paginatorJS.changePage(page)
Set the current page


| Param | Type | Description |
| --- | --- | --- |
| page | <code>Number</code> | new page value |

<a name="PaginatorJS#changePerPage"></a>
### paginatorJS.changePerPage(perPage)
Set the perPage param


| Param | Type | Description |
| --- | --- | --- |
| perPage | <code>Number</code> | new perPage value |

<a name="PaginatorJS#changeTotal"></a>
### paginatorJS.changeTotal(total)
Set total param


| Param | Type | Description |
| --- | --- | --- |
| total | <code>Number</code> | new total value |

<a name="PaginatorJS#render"></a>
### paginatorJS.render() ⇒ <code>String</code>
**Returns**: <code>String</code> - html string based on this.template compiled  
<a name="PaginatorJS#firstPages"></a>
### paginatorJS.firstPages() ⇒ <code>Array</code>
if current page is less or equal to 10
returns the first 9 pages
otherwise returns the first 3 pages

<a name="PaginatorJS#lastPages"></a>
### paginatorJS.lastPages() ⇒ <code>Array</code>
return the last 3 pages when the current page is not between the last 6 pages
otherwise returns the last 6 pages

<a name="PaginatorJS#nextPages"></a>
### paginatorJS.nextPages() ⇒ <code>Array</code>
return a array with the next 2 pages
without the #firstPages and #lastPages

<a name="PaginatorJS#prevPages"></a>
### paginatorJS.prevPages() ⇒ <code>Array</code>
the previous 2 pages based on current page
without the #firstPages and #lastPages

<a name="PaginatorJS#isNextDisabled"></a>
### paginatorJS.isNextDisabled() ⇒ <code>Boolean</code>
check if the current page is the last page

<a name="PaginatorJS#isPrevDisabled"></a>
### paginatorJS.isPrevDisabled() ⇒ <code>Boolean</code>
check if the current page is the first page

<a name="PaginatorJS#shouldShowBeforeGap"></a>
### paginatorJS.shouldShowBeforeGap() ⇒ <code>Boolean</code>
check if the distance between the first pages and previous pages is more than 3

<a name="PaginatorJS#shouldShowAfterGap"></a>
### paginatorJS.shouldShowAfterGap() ⇒ <code>Boolean</code>
check if the distance between the next pages and last pages is more than 3

