'use strict';

var assert = require('chai').assert;
var Grid = require('../lib/grid');

describe('Grid', function(){
  describe('#createGrid', function(){
    it('should create empty grid 50x30', function(){
      let grid = Grid.createGrid(50, 30);
      for (let x=0; x<50; x++) {
        for (let y=0; y<30; y++) {
          assert.equal(grid[x][y], Grid.defaultValue);
        }
      }
    });
  });
  describe('#makeMove', function(){
    let grid = Grid.createGrid(5, 5);

    it('should put value on position [1,1]', function(){
      grid = Grid.makeMove(grid, 1, 1, 'x');
      assert.equal(grid[1][1], 'x');
    });

    it('should return false if try to put value on already defined [1,1]', function(){
      assert.equal(Grid.makeMove(grid, 1, 1, 'y'), false);
    });
  });
  describe('#checkWin', function(){
    let grid = Grid.createGrid(5, 5);

    it ('should return false for empty grid', function(){
      assert.equal(Grid.checkWin(grid, 'x'), false);
    });

    it ('should recognize 5 in horizontal line', function(){
      let grid = Grid.createGrid(10, 10);
      for (let i=0; i<5; i++) {
        grid = Grid.makeMove(grid,4+i, 4, 'x');
      }
      assert.equal(Grid.checkWin(grid, 'x'), true);
    });

    it ('should recognize 5 in vertical line', function() {
      let grid = Grid.createGrid(10, 10);
      for (let i=0; i<5; i++) {
        grid = Grid.makeMove(grid,4, 4+i, 'x');
      }
      assert.equal(Grid.checkWin(grid, 'x'), true);
    });

    it ('should recognize 5 in diagonal line', function() {
      let grid = Grid.createGrid(10, 10);
      for (let i=0; i<5; i++) {
        grid = Grid.makeMove(grid,4+i, 4+i, 'x');
      }
      assert.equal(Grid.checkWin(grid, 'x'), true);
    })
  });
  describe('#isFull', function(){
    it('should return false for newly generated grid', function(){
      assert.equal(Grid.isFull(Grid.createGrid(2,2)), false);
    });
    it('should return true for full grid', function(){
      let grid = Grid.createGrid(2,2);
      grid = Grid.makeMove(grid, 0, 0, 'x');
      grid = Grid.makeMove(grid, 0, 1, 'y');
      grid = Grid.makeMove(grid, 1, 0, 'x');
      grid = Grid.makeMove(grid, 1, 1, 'y');

      assert.equal(Grid.isFull(grid), true);
    });
  });

  describe('#toString', function(){
    it('should return empty grid', function(){
      let string = Grid.toString(Grid.createGrid(2,2));
      assert.equal(string, '00\n00\n');
    });
    it('should return grid with correct move', function(){
      let string = Grid.toString(Grid.makeMove(Grid.createGrid(2,2), 0, 0, 'x'));
      assert.equal(string, 'x0\n00\n');
    });
  });
});