var roles = {
  "harvester": require("role.harvester"),
  "upgrader": require("role.upgrader"),
  "builder": require("role.builder"),
  "warrior": require("role.warrior"),
  "repairer": require("role.repairer")
};

var structures = {
  "controller": {
    run: function(structure) {}
  },
  "spawn": {
    run: function(structure) {}
  },
  "extension": {
    run: function(structure) {}
  },
  "tower": {
    run: function(tower) {
      // Repair
      let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax
      });
      if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
      }

      // Attack
      let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        tower.attack(closestHostile);
      }
    }
  }
}

function spawn(spawn_name, role, body, amount) {
  var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
  if (creeps.length < amount) {
    var name = Game.spawns[spawn_name].createCreep(body, undefined, {role: role, fueling: true});

    if (name !== ERR_NOT_ENOUGH_ENERGY && name !== ERR_BUSY) {
      console.log("Spawning new " + role + " in " + spawn_name + ": " + name);
    }
  }
}

function freeMemory() {
  // Remove dead creeps
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory: " + name);
    }
  }
}

function visual(roomVisual, icon, name, row) {
  let amount = _.filter(Game.creeps, (creep) => creep.memory.role == name).length;
  roomVisual.text(`${icon} ${amount}`, 1, row, {align: "left"});
}

module.exports.loop = function () {
  freeMemory();

  spawn("Spawn1", "harvester", [WORK, CARRY, CARRY, MOVE, MOVE], 3);
  spawn("Spawn1", "upgrader", [WORK, WORK, CARRY, CARRY, MOVE, MOVE], 2);
  spawn("Spawn1", "builder", [WORK, WORK, CARRY, CARRY, MOVE, MOVE], 2);
  spawn("Spawn1", "warrior", [ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH], 0);
  spawn("Spawn1", "repairer", [WORK, CARRY, MOVE, MOVE, MOVE], 2);

  // Run code for creeps
  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    roles[creep.memory.role].run(creep);
  }

  // Run code for structures
  for(var name in Game.structures) {
    var structure = Game.structures[name];
    structures[structure.structureType].run(structure);
  }

  let roomVisual = new RoomVisual();
  visual(roomVisual, "👨‍🌾", "harvester", 17);
  visual(roomVisual, "👨‍🔧", "upgrader", 18);
  visual(roomVisual, "👷", "builder", 19);
  visual(roomVisual, "👮", "warrior", 20);
}
