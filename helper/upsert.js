"use strict";

const upsert = (Model, values, specificFind) => {
  return Model.findOne({ where: specificFind }).then(function (obj) {
    // update
    if (obj) return obj.update(values);
    // insert
    return Model.create(values);
  });
};

export { upsert };
