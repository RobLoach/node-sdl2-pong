import sdl from 'node-sdl2'
import Entity from './Entity'

/**
 * The Game
 */
export default class Paddle extends Entity {
	constructor(game) {
		super(game)
		this.location.y = game.size.y / 2
		this.speed = 500
		this.size.y = 100
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
		super.update(delta)
		if (this.location.y + this.size.y > this.game.size.y) {
			this.location.y = this.game.size.y - this.size.y
			this.velocity.y = 0
		}
		else if (this.location.y < 0) {
			this.location.y = 0
			this.velocity.y = 0
		}
	}
}
