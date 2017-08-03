module.exports = {
  run: function(creep) {
    if(creep.memory.working && creep.carry.energy == 0) {
      creep.memory.working = false;
    }
    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    if(creep.memory.working) {
      const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (target && creep.attack(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
    else {
      var source = creep.pos.findClosestByPath(FIND_SOURCES, {algorithm: "astar"});
      if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
};
