var roleHarvester = {
  run: function(creep) {
    if(creep.memory.is_working) {
      let targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
                  structure.structureType == STRUCTURE_SPAWN ||
                  structure.structureType == STRUCTURE_TOWER) &&
                  structure.energy < structure.energyCapacity;
        }
      });
      if (targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: "#ffffff"}});
        }
      }
      else {
        //creep.moveTo(Game.spawns["Spawn1"]);
        var source = creep.pos.findClosestByPath(FIND_SOURCES, {algorithm: "astar"});
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      }
      creep.memory.is_working = creep.carry.energy != 0;
    }
    else {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
      creep.memory.is_working = creep.carry.energy == creep.carryCapacity;
    }
  }
};

module.exports = roleHarvester;
