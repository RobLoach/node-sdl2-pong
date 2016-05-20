import sdl from 'node-sdl2'
import Vector from 'vector2d-lib'

/**
 * The Game
 */
export default class Entity {

	/**
	 * Create the Entity.
	 */
	constructor(game) {
		// Properties
		this.game = game
		this.location = new Vector(0, 0)
		this.size = new Vector(10, 10)
		this.velocity = new Vector(0, 0)

		// The entity itself can have children.
		this.entities = {}
	}

	/**
	 * Event handler
	 */
	event(e) {
		for (var i in this.entities) {
			this.entities[i].event(e)
		}
	}

	/**
	 * Updates the movement of all game elements.
	 */
	update(delta) {
		this.location.x += this.velocity.x * delta
		this.location.y += this.velocity.y * delta

		// TODO: Update all game elements.
		for (var i in this.entities) {
			this.entities[i].update(delta)
		}
	}

	/**
	 * Draw all game elements on the screen.
	 */
	render(renderer) {
		for (var i in this.entities) {
			this.entities[i].render(this.renderer)
		}
	}

	/**
	 * Delete the entity.
	 */
	destroy() {
		// Destroy all entities.
		for (var i in this.entities) {
			this.entities[i].destroy()
		}
	}

	collideEntity(entity) {
		return this.location.x < entity.location.x + entity.size.x &&
   			this.location.x + this.size.x > entity.location.x &&
   			this.location.y < entity.location.y + entity.size.y &&
   			this.location.y + this.size.y > entity.location.y
	}
}
