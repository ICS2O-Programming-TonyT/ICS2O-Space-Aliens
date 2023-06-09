/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Mr. Coxall
// Modified by: Tony
// Created on: Sep 2020
// This is the Game Scene

function randomsoul() {
  const color = ["blue", "cyan", "green", "orange", "purple", "red", "yellow"];
  const random = Math.floor(Math.random() * color.length);
  let randomcolour = `assets/Souls/${color[random]}_soul.png`
  console.log(randomcolour)
  return randomcolour
}

class GameScene extends Phaser.Scene {
  // create an alien
  createSoul () {
    const soulXLocation = Math.floor(Math.random() * 1900) + 1 // this will get a number between 1 and 1920;
    let soulXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50;
    soulXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% of cases
    const ansoul = this.physics.add.sprite(soulXLocation, 1, 'soul')
    ansoul.body.velocity.y = 100
    ansoul.body.velocity.x = soulXVelocity
    this.soulgroup.add(ansoul)
  }

  createGhost () {
    const ghostXLocation = Math.floor(Math.random() * 1900) + 1 // this will get a number between 1 and 1920;
    let ghostXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50;
    ghostXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% of cases
    const anghost = this.physics.add.sprite(ghostXLocation, 1, 'ghost')
    anghost.body.velocity.y = 100
    anghost.body.velocity.x = ghostXVelocity
    this.ghostgroup.add(anghost)
  }
  
  constructor () {
    super({ key: 'gameScene' })

    this.Grim = null
    this.fireScythe = false
    this.score = 0
    this.scoreText = null
    this.highscoreText = null
    this.highscore = 0
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }
    this.highcoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }

    this.gameOverText = null
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#0x5f6e7a')
  }

  preload () {
    console.log('Game Scene')
    
    // images
    this.load.image('Graveyard', 'assets/Graveyard.jpg')
    this.load.image('Grim', 'assets/Grim Reaper.png')
    this.load.image('Scythe', 'assets/Scythe.gif')

    this.load.image('soul', randomsoul())
    this.load.image('ghost', 'assets/ghost.png')
    
    // sound
    this.load.audio('laser', 'assets/laser1.wav')
    this.load.audio('explosion', 'assets/barrelExploding.wav')
    this.load.audio('bomb', 'assets/bomb.wav')
  }

  summonsouls() {
    let number = Math.floor((Math.random() * 3) + 1)
    console.log(number)
    for (let i = 1; i <= number; i++) {
      this.createSoul()
    }
  }

  summonghost() {
    let chance = Math.floor((Math.random() * 10) + 1)
    let number = Math.floor((Math.random() * 2) + 1)
    console.log(chance)
    if (chance == 1) {
      for (let i = 1; i <= number; i++) {
        this.createGhost()
      } 
    }
  }

  
  create (data) {
    this.background = this.add.image(0, 0, 'Graveyard').setScale(2.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)
    this.highscoreText = this.add.text(10, 100, 'High Score: ' + this.highscore.toString(), this.highcoreTextStyle)

    this.Grim = this.physics.add.sprite(1920 / 2, 1080 - 100, 'Grim')

    // create a group for the Scythes
    this.ScytheGroup = this.physics.add.group()

    // create a group for the aliens
    this.soulgroup = this.add.group()
    this.ghostgroup = this.add.group()
    this.summonsouls()
    this.summonghost()

    // Collisions between Scythes and aliens
    this.physics.add.collider(this.ScytheGroup, this.soulgroup, function (ScytheCollide, soulCollide) {
      soulCollide.destroy()
      ScytheCollide.destroy()
      this.sound.play('explosion')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.summonsouls()
      this.summonghost()
    }.bind(this))

    this.physics.add.collider(this.ScytheGroup, this.ghostgroup, function (ScytheCollide, ghostCollide) {
      ghostCollide.destroy()
      ScytheCollide.destroy()
      this.sound.play('explosion')
      this.score = this.score + 3
      this.scoreText.setText('Score: ' + this.score.toString())
      this.summonghost()
    
    }.bind(this))

    
    // Collisions between Grim and aliens
    this.physics.add.collider(this.Grim, this.soulgroup, function (GrimCollide, alienCollide) {
      this.sound.play('bomb')
      this.physics.pause()
      alienCollide.destroy()
      GrimCollide.destroy()
      
      if (this.highscore <= this.score) {
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, `!New Highscore!\n${this.score.toString()}\nGame Over!\nClick to play again.`, this.gameOverTextStyle).setOrigin(0.5)
        this.highscore = this.score
      } else {
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, `Game Over!\nClick to play again.`, this.gameOverTextStyle).setOrigin(0.5)
      }
      this.score = 0
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    }.bind(this))
  }

  update (time, delta) {
    // called 60 times a second, hopefully!
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')
    const keyAobj = this.input.keyboard.addKey('A')
    const keyDobj = this.input.keyboard.addKey('D')
    
    
    if (keyLeftObj.isDown === true || keyAobj.isDown === true) {
      this.Grim.x -= 15
      if (this.Grim.x < 0) {
        this.Grim.x = 0
      }
    }

    if (keyRightObj.isDown === true || keyDobj.isDown === true) {
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