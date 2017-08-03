var roles = {
  "harvester": require("role.harvester"),
  "upgrader": require("role.upgrader"),
  "builder": require("role.builder"),
};

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

  spawn("Spawn1", "harvester", [WORK, CARRY, MOVE], 2);
  spawn("Spawn1", "upgrader", [WORK, CARRY, CARRY, MOVE], 5);
  spawn("Spawn1", "builder", [WORK, CARRY, CARRY, MOVE], 4);

  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    roles[creep.memory.role].run(creep);
  }

  let roomVisual = new RoomVisual();
  visual(roomVisual, "👨‍🌾", "harvester", 1);
  visual(roomVisual, "👨‍🔧", "upgrader", 2);
  visual(roomVisual, "👷", "builder", 3);
}
