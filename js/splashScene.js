/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Modified by: Tony
// Created on: June 2023
// This is the Splash Scene

class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: 'splashScene' })

    this.splashSceneBackgroundImage = null
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff') // Set the background color of the main camera to white
  }

  preload () {
    console.log('Splash Scene') // Log a message indicating that the Splash Scene is being loaded

    // Load images
    this.load.image('splashSceneBackground', './assets/splashSceneImage.png') // Load the splash scene background image
  }

  create (data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground') // Add the splash scene background image as a sprite
    this.splashSceneBackgroundImage.x = 1920 / 2 // Set the x-coordinate of the background image to half the width of the screen
    this.splashSceneBackgroundImage.y = 1080 / 2 // Set the y-coordinate of the background image to half the height of the screen
  }

  update (time, delta) {
    if (time > 3000) { // After 3 seconds (3000 milliseconds)
      this.scene.switch('titleScene') // Switch to the 'titleScene'
    }
  }
}

export default SplashScene
