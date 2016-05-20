import sdl from 'node-sdl2'
import Entity from './Entity'

/**
 * The Game
 */
export default class Ball extends Entity {
	constructor(game, playerNum) {
		super(game)
		this.location.x = game.size.x / 2
		this.location.y = game.size.y / 2
		this.speedx = 200
		this.speedy = 130
		this.velocity.x = this.speedx
		this.velocity.y = this.speedy
		this.size.x = 10
		this.size.y = 10
	}

	/**
	 * Draw all game elements on the screen.
	 */
	render(renderer) {
		// TODO: Render all game elements.
		if (sdl.SDL_SetRenderDrawColor(renderer, 0xFF, 0xFF, 0xFF, 0xFF) !== 0) {
			throw new Error(sdl.SDL_GetError())
		}
		let rectToDraw = new sdl.SDL_Rect({
			x: this.location.x,
			y: this.location.y,
			w: this.size.x,
			h: this.size.y
		})
		sdl.SDL_RenderFillRect(renderer, rectToDraw.ref())
	}

	update(delta) {
		if (this.location.y + this.size.y > this.game.size.y) {
			this.velocity.y = -this.speedy
		}
		else if (this.location.y < 0) {
			this.velocity.y = this.speedy
		}

		if (this.location.x < 0) {
			// TODO: Point to AI
			this.location.x = this.game.size.x / 2
		}
		else if (this.location.y > this.game.size.x) {
			// TODO: Point to Player
			this.location.x = this.game.size.x / 2
		}

		if (this.collideEntity(this.game.entities.player1)) {
			this.velocity.x = this.speedx
		}
		else if (this.collideEntity(this.game.entities.player2)) {
			this.velocity.x = -this.speedx
		}

		super.update(delta)
	}
}
