/*
File: script.js
GUI Assignment: Scrabble Game
Rahul Pingali, UMass Lowell Computer Science, rahul_pingali@student.uml.edu 
What it does:  This file contains the JavaScript code for the Scrabble Game Web Page. The code initializes the game by
generating the Scrabble tiles and creating the drop locations on the board. It uses jQuery UI to make the tiles draggable
and the drop locations droppable. The code keeps track of the tiles on the rack and the tiles on the board. It allows the
user to place tiles on the board, update the word and score, submit the word, get new tiles, and reset the game. The code
also includes functions to handle the logic of the game, such as getting a random tile, placing a tile on the board, getting
the value of a tile, updating the word and score, checking if a drop location is a double word score box, and resetting the
game. The code uses jQuery to handle events and update the UI based on user actions. The code is well-organized and
easy to understand, making it easy to maintain and extend the functionality of the Scrabble game.
Sources: https://jqueryvalidation.org/, https://api.jqueryui.com/slider/, https://api.jqueryui.com/tabs/
CSS background code: https://www.magicpattern.design/tools/css-backgrounds
second source: /*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu

Copyright (c) 2024 by Rahul. All rights reserved. May be freely copied or 
excerpted for educational purposes with credit to the author.
updated by RP on June 28th, 2024 at 11:30 PM
*/




var ScrabblePieces = [
    { letter: "A", value: 1, amount: 9 },
    // Add other Scrabble pieces here...
    { letter: "B", value: 3, amount: 2 },
    { letter: "C", value: 3, amount: 2 },
    { letter: "D", value: 2, amount: 4 },
    { letter: "E", value: 1, amount: 12 },
    { letter: "F", value: 4, amount: 2 },
    { letter: "G", value: 2, amount: 3 },
    { letter: "H", value: 4, amount: 2 },
    { letter: "I", value: 1, amount: 9 },
    { letter: "J", value: 8, amount: 1 },
    { letter: "K", value: 5, amount: 1 },
    { letter: "L", value: 1, amount: 4 },
    { letter: "M", value: 3, amount: 2 },
    { letter: "N", value: 1, amount: 6 },
    { letter: "O", value: 1, amount: 8 },
    { letter: "P", value: 3, amount: 2 },
    { letter: "Q", value: 10, amount: 1 },
    { letter: "R", value: 1, amount: 6 },
    { letter: "S", value: 1, amount: 4 },
    { letter: "T", value: 1, amount: 6 },
    { letter: "U", value: 1, amount: 4 },
    { letter: "V", value: 4, amount: 2 },
    { letter: "W", value: 4, amount: 2 },
    { letter: "X", value: 8, amount: 1 },
    { letter: "Y", value: 4, amount: 2 },
    { letter: "Z", value: 10, amount: 1 },
    { letter: "_", value: 0, amount: 2 }
];

var tilesOnRack = [];
var tilesOnBoard = [];
var dropLocations = [
    { id: "dropLocation1" },
    { id: "dropLocation2" },
    { id: "dropLocation3" },
    { id: "dropLocation4" },
    { id: "dropLocation5" },
    // Add other drop locations here...
    { id: "dropLocation6" },
    { id: "dropLocation7" },
    { id: "dropLocation8" },
    { id: "dropLocation9" },
    { id: "dropLocation10" },
    { id: "dropLocation11" },
    { id: "dropLocation12" },
    { id: "dropLocation13" },
    { id: "dropLocation14" },
    { id: "dropLocation15" },
    { id: "dropLocation16" },
    { id: "dropLocation17" },
    { id: "dropLocation18" },
    { id: "dropLocation19" },
    { id: "dropLocation20" },
    { id: "dropLocation21" },
    { id: "dropLocation22" },
    { id: "dropLocation23" },
    { id: "dropLocation24" },
    { id: "dropLocation25" },
    { id: "dropLocation26" },
    { id: "dropLocation27" },
    { id: "dropLocation28" },
    { id: "dropLocation29" },
    { id: "dropLocation30" },
    { id: "dropLocation31" },
    { id: "dropLocation32" },
    { id: "dropLocation33" },
    { id: "dropLocation34" },
    { id: "dropLocation35" },
    { id: "dropLocation36" },
    { id: "dropLocation37" },
    { id: "dropLocation38" },
    { id: "dropLocation39" },
    { id: "dropLocation40" },
    { id: "dropLocation41" },
    { id: "dropLocation42" },
    { id: "dropLocation43" },
    { id: "dropLocation44" },
    { id: "dropLocation45" },
    { id: "dropLocation46" },
    { id: "dropLocation47" },
    { id: "dropLocation48" },
    { id: "dropLocation49" },
    { id: "dropLocation50" },
    { id: "dropLocation51" },
    { id: "dropLocation52" },
    { id: "dropLocation53" },
    { id: "dropLocation54" },
    { id: "dropLocation55" },
    { id: "dropLocation56" },
    { id: "dropLocation57" },
    { id: "dropLocation58" },
];
/* thes are the drop locations on the board, there are 58 of them, each with a unique id */

$(document).ready(function () {
    initializeGame();

    $("#submit-word").click(submitWord);
    $("#new-tiles").click(newTiles);
    $("#reset-game").click(resetGame);
});

function initializeGame() {
    generateTiles();
    createDropLocations();
}

function generateTiles() {
    $('#tile-container').empty();
    tilesOnRack = [];

    for (var i = 0; i < 7; i++) {
        var tile = getRandomTile();
        if (!tile) continue;

        var tileElement = $('<img>')
            .attr({
                'src': 'graphics_data/Scrabble_Tiles/Scrabble_Tile_' + tile.letter + '.jpg',
                'alt': 'Scrabble Tile ' + tile.letter,
                'id': 'tile' + i
            })
            .addClass('tile draggable')
            .appendTo('#tile-container')
            .draggable({
                snap: ".droppable",
                snapMode: "inner",
                revert: "invalid"
            });

        tilesOnRack.push({
            id: 'tile' + i,
            value: tile.value,
            letter: tile.letter
        });
    }
}

function getRandomTile() {
    var tile;
    while (!tile || tile.amount === 0) {
        var tileIndex = Math.floor(Math.random() * ScrabblePieces.length);
        tile = ScrabblePieces[tileIndex];
        if (tile.amount > 0) {
            tile.amount--;
            return tile;
        }
    }
    return null;
}

function createDropLocations() {
    $('#drop-locations').empty();
    dropLocations.forEach((location, index) => {
        $('<span>')
            .attr('id', location.id)
            .addClass('droppable')
            .css({ left: (index * 90) + "px" })
            .appendTo('#drop-locations')
            .droppable({
                accept: ".draggable",
                classes: {
                    "ui-droppable-hover": "ui-state-hover"
                },
                drop: function (event, ui) {
                    $(this).addClass("ui-state-highlight");
                    placeTileOnBoard(ui.draggable[0], this);
                }
            });
    });
}

function placeTileOnBoard(tile, dropLocation) {
    var letter = tile.alt.charAt(14);
    var tileData = {
        id: tile.id,
        value: getTileValue(letter),
        letter: letter,
        location: dropLocation.id
    };

    tilesOnBoard.push(tileData);
    $(tile).position({ my: "center", at: "center", of: $(dropLocation) });
    updateWordAndScore();

    tilesOnRack = tilesOnRack.filter(t => t.id !== tile.id);
}

function getTileValue(letter) {
    var tile = ScrabblePieces.find(t => t.letter === letter);
    return tile ? tile.value : 0;
}

function updateWordAndScore() {
    var word = tilesOnBoard.map(tile => tile.letter).join('');
    var score = tilesOnBoard.reduce((total, tile) => total + tile.value, 0);
    var wordMultiplier = tilesOnBoard.some(tile => isDoubleWordScoreBox(tile.location)) ? 2 : 1;

    $("#word-display").text(word);
    $("#score-display").text(score * wordMultiplier);
}

function isDoubleWordScoreBox(dropLocationId) {
    var index = parseInt(dropLocationId.substring(12));
    return index === 1 || index === 5;
}

function submitWord() {
    if (tilesOnBoard.length === 0) {
        alert("Please place tiles on the board before submitting!");
        return;
    }
    tilesOnBoard = [];
    newTiles();
}

function newTiles() {
    generateTiles();
    $(".droppable.ui-state-highlight").removeClass("ui-state-highlight");
}

function resetGame() {
    $('#tile-container').empty();
    $(".droppable.ui-state-highlight").removeClass("ui-state-highlight");
    tilesOnBoard = [];
    tilesOnRack = [];
    $("#score-display").text(0);
    $("#word-display").text("_______");
    generateTiles();
}
