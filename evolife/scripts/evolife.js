const map = [
"∽~∽~∽~∽~∽~∽:::ʷ ʷ ʷ                                                                                                                       ",
"∽~∽~∽~∽~∽~∽~∽::: ʷ ʷ                                                                                                                      ",
"∽~∽~∽~∽~∽~∽~∽~∽:: ʷ                                                ʷʷ                                                                     ",
"∽~∽~∽~∽~∽~∽~∽::: ʷ ʷ                                            ʷ ϔϔϔϔʷ                                                                   ",
"∽~∽~∽~∽~∽~∽~∽::ʷ ʷ                                               ϔϔϔϔϔϔ                                                                   ",
"∽~∽~∽~∽~∽::::: ʷ                                                 ʷϔϔϔϔ ʷ                                              ʷ                   ",
"∽~∽~∽~∽:::ʷ ʷ ʷ                                                     ʷ                                             ʷ  ʷϔϔ                  ",
"∽~∽~∽~∽:: ʷ ʷ                                                                                                    ʷϔϔϔϔϔϔϔϔʷ               ",
"∽~∽~∽:::ʷ ʷ                                                                                                        ϔϔϔϔϔϔ                 ",
"∽~∽::: ʷ ʷ                                                                                                         ʷϔϔʷ  ʷ                ",
"::::ʷ ʷ                                                                                                                                   ",
"ʷ ʷ ʷ                                                                                                                                     ",
" ʷ                                                                                                                                        ",
"                                                                                                                                          ",
"                                                                                                                                          ",
"                            ʷ                                                                                                             ",
"                            ϔϔʷ                                                                                                           ",
"                          ʷϔϔϔϔ                                                                                                           ",
"                            ϔϔϔʷ                                                                                                     ʷ ʷ ʷ",
"                           ʷ ϔϔ                                                                                                 ʷ ʷ ʷ ʷ ʷ ",
"                              ʷ                                                                                              ʷ ʷ ʷ :::::::",
"                                                                                                                         ʷ ʷ ʷ:::::::~∽~∽~",
"                                                                     ʷ  ʷʷ                                              ʷ ʷ::::∽~∽~∽~∽~∽~∽",
"                                                                      ϔϔϔϔϔϔʷ ʷ                                       ʷ ʷ ::∽~∽~∽~∽~∽~∽~∽~",
"                                                                   ʷϔϔϔϔϔϔϔϔϔϔϔ                                        ʷ ʷ ::∽~∽~∽~∽~∽~∽~∽",
"                                                                    ʷ ϔϔϔϔϔϔϔʷ                                            ʷ ʷ::~∽~∽~∽~∽~∽~",
"                                                                       ʷϔϔϔϔʷ                                           ʷ ʷ ::~∽~∽~∽~∽~∽~∽",
"                                                                         ʷ   ʷ                                         ʷ ʷ:::~∽~∽~∽~∽~∽~∽~",
"                                                                                                                      ʷ ʷ::∽~∽~∽~∽~∽~∽~∽~∽",
"                                                                                                                     ʷ ʷ ::~∽~∽~∽~∽~∽~∽~∽~",
"                                                                                                                       ʷ ʷ::~∽~∽~∽~∽~∽~∽~∽",
"                                                                                                                      ʷ ʷ ::∽~∽~∽~∽~∽~∽~∽~",
"                                                                                                                        ʷ ʷ:::~∽~∽~∽~∽~∽~∽"
];

/**
 * Singleton object containing helper functions.
 * @class helpers
 */
const helpers = function() {
    'use strict';

    /**
     * Generate a random integer in a specified range.
     * @method random_in_range
     * @param {Number} min Minimum value of the range (inclusive)
     * @param {Number} max Maximum value of the range (exclusive)
     * @return {Number} Random whole number in specified range, or NaN if
     *                  min >= max.
     */
    function random_in_range(min, max) {
        if(min >= max)
            return NaN;
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Select a random alement of an array.
     * @method array_choice
     * @param {Array} arr Array to select a random element from
     * @return {any} A random element of the array, or undefined if it is empty.
     */
    function array_choice(arr) {
        return arr[random_in_range(0, arr.length)];
    }

    /**
     * Return whether a chance in percent succeeded.
     * @method chance_in_percent
     * @param {Number} percent Success chance in percent
     * @return {Boolean} True if chance succeeded, false otherwise.
     */
    function chance_in_percent(percent) {
        return Math.random() < percent/100;
    }

    /**
     * Remove an element from an array.
     * @method remove_from_array
     * @param {Array} arr Array to remove element from
     * @param {Any} element Element to remove
     * @return {Any} Removed element or *null* if element not found in array
     */
    function remove_from_array(arr, element) {
        const idx = arr.indexOf(element);
        return idx >= 0 ? arr.splice(idx, 1)[0] : null;
    }

    /**
     * Pad string from the left to desired width with non-breaking spaces.
     * @method pad_left
     * @param {String} s String to pad
     * @param {Number} width Desired minimum width of string
     * @return {String} Left-padded string
     */
    function pad_left(s, width) {
        while(s.length < width)
            s = "&nbsp;" + s;
        return s;
    }

    return {
        random_in_range,
        array_choice,
        chance_in_percent,
        remove_from_array,
        pad_left
    };
}();

class Tile {
    /**
     * Tiles that make up the simulated map.
     * @class Tile
     * @constructor
     * @param {Number} pos_y Vertical position on the grid as integer
     * @param {Number} pos_x Horizontal position on the grid as integer
     * @return {Tile} New tile instance
     */
    constructor(pos_y, pos_x) {
        this.pos_y = pos_y;
        this.pos_x = pos_x;
        this.env_rings = [];
        this._entity_stack = [];
    }


    /**
     * Push entity on entity stack.
     * @method push_entity
     * @param {Entity} entity Entity to push
     */
    push_entity(entity) {
        this._entity_stack.push(entity);
    }

    /**
     * Pop entity off entity stack.
     * @method pop_entity
     * @return {Entity} Popped entity, or *null* if stack is empty.
     */
    pop_entity() {
        const popped = this._entity_stack.pop();
        return popped ? popped : null;
    }

    /**
     * Remove given entity from entity stack.
     * @method remove_entity
     * @param {Entity} entity Entity to remove from stack
     * @return {Entity} Removed entity, or *null* if not found in stack.
     */
    remove_entity(entity) {
        return helpers.remove_from_array(this._entity_stack, entity);
    }

    /**
     * Get reference to entity of the entity stack.
     * @method entity
     * @param {Class} [entity_class=undefined] Class of the searched entity.
     *  If not defined, the top entity of the stack (or *null* if empty)
     *  will be returned.
     * @param {Number} [lvl=undefined] Level of the searched entity.
     *  Only has effect when *entity_class* is defined.
     * @return {Entity} Found Entity or *undefined*.
     */
    entity(entity_class = undefined, lvl = undefined) {
        if(entity_class) {
            return this._entity_stack.find(entity => {
                if(entity instanceof entity_class)
                    return lvl === undefined || entity.level === lvl;
            });
        } else {
            const len = this._entity_stack.length;
            return len > 0 ? this._entity_stack[len - 1] : undefined;
        }
    }

    /**
     * Tell whether this tile holds no entity on its stack.
     * @method empty
     * @return {Boolean} True if this tile holds no entity, false otherwise
     */
     empty() {
        return !this.entity();
     }

    /**
     * Tell whether this tile can be stepped on by an entity.
     * @method walkable
     * @param {Number} [lvl=0] Level of entity that wants to step on tile
     * @return {Boolean} True if tile can be stepped on, false otherwise
     */
    walkable(lvl = 0) {
        if(this.empty())
            return true;

        if(this._entity_stack.some(entity => entity.allows_step < lvl))
            return false;

        return true;
    }
}

const entities = function() {
    "use strict";

    function Mortal(Base = class {}) {
        return class extends Base {
            die() {
                this._tile.remove_entity(this);
                this._tile = null;
                return this;
            }
        };
    }

    function Leveler(Base = class {}) {
        return class extends Base {
            constructor(allows_step, tile, lvl) {
                super(allows_step, tile);
                this._lvl = lvl;
            }

            get level() {
                return this._lvl;
            }
        };
    }

    class Entity {
        constructor(allows_step, tile = null) {
            this._allows_step = allows_step;
            if(tile) {
                this._tile = tile;
                tile.push_entity(this);
            }
        }

        get pos_y() {
            return this._tile.pos_y;
        }
        get pos_x() {
            return this._tile.pos_x;
        }
        get tile() {
            return this._tile;
        }
        set tile(new_tile) {
            this._tile = new_tile;
        }
        get allows_step() {
            return this._allows_step;
        }

        in_simulation() {
            return !!this._tile;
        }
    }

    class Border extends Entity {
        constructor(tile) {
            super(-Infinity, tile);
        }
    }

    class Beach extends Entity {
        constructor(tile) {
            super(Infinity, tile);
        }
    }

    class Water extends Entity {
        constructor(tile) {
            super(-Infinity, tile);
        }

        _try_spawning() {
            if(helpers.chance_in_percent(1) && !this._tile.entity(Protozoan))
                return new Protozoan(this._tile);
            return null;
        }

        act() {
            return {offspring: this._try_spawning()};
        }
    }

    class Animal extends Mortal(Entity) {
        constructor(allows_step, tile) {
            super(allows_step, tile);
        }

        go_to_tile(target_tile) {
            this._tile.pop_entity();
            target_tile.push_entity(this);
            this._tile = target_tile;
        }

        _grow_older() {
            if(this._time_to_live-- === 0) {
                this.die();
                return false;
            }
            return true;
        }

        get time_to_live() {
            return this._time_to_live;
        }
    }

    class LandAnimal extends Leveler(Animal) {
        constructor(tile, lvl = 0) {
            super(-Infinity, tile, lvl);
            this._rdy_to_copulate = false;
        }

        _is_hungry() {
            return this._food === 0;
        }

        _hunt(prey_class) {
            const env = this._tile.env_rings[0];
            const prey_list = env.reduce((found, tile) => {
                const prey = tile.entity(prey_class);
                if(prey) found.push(prey);
                return found;
            }, []);

            if(prey_list.length === 0)
                return {ate: false};

            const prey = helpers.array_choice(prey_list);
            this._food += prey.health;
            const min_energy = this._cfg.min_energy_replenish;
            this._energy = Math.min(min_energy, this._energy + 1);
            this._rdy_to_copulate = true;
            if((prey.health -= this._attack) <= 0)
                return {ate: true, killed_prey: prey.die()};
            if(prey instanceof Plant && prey.level > 0)
                prey.devolve();

            return {ate: true};
        }

        _survive_without_food() {
            this._rdy_to_copulate = false;
            if(this._energy-- === 0) {
                this.die();
                return false;
            }
            return true;
        }

        _consume_from_food_reserves() {
            if(--this._food === 0)
                this._rdy_to_copulate = false;
        }

        _try_reproduction(mate_class) {
            const env = this._tile.env_rings[0];
            const mating_partners = env.reduce((partner_list, tile) => {
                const partner = tile.entity(mate_class, this._lvl);
                if(partner && partner.is_horny)
                    partner_list.push(partner);
                return partner_list;
            }, []);

            if(mating_partners.length === 0)
                return null;

            const birthplace_list = env.filter(tile => tile.walkable());
            if(birthplace_list.length === 0)
                return null;
            const birthplace = helpers.array_choice(birthplace_list);

            this._have_sex(helpers.array_choice(mating_partners));

            if(helpers.chance_in_percent(this._cfg.lvlup_chance) &&
                this._lvl != this._cfg.max_level &&
                birthplace.walkable(this._lvl + 1)
            ){
                return new mate_class(birthplace, this._lvl + 1);
            } else if(birthplace.walkable(this._lvl)) {
                return new mate_class(birthplace, this._lvl);
            } else {
                return this._devolve(mate_class, birthplace);
            }
        }

        _have_sex(partner) {
            this._rdy_to_copulate = partner._rdy_to_copulate = false;
        }

        _devolve(child_class, birthplace) {
            // it is assumed that we need to devolve b/c of blocking veggy on tile
            const veggy_lvl = birthplace.entity().level;
            return new child_class(birthplace, veggy_lvl - 1);
        }

        _move(own_class, prey_class) {
            let target_tile;

            if(this.is_horny)
                target_tile = this._route_to_mate(own_class);
            else if(this._is_hungry() || this._lvl === 2)
                target_tile = this._route_to_prey(prey_class);

            // if entity is neither hungry nor horny, or the step towards a mate
            // or prey can't be taken (is blocked), we try to move randomly
            if(!target_tile) {
                target_tile = this._random_step();
                if(!target_tile) {  // no way to move: death of entity
                    this.die();
                    return false;
                }
            }

            this.go_to_tile(target_tile);
            return true;
        }

        _route_to_mate(mate_class) {
            const possible_targets = this._search_target_candidates(
                mate_class, this._lvl
            );
            if(possible_targets.length === 0)
                return null;
            return this._make_step_choice(possible_targets);
        }

        _route_to_prey(prey_class) {
            let possible_targets = this._search_target_candidates(prey_class);
            if(possible_targets.length === 0)
                return null;

            // of the found targets, we pick one with the highest lvl
            const max_target_lvl = Math.max(
                ...possible_targets.map(entity => entity.level)
            );
            possible_targets = possible_targets.filter(
                entity => entity.level === max_target_lvl
            );

            return this._make_step_choice(possible_targets);
        }

        _search_target_candidates(target_class, lvl = undefined) {
            const possible_targets = [];

            for(const ring of this._tile.env_rings.slice(1, this._view_range)) {
                for(const tile of ring) {
                    const entity = tile.entity(target_class, lvl);
                    if(entity)
                        possible_targets.push(entity);
                }
                if(possible_targets.length > 0)
                    break;
            }

            return possible_targets;
        }

        _make_step_choice(target_candidates) {
            const wanted_target = helpers.array_choice(target_candidates);
            const immediate_env = this._tile.env_rings[0];
            const step_position = this._calculate_step(wanted_target);
            const target_tile = immediate_env[step_position];

            if(target_tile.walkable(this._lvl))
                return target_tile;

            return null;
        }

        /**
         * Calculates step position in the immediate environment based on the
         * position of the wanted target.
         * @method calculate_step
         * @param {LandAnimal} animal Animal that wants to move
         * @param {Entity} target Target the animal wants to move towards
         * @return {Number} The position in the immediate environment that leads
         *                  towards the target
         * @example
         *      [0][1][2]
         *      [3][x][4]
         *      [5][6][7]
         */
        _calculate_step(target) {
            const x_dir = (target.pos_x > this.pos_x) -
                          (target.pos_x < this.pos_x);
            const y_dir = (target.pos_y > this.pos_y) -
                          (target.pos_y < this.pos_y);

            if(y_dir == -1) {
                switch(x_dir) {
                    case -1: return 0;
                    case 0:  return 1;
                    case 1:  return 2;
                }
            } else if(y_dir === 0) {
                switch(x_dir) {
                    case -1: return 3;
                    case 1:  return 4;
                }
            } else if(y_dir == 1) {
                switch(x_dir) {
                    case -1: return 5;
                    case 0:  return 6;
                    case 1:  return 7;
                }
            }
        }

        _random_step() {
            const env = this._tile.env_rings[0];
            const walkable_tiles = env.filter(
                tile => tile.walkable(this._lvl)
            );
            if(walkable_tiles.length > 0)
                return helpers.array_choice(walkable_tiles);
            else
                return null;
        }

        act(actor_class, prey_class) {
            if(!this._grow_older())
                return {death: true};

            if(this._is_hungry()) {
                const {ate, killed_prey} = this._hunt(prey_class);
                if(ate)
                    return {killed_prey};
                if(!this._survive_without_food())
                    return {death: true};

                // if we land here, the herbivore couldn't eat, but didn't die
            } else {
                this._consume_from_food_reserves();

                if(this.is_horny) {
                    const newborn = this._try_reproduction(actor_class);
                    if(newborn)
                        return {offspring: newborn};
                }
            }

            return {death: !this._move(actor_class, prey_class)};
        }

        get view_range() {
            return this._view_range;
        }
        get energy() {
            return this._energy;
        }
        get food() {
            return this._food;
        }
        get is_horny() {
            return this._rdy_to_copulate;
        }
        get attack() {
            return this._attack;
        }
        get health() {
            return this._health;
        }
        set health(new_health) {
            this._health = new_health;
        }
    }

    class Herbivore extends LandAnimal {
        constructor(tile, lvl) {
            const cfg = Herbivore.config;
            const level = Math.min(lvl, cfg.max_level);

            super(tile, level);

            this._cfg = cfg;
            this._view_range = cfg.view_range[level];
            this._time_to_live = cfg.time_to_live[level];
            this._energy = cfg.energy[level];
            this._food = cfg.food[level];
            this._health = cfg.health[level];
            this._attack = cfg.attack[level];
        }

        act() {
            return super.act(Herbivore, Plant);
        }
    }

    class Carnivore extends LandAnimal {
        constructor(tile, lvl) {
            const cfg = Carnivore.config;
            const level = Math.min(lvl, cfg.max_level);

            super(tile, level);

            this._cfg = cfg;
            this._view_range = cfg.view_range[level];
            this._time_to_live = cfg.time_to_live[level];
            this._energy = cfg.energy[level];
            this._food = cfg.food[level];
            this._health = cfg.health[level];
            this._attack = cfg.attack[level];
        }

        act() {
            return super.act(Carnivore, Herbivore);
        }
    }

    class Protozoan extends Animal {
        constructor(tile) {
            super(-Infinity, tile);
            this._time_to_live = Protozoan.config.time_to_live;
        }

        _beach_reachable() {
            const env = this._tile.env_rings[0];
            // save as instance var for later use by _jump_on_beach
            this._adjacent_beaches = env.filter((tile) => tile.walkable());
            return this._adjacent_beaches.length > 0;
        }

        _jump_on_beach() {
            this.die();
            const constr = helpers.chance_in_percent(
                Protozoan.config.herby_evo_chance) ? Herbivore : Carnivore;
            return new constr(helpers.array_choice(this._adjacent_beaches), 0);
        }

        _move() {
            if(!this._grow_older())
                return false;

            const env = this._tile.env_rings[0];
            const swimmable_tiles = env.filter(
                (tile) => tile.entity() instanceof Water
            );
            if(swimmable_tiles.length === 0) {
                this.die();
                return false; // dies when it has nowhere to move
            }
            this.go_to_tile(helpers.array_choice(swimmable_tiles));
            return true;
        }

        act() {
            if(this._beach_reachable())
                return {offspring: this._jump_on_beach()};
            return {death: !this._move()};
        }
    }

    class Vegetation extends Leveler(Entity) {
        constructor(allows_step, tile, level) {
            super(allows_step, tile, level);
            this._ticks_to_reproduce = undefined;
        }

        _try_growth() {
            const env = this._tile.env_rings[0];
            const free_tiles = env.filter(tile => tile.empty());
            if(free_tiles.length > 0) {
                if(this._ticks_to_reproduce === undefined) {
                    this._ticks_to_reproduce = helpers.random_in_range(
                        ...Vegetation.config.ticks_repro_range
                    );
                } else if(--this._ticks_to_reproduce <= 0) {
                    this._ticks_to_reproduce = undefined;
                    return new Plant(helpers.array_choice(free_tiles), 0);
                }
            } else {
                this._ticks_to_reproduce = undefined;
            }

            return null;
        }

        act() {
            return {offspring: this._try_growth()};
        }
    }

    class RainForest extends Vegetation {
        constructor(tile) {
            super(-Infinity, tile, Infinity);
        }
    }

    class Plant extends Mortal(Vegetation) {
        constructor(tile, lvl) {
            const cfg = Plant.config;
            const level = Math.min(lvl, cfg.max_level);
            const allows_step = Math.abs(lvl - cfg.max_level);

            super(allows_step, tile, level);

            this._health = cfg.health[level];
            this._ticks_to_evolve = undefined;
        }

        _set_configs(lvl) {
            this._lvl = Math.min(lvl, Plant.config.max_level);
            this._allows_step = Math.abs(this._lvl - Plant.config.max_level);
            this._health = Plant.config.health[this._lvl];
            this._ticks_to_evolve = undefined;
        }

        _can_evolve() {
            if(this._lvl === Plant.config.max_level)
                return false;

            const env = this._tile.env_rings[0];
            if(env.every(tile => {
                const adjacent_veg = tile.entity(Vegetation);
                return adjacent_veg && adjacent_veg.level >= this._lvl ||
                       tile.entity(Border);
            })) {
                if(this._ticks_to_evolve === undefined) {
                    const tick_range = Plant.config.ticks_evo_range;
                    this._ticks_to_evolve = helpers.random_in_range(...tick_range);
                    return false;
                } else {
                    return --this._ticks_to_evolve <= 0 ? true : false;
                }
            }

            this._ticks_to_evolve = undefined;
            return false;
        }

        _evolve() {
            this._set_configs(this._lvl + 1); // lvlup;
            this._ticks_to_evolve = undefined;
        }

        devolve() {
            for(let lvl = 0; lvl < Plant.config.health.length-1; ++lvl) {
                if(this._health <= Plant.config.health[lvl]) {
                    this._set_configs(lvl);
                    return;
                }
            }
        }

        act() {
            if(this._can_evolve()) {
                this._evolve();
                return {};
            }
            return super.act();
        }

        get health() {
            return this._health;
        }
        set health(new_health) {
            this._health = new_health;
        }
    }

    Vegetation.config = {
        ticks_repro_range: [10, 40]
    };
    Plant.config = {
        max_level: 2,
        health: [5, 10, 15],
        ticks_evo_range: [40, 100]
    };
    Protozoan.config = {
        time_to_live: 20,
        herby_evo_chance: 80
    };
    Herbivore.config = {
        max_level: 2,
        time_to_live: [50, 100, 150],
        view_range: [4, 6, 8],
        food: [10, 10, 10],
        energy: [10, 20, 30],
        health: [5, 10, 15],
        attack: [5, 10, 15],
        lvlup_chance: 50,
        min_energy_replenish: 10
    };
    Carnivore.config = {
        max_level: 2,
        time_to_live: [50, 100, 150],
        view_range: [4, 6, 8],
        food: [10, 10, 10],
        energy: [10, 20, 30],
        health: [5, 10, 15],
        attack: [5, 10, 15],
        lvlup_chance: 50,
        min_energy_replenish: 10
    };

    return {
        Border, Water, Beach, RainForest, Plant, Protozoan, Herbivore, Carnivore
    };
}();

/**
  * Singleton object containing translator functions.
  * @class translator
  */
const translator = function() {
    "use strict";

    let animation_toggle = 0;

    function token_toggler(_, tokens) {
        return tokens[animation_toggle];
    }

    function token_by_level(entity, tokens) {
        return tokens[entity.level];
    }

    function plant_token(plant, tokens) {
        if(plant.level === 2)
            return token_toggler(plant, tokens.slice(2));
        return token_by_level(plant, tokens);
    }

    function constant_token(_, tokens) {
        return tokens[0];
    }

    const mapping = new Map([
        [entities.Herbivore,  { tokens: 'җҖӜ',  get_token: token_by_level }],
        [entities.Carnivore,  { tokens: 'ԅԇʡ',  get_token: token_by_level }],
        [entities.Plant,      { tokens: 'ʷʬYϒ', get_token: plant_token }],
        [entities.RainForest, { tokens: 'Ϋϔ',   get_token: token_toggler }],
        [entities.Water,      { tokens: '∽~',   get_token: token_toggler }],
        [entities.Protozoan,  { tokens: '§',    get_token: constant_token }],
        [entities.Beach,      { tokens: ':',    get_token: constant_token }]
    ]);

    /**
     * Return instance of an entity represented by the given token.
     * @method token_to_entity
     * @private
     * @param {String} symbol Token representing an entity
     * @return {Entity} Instance of an entity represented by the given token,
     *                  or *null*, if token is unknown.
     */
    function token_to_entity(symbol) {
        for(const [klass, display] of mapping.entries()) {
            const found_idx = display.tokens.indexOf(symbol);
            if(found_idx >= 0)
                return klass.instance || new klass(null, found_idx);
                /* some entities can be handled as one shared instance as a
                   memory optimization */
        }
        return null;
    }

    /**
     * Return an object containing display information for the given entity.
     * @method entity_to_token
     * @param {Entity} entity Instance of an entity
     * @return {Object} Display information for given entity (token, css class).
     */
    function entity_to_token(entity) {
        if(entity)
            for(const [klass, display] of mapping.entries())
                if(entity instanceof klass)
                    return {
                        token: display.get_token(entity, display.tokens),
                        css_class: klass.name.toLowerCase()
                    };
        return {token: ' ', css_class: ''};
    }

    /**
     * Build an entity map out of a token map.
     * @method parse_initial_map
     * @param {Array} map 2D array representing a token map
     * @return {Array} 2D array containing entity instances.
     */
    function parse_initial_map(map) {
        return map.map(
            line => line.split('').map(token => token_to_entity(token))
        );
    }

    /**
     * Build HTML string representing a token map out of the given entity map.
     * @method build_html_map
     * @param {Array} entity_map 2D array containing entities
     * @param {Boolean} do_toggle True if token toggling shall happend when
     *                            constructing the map, false otherwise.
     * @param {Number} [tracked_idx=undefined] Index n of the entity to
     *                 highlight as in child number n of its parent node.
     *                 *undefined* if there is no entity to highlight.
     * @return {Array} HTML string representing a token map to be displayed
     *                 by inserting it into the DOM.
     */
    function build_html_map(entity_map, do_toggle, tracked_idx=undefined) {
        if(do_toggle)
            animation_toggle = animation_toggle === 0 ? 1 : 0;

        let element_counter = 0;

        const html_map = document.createElement("pre");
        for(const ent_row of entity_map) {
            for(const ent of ent_row) {
                const span = document.createElement("span");
                const {token, css_class} = entity_to_token(ent);
                if(css_class)
                    span.className = css_class;
                if(element_counter++ === tracked_idx)
                    span.id = "tracked";
                span.appendChild(document.createTextNode(token));
                html_map.appendChild(span);
            }
            html_map.appendChild(document.createTextNode('\n'));
        }
        return html_map;
    }

    return { entity_to_token, parse_initial_map, build_html_map };
}();

/**
  * Singleton object containing simulation functions.
  * @class simulation
  */
const simulation = function() {
    "use strict";

    let tile_map = [];

    const entity_lists = new Map();
    for(const class_name in entities)
        if(entities.hasOwnProperty(class_name))
            entity_lists.set(entities[class_name], []);

    /**
     * Build up an internal tile map, based on the given entity map.
     * @method setup_tile_map
     * @param {Array} entity_map 2D array containing rows of entity objects
     */
    function setup_tile_map(entity_map) {
        tile_map = entity_map.map(function(entity_row, y) {
            return entity_row.map(function(entity, x) {
                const tile = new Tile(y, x);
                if(entity) {
                    tile.push_entity(entity);
                    entity.tile = tile;
                    entity_lists.forEach((list, klass) => {
                        if(entity instanceof klass)
                            list.push(entity);
                    });
                }
                return tile;
            });
        });
        setup_env_rings(tile_map);
    }

    /**
     * For each tile in the given tile map, set up multiple environment tile
     * rings. Each of these rings is an array containing the surrounding tiles
     * of a certain distance. These tiles can be inspected by entities to do
     * their path finding.
     * @method setup_env_rings
     * @private
     * @param {Array} tile_map 2D array containing rows of tiles
     * @param {Number} [num_rings=8] number of environment rings
     */
    function setup_env_rings(tile_map, num_rings = 8) {
        tile_map.forEach(function(tile_row, y) {
            tile_row.forEach(function(tile, x) {
                for(let scope = 1; scope <= num_rings; ++scope)
                    tile.env_rings.push(calc_env_ring(tile_map, y, x, scope));
            });
        });
    }

    /**
     * Calculates the tile ring of the given scope around the tile at position
     * center_y, center_x.
     * @method calc_env_ring
     * @private
     * @param {Array} tile_map 2D list containing all tiles of the map
     * @param {Number} center_y y-coordinate of the tile
     * @param {Number} center_x x-coordinate of the tile
     * @param {Number} scope expanse of the tile ring list to be calculated
     * @example
     *      scope = 1 [0][1][2] scope = 2 [0][1][2][3][4] (hex digits here)
     *                [3][o][4]           [5]         [8]
     *                [5][6][7]           [6]   [o]   [9]
     *                                    [7]         [A]
     *                                    [B][C][D][E][F]
     *
     * @return {Array} tile ring list
     */
    function calc_env_ring(tile_map, center_y, center_x, scope) {
        const env_ring = [];

        let x_on_map, y_on_map = center_y - scope;     //top ring row
        for(let relative_x = -scope; relative_x <= scope; ++relative_x) {
            x_on_map = center_x + relative_x;
            add_environment_tile(env_ring, tile_map, y_on_map, x_on_map, scope);
        }

        x_on_map = center_x - scope;     //left ring column
        for(let relative_y = -scope+1; relative_y < scope; ++relative_y) {
            y_on_map = center_y + relative_y;
            add_environment_tile(env_ring, tile_map, y_on_map, x_on_map, scope);
        }

        x_on_map = center_x + scope;     //right ring column
        for(let relative_y = -scope+1; relative_y < scope; ++relative_y) {
            y_on_map = center_y + relative_y;
            add_environment_tile(env_ring, tile_map, y_on_map, x_on_map, scope);
        }

        y_on_map = center_y + scope;     //bottom ring row
        for(let relative_x = -scope; relative_x <= scope; ++relative_x) {
            x_on_map = center_x + relative_x;
            add_environment_tile(env_ring, tile_map, y_on_map, x_on_map, scope);
        }

        return env_ring;
    }

    /**
     * Adds a tile to the environment ring based on the given coordinates. If
     * the coordinates lie outside of the map, two different actions might be
     * taken, depending on the value of the scope argument.
     * 1. If scope == 1, a dummy tile that contains a border entity is added.
     *    This will effectively delimit the map.
     * 2. If scope > 1, no tile is added.
     *
     * @method add_environment_tile
     * @private
     * @param {Array} env_ring environment tile ring to extend
     * @param {Array} tile_map 2D list containing all tiles of the map
     * @param {Number} pos_y y-coordinate of the environment tile
     * @param {Number} pos_x x-coordinate of the environment tile
     * @param {Number} scope expanse of the environment tile ring
     */
    function add_environment_tile(env_ring, tile_map, pos_y, pos_x, scope) {
        if(tile_map[pos_y] && tile_map[pos_y][pos_x])
            env_ring.push(tile_map[pos_y][pos_x]);
        else if(scope === 1) {
            if(!entities.Border.dummy)
                entities.Border.dummy = new entities.Border(new Tile());
            env_ring.push(entities.Border.dummy.tile);
        }
    }

    /**
     * Let each entity make a move. This effectively advances the simulation
     * on step forward.
     * @method update
     */
    function update() {
        landanimal_action(entities.Carnivore, entities.Herbivore);
        landanimal_action(entities.Herbivore, entities.Plant);
        vegetation_action();
        protozoan_action();
        water_action();
    }

    function vegetation_action() {
        const plant_list = entity_lists.get(entities.Plant);
        const veggy_list = entity_lists.get(entities.RainForest)
                                       .concat(plant_list);

        const new_plants = veggy_list.reduce((offspring_list, veggy) => {
            const {offspring} = veggy.act();
            if(offspring)
                offspring_list.push(offspring);
            return offspring_list;
        }, []);

        entity_lists.set(entities.Plant, plant_list.concat(new_plants));
    }

    function protozoan_action() {
        const protozoan_list = entity_lists.get(entities.Protozoan);

        const dead_protos = protozoan_list.reduce((dead_list, proto) => {
            const {offspring: new_animal, death} = proto.act();
            if(new_animal) {
                [entities.Herbivore, entities.Carnivore].forEach((klass) => {
                    if(new_animal instanceof klass)
                        entity_lists.get(klass).push(new_animal);
                });
                dead_list.push(proto);
            } else if(death) {
                dead_list.push(proto);
            }
            return dead_list;
        }, []);

        for(const corpse of dead_protos)
            helpers.remove_from_array(protozoan_list, corpse);
    }

    function water_action() {
        const water_list = entity_lists.get(entities.Water);

        const new_protozoans = water_list.reduce((offspring_list, water) => {
            const {offspring} = water.act();
            if(offspring)
                offspring_list.push(offspring);
            return offspring_list;
        }, []);

        const protozoan_list = entity_lists.get(entities.Protozoan);
        entity_lists.set(
            entities.Protozoan, protozoan_list.concat(new_protozoans)
        );
    }

    function landanimal_action(hunter_class, prey_class) {
        const offspring_list = [];

        let survivors = entity_lists.get(hunter_class).filter(animal => {
            const {killed_prey, offspring, death} = animal.act();

            if(death)
                return false;

            if(killed_prey)
                helpers.remove_from_array(
                    entity_lists.get(prey_class), killed_prey
                );
            else if(offspring)
                offspring_list.push(offspring);

            return true;
        });

        entity_lists.set(hunter_class, survivors.concat(offspring_list));
    }

    /**
     * Return the current simulation state as a map of entity objects. Positions
     * that hold no entity will be represented as *undefined*.
     * @method entity_map
     * @return {Array} 2D array containing rows of entity objects.
     */
    function entity_map() {
        return tile_map.map(row => row.map(tile => tile.entity()));
    }

    /**
     * Return the entity located at the given coordinates.
     * @method get_entity
     * @param {Number} y Row number
     * @param {Number} x Column number
     * @return {Entity} Entity located at the given coordinates, or *undefined*
     *                  if there is none.
     */
    function get_entity(y, x) {
        return tile_map[y][x].entity();
    }

    /**
     * Kill all entities of the given type.
     * @method kill_entity_type
     * @param {String} type_name Class name of the entity type to kill
     */
    function kill_entity_type(type_name) {
        const entity_class = entities[type_name];
        for(const entity of entity_lists.get(entity_class))
            entity.die();
        entity_lists.set(entity_class, []);
    }

    // explicit syntax b/c we define a getter
    return Object.create(Object.prototype, {
        'setup_tile_map': {
            value: setup_tile_map
        },
        'update': {
            value: update
        },
        'entity_map': {
            get: entity_map
        },
        'get_entity': {
            value: get_entity
        },
        'kill_entity_type': {
            value: kill_entity_type
        }
    });
}();

/**
 * Top level display singleton object.
 * @class display
 */
 const display = function() {
     "use strict";

     /**
      * Draw world on browser window.
      * @method update_world
      * @param {Array} entity_map Entity map to translate and display
      * @param {Boolean} do_toggle Whether the entity tokens should toggle on
      *                            this update
      * @param {Number} [watched_idx=undefined] Index n of the watched entity
      *                 as in child number n of its parent node. *undefined*
      *                 if there is no watched entity.
      */
     function update_world(entity_map, do_toggle, watched_idx=undefined) {
         const new_map = translator.build_html_map(
             entity_map, do_toggle, watched_idx
         );
         const world_container = document.getElementById("world");
         const old_map = world_container.firstElementChild;
         if(old_map)
             world_container.removeChild(old_map);
         world_container.appendChild(new_map);
     }

     /**
      * Highlight watched entity on the world map and clear previous
      * highlighting.
      * @method highlight_watched_on_map
      * @param {Number} watched_idx Index n of the watched entity as in
      *                             child number n of its parent node. Set to
      *                             *undefined* if you just want to clear
      *                             current highlighting.
      */
     function highlight_watched_on_map(watched_idx) {
         const currently_highlighted = document.getElementById("tracked");
         if(currently_highlighted)
            currently_highlighted.id = "";
         if(watched_idx !== undefined) {
             const map = document.querySelector("pre");
             map.children[watched_idx].id = "tracked";
         }
     }

     /**
      * Display the currently watched entity in the control panel by showing
      * the token and displaying its stats in the table.
      * @method update_watched_info
      * @param {Entity} watched_entity Currently tracked entity. If *null*,
      *                                the tracking info will be cleared.
      */
     function update_watched_info(watched_entity) {
         _update_token_display(watched_entity);
         _update_watched_table(watched_entity);
     }

     /**
      * Display the currently watched entity, or clear display if there is none.
      * @method _update_token_display
      * @private
      * @param {Entity} watched_entity Currently tracked entity. If *null*,
      *                                the token display will be cleared.
      */
     function _update_token_display(watched_entity) {
         const tracker_display = document.getElementById("tracker_display");

         if(!watched_entity) {
             tracker_display.className = "";
             tracker_display.innerHTML = "";
             return;
         }

         const {token, css_class} = translator.entity_to_token(watched_entity);
         tracker_display.className = css_class;
         tracker_display.innerHTML = token;
     }

     /**
      * Display the currently watched entity's stats in the table, or clear
      * the table info if there is none.
      * @method _update_watched_table
      * @private
      * @param {Entity} watched_entity Currently tracked entity. If *null*,
      *                                the stats table will be cleared.
      */
     function _update_watched_table(watched_entity) {
         const stats_table = document.querySelector("#control_panel > table");
         const fields = Array.from(stats_table.getElementsByTagName("td"));
         const name_field = helpers.remove_from_array(
             fields, stats_table.querySelector("#type")
         );

         if(watched_entity) {
             for(const class_name in entities)
                 if(entities.hasOwnProperty(class_name))
                     if(watched_entity instanceof entities[class_name])
                        { name_field.innerHTML = class_name; break; }
         } else {
             name_field.innerHTML = "-";
         }

         for(const field of fields) {
             if(!watched_entity || watched_entity[field.id] === undefined ||
                                   watched_entity[field.id] === Infinity) {
                field.innerHTML = "-";
             } else {
                // field html ids match the entity property names
                let value = watched_entity[field.id];
                if(field.id === "level") // level starts at 0 internally
                    ++value;
                else if(field.id === "is_horny") // if true, value is a boolean
                    value = ["No", "Yes"][0+value]; // cast to int for indexing
                field.innerHTML = value;
             }
         }
     }

     /**
      * Update the speed indicator.
      * @method display_speed
      * @param {Number} step_duration Duration of steps in milliseconds
      */
     function update_speed(step_duration) {
         const steps_per_sec = (1000 / step_duration).toFixed(2);
         document.querySelector("#steps_per_sec").innerHTML =
             helpers.pad_left(steps_per_sec, 5);
     }

     return {
         update_world,
         highlight_watched_on_map,
         update_watched_info,
         update_speed
     };
 }();

/**
 * Top level simulation control singleton object.
 * @class main
 */
const main = function() {
    "use strict";

    let step_duration = 500;
    const step_change = 100;
    const max_step_duration = 1000;
    const min_step_duration = 100;
    let simulation_stopped = false;
    let current_timeout;
    let watched_entity;
    let num_map_cols;

    /**
     * Display current simulation state (map and tracking table).
     * @param {Boolean} [is_new_step=true] Whether the state to display is a new
     *                                     step in the simulation
     * @private
     * @method display_simulation_state
     */
    function display_simulation_state(is_new_step=true) {
        const watched_idx = check_watched_entity();
        display.update_world(simulation.entity_map, is_new_step, watched_idx);
        display.update_watched_info(watched_entity);
    }

    /**
     * Do one simulation step and display it.
     * @method step
     */
    function step() {
        simulation.update();
        display_simulation_state();
    }

    /**
     * Simulation loop, called in intervals.
     * @method loop
     * @private
     */
    function loop() {
        current_timeout = setTimeout(loop, step_duration);
        step();
    }

    /**
     * Start simulation. This includes parsing the map, displaying everything
     * and finally initiating the game loop.
     * @method start_simulation
     */
    function start_simulation() {
        const entity_map = translator.parse_initial_map(map);
        num_map_cols = entity_map[0].length;
        simulation.setup_tile_map(entity_map);
        display.update_speed(step_duration);
        display_simulation_state(false);
        setTimeout(loop, step_duration);
    }

    /**
     * Set a new watched entity and display it. If there is no watched entity
     * at the given position, the entity tracking info will be cleared.
     * @method set_watched_entity
     * @param {Number} index_on_map Index n of the new watched entity as in
     *                              child number n of its parent node.
     */
    function set_watched_entity(index_on_map) {
        const y = Math.floor(index_on_map / num_map_cols);
        const x = index_on_map % num_map_cols;
        watched_entity = simulation.get_entity(y, x);
        if(!watched_entity)
            index_on_map = undefined;
        display.highlight_watched_on_map(index_on_map);
        display.update_watched_info(watched_entity);
    }

    /**
     * Check if the currently watched entity is still alive and if not, set
     * global variable *watched_entity* to *null*. Return the map index of the
     * watched entity, or *undefined* if there is none.
     * @method check_watched_entity
     * @private
     * @return {Number} Index n of the watched entity as in child number n of
     *                  its parent node, or *undefined* if there is no watched
     *                  entity.
     */
    function check_watched_entity() {
        let watched_idx;
        if(watched_entity) {
            if(!watched_entity.in_simulation()) {
                watched_entity = null;
            } else {
                watched_idx = watched_entity.pos_y * num_map_cols +
                                watched_entity.pos_x;
            }
        }
        return watched_idx;
    }

    /**
     * Slow down simulation.
     * @method slow_down_interval
     * @return {Object} Two-member object, containing:
     * - step_duration: new duration in milliseconds
     * - limit_reached: true if minimum speed reached, false otherwise
     */
    function slow_down_interval() {
        if(step_duration < max_step_duration) {
            step_duration += step_change;
            display.update_speed(step_duration);
        }
        return {
            step_duration, limit_reached: step_duration == max_step_duration
        };
    }

    /**
     * Speed up simulation.
     * @method speed_up_interval
     * @return {Object} Two-member object, containing:
     * - step_duration: new duration in milliseconds
     * - limit_reached: true if maximum speed reached, false otherwise
     */
    function speed_up_interval() {
        if(step_duration > min_step_duration) {
            step_duration -= step_change;
            display.update_speed(step_duration);
        }
        return {
            step_duration, limit_reached: step_duration == min_step_duration
        };
    }

    /**
     * Pause/unpause simulation.
     * @method stop_resume
     * @return {Boolean} True if simulation continued, false if it stopped
     */
    function stop_resume() {
        if(simulation_stopped) {
            simulation_stopped = false;
            loop();
            return true;
        } else {
            simulation_stopped = true;
            clearTimeout(current_timeout);
            return false;
        }
    }

    /**
     * KIll all entities of the given type and display the result.
     * @method kill_all_of
     * @param {String} entity_type Type of entity to kill
     */
    function kill_all_of(entity_type) {
        simulation.kill_entity_type(entity_type);
        display_simulation_state(false);
    }

    return {
        start_simulation,
        step,
        set_watched_entity,
        slow_down_interval,
        speed_up_interval,
        stop_resume,
        kill_all_of
    };
}();

/**
 * Event listeners for user input.
 * @module user_ctrl
 * @requires main
 */

(function() {
    'use strict';

    let slower_button, faster_button, pause_button,
        step_button, kill_button, kill_select, toggle_ctrls;

    /**
     * Install event listeners.
     * @method setup_event_listeners
     * @private
     */
    function setup_event_listeners() {
        faster_button = document.getElementById("faster");
        slower_button = document.getElementById("slower");
        pause_button = document.getElementById("pause");
        step_button = document.getElementById("step");
        kill_button = document.getElementById("kill");
        kill_select = document.getElementById("kill_options");
        toggle_ctrls = document.getElementById("toggle_ctrls");
        faster_button.addEventListener("click", increase_speed);
        slower_button.addEventListener("click", decrease_speed);
        pause_button.addEventListener("click", stop_resume);
        kill_button.addEventListener("click", kill_entities);

        /* disable this button via javascript here, b/c for some reason,
           firefox doesn't respect the disabled attribute in html */
        step_button.setAttribute("disabled", "");

        toggle_ctrls.addEventListener("click", toggle_ctrl_panel);
        document.getElementById("world").addEventListener(
            "mouseup", track_entity
        );
    }

    /**
     * Event handler: slow down simulation.
     * @method decrease_speed
     * @param {Event} event Mouse click event
     * @private
     */
    function decrease_speed(event) {
        const {
            step_duration, limit_reached: disable_button
        } = main.slow_down_interval();

        if(disable_button) {
            slower_button.setAttribute("disabled", "");
            slower_button.removeEventListener("click", decrease_speed);
        } else if(faster_button.hasAttribute("disabled")) {
            faster_button.removeAttribute("disabled");
            faster_button.addEventListener("click", increase_speed);
        }
    }

    /**
     * Event handler: speed up simulation.
     * @method increase_speed
     * @param {Event} event Mouse click event
     * @private
     */
    function increase_speed(event) {
        const {
            step_duration, limit_reached: disable_button
        } = main.speed_up_interval();

        if(disable_button) {
            faster_button.setAttribute("disabled", "");
            faster_button.removeEventListener("click", increase_speed);
        } else if(slower_button.hasAttribute("disabled")) {
            slower_button.removeAttribute("disabled");
            slower_button.addEventListener("click", decrease_speed);
        }
    }

    /**
     * Event handler: pause or resume simulation.
     * @method stop_resume
     * @param {Event} event Mouse click event
     * @private
     */
    function stop_resume(event) {
        if(main.stop_resume()) {
            pause_button.innerHTML = "Pause";
            step_button.setAttribute("disabled", "");
            step_button.removeEventListener("click", do_step);
        } else {
            pause_button.innerHTML = "Resume";
            step_button.removeAttribute("disabled");
            step_button.addEventListener("click", do_step);
        }
    }

    /**
     * Event handler: move simulation one step forward.
     * @method do_step
     * @param {Event} event Mouse click event
     * @private
     */
    function do_step(event) {
        main.step();
    }

    /**
     * Event handler: mkill all entities of the selected type.
     * @method kill_entities
     * @param {Event} event Mouse click event
     * @private
     */
    function kill_entities(event) {
        main.kill_all_of(kill_options.value);
    }

    /**
     * Event handler: show or hide control panel.
     * @method toggle_ctrl_panel
     * @param {Event} event Mouse click event
     * @private
     */
    function toggle_ctrl_panel(event) {
        let ctrl_panel = document.getElementById("control_panel");
        if(toggle_ctrls.innerHTML === "Show Control Panel") {
            ctrl_panel.style.height = ctrl_panel.scrollHeight + "px";
            ctrl_panel.style.opacity = 1;
            ctrl_panel.style.marginTop = "10px";
            toggle_ctrls.innerHTML = "Hide Control Panel";
        } else {
            ctrl_panel.style.height = 0;
            ctrl_panel.style.opacity = 0;
            ctrl_panel.style.marginTop = 0;
            toggle_ctrls.innerHTML = "Show Control Panel";
        }
    }

    /**
     * Event handler: track the clicked entity.
     * @method track_entity
     * @param {Event} event Mouse click event
     * @private
     */
    function track_entity(event) {
        const clicked = event.target;
        main.set_watched_entity(
            Array.from(clicked.parentNode.children).indexOf(clicked)
        );
    }

    window.addEventListener("load", () => {
        setup_event_listeners();
        main.start_simulation();
    });
})();
