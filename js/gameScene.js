/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Created on: Sep 2020
// This is the Game Scene

class GameScene extends Phaser.Scene {

  // create an alien
  createAlien () {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1 // this will get a number between 1 and 1920;
    let alienXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50;
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% of cases
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
    anAlien.body.velocity.y = 200
    anAlien.body.velocity.x = alienXVelocity
    this.alienGroup.add(anAlien)
  }

  constructor () {
    super({ key: 'gameScene' })

    this.Grim = null
    this.fireScythe = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }

    this.gameOverText = null
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#0x5f6e7a')
  }

  preload () {
    console.log('Game Scene')

    // images
    this.load.image('starBackground', 'assets/starBackground.png')
    this.load.image('Grim', 'assets/Grim Reaper.png')
    this.load.image('Scythe', 'assets/Scythe.png')
    this.load.image('alien', 'assets/alien.png')
    // sound
    this.load.audio('laser', 'assets/laser1.wav')
    this.load.audio('explosion', 'assets/barrelExploding.wav')
    this.load.audio('bomb', 'assets/bomb.wav')
  }

  create (data) {
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    this.Grim = this.physics.add.sprite(1920 / 2, 1080 - 100, 'Grim')

    // create a group for the Scythes
    this.ScytheGroup = this.physics.add.group()

    // create a group for the aliens
    this.alienGroup = this.add.group()
    this.createAlien()

    // Collisions between Scythes and aliens
    this.physics.add.collider(this.ScytheGroup, this.alienGroup, function (ScytheCollide, alienCollide) {
      alienCollide.destroy()
      ScytheCollide.destroy()
      this.sound.play('explosion')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createAlien()
      this.createAlien()
    }.bind(this))

    // Collisions between Grim and aliens
    this.physics.add.collider(this.Grim, this.alienGroup, function (GrimCollide, alienCollide) {
      this.sound.play('bomb')
      this.physics.pause()
      alienCollide.destroy()
      GrimCollide.destroy()
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    }.bind(this))
  }

  update (time, delta) {
    // called 60 times a second, hopefully!
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    if (keyLeftObj.isDown === true) {
      this.Grim.x -= 15
      if (this.Grim.x < 0) {
        this.Grim.x = 0
      }
    }

    if (keyRightObj.isDown === true) {
      this.Grim.x += 15
      if (this.Grim.x > 1920) {
        this.Grim.x = 1920
      }
    }
    if (keySpaceObj.isDown === true) {
      if (this.fireScythe === false) {
        // fire Scythe
        this.fireScythe = true
        const aNewScythe = this.physics.add.sprite(this.Grim.x, this.Grim.y, 'Scythe')
        this.ScytheGroup.add(aNewScythe)
        this.sound.play('laser')
      }
    }
  
    if (keySpaceObj.isUp === true) {
      this.fireScythe = false
    }

    this.ScytheGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 50) {
        item.destroy()
      }
    })
  }
}

export default GameScene