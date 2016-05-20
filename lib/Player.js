import sdl from 'node-sdl2'
import Paddle from './Paddle'

/**
 * The Game
 */
export default class Player extends Paddle {
	constructor(game) {
		super(game)
		this.location.x = 100
	}

	/**
	 * Event handler
	 */
	event(e) {
		if (e.type === sdl.SDL_EventType.SDL_KEYDOWN) {
			switch (e.key.keysym.scancode) {
				case sdl.SDL_SCANCODE_DOWN:
					this.velocity.y = this.speed
					break
				case sdl.SDL_SCANCODE_UP:
					this.velocity.y = -this.speed
					break
				// no default
			}
		} else {
			switch (e.key.keysym.scancode) {
				case sdl.SDL_SCANCODE_DOWN:
					this.velocity.y = 0
					break
				case sdl.SDL_SCANCODE_UP:
					this.velocity.y = 0
					break
				// no default
			}
		}
	}
}
