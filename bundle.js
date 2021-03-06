/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.drawMatrix = drawMatrix;
exports.canvasText = canvasText;
exports.cls = cls;
function drawMatrix(ctx, matrix, position, blockSize) {
	var colorScheme = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
		pieces: ['red', 'blue', 'purple', 'pink', 'orange', 'indigo', 'green'],
		outline: 'black'
	};

	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x]) {
				ctx.fillStyle = colorScheme.pieces[matrix[y][x] - 1];
				ctx.fillRect((x + position.x) * blockSize, (y + position.y) * blockSize, blockSize, blockSize);
				ctx.strokeStyle = colorScheme.outline;
				ctx.strokeRect((x + position.x) * blockSize, (y + position.y) * blockSize, blockSize, blockSize);
			}
		}
	}
}

function canvasText(ctx, text) {
	var font = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Arial';
	var size = arguments[3];
	var startX = arguments[4];
	var startY = arguments[5];
	var fillStyle = arguments[6];
	var textAlign = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "start";

	ctx.font = size + " " + font;
	ctx.fillStyle = fillStyle;
	ctx.textAlign = textAlign;
	ctx.fillText(text, startX, startY, 80);
}

function cls(canvas) {
	canvas.ctx.fillStyle = 'black';
	canvas.ctx.fillRect(0, 0, canvas.CANVAS_WIDTH, canvas.CANVAS_HEIGHT);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Board = __webpack_require__(4);

var _Board2 = _interopRequireDefault(_Board);

var _Piece = __webpack_require__(5);

var _Piece2 = _interopRequireDefault(_Piece);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
	function Player(props) {
		_classCallCheck(this, Player);

		this.ctx = props.ctx;
		this.score = 0;
		this.linesCleared = 0;
		this.level = 0;
		this.isDead = false;
		this.colorScheme = props.colorScheme;
		this.board = new _Board2.default(props);
		this.activePiece = new _Piece2.default(this.board);
		this.nextPiece = new _Piece2.default(this.board);
		this.nextPiece.x = this.board.width + 2;
		this.nextPiece.y = 1;
	}

	_createClass(Player, [{
		key: 'movePiece',
		value: function movePiece(direction) {
			this.activePiece.x += direction;
			if (this.checkBoardCollision()) {
				this.activePiece.x -= direction;
			}
		}
	}, {
		key: 'rotatePiece',
		value: function rotatePiece(direction) {
			//simulating wall-kick effect. not perfect, needs fixing. especially with I shape
			this.activePiece.rotate(direction);
			if (this.checkBoardCollision()) {
				this.movePiece(direction);
				if (this.checkBoardCollision) {
					this.movePiece(direction);
					if (this.checkBoardCollision) {
						this.movePiece(-direction);
						this.movePiece(-direction);
						if (this.checkBoardCollision()) {
							this.movePiece(-direction);
							if (this.checkBoardCollision()) {
								this.movePiece(direction);
								this.movePiece(direction);
								this.activePiece.rotate(-direction);
							}
						}
					}
				}
			}
		}
	}, {
		key: 'dropPiece',
		value: function dropPiece() {
			this.activePiece.y++;
			if (this.checkBoardCollision()) {
				this.activePiece.y--;
				this.board.mergePiece(this.activePiece);
				this.resetPiece();
				this.checkCompletedLines();
			}
		}
	}, {
		key: 'instantDrop',
		value: function instantDrop() {
			//create soon
			while (!this.checkBoardCollision()) {
				this.activePiece.y++;
			}
			//Duplicating code drop above. Should I pull this out into a function.
			this.activePiece.y--;
			this.board.mergePiece(this.activePiece);
			this.resetPiece();
			this.checkCompletedLines();
		}
	}, {
		key: 'checkBoardCollision',
		value: function checkBoardCollision() {
			for (var y = 0; y < this.activePiece.matrix.length; y++) {
				for (var x = 0; x < this.activePiece.matrix[y].length; x++) {
					if (this.activePiece.matrix[y][x] !== 0 && (this.board.matrix[y + this.activePiece.y] && this.board.matrix[y + this.activePiece.y][x + this.activePiece.x]) !== 0) {
						return true;
					}
				}
			}
			return false;
		}
	}, {
		key: 'resetPiece',
		value: function resetPiece() {
			//find a more elegant method!		
			this.activePiece = new _Piece2.default(this.board, this.nextPiece.type);
			this.nextPiece = new _Piece2.default(this.board);
			this.nextPiece.x = this.board.width + 2;
			this.nextPiece.y = 1;

			//Kills player and ends game as soon as new piece tries to spawn on occupied board space
			if (this.checkBoardCollision()) {
				this.isDead = true;
			}
		}
	}, {
		key: 'checkCompletedLines',
		value: function checkCompletedLines() {
			//variable to track number of lines in one pass
			var completedLines = 0;
			//loop through board matrix
			for (var i = 0; i < this.board.matrix.length; i++) {
				//test if all entries are not 0 (I believe some() is faster - should check)
				//return true if there aren't any elements that are zero
				if (!this.board.matrix[i].some(function (elem) {
					return !elem;
				})) {
					//if so add to variable 
					completedLines += 1;
					// then delete that row
					this.board.matrix.splice(i, 1);
					//add a new blank row to beginning of array
					this.board.matrix.unshift(new Array(this.board.matrix[0].length).fill(0));
				}
			}
			if (completedLines) {
				this.linesCleared += completedLines;
				this.score += completedLines * 5 * (completedLines * 5);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			this.activePiece.render();
			this.nextPiece.render();
			(0, _utilities.canvasText)(this.ctx, this.score, undefined, '25px', this.board.width * this.board.tileSize + 60, 200, 'white', 'center');
		}
	}]);

	return Player;
}();

exports.default = Player;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _Player = __webpack_require__(1);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game(props) {
		_classCallCheck(this, Game);

		this.props = props;
		this.player = new _Player2.default(props);

		//Used to control drop timing
		this.DROP_INIT = 1000;
		this.DROP_MAX = 50;

		this.speedModifier = 1;

		this.dropInterval = this.DROP_INIT; //in milliseconds
		this.dropCounter = 0;
		this.lastTime = 0;

		this.gameActive = this.gameActive.bind(this);

		this.gameActive();
	}

	_createClass(Game, [{
		key: 'drawGameBG',
		value: function drawGameBG() {
			var ctx = this.props.ctx;
			//This is the Sidebar color
			ctx.fillStyle = 'rgba(175,150,200, .3)';
			ctx.fillRect(0, 0, this.props.CANVAS_WIDTH, this.props.CANVAS_HEIGHT);
			//Playing area black
			ctx.fillStyle = 'rgba(0,0,0, 1)';
			ctx.fillRect(0, 0, this.props.BOARD_WIDTH * this.props.TILESIZE + 2, this.props.BOARD_HEIGHT * this.props.TILESIZE);
			ctx.strokeStyle = 'white';
			//Border of playing area
			ctx.strokeRect(0, 0, this.props.BOARD_WIDTH * this.props.TILESIZE + 2, this.props.BOARD_HEIGHT * this.props.TILESIZE);
			//Border and fill of preview area
			ctx.strokeRect(this.props.TILESIZE * this.props.BOARD_WIDTH + 10, 10, 100, 100);
			ctx.fillStyle = 'rgba(100,100,150, .5)';
			ctx.fillRect(this.props.TILESIZE * this.props.BOARD_WIDTH + 10, 10, 100, 100);
		}

		//going to have to decide if I want to use global eventlisteners again or component 
		//ones that are deleted when component is unmounted (perhaps by storing them in
		//global array and iterating through that deleting everything in when moving to 
		//next screen OR by having global eventlistener function that I overwrite at beginning
		//of each component lifecycle)

	}, {
		key: 'gameActive',
		value: function gameActive() {
			var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

			(0, _utilities.cls)(this.props);
			this.dropInterval = this.updateDropInterval();
			//is time argument baked into requestAnimationFrame? Seems like it must be.
			var deltaTime = time - this.lastTime;
			this.lastTime = time;
			this.dropCounter += deltaTime;
			if (this.dropCounter > this.dropInterval) {
				if (!this.player.isDead) {
					this.player.dropPiece();
					this.dropCounter = 0;
				}
			}
			this.drawGameBG();
			this.player.board.render();
			this.player.render();
			requestAnimationFrame(this.gameActive);
		}
	}, {
		key: 'updateDropInterval',
		value: function updateDropInterval() {
			// if (player.linesCleared )
			return this.DROP_INIT * this.speedModifier;
		}
	}]);

	return Game;
}();

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
	function Board(props) {
		_classCallCheck(this, Board);

		//should start tracking x/y for multiple boards later
		this.width = props.BOARD_WIDTH;
		this.height = props.BOARD_HEIGHT;
		this.tileSize = props.TILESIZE;
		this.ctx = props.ctx;
		this.matrix = this.generateEmptyBoard();
		this.colorScheme = props.colorScheme;
	}

	_createClass(Board, [{
		key: 'generateEmptyBoard',
		value: function generateEmptyBoard() {
			var matrix = [];
			for (var i = 0; i < this.height; i++) {
				matrix.push(new Array(this.width).fill(0));
			};
			return matrix;
		}
	}, {
		key: 'mergePiece',
		value: function mergePiece(piece) {
			for (var y = 0; y < piece.matrix.length; y++) {
				for (var x = 0; x < piece.matrix[y].length; x++) {
					if (piece.matrix[y][x] !== 0) {
						this.matrix[y + piece.y][x + piece.x] = piece.matrix[y][x];
					}
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			(0, _utilities.drawMatrix)(this.ctx, this.matrix, { x: 0, y: 0 }, this.tileSize, this.colorScheme);
		}
	}]);

	return Board;
}();

exports.default = Board;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = function () {
	function Piece(board) {
		var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.newRandomType();

		_classCallCheck(this, Piece);

		this.ctx = board.ctx;
		this.tileSize = board.tileSize;
		this.type = type;
		this.matrix = this.createPiece(this.type);
		this.colorScheme = board.colorScheme;
		this.initX = Math.floor(board.width / 2) - 2;
		this.initY = 0;
		this.x = this.initX;
		this.y = this.initY;
	}

	_createClass(Piece, [{
		key: 'newRandomType',
		value: function newRandomType() {
			return 'TLJSZOI'[Math.random() * 7 | 0]; //hardcoded variable quantity
		}
	}, {
		key: 'createPiece',
		value: function createPiece(type) {
			switch (type) {
				case 'T':
					return [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
				case 'L':
					return [[0, 0, 2], [2, 2, 2], [0, 0, 0]];
				case 'O':
					return [[3, 3], [3, 3]];
				case 'J':
					return [[4, 0, 0], [4, 4, 4], [0, 0, 0]];
				case 'I':
					return [[0, 5, 0, 0], [0, 5, 0, 0], [0, 5, 0, 0], [0, 5, 0, 0]];
				case 'S':
					return [[0, 6, 6], [6, 6, 0], [0, 0, 0]];
				case 'Z':
					return [[7, 7, 0], [0, 7, 7], [0, 0, 0]];
			}
		}
	}, {
		key: 'rotate',
		value: function rotate(direction) {
			//TODO: Prevent rotating into wall
			var swapped = JSON.parse(JSON.stringify(this.matrix));
			for (var y = 0; y < swapped.length; y++) {
				for (var x = y; x < swapped[y].length; x++) {
					var _ref = [swapped[x][y], swapped[y][x]];
					swapped[y][x] = _ref[0];
					swapped[x][y] = _ref[1];
				}
			}
			if (direction === 1) {
				for (var i = 0; i < swapped.length; i++) {
					swapped[i].reverse();
				}
			} else if (direction === -1) {
				swapped.reverse();
			}
			this.matrix = swapped;
		}
	}, {
		key: 'render',
		value: function render() {
			(0, _utilities.drawMatrix)(this.ctx, this.matrix, { x: this.x, y: this.y }, this.tileSize, this.colorScheme);
		}
	}]);

	return Piece;
}();

exports.default = Piece;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Player = __webpack_require__(1);

var _Player2 = _interopRequireDefault(_Player);

var _Game = __webpack_require__(2);

var _Game2 = _interopRequireDefault(_Game);

var _utilities = __webpack_require__(0);

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Since tetris works in blocks, instead of changing the canvas context proportions 20:1
//(which I assume means overlaying text would require a second canvas rendering), let's
//define a block size and do all calculations with that.
var TILESIZE = 20;
var BOARD_WIDTH = 12;
var BOARD_HEIGHT = 20;

//get the canvas context
var CANVAS_WIDTH = TILESIZE * (BOARD_WIDTH + 6);
var CANVAS_HEIGHT = TILESIZE * BOARD_HEIGHT;

//Array to store active instances of Games
var players = [];

var playerElements = document.querySelectorAll('.player');

playerElements.forEach(function (elem) {

	//create individual canvases
	var canvas = elem.querySelector('.gameCanvas');
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	var ctx = canvas.getContext('2d');

	//create a bundle 
	var canvasProps = {
		CANVAS_WIDTH: CANVAS_WIDTH,
		CANVAS_HEIGHT: CANVAS_HEIGHT,
		ctx: ctx,
		TILESIZE: TILESIZE,
		BOARD_HEIGHT: BOARD_HEIGHT,
		BOARD_WIDTH: BOARD_WIDTH,
		colorScheme: {
			pieces: ['red', 'blue', 'purple', 'pink', 'orange', 'indigo', 'green'],
			outline: 'black'
		}
	};

	//initiate new game 
	var player = new _Game2.default(canvasProps);
	players.push(player);
});

var playerKeys = [{
	left: 65,
	right: 68,
	down: 83,
	drop: 32,
	rotateClock: 69,
	rotateCount: 81
}, {
	left: 37,
	right: 39,
	down: 40,
	drop: 16,
	rotateClock: 191,
	rotateCount: 190
}];

document.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
	playerKeys.forEach(function (key, index) {
		var player = players[index].player;
		if (!player.isDead) {
			if (event.keyCode === key.left) {
				//'a'
				player.movePiece(-1);
			} else if (event.keyCode === key.right) {
				//'d'
				player.movePiece(1);
			} else if (event.keyCode === key.down) {
				//'s' accelerate drop
				player.dropPiece();
			} else if (event.keyCode === key.rotateClock) {
				//'e' for rotate clockwise
				player.rotatePiece(1);
			} else if (event.keyCode === key.rotateCount) {
				//'q' for rotate counter-clockwise
				player.rotatePiece(-1);
			} else if (event.keyCode === key.drop) {
				//'Spacebar' for quick drop
				player.instantDrop();
			} else if (event.keyCode === 80) {
				//'p' for pause
			}
		}
	});
}

//todo make drop interval dynamic based on player progress and have score increased as
//a multiplier of that somehow
//todo, accelerate a fixed number of times with score multiplier increase as well

//todo error checking to prevent rotating into wall
//fixed but maybe want to add a way to move the piece one over instead of just blocking rotation.
//not sure what is standard in tetris games
//it's a wall kick

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.map