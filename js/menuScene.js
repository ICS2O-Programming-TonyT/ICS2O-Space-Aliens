/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Modified by: Tony
// Created on: June 2023
// This is the Menu Scene

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menuScene' })

    this.menuSceneBackgroundImage = null
    this.startButton = null
    this.instructionButton = null
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff') // Set the background color of the main camera to white
  }

  preload () {
    console.log('Menu Scene') // Log a message indicating that the Menu Scene is being loaded

    // Load images
    this.load.image('menuSceneBackground', 'assets/graveyard_screen_image2.png') // Load the menu scene background image
    this.load.image('startButton', 'assets/start.png') // Load the start button image
    this.load.image('instructionButton', 'assets/instructionbutton.png') // Load the instruction button image
  }

  create (data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground') // Add the menu scene background image as a sprite
    this.menuSceneBackgroundImage.x = 1920 / 2 // Set the x-coordinate of the background image to half the width of the screen
    this.menuSceneBackgroundImage.y = 1080 / 2 // Set the y-coordinate of the background image to half the height of the screen

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton') // Add the start button image as a sprite
    this.instructionButton = this.add.sprite(1920 / 2, (700) + 100, 'instructionButton') // Add the instruction button image as a sprite
    this.startButton.setInteractive({ useHandCursor: true }) // Enable interactivity and set the cursor style to a hand for the start button
    this.instructionButton.setInteractive({ useHandCursor: true }) // Enable interactivity and set the cursor style to a hand for the instruction button
    this.startButton.on('pointerdown', () => this.clickButton('start')) // Add a pointerdown event listener to the start button and call the clickButton method with 'start' as the value
    this.instructionButton.on('pointerdown', () => this.clickButton('instruction')) // Add a pointerdown event listener to the instruction button and call the clickButton method with 'instruction' as the value
  }

  update (time, delta) {
    // Update logic for the Menu Scene
  }

  clickButton (value) {
    if (value == 'start') {
      this.scene.start('gameScene') // Start the 'gameScene' scene
    } else if (value == 'instruction') {
      this.scene.start('instructionScene') // Start the 'instructionScene' scene
    }
  }
}

export default MenuScene
