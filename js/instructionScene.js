/* global Phaser */

// This is the Menu Scene

class InstructionScene extends Phaser.Scene {
  constructor() {
    super({ key: 'instructionScene' })

    this.menuSceneBackgroundImage = null
    this.instructionImage = null
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('Instruction Scene')

    // Preload the menu scene background image
    this.load.image('menuSceneBackground', 'assets/graveyard_screen_image2.png')

    // Preload the instruction image
    this.load.image('instructionImage', 'assets/Instruction.png')
  }

  create(data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.instructionImage = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'instructionImage')
    this.instructionImage.setInteractive({ useHandCursor: true })
    this.instructionImage.on('pointerdown', () => this.clickButton())
  }

  update(time, delta) {
    // Update logic goes here
  }

  clickButton() {
    // Start the menu scene when the instruction image is clicked
    this.scene.start('menuScene')
  }
}

export default InstructionScene
