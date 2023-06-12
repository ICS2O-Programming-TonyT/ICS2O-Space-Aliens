/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Modified by: Tony
// Created on: June 2023
// This is the Phaser3 configuration file

/* global Phaser */

// This is the Phaser3 configuration file

import SplashScene from './splashScene.js'
import TitleScene from './titleScene.js'
import MenuScene from './menuScene.js'
import GameScene from './gameScene.js'
import InstructionScene from './instructionScene.js'

// Our game scenes
const splashScene = new SplashScene() // Create a new instance of the SplashScene class
const titleScene = new TitleScene() // Create a new instance of the TitleScene class
const menuScene = new MenuScene() // Create a new instance of the MenuScene class
const gameScene = new GameScene() // Create a new instance of the GameScene class
const instructionScene = new InstructionScene() // Create a new instance of the InstructionScene class

// Game scene configuration
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  // Set background color
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    // Place it in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config) // Create a new Phaser game instance with the provided configuration

// Load scenes
// NOTE: Remember that any "key" is global and CAN NOT be reused!
game.scene.add('splashScene', splashScene) // Add the SplashScene instance to the game with the key 'splashScene'
game.scene.add('titleScene', titleScene) // Add the TitleScene instance to the game with the key 'titleScene'
game.scene.add('menuScene', menuScene) // Add the MenuScene instance to the game with the key 'menuScene'
game.scene.add('gameScene', gameScene) // Add the GameScene instance to the game with the key 'gameScene'
game.scene.add('instructionScene', instructionScene) // Add the InstructionScene instance to the game with the key 'instructionScene'

// Start with the splash scene
game.scene.start('splashScene') // Start the game with the 'splashScene' as the initial scene
