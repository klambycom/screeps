var roles = {
  "harvester": require("role.harvester"),
  "upgrader": require("role.upgrader"),
  "builder": require("role.builder"),
  "warrior": require("role.warrior")
};

module.exports = {
  creep: null,
  source: null,

  create: function (creep) {
    this.creep = creep;
    this.source = creep.pos.findClosestByPath(FIND_SOURCES, {algorithm: "astar"});

    this.setup();

    if (this.creep.memory.is_working) {
      this.run();
      this.creep.memory.is_working = this.creep.carry.energy != 0;
    }
    else {
      this.moveToSource();
      this.creep.memory.is_working = this.creep.carry.energy == this.creep.carryCapacity;
    }
  },

  moveToSource: function () {
    if(this.creep.harvest(this.source) == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.source);
    }
  }
};
