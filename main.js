var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");

function spawn(spawn_name, role, body, amount) {
  var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
  if (creeps.length < amount) {
    var name = Game.spawns[spawn_name].createCreep(body, undefined, {role: role, fueling: true});

    if (name !== ERR_NOT_ENOUGH_ENERGY) {
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

module.exports.loop = function () {
  freeMemory();

  spawn("Spawn1", "harvester", [WORK, CARRY, MOVE], 1);
  spawn("Spawn1", "upgrader", [WORK, CARRY, MOVE], 3);

  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if(creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
  }
}
