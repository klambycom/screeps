var roleUpgrader = {
  body: {
    300: [WORK, CARRY, MOVE], // Cost: 200
    350: [WORK, CARRY, MOVE],
    400: [WORK, CARRY, MOVE, MOVE], // Cost: 250
    450: [WORK, CARRY, MOVE, MOVE],
    500: [WORK, CARRY, CARRY, MOVE, MOVE], // Cost: 300
    550: [WORK, CARRY, CARRY, MOVE, MOVE],
    600: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], // Cost: 400
    650: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
  },

  run: function(creep) {
    if(creep.memory.fueling) {
      //var sources = creep.room.find(FIND_SOURCES);
      //if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
      //  creep.moveTo(sources[1]);
      //}
      var source = creep.pos.findClosestByPath(FIND_SOURCES, {algorithm: "astar"});
      if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
      creep.memory.fueling = creep.carry.energy < creep.carryCapacity;
    }
    else {
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
      creep.memory.fueling = creep.carry.energy == 0;
    }
  }
};

module.exports = roleUpgrader;
