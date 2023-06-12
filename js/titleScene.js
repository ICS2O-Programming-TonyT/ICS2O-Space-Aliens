/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Modified by: Tony
// Created on: June 2023
// This is the Title Scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'titleScene' })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: '200px Times', fill: '#ffffff', align: 'center' }
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff') // Set the background color of the main camera to white
  }

  preload () {
    console.log('Title Scene') // Log a message indicating that the Title Scene is being loaded

    // Load images
    this.load.image('titleSceneBackground', 'assets/graveyard_screen-image.png') // Load the title scene background image
  }

  create (data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(2.75) // Add the title scene background image as a sprite and scale it up
    this.titleSceneBackgroundImage.x = 1920 / 2 // Set the x-coordinate of the background image to half the width of the screen
    this.titleSceneBackgroundImage.y = 1080 / 2 // Set the y-coordinate of the background image to half the height of the screen

    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Soul Collecters', this.titleSceneTextStyle).setOrigin(0.5) // Add the title scene text at the specified position and apply the defined text style
  }

  update (time, delta) {
    if (time > 6000) { // After 6 seconds (6000 milliseconds)
      this.scene.switch('menuScene') // Switch to the 'menuScene'
    }
  }
}

export default TitleScene
