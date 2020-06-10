const db = require("../data/connection.js")

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
}

function find () {
  return db("schemes")
    .select("*")
}

function findById (id) {
 return db("schemes")
  .select("*")
  .where({"schemes.id": id})
  .first()
}

function findSteps (id) {
  return db("steps")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .where({"steps.scheme_id": id})
    .orderBy("steps.step_number")
}

function add (scheme) {
  return db("schemes")
    .insert(scheme)
    .then(added => findById(added[0]))
}

function update (changes, id) {
  return db("schemes")
    .where({"schemes.id": id})
    .update(changes)
    .then(updated => findById(id))
  }

function remove (id) {
  return db("schemes")
    .where({"schemes.id": id})
    .del()
}

function addStep(step, scheme_id) {
  const newStep = {...step, scheme_id}
  return db("steps")
    .insert(newStep)
}