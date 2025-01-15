class SoundEffects {
  private static messageSound: HTMLAudioElement
  private static notificationSound: HTMLAudioElement
  private static enabled: boolean = true

  static init() {
    if (typeof window !== 'undefined') {
      this.messageSound = new Audio('/sounds/message.mp3')
      this.notificationSound = new Audio('/sounds/notification.mp3')
    }
  }

  static toggleSound(enabled: boolean) {
    this.enabled = enabled
  }

  static playMessageSound() {
    if (this.enabled && this.messageSound) {
      this.messageSound.play().catch(() => {})
    }
  }

  static playNotificationSound() {
    if (this.enabled && this.notificationSound) {
      this.notificationSound.play().catch(() => {})
    }
  }
}

export default SoundEffects 