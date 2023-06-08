/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// This is the Menu Scene

class InstructionScene extends Phaser.Scene {
  constructor () {
    super({ key: 'instructionScene' })

    this.menuSceneBackgroundImage = null
    this.Instruction = null
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Instruction Scene')

    this.load.image('menuSceneBackground', 'assets/graveyard_screen_image2.png')
    this.load.image('Instruction', 'assets/Instruction.png')
  }

  create (data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.Instruction = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'Instruction')
    this.Instruction.setInteractive({ useHandCursor: true })
    this.Instruction.on('pointerdown', () => this.clickButton())
  }

  update (time, delta) {
  }

  clickButton () {
    this.scene.start('gameScene')
  }
}

export default InstructionScene