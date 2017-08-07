module.exports = {
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
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax
      });
      targets.sort((a, b) => a.hits - b.hits);

      if (targets.length > 0) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }

      creep.memory.fueling = creep.carry.energy == 0;
    }
  }
};
