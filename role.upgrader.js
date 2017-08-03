var roleUpgrader = {
  run: function(creep) {
    if(creep.memory.fueling) {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
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
