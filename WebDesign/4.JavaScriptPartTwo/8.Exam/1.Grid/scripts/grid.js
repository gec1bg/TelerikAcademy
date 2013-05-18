// Generated by CoffeeScript 1.4.0
(function() {
  'use strict';

  var GridView, GridViewRow, _compareTo, _ref;

  if ((_ref = this.controls) == null) {
    this.controls = {};
  }

  _compareTo = function(a, b) {
    if (!isNaN(a - b)) {
      return a - b;
    } else {
      return a.toString().localeCompare(b.toString());
    }
  };

  GridViewRow = (function() {
    var _renderData, _renderNested;

    function GridViewRow() {
      this.data = [];
      this.nestedGrid = null;
    }

    GridViewRow.prototype.addColumn = function(args) {
      var col, _i, _len;
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        col = args[_i];
        this.data.push(col);
      }
      return this;
    };

    GridViewRow.prototype.getNestedGrid = function() {
      return this.nestedGrid = new GridView;
    };

    _renderData = function(parent) {
      var col, tr, _i, _len, _ref1;
      tr = J('<tr />');
      _ref1 = this.data;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        col = _ref1[_i];
        tr.append(J('<td />').text(col));
      }
      if (this.nestedGrid != null) {
        tr.addClass('nested');
      }
      tr.data('nestedGrid', this.nestedGrid);
      return parent.append(tr);
    };

    _renderNested = function(parent) {
      var td, tr;
      if (this.nestedGrid == null) {
        return;
      }
      td = J('<td />').attr('colspan', this.data.length);
      tr = J('<tr />').hide().append(td);
      this.nestedGrid.render(td);
      return parent.append(tr);
    };

    GridViewRow.prototype.render = function(parent) {
      _renderData.call(this, parent);
      return _renderNested.call(this, parent);
    };

    return GridViewRow;

  })();

  this.controls.GridView = GridView = (function() {
    var _delegate, _renderData, _renderHeader;

    function GridView(selector) {
      if (!(this instanceof GridView)) {
        return new GridView(selector);
      }
      if (selector != null) {
        this.element = J(selector);
        _delegate.call(this);
      }
      this.header = [];
      this.data = [];
      this.sortAscending = 1;
    }

    GridView.prototype.addHeader = function() {
      var col, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        col = arguments[_i];
        _results.push(this.header.push(col));
      }
      return _results;
    };

    GridView.prototype.addRow = function() {
      var row;
      row = new GridViewRow().addColumn(arguments);
      this.data.push(row);
      return row;
    };

    _renderHeader = function(parent) {
      var col, i, tr, _i, _len, _ref1;
      if (!this.header.length) {
        return;
      }
      tr = J('<tr />');
      _ref1 = this.header;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        col = _ref1[i];
        tr.append(J('<th />').text(col).data('col', i));
      }
      return parent.append(tr);
    };

    _renderData = function(parent) {
      var row, _i, _len, _ref1, _results;
      _ref1 = this.data;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        row = _ref1[_i];
        _results.push(row.render(parent));
      }
      return _results;
    };

    _delegate = function() {
      return this.element.click(function(e) {
        var grid, row, table, td;
        if (!(e.target instanceof HTMLTableCellElement)) {
          return;
        }
        e.stopPropagation();
        td = J(e.target);
        row = td.parent();
        switch (false) {
          case td[0].tagName.toLowerCase() !== 'th':
            table = row.parent();
            grid = table.data('grid');
            grid.sortBy(td.data('col'));
            return grid.render(table.parent());
          case td[0].tagName.toLowerCase() !== 'td':
            if (row.data('nestedGrid') != null) {
              return row.next().toggle();
            }
        }
      });
    };

    GridView.prototype.render = function(parent) {
      var table;
      if (parent == null) {
        parent = this.element;
      }
      parent.children().remove();
      table = J('<table />').addClass('table').addClass('table-bordered').data('grid', this);
      _renderHeader.call(this, table);
      _renderData.call(this, table);
      return parent.append(table);
    };

    GridView.prototype.sortBy = function(col) {
      var _this = this;
      if (this.previousSortCol === col) {
        this.sortAscending *= -1;
      }
      this.previousSortCol = col;
      return this.data.sort(function(row1, row2) {
        return _this.sortAscending * _compareTo(row1.data[col], row2.data[col]);
      });
    };

    return GridView;

  })();

}).call(this);
