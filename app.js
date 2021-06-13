
class App {

  constructor () {
    this.THINGS = THINGS.map(({size, name_singular, name_plural}) => ({size: parseFloat(size), name_singular: name_singular, name_plural: name_plural}));
  }

  run(input) {
    let match = this.findClosestMatch(input);

    if (!'comparison' in match) {
      match.comparison = "about";
    }
    var item_name = (match.mult>1)? match.item.name_plural: match.item.name_singular;
    var units = (input==1)? "meter": "meters"

    return [input , units, "is", match.comparison, match.mult, item_name].join(' ');
  }

  findClosestMatch(input) {
    var candidates = [];
    var multiplier = 3;
    var targetSize;

    for(var mult = 1; mult < 9; mult++) {
      targetSize = input / mult;

      if (targetSize < this.THINGS[0].size) {
        var diff = Math.abs(this.THINGS[0].size - targetSize);
        candidates.push({item: this.THINGS[0], mult: mult, comparison: 'smaller than', diff: diff});
        break;
      }

      for (var i = 1; i < this.THINGS.length; i++) {
        let nextThing = this.THINGS[i];
        let prevThing = this.THINGS[i-1];
        if (nextThing.size >= targetSize) {
          let nextDiff = Math.abs(nextThing.size - targetSize);
          let prevDiff = Math.abs(prevThing.size - targetSize);

          if (nextDiff == 0) {
            return {item: nextThing, mult: mult, diff: nextDiff};
          }
          else if (nextDiff < prevDiff) {
            candidates.push({item: nextThing, mult: mult, diff: nextDiff});
            break;
          }
          candidates.push({item: prevThing, mult: mult, diff: prevDiff});
          break;
        }
      }
    }
    if (candidates.length == 0) {
      candidates.push({item: this.THINGS[THINGS.length - 1], mult: 12, comparison: 'way bigger than'});
    }
    // Sort candidates
    candidates.sort(function(a, b){
      return a.diff - b.diff;
    });
    return candidates[0];

    //return {item: this.THINGS[this.THINGS.length - 1], comparison: 'bigger than'};
  }
}

export default App;
