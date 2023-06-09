/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// This is the Menu Scene

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menuScene' })

    this.menuSceneBackgroundImage = null
    this.startButton = null
    this.instructionButton = null
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Menu Scene')

    this.load.image('menuSceneBackground', 'assets/graveyard_screen_image2.png')
    this.load.image('startButton', 'assets/start.png')
    this.load.image('instructionButton', 'assets/instructionbutton.png')
  }

  create (data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    this.instructionButton = this.add.sprite(1920 / 2, (700) + 100, 'instructionButton')
    this.startButton.setInteractive({ useHandCursor: true })
    this.instructionButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton('start'))
    this.instructionButton.on('pointerdown', () => this.clickButton('instruction'))
  }

  update (time, delta) {
  }

  clickButton (value) {
    if (value == 'start') {
      this.scene.start('gameScene')
    } else if (value == 'instruction') {
      this.scene.start('instructionScene')
    }
    
  }
}

export default MenuScene