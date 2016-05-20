import Paddle from './Paddle'

/**
 * The Game
 */
export default class AI extends Paddle {
	constructor(game) {
		super(game)
		this.location.x = this.game.size.x - 100
	}

	update(delta) {
		const ball = this.game.entities.ball
		if (this.location.y > ball.location.y + ball.size.y) {
			this.velocity.y = -this.speed
		}
		else if (this.location.y + this.size.y < ball.location.y) {
			this.velocity.y = this.speed
		}
		else {
			this.velocity.y = 0
		}
		super.update(delta)
	}
}
